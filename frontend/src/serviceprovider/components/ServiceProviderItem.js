import React from "react";
import './ServiceProviderItem.css';

const ServiceProviderItem = (props) => {
    return (
        <tr className="service-provider-item">
            <td><img src={props.logo} alt={`${props.name} logo`} className="service-provider-logo" /></td>
            <td>{props.name}</td>
            <td>{props.email}</td>
            <td>{props.phone}</td>
            <td>{props.seatClass}</td>
            <td>{props.flights}</td>
            <td>{props.createdOn}</td>
            <td>{props.lastLogin}</td>
        </tr>
    );
};

export default ServiceProviderItem;
