import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import FeedList from "./components/FeedList";
import ProfileView from "./components/ProfileView";
import { AuthProvider } from "./AuthContext";

function App() {
  var [posts, setPosts] = useState([
    {
      user: "John Doe",
      text: "This is my first post!",
      time: "1 hour ago",
    },
    {
      user: "Jane Doe",
      text: "This is my second post!",
      time: "2 hours ago",
    },
    {
      user: "John Smith",
      text: "This is my third post!",
      time: "3 hours ago",
    },
    {
      user: "Jane Smith",
      text: "lorum ipsum dolor sit amet consectetur adipisicing elit.  Repellat, quibusdam.",
      time: "4 hours ago",
    },
    {
      user: "Jane Smith",
      text: "lorum ipsum dolor sit amet consectetur adipisicing elit.  Repellat, quibusdam.",
      time: "4 hours ago",
    },
    {
      user: "Jane Smith",
      text: "lorum ipsum dolor sit amet consectetur adipisicing elit.  Repellat, quibusdam.",
      time: "4 hours ago",
    },
  ]);

  return (
    <AuthProvider>
      <Router>
        <div className="nav">
          <Navbar />
        </div>
        {/* <SignupForm /> */}
        <Routes>
          <Route
            exact
            path="/"
            element={
              sessionStorage.getItem("token") && (
                <div className="main-container">
                  <ProfileView />

                  <FeedList posts={posts} />
                </div>
              )
            }
          />
          {/* <Route path="/find-friends" component={FindFriendsPage} /> */}
          {/* <Route path="/my-profile" component={MyProfile} /> */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          {/* You can add a 404 Not Found route here */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
