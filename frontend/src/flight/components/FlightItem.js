import React from "react";
import './FlightItem.css';

const FlightItem = (props) => {
    return (
        <tr className="flight-item">
            <td className="flight-item__image">
                <img src={props.image} alt={`${props.flightNumber}'s profile`} />
            </td>
            <td>{props.airline}</td>
            <td>{props.flightNumber}</td>
            <td>{props.origin}</td>
            <td>{props.departureTime}</td>
            <td>{props.destination}</td>
            <td>{props.arrivalTime}</td>
            <td>{props.recurrence}</td>
            <td>{props.duration}</td>
            <td>{props.seatModel}</td>
            <td>{props.luggageCapacity}</td>
            <td>{props.status}</td>
            
        </tr>
    );
};

export default FlightItem;