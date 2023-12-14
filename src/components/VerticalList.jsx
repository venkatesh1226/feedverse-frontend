import React, { useEffect } from "react";
import "./styles/VerticalList.css";

const VerticalList = ({ users }) => {
  const [following, setFollowing] = useState(new Set());

  const toggleFollow = (username) => {
    setFollowing((prevFollowing) => {
      const updatedFollowing = new Set(prevFollowing);
      if (updatedFollowing.has(username)) {
        updatedFollowing.delete(username);
      } else {
        updatedFollowing.add(username);
      }
      return updatedFollowing;
    });
  };

  return (
    <div className="user-list">
      {users.map((user) => (
        <div
          className="user-item"
          key={user.username}
          onClick={() => console.log(`Navigate to ${user.username}`)}
        >
          <img
            src={user.profilePicture}
            alt={user.name}
            className="profile-picture"
          />
          <div className="user-info">
            <div className="username">{user.name}</div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFollow(user.username);
              }}
            >
              {following.has(user.username) ? "Unfollow" : "Follow"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VerticalList;
