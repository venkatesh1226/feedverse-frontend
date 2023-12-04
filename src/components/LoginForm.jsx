import React from "react";
import "./styles/FormStyle.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { authapi } from "../constant";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function LoginForm() {
  const { saveToken } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const login = async () => {
    try {
      const response = await fetch(authapi + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);

      // Save the tokens and expiry time in localStorage
      await saveToken(data);

      // Redirect to home page or another route
      navigate("/../");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="form-footer">
          <Link to="/forgot-password" className="form-link">
            Forgot Password?
          </Link>
          <button type="submit" onClick={() => login()}>
            Login
          </button>
        </div>
        <div className="signup-link">
          Don't have an account?{"\n"}
          <Link to="/signup" className="form-link">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
