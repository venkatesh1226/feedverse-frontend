import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUserFriends,
  faUser,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./styles/Navbar.css";
import { useAuth } from "../AuthContext";
//TODO: UPDATE THE LOGOUT FUNCTIONALITY
function Navbar() {
  const { isLoggedIn } = useAuth();
  return (
    <nav className="navbar">
      <h1 className="navbar-brand">
        <FontAwesomeIcon icon={faUserFriends} /> FeedVerse
      </h1>
      {isLoggedIn && (
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              <FontAwesomeIcon icon={faHome} /> Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/find-friends" className="nav-link">
              <FontAwesomeIcon icon={faUserFriends} /> Find Friends
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/my-profile" className="nav-link">
              <FontAwesomeIcon icon={faUser} /> My Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              <FontAwesomeIcon icon={faSignInAlt} /> Login/Signup
            </Link>
          </li>
        </ul>
      )}
      {!isLoggedIn && (
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              <FontAwesomeIcon icon={faSignInAlt} /> Login/Signup
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
