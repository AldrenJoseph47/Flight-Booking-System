import React from "react";
import './AdminItem.css';

const AdminItem = (props) => {
    return (
        <tr className="admin-item">
            <td className="admin-item__image">
                <img src={props.image} alt={`${props.name}'s profile`} />
            </td>
            <td>{props.name}</td>
            <td>{props.email}</td>
            <td>{props.phone}</td>
            <td>{props.createdOn}</td>
            <td>{props.lastLogin}</td>
        </tr>
    );
};

export default AdminItem;
