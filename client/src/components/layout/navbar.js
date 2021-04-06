import React, {Fragment, useContext} from 'react';
import {Link} from 'react-router-dom';
import '../../App.css';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';
import { BiLogOut } from "react-icons/bi";
import { FcContacts } from "react-icons/fc";

const Navbar  = () => {
    
    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);
    const {isAuthenticated, user, logout} = authContext
    const {clearContacts} = contactContext

    const logoutUser = () => {
        logout();
        clearContacts();
    }

    const authLinks = (
        <Fragment>
            <li>Hello {user && user.name}</li>
            <li>
                <a onClick={logoutUser} href="#!" className="logout"><BiLogOut className="icon"/>{' '}Logout</a>
            </li>
        </Fragment>
    )

    const guestLinks = (
        <Fragment>
            <li className="nav-link">
                <Link to='/register'>Register</Link>
            </li>
            <li className="nav-link">
                    <Link to='/login'>Login</Link>
            </li>
            <li className="nav-link">
                    <Link to='/about'>About</Link>
            </li>
        </Fragment>
    )
    return(
        <nav className="navbar">
            <div className="company-logo">
                <Link to="/"><FcContacts className="icon-logo"/>Contact Book</Link>
            </div>
            <ul className="nav-link-items">
               {isAuthenticated ? authLinks : guestLinks}
            </ul>
        </nav>
    )
}

export default Navbar;