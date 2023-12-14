import React from "react";
import "./styles/FormStyle.css";
import { useState } from "react";
import { authapi } from "../constant";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  var signup = (fullName, username, email, password) => {
    fetch(authapi + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        fullName: fullName,
        email: email,
        password: password,
      }),
    }).then((response) => {
      console.log(response);
      if (response.status === 200) {
        alert("Signup successful");
        navigate("/../login");
      }
    });
  };
  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="FullName"
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          onClick={() => signup(fullName, username, email, password)}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
