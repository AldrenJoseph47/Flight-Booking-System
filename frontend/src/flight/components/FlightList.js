import React from "react";
import './FlightList.css';
import FlightItem from "./FlightItem";
import Card from "../../shared/UIElements/Card"; // Assumes you have a Card component
import { Link } from "react-router-dom";

const FlightList = (props) => {
    if (props.items.length === 0) {
        return (
            <div className="center">
                <Card>
                    <h2>No Flights Found!</h2>
                    <Link to="/flight/new">
                        <button>Add Flights</button>
                    </Link>
                </Card>
            </div>
        );
    }

    return (
        <div>
            <Card className="flight-list__content">
                <table className="flight-list__table">
                    <thead>
                        <tr>
                            <th>Airline Image</th>
                            <th>AirLine</th>
                            <th>Flight Number</th>

                            <th>Origin Airport</th>
                            <th>Departure Time</th>
                            <th>Destination Airport</th>
                            <th>Arrival Time</th>
                            <th>Recurrence</th>


                            <th>Flight Duration (Minutes)</th>
                            <th>Seating Arrangement</th>
                            <th>Baggage Capacity</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.items.map(flight => (
                            <FlightItem
                                key={flight._id}
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
                        ))}
                    </tbody>
                </table>
            </Card>
            <div className="center">
                <Card>
                    <Link to="/flight/new">
                        <button>Add Flight</button>
                    </Link>
                </Card>
            </div>
        </div>
    );
};

export default FlightList;
