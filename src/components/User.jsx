import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { userapi } from "../constant";
import "./styles/User.css";
function User({ userData }) {
  const navigate = useNavigate();
  const curUser = localStorage.getItem("username");

  // Handler for navigating to user profile
  const navigateToUserProfile = () => {
    navigate(`/user/${userData.username}`); // Adjust the route as per your routing setup
  };

  // Handler for the follow button (logic to be implemented based on your app's functionality)
  const handleFollow = (e) => {
    e.stopPropagation();
    console.log("Follow User:", userData.username);

    fetch(`${userapi}/${curUser}/follow/${userData.username}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="user" onClick={navigateToUserProfile}>
      <div className="user-info">
        <h4>{userData.name}</h4>
        <p>@{userData.username}</p>
        <p>Followers: {userData.followersCount}</p>
        <p>Following: {userData.followingCount}</p>
      </div>
      <button onClick={navigateToUserProfile} className="follow-button">
        View More
      </button>
    </div>
  );
}

export default User;
