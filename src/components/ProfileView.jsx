import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/ProfileView.css";
import { useAuth } from "../AuthContext";
import { useEffect } from "react";
import { userapi } from "../constant";

function ProfileView() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  if (username === null) {
    navigate("/login");
    return null; // Prevent further rendering of the component
  }

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    fetch(userapi + "/get/" + username, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [username]);

  const [activeTab, setActiveTab] = useState("followers");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="profile-view">
      <img src="../../vite.svg" alt="User" className="profile-picture" />
      <h3 className="username">{user.username}</h3>
      <div className="tab-container">
        <button
          onClick={() => handleTabChange("followers")}
          className={`tab ${activeTab === "followers" ? "active" : ""}`}
        >
          Followers
        </button>
        <button
          onClick={() => handleTabChange("following")}
          className={`tab ${activeTab === "following" ? "active" : ""}`}
        >
          Following
        </button>
      </div>
      <div className="list-view">
        {activeTab === "followers" ? (
          <>
            <div>Followers List</div>
            <ul>
              {user.followers.map((follower) => (
                <li key={follower.id}>{follower.target}</li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <div>Following List</div>
            <ul>
              {user.following.map((following) => (
                <li key={following.id}>{following.target}</li>
              ))}
            </ul>
          </>
        )}
      </div>
      <button
        className="see-more-details"
        onClick={() => navigate("/my-profile")}
      >
        See More Details
      </button>
    </div>
  );
}

export default ProfileView;
