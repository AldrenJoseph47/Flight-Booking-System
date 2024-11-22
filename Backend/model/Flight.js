const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    airline: { type: String, required: true },
    flightNumber: { type: String, required: true, unique: true },
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    image: { type: String }, // URL or file path for the image/logo
    duration: { type: String },
    seatModel: { type: mongoose.Schema.Types.ObjectId, ref: 'SeatClass', required: true },
    luggageCapacity: { type: String },
    approved: { type: Boolean, default: false }, // New field for approval status
    status:{type: String, default: 'Awaiting Approval for Adding Flight'}
});

module.exports = mongoose.model('Flight', flightSchema);
