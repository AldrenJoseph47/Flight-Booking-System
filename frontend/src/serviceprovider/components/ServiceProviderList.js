import React from "react";
import './ServiceProviderList.css';
import './ServiceProviderItem.css';
import ServiceProviderItem from "./ServiceProviderItem";
import Card from "../../shared/UIElements/Card"; // Assuming Card component is available
import { Link } from "react-router-dom";

const ServiceProviderList = (props) => {
    if (props.items.length === 0) {
        return (
            <div className="center">
                <Card>
                    <h2>No Service Provider Found!</h2>
                    <Link to="/serviceprovider/new">
                        <button>Add Service Provider</button>
                    </Link>
                </Card>
            </div>
        );
    }

    return (
        <div>
            <Card className="service-provider-list__content">
                <table className="service-provider-list__table">
                    <thead>
                        <tr>
                            <th>Logo</th>
                            <th>Airline Name</th>
                            <th>Email</th>
                            <th>Contact Info</th>
                            <th>Seat Class</th>
                            <th>Flights</th>
                            <th>Created</th>
                            <th>Recent Login</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.items.map(serviceProvider => (
                            <ServiceProviderItem
                                key={serviceProvider._id}
                                id={serviceProvider._id}
                                logo={serviceProvider.logo}
                                name={serviceProvider.name}
                                email={serviceProvider.email}
                                phone={serviceProvider.phone}
                                seatClass={serviceProvider.seatClass}
                                flights={serviceProvider.flights}
                                createdOn={serviceProvider.createdOn}
                                lastLogin={serviceProvider.lastLogin}
                            />
                        ))}
                    </tbody>
                </table>
            </Card>
            <div className="center">
                <Card>
                    <Link to="/serviceprovider/new">
                        <button>Add Service Provider</button>
                    </Link>
                </Card>
            </div>
        </div>
    );
};

export default ServiceProviderList;
