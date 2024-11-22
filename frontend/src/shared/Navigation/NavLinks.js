import React, { useContext } from "react";
import './NavLinks.css';
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

// Step:3 In order to use useContexts, we need to listen to it

const NavLinks= props =>{
    // Create an object of AuthContext

    const auth = useContext(AuthContext);

    return(<ul className="nav-links">

        <li>
            <NavLink to="/" exact="true">Home</NavLink>
        </li>
        <li>
            <NavLink to="/customer" exact="true">Cust</NavLink>
        </li>

        {auth.isLoggedIn &&
        <li>
            <NavLink to="/serviceproviders" exact="true">Serv-Pro</NavLink>
        </li>}
        {auth.isLoggedIn &&
        <li>
            <NavLink to="/admins" exact="true">Adm</NavLink>
        </li>}

        {auth.isLoggedIn &&
        <li>
            <NavLink to="/seatclasses" exact="true">Seats</NavLink>
        </li>}

        {auth.isLoggedIn &&
        <li>
            <NavLink to="/roles" exact="true">Role</NavLink>
        </li>}

        {auth.isLoggedIn &&
        <li>
            <NavLink to="/flight" exact="true">Flights</NavLink>
        </li>}

        {auth.isLoggedIn &&
        <li>
            <NavLink to="/booking" exact="true">Booking</NavLink>
        </li>}

        {/* {auth.isLoggedIn &&
        <li>
            <NavLink to="/seatclass/new" exact="true">+ Seats</NavLink>
        </li>} */}
        {/* {auth.isLoggedIn &&
        <li>
            <NavLink to="/flight/new" exact="true">+ Flight</NavLink>
        </li>} */}

        {/* {auth.isLoggedIn &&
        <li>
            <NavLink to="/admin/new" exact="true">+ Adm</NavLink>
        </li>}

        {auth.isLoggedIn &&
        <li>
            <NavLink to="/serviceprovider/new" exact="true">+ Serv-Pro</NavLink>
        </li>} */}


        {!auth.isLoggedIn &&
        <li>
            <NavLink to="/auth" exact="true">U Auth</NavLink>
        </li>}

        {!auth.isLoggedIn &&
        <li>
            <NavLink to="/serviceauth" exact="true">Serv-Pro Auth</NavLink>
        </li>}

        {!auth.isLoggedIn &&
        <li>
            <NavLink to="/adminauth" exact="true">Adm Auth</NavLink>
        </li>}
        
        

        {auth.isLoggedIn &&
        <li>
            <NavLink onClick={auth.logout} exact="true">Log Out</NavLink>
        </li>}
    </ul>
    )
}

export default NavLinks;