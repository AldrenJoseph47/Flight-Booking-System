import React from "react";
import './SeatClassItem.css';

const SeatClassItem = (props) => {
    return (
        <tr className="seat-class-item">
            <td>{props.seatClassName}</td>
            <td>{props.economySeats}</td>
            <td>{props.economySeatPrice}</td>
            <td>{props.economyFoodPrice}</td>
            <td>{props.economyavailableSeats}</td>

            <td>{props.businessSeats}</td>
            <td>{props.businessSeatPrice}</td>
            <td>{props.businessFoodPrice}</td>
            <td>{props.businessavailableSeats}</td>

            <td>{props.firstClassSeats}</td>
            <td>{props.firstClassSeatPrice}</td>
            <td>{props.firstClassFoodPrice}</td>
            <td>{props.firstClassavailableSeats}</td>

            <td>{props.totalSeats}</td>
            <td>{props.totalAvailableSeats}</td>
            <td>{props.status}</td>
        </tr>
    );
};

export default SeatClassItem;
