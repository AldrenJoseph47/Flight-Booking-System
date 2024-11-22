import React from "react";
import AdminItem from "./AdminItem";
import Card from "../../shared/UIElements/Card"; // Assumes you have a Card component
import { Link } from "react-router-dom";
import './AdminList.css'


const AdminList = (props) => {
    if (props.items.length === 0) {
        return (
            <div className="center">
                <Card>
                    <h2>No Admins Found!</h2>
                    <Link to="/admin/new">
                        <button>Add Admin</button>
                    </Link>
                </Card>
            </div>
        );
    }

    return (
        <div>
            <Card className="admin-list__content">
                <table className="admin-list__table">
                    <thead>
                        <tr>
                            <th>Profile Pic</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact Info</th>
                            <th>Created</th>
                            <th>Recent Login</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.items.map(admin => (
                            <AdminItem
                                key={admin._id}
                                id={admin._id}
                                name={admin.name}
                                image={admin.image}
                                email={admin.email}
                                phone={admin.phone}
                                createdOn={admin.createdOn}
                                lastLogin={admin.lastLogin}
                            />
                        ))}
                    </tbody>
                </table>
            </Card>
            <div className="center">
                <Card>
                    <Link to="/admin/new">
                        <button>Add Admin</button>
                    </Link>
                </Card>
            </div>
        </div>
    );
};

export default AdminList;