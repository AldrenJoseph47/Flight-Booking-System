import React from "react";
import './BookingItem.css';
import Card from "../../shared/UIElements/Card"; // Assumes you have a Card component

const BookingItem = (props) => {
    return (
        <Card className="booking-item">
            <div className="booking-item__header">
                <h2 className="booking-item__route">
                    {props.origin} → {props.destination}
                </h2>
                <p className="booking-item__duration">{props.duration} Minutes</p>
            </div>

            <div className="booking-item__main">
                <div className="booking-item__airline">
                    <img src={props.image} alt={props.airline} className="booking-item__airline-logo" />
                    <div className="booking-item__airline-details">
                        <p className="booking-item__airline-name">{props.airline}</p>
                        <p className="booking-item__flight-number">{props.flightNumber}</p>
                    </div>
                </div>

                <div className="booking-item__schedule">
                    <div className="booking-item__time">
                        <p className="booking-item__time-text">{props.departureTime}</p>
                        <p className="booking-item__location">{props.origin} . {props.originAirport}</p>
                    </div>
                    <div className="booking-item__time">
                        <p className="booking-item__time-text">{props.arrivalTime}</p>
                        <p className="booking-item__location">{props.destination} . {props.destinationAirport}</p>
                    </div>
                </div>
            </div>

            <div className="booking-item__footer">
                <p className="booking-item__baggage">🧳 Max Baggage: {props.luggageCapacity}</p>
            </div>
        </Card>
    );
};

export default BookingItem;
