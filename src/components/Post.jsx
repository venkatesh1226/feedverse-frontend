import React from "react";
import "./styles/Post.css";

function Post({ user, time, text }) {
  // Limit text to 250 characters
  const truncatedText =
    text.length > 250 ? `${text.substring(0, 250)}...` : text;

  return (
    <div className="post">
      <div className="post-header">
        <span className="post-user">{user}</span>
        <span className="post-time">{time}</span>
      </div>
      <div className="post-content">{truncatedText}</div>
    </div>
  );
}

export default Post;
