import React, { useState } from "react";
import UserList from "./UserList";

import { userapi } from "../constant";
import "./styles/FindFriends.css";

function FindFriends() {
  const [users, setUsers] = useState([]); // Replace with actual user data
  const [searchParam, setSearchParam] = useState("");

  const handleSearch = () => {
    fetch(userapi + "/search?searchParam=" + searchParam, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setUsers(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  return (
    <div className="find-friends-container">
      {/* <div className="suggested-users">
        <UserList users={users} />
      </div> */}
      <div className="search-results">
        <div className="search-bar-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search users..."
            onChange={(e) => setSearchParam(e.target.value)}
          />
          <button
            className="search-button"
            onClick={handleSearch}
            // Add an onClick handler to trigger the search
          >
            Search
          </button>
        </div>
        <ul className="search-results-list">
          <UserList users={users} />
          {/* Loop through and display search results here */}
        </ul>
      </div>
    </div>
  );
}

export default FindFriends;
