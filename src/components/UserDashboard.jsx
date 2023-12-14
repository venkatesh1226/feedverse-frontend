import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { userapi, postapi } from "../constant";
import "./styles/Dashboard.css";
import User from "./User";

const UserDashboard = ({ user, post }) => {
  const [users, setUsers] = useState(user.followers);
  const [posts, setPosts] = useState(post);

  const processUserData = (users) => {
    // Aggregate user count by date
    const userCountByDate = {};
    users.forEach((user) => {
      const date = user.since.split("T")[0];
      userCountByDate[date] = (userCountByDate[date] || 0) + 1;
    });
    return Object.entries(userCountByDate).map(([date, count]) => ({
      date,
      count,
    }));
  };

  const processPostData = (posts) => {
    // Aggregate post count by date
    const postCountByDate = {};
    posts.forEach((post) => {
      const date = post.createdAt.split("T")[0];
      postCountByDate[date] = (postCountByDate[date] || 0) + 1;
    });
    return Object.entries(postCountByDate).map(([date, count]) => ({
      date,
      count,
    }));
  };

  let userData = processUserData(users);
  let postData = processPostData(posts);
  return (
    <div className="dashboard">
      <div className="chart">
        <h2>User Following Over Time</h2>
        <LineChart width={500} height={300} data={userData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
      </div>

      <div className="chart">
        <h2>Posts Created Over Time</h2>
        <LineChart width={500} height={300} data={postData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#82ca9d" />
        </LineChart>
      </div>
    </div>
  );
};

export default UserDashboard;
