const fs = require('fs');
const path = require('path');
const Flight = require('../model/Flight');
const SeatClass = require('../model/SeatClass');
const HttpError = require('../model/http-error');

// Get all flights
exports.getAllFlights = async (req, res, next) => {
    try {
        const flights = await Flight.find();

        if (!flights || flights.length === 0) {
            return next(new HttpError('No flights found.', 404));
        }

        res.json({ flights: flights.map(flight => flight.toObject({ getters: true })) });
    } catch (err) {
        return next(new HttpError('Fetching flights failed, please try again later.', 500));
    }
};

// Create a new flight
exports.createFlight = async (req, res, next) => {
    const { airline, origin, destination, departureTime, arrivalTime, duration, luggageCapacity, flightNumber } = req.body; // Take flightNumber from the request body
    const image = req.file ? req.file.path : null;

    if (!image) {
        return next(new HttpError('No image provided.', 422));
    }

    const imagePath = req.file.path.replace(/\\/g, '/');

    try {
        // Referenced seat model exists based on flightNumber (seatClassName)
        const seatClass = await SeatClass.findOne({ seatClassName: flightNumber }); // Find the seat class using flightNumber
        if (!seatClass) {
            return next(new HttpError('Seat class not found for the provided flight number.', 404));
        }

        const newFlight = new Flight({
            flightNumber,
            airline,
            origin,
            destination,
            departureTime,
            arrivalTime,
            duration,
            luggageCapacity,
            seatModel: seatClass._id, // Store the seat model ID for reference
            image: 'http://localhost:4000/' + imagePath,
        });

        await newFlight.save();
        res.status(201).json({ message: 'Flight successfully created', flight: newFlight.toObject({ getters: true }) });
    } catch (err) {
        // Check for duplicate key error (MongoDB error code for duplicate key is 11000)
        if (err.code === 11000 && err.keyPattern && err.keyPattern.flightNumber) {
            return next(new HttpError('Flight number already exists. Please use a unique flight number.', 409));
        }

        console.log(err);
        return next(new HttpError('Flight creation failed, please try again.', 500));
    }
};



// Get a flight by ID
exports.getFlightById = async (req, res, next) => {
    const flightId = req.params.fid;

    try {
        const flight = await Flight.findById(flightId).populate('seatModel');
        if (!flight) {
            return next(new HttpError('Flight not found.', 404));
        }
        res.json({ flight: flight.toObject({ getters: true }) });
    } catch (err) {
        return next(new HttpError('Fetching flight failed, please try again later.', 500));
    }
};


// Update flight
exports.updateFlight = async (req, res, next) => {
    const flightId = req.params.fid;
    const { flightNumber, airline, origin, destination, departureTime, arrivalTime, duration, luggageCapacity } = req.body;
    const image = req.file ? req.file.path.replace(/\\/g, '/') : null;

    console.log(req.body) // returns null in form data

    try {
        const flight = await Flight.findById(flightId);
        if (!flight) {
            return next(new HttpError('Flight not found.', 404));
        }

        // Update basic flight information
        flight.flightNumber = flightNumber || flight.flightNumber;
        flight.airline = airline || flight.airline;
        flight.origin = origin || flight.origin;
        flight.destination = destination || flight.destination;
        flight.departureTime = departureTime || flight.departureTime;
        flight.arrivalTime = arrivalTime || flight.arrivalTime;
        flight.duration = duration || flight.duration;
        flight.luggageCapacity = luggageCapacity || flight.luggageCapacity;
        flight.status = "Awaiting Approval for Updating Flight";


        // Update seat model based on flightNumber if flightNumber is changed
        if (flightNumber && flightNumber !== flight.flightNumber) {
            const seatModel = await SeatClass.findOne({ seatClassName: flightNumber });
            if (!seatModel) {
                return next(new HttpError('Seat model not found for the provided flight number.', 404));
            }
            flight.seatModel = seatModel._id;
        }

        // Update image if a new one is provided
        if (image) {
            flight.image = 'http://localhost:4000/' + image;
        }

        await flight.save();
        res.status(200).json({ message: 'Flight updated successfully', flight: flight.toObject({ getters: true }) });
    } catch (err) {
        console.error(err);
        return next(new HttpError('Updating flight failed, please try again.', 500));
    }
};


// Delete flight
exports.deleteFlight = async (req, res, next) => {
    const flightId = req.params.fid;

    try {
        const flight = await Flight.findById(flightId);
        if (!flight) {
            return next(new HttpError('Flight not found.', 404));
        }

        if (flight.image) {
            // Extract the relative path from the URL
            const imagePath = flight.image.replace(/^http:\/\/localhost:4000/, ''); // This gets the relative path
      
            // Construct the absolute path
            const absolutePath = path.join('images', '..', imagePath); 
      
            fs.unlink(absolutePath, (err) => {
              if (err) {
                console.error('Failed to delete image:', err);
              }
            });
          }


        await flight.deleteOne();
        res.status(200).json({ message: 'Flight deleted successfully' });
    } catch (err) {
        console.log(err);
        return next(new HttpError('Deleting flight failed, please try again.', 500));
    }
};