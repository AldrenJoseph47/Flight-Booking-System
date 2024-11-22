import React from "react";
import './BookingList.css';
import BookingItem from "./BookingItem";
import Card from "../../shared/UIElements/Card"; // Assumes you have a Card component
import { Link } from "react-router-dom";

const BookingList = (props) => {
    if (props.items.length === 0) {
        return (
            <div className="center">
                <Card>
                    <h2>No Flights Found!</h2>
                </Card>
            </div>
        );
    }

    return (
        <div className="booking-list">
            {props.items.map(flight => (
                <Link to={`/booking/${flight._id}`} key={flight._id} className="booking-link">
                    <BookingItem
                        id={flight._id}
                        image={flight.image}
                        airline={flight.airline}
                        flightNumber={flight.flightNumber}
                        origin={flight.origin}
                        destination={flight.destination}
                        departureTime={flight.departureTime}
                        arrivalTime={flight.arrivalTime}
                        duration={flight.duration}
                        seatModel={flight.seatModel}
                        luggageCapacity={flight.luggageCapacity}
                        status={flight.status}
                        recurrence={flight.recurrence}
                    />
                </Link>
            ))}
        </div>
    );
};

export default BookingList;
