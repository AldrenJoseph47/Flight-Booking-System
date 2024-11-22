import React from "react";
import './MainNavigation.css';
import MainHeader from "./MainHeader";
import {Link} from "react-router-dom";
import NavLinks from "./NavLinks";

const MainNavigation= props =>{
    return(
        <MainHeader className="main-navigation__menu-btn">
            <button>
                <span>--</span>
            </button>

            <h1 className="main-navigation__title">
                <Link to="/">FlywithMe</Link>
            </h1>

            <nav>
                <NavLinks/>
            </nav>

        </MainHeader>
    )
}

export default MainNavigation;