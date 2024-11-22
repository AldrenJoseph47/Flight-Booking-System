// UserList.js
import React from "react";
import './UserList.css';
import './UserItem.css';
import UserItem from "./UserItem";
import Card from "../../shared/UIElements/Card"; // Assumes you have a Card component

const UserList = (props) => {
    if (props.items.length === 0) {
        return (
            <div className="center">
                <Card>
                    <h2>No Users Found!</h2>
                </Card>
            </div>
        );
    }

    return (
        <div>
            <Card className="user-list__content">
                <table className="user-list__table">
                    <thead>
                        <tr>
                            <th>Profile Pic</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact Info</th>
                            <th>Bookings</th>
                            <th>Created</th>
                            <th>Recent Login</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.items.map(user => (
                            <UserItem
                                key={user._id}
                                id={user._id}
                                name={user.name}
                                image={user.image}
                                email={user.email}
                                phone={user.phone}
                                bookings={user.bookings}
                                createdOn={user.createdOn}
                                lastLogin={user.lastLogin}
                            />
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
};

export default UserList;
