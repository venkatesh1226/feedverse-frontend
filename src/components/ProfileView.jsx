import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/ProfileView.css";

function ProfileView() {
  const [activeTab, setActiveTab] = useState("followers"); // 'followers' or 'following'
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="profile-view">
      <img src="../../vite.svg" alt="User" className="profile-picture" />
      <h3 className="username">Username</h3>
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
        {/* Conditionally render followers or following list based on activeTab */}
        {activeTab === "followers" ? (
          <div>Followers List</div>
        ) : (
          <div>Following List</div>
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
