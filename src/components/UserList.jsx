import React from "react";
import User from "./User"; // Import User component
import "./styles/UserList.css";
function UserList({ users }) {
  return (
    <div className="user-list">
      {users.map((user, index) => (
        <User key={index} userData={user} />
      ))}
    </div>
  );
}

export default UserList;
