import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUserFriends,
  faUser,
  faSignInAlt,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";
import "./styles/Navbar.css";
import { useAuth } from "../AuthContext";
//TODO: UPDATE THE LOGOUT FUNCTIONALITY
function Navbar() {
  const [isLoggedIn, setIsLoggedin] = useState(
    localStorage.getItem("username") !== null
  );

  useEffect(() => {
    setIsLoggedin(localStorage.getItem("username") !== null);
  }, [localStorage.getItem("username")]);
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("username");
    setIsLoggedin(false);
    navigate("/login");
  };
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

          {isLoggedIn &&
            JSON.parse(localStorage.getItem("user")).role === "admin" && (
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">
                  <FontAwesomeIcon icon={faChartBar} /> Dashboard
                </Link>
              </li>
            )}
          <li className="nav-item">
            <Link to="/find-friends" className="nav-link">
              <FontAwesomeIcon icon={faUserFriends} /> Find Friends
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={"/user/" + localStorage.getItem("username")}
              className="nav-link"
            >
              <FontAwesomeIcon icon={faUser} /> My Profile
            </Link>
          </li>
          <li className="nav-item nav-link" onClick={logoutHandler}>
            <FontAwesomeIcon icon={faSignInAlt} /> Logout
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
