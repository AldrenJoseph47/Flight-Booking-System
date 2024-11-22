// UserItem.js
import React from "react";
import './UserItem.css';

const UserItem = (props) => {
    return (
        <tr className="user-item">
            <td className="user-item__image">
                <img src={props.image} alt={`${props.name}'s profile`} />
            </td>
            <td>{props.name}</td>
            <td>{props.email}</td>
            <td>{props.phone}</td>
            <td>{props.bookings}</td>
            <td>{props.createdOn}</td>
            <td>{props.lastLogin}</td>
        </tr>
    );
};

export default UserItem;
