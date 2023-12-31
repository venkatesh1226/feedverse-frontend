import React from "react";
import Post from "./Post";
import "./styles/FeedList.css";
import { useState, useEffect } from "react";
import { postapi } from "../constant";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import WritePost from "./WritePost";
import myImage from "../assets/undraw_void_-3-ggu.svg"; // Update the path to match your file structure
function FeedList() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate("/login");
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const username = currentUser && currentUser.username;

  useEffect(() => {
    fetchPosts();
  }, [username]);

  const handlePostWrite = async (postText) => {
    const curPost = {
      post: postText,
      username: username, // Consider managing this in your app's global state
      createdAt: new Date().toISOString(),
    };
    fetch(postapi + "/add-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(curPost),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok"); // Handle non-200 responses
        }
        return response.json(); // or handle the response as needed
      })
      .then((data) => {
        console.log("Post submitted:", data);
        setPosts([curPost, ...posts]);
        return true;
        // Handle successful submission, e.g., clearing the postText or updating the UI
      })
      .catch((error) => {
        console.error("Submission error:", error);
        return false;
        // Handle any errors here
      });
  };
  const handlePostDelete = async (id) => {
    const url = `${postapi}/${id}?role=${currentUser.role}&username=${username}`;
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, requestOptions);

      const data = await response.json();
      if (data) {
        console.log("Post deleted successfully");
        setPosts(posts.filter((post) => post.id !== id));
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPosts = () => {
    setIsLoading(true);
    setError(null);

    if (username) {
      fetch(postapi + "/feed?username=" + username, {
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
          console.log("Fetched data:", data); // Log the fetched data
          if (Array.isArray(data)) {
            setPosts(data);
            setIsLoading(false);
          } else {
            console.error("Data is not an array:", data);
            setPosts([]); // Set to empty array if data is not an array
          }
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          setError(error);
          setIsLoading(false);
        });
    } else {
      navigate("/login");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="feed-list">
      <div className="sub-nav">
        <WritePost writeHandler={handlePostWrite} />
        <button onClick={fetchPosts} className="refresh-button">
          Refresh Feed
        </button>
      </div>
      {Array.isArray(posts) && posts.length > 0 ? (
        posts.map((post, index) => (
          <Post
            key={index}
            user={post.username}
            time={post.createsAt}
            text={post.post}
            postId={post.id}
            deleteHandler={handlePostDelete}
          />
        ))
      ) : (
        <>
          <img className="image" src={myImage} alt="Description of image" />
          <p>No Posts From Your Connections</p>
        </>
      )}
    </div>
  );
}

export default FeedList;
