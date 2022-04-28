import { makeStyles } from "@material-ui/core";
import React from "react";
import './Component.css'
import { ReactComponent as Logo } from '../assets/logo.svg'
import ABCLogo from '../assets/ABCLogoFull.svg'

const Header = () => {
    return (

        <div className="Header">

            <Logo className="Logo" />

            <img src={ABCLogo} className="ABCLogo" />

        </div>

    );
};

export default Header;
