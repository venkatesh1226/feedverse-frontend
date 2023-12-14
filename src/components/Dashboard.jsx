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

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchAllUsers(), fetchAllPosts()]).then(() => {
      setIsLoading(false);
    });
  }, []);

  const fetchAllPosts = async () => {
    try {
      const response = await fetch(postapi + "/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await fetch(userapi + "/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  if (isLoading) {
    return <div className="dashboard">Loading...</div>;
  }
  const processUserData = (users) => {
    // Aggregate user count by date
    const userCountByDate = {};
    users.forEach((user) => {
      const date = user.creationDate.split("T")[0];
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

  const userData = processUserData(users);
  const postData = processPostData(posts);

  return (
    <div className="dashboard">
      <div className="chart">
        <h2>Users Registrations Over Time</h2>
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

export default Dashboard;
