import React, { useState } from "react";
import "./styles/WritePost.css"; // Importing the CSS file

const WritePost = () => {
  const [postText, setPostText] = useState("");
  const maxCharacterLimit = 280;

  const handleTextChange = (event) => {
    if (event.target.value.length <= maxCharacterLimit) {
      setPostText(event.target.value);
    }
  };

  const handleSubmit = () => {
    console.log("Submitted Post:", postText);
    setPostText("");
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
