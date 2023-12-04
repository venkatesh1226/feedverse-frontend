import React from "react";
import Post from "./Post";
import "./styles/FeedList.css";
import { useState, useEffect } from "react";
import { postapi } from "../constant";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import WritePost from "./WritePost";

function FeedList() {
  const { isLoggedIn, fetchWithToken } = useAuth();
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate("/login");
  useEffect(() => {
    // if (isLoggedIn()) {
    //   fetchWithToken(postapi + "/feed?username=", "GET").then((data) => {
    //     setPosts(data);
    //   });
    // } else {
    //   navigate();
    // }
  }, []);

  return (
    <div className="feed-list">
      <WritePost />
      {posts.map((post, index) => (
        <Post key={index} user={post.user} time={post.time} text={post.text} />
      ))}
    </div>
  );
}

export default FeedList;
