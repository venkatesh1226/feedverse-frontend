import React, { useState } from "react";
import "./styles/WritePost.css"; // Importing the CSS file
import { useEffect } from "react";
import { useNavigate } from "react-router-dom/dist";
import { postapi } from "../constant";

const WritePost = ({ writeHandler }) => {
  const [postText, setPostText] = useState("");
  const maxCharacterLimit = 280;
  const username = localStorage.getItem("username");
  const naviagte = useNavigate();
  useEffect(() => {
    if (username === null || username === undefined) {
      naviagte("/login");
    }
  }, [username]);

  const handleTextChange = (event) => {
    if (event.target.value.length <= maxCharacterLimit) {
      setPostText(event.target.value);
    }
  };

  const handleSubmit = () => {
    const sucess = writeHandler(postText);
    if (sucess) {
      setPostText("");
    } else {
      console.log("Error in posting");
    }
    // This will log immediately after the request is sent
  };

  return (
    <div className="write-post-container glassmorphic">
      <textarea
        className="neumorphic-textarea"
        value={postText}
        onChange={handleTextChange}
        placeholder="What's happening?"
        rows={4}
      />
      <div className="post-footer">
        <span className="character-count">
          {maxCharacterLimit - postText.length} characters left
        </span>
        <button
          className="neumorphic-button"
          onClick={handleSubmit}
          disabled={!postText}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default WritePost;
