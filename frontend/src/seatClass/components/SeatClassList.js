// SeatClassList.js
import React from "react";
import './SeatClassList.css';
import SeatClassItem from "./SeatClassItem";
import Card from "../../shared/UIElements/Card";
import { Link } from "react-router-dom";

const SeatClassList = (props) => {
    if (props.items.length === 0) {
        return (
            <div className="center">
                <Card>
                    <h2>No Seat Classes Found!</h2>
                    <Link to="/seatclass/new">
                        <button>Add Seat Class</button>
                    </Link>
                </Card>
            </div>
        );
    }

    return (
        <div>
            <Card className="seat-class-list__content">
                <table className="seat-class-list__table">
                    <thead>
                        <tr>
                            <th>Seat Class Name</th>
                            <th>Economy Seats</th>
                            <th>Economy Seat Price</th>
                            <th>Economy Food Price</th>
                            <th>Available Economy Seats</th>
                            <th>Business Seats</th>
                            <th>Business Seat Price</th>
                            <th>Business Food Price</th>
                            <th>Available Business Seats</th>
                            <th>First Class Seats</th>
                            <th>First Class Seat Price</th>
                            <th>First Class Food Price</th>
                            <th>Available First Class Seats</th>
                            <th>Total Seats</th>
                            <th>Total Available Seats</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.items.map(seatClass => (
                            <SeatClassItem
                                key={seatClass._id}
                                id={seatClass._id}
                                seatClassName={seatClass.seatClassName}
                                economySeats={seatClass.economySeats}
                                economySeatPrice={seatClass.economySeatPrice}
                                economyFoodPrice={seatClass.economyFoodPrice}
                                economyavailableSeats={seatClass.economyavailableSeats}
                                businessSeats={seatClass.businessSeats}
                                businessSeatPrice={seatClass.businessSeatPrice}
                                businessFoodPrice={seatClass.businessFoodPrice}
                                businessavailableSeats={seatClass.businessavailableSeats}
                                firstClassSeats={seatClass.firstClassSeats}
                                firstClassSeatPrice={seatClass.firstClassSeatPrice}
                                firstClassFoodPrice={seatClass.firstClassFoodPrice}
                                firstClassavailableSeats={seatClass.firstClassavailableSeats}
                                totalSeats={seatClass.totalSeats}
                                totalAvailableSeats={seatClass.totalAvailableSeats}
                                status={seatClass.status}
                            />
                        ))}
                    </tbody>
                </table>
            </Card>
            <div className="center">
                <Card>
                    <Link to="/seatclass/new">
                        <button>Add Seat Class</button>
                    </Link>
                </Card>
            </div>
        </div>
    );
};

export default SeatClassList;
