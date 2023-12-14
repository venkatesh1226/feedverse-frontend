import React, { useState, useRef, useEffect } from "react";
import "./styles/Post.css";

function Post({ user, time, text, postId, deleteHandler }) {
  const truncatedText =
    text.length > 250 ? `${text.substring(0, 250)}...` : text;

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isAdmin = currentUser && currentUser.role === "admin";

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(); // Reference to the menu

  const handleDelete = () => {
    console.log("Deleting post", postId);
    deleteHandler(postId);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Click outside handler
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className="post">
      <div className="post-header">
        <span className="post-user">{user}</span>
        {isAdmin && (
          <div className="post-menu" ref={menuRef}>
            <span onClick={toggleMenu}>...</span>
            {showMenu && (
              <div className="post-menu-options">
                <span onClick={handleDelete}>Delete</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="post-content">{truncatedText}</div>

      <div className="post-footer">
        <span className="post-time">{time}</span>
      </div>
    </div>
  );
}

export default Post;
