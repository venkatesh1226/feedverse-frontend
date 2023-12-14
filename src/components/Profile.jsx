import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styles/Profile.css";
import { userapi, postapi } from "../constant.js";
import UserDashboard from "./UserDashboard.jsx";
import ProfilePostList from "./ProfilePostList.jsx";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { username } = useParams();
  const curUser = JSON.parse(localStorage.getItem("user"));
  const [activeTab, setActiveTab] = useState("followers");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate("/login");
  console.log(username);
  useEffect(() => {
    setIsLoading(true);
    fetch(userapi + "/get/" + username)
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
      })
      .finally(() => {
        setIsLoading(false);
      });
    setIsLoading(true);
    fetch(postapi + "/user/" + username)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [username]);

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found.</div>;
  }

  const getName = () => {
    let found = false;

    user.detailedFollowers.forEach((element) => {
      if (element.username === curUser.username) {
        console.log("Found " + curUser.username);
        found = true; // Set found to true if the user is found
      }
    });

    return found;
  };

  const followUser = () => {
    console.log("Follow User:", username);

    fetch(`${userapi}/${curUser.username}/follow/${username}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const unfollowUser = () => {
    console.log("Follow User:", username);

    fetch(`${userapi}/${curUser.username}/unfollow/${username}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="container">
      <div className="profile">
        {console.log(user)}
        <h3 className="username">{user.name}</h3>
        <h3 className="username">{"@" + user.username}</h3>
        {curUser === username && <button className="tab active">Edit</button>}
        {curUser !== username && !getName() && (
          <button className="tab active" onClick={() => followUser()}>
            Follow
          </button>
        )}
        {curUser !== username && getName() && (
          <button className="tab active" onClick={() => unfollowUser()}>
            UnFollow
          </button>
        )}
        <div className="tab-container">
          <button
            onClick={() => handleTabChange("posts")}
            className={'tab ${activeTab==="posts" ? "active" : ""}'}
          >
            {"Posts " + posts.length}
          </button>
          <button
            onClick={() => handleTabChange("dashboard")}
            className={'tab ${activeTab==="dashboard" ? "active" : ""}'}
          >
            Dashboard
          </button>
          <button
            onClick={() => handleTabChange("followers")}
            className={`tab ${activeTab === "followers" ? "active" : ""}`}
          >
            {"Followers " + user.detailedFollowers.length}
          </button>
          <button
            onClick={() => handleTabChange("following")}
            className={`tab ${activeTab === "following" ? "active" : ""}`}
          >
            {"Following " + user.detailedFollowing.length}
          </button>
        </div>
        <div className="list-view">
          {activeTab === "followers" && (
            <>
              <div>Followers List</div>
              <ul>
                {user.detailedFollowers.map((follower) => (
                  <li
                    key={follower.username}
                    className="f-item"
                    onClick={() => navigate("../user/" + follower.username)}
                  >
                    <div className="f-name">Name: {follower.name}</div>
                    <div className="f-username">
                      Username: {follower.username}
                    </div>
                    <div className="f-stats">
                      <span>Followers: {follower.followersCount}</span>
                      <span>Following: {follower.followingCount}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
          {activeTab === "following" && (
            <>
              <div>Following List</div>
              <ul>
                {user.detailedFollowing.map((following) => (
                  <li
                    key={following.username}
                    className="f-item"
                    onClick={() => navigate("../user/" + follower.username)}
                  >
                    <div className="f-name">Name: {following.name}</div>
                    <div className="f-username">
                      Username: {following.username}
                    </div>
                    <div className="f-stats">
                      <span>Followers: {following.followersCount}</span>
                      <span>Following: {following.followingCount}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}

          {activeTab === "posts" && (
            <>
              <ProfilePostList username={username} />
            </>
          )}

          {activeTab === "dashboard" && (
            <>
              <UserDashboard user={user} post={posts} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
