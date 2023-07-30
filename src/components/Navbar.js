import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css'
const Navbar = () => {
    return (
        <React.Fragment>
            <nav >
                <Link to='/'>College</Link>
            </nav>
        </React.Fragment>
    )
}

export default Navbar