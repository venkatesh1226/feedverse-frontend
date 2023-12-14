import React from "react";
import "./styles/FormStyle.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { authapi } from "../constant";
import { useNavigate } from "react-router-dom";
import { userapi } from "../constant";
import { jwtDecode } from "jwt-decode";
import { auth, provider } from "../config";
import { signInWithPopup } from "firebase/auth";
import emailjs from "@emailjs/browser";
import { useEffect } from "react";
import {
  YOUR_PUBLIC_KEY,
  YOUR_TEMPLATE_ID,
  YOUR_SERVICE_ID,
} from "../constant";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpValid, setIsOtpValid] = useState(false);
  const [realOtp, setRealOtp] = useState("");

  const navigate = useNavigate();
  const login = async (e) => {
    e.preventDefault();
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

      const username = jwtDecode(data.access_token).preferred_username;
      localStorage.setItem("username", username);
      fetch(userapi + "/get/" + username, {
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
          localStorage.setItem("user", JSON.stringify(data));
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });

      // Redirect to home page or another route
      navigate("/../");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleSendOtp = () => {
    const newOtp = getRandomInt(1000000, 9999999).toString();
    setRealOtp(newOtp);
    setOtpSent(true); // Presuming you want to set this here
    // Note: realOtp is not updated immediately here
  };

  // useEffect to send email after realOtp is updated
  useEffect(() => {
    if (realOtp) {
      // Check if realOtp is not an empty string
      console.log(realOtp);
      emailjs
        .send(
          YOUR_SERVICE_ID,
          YOUR_TEMPLATE_ID,
          {
            user_email: email,
            message: realOtp,
          },
          YOUR_PUBLIC_KEY
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );

      // Optionally reset realOtp after sending the email
      // setRealOtp('');
    }
  }, [realOtp]); // This effect runs every time realOtp changes

  const handleOtpChange = (otpValue) => {
    setOtp(otpValue.target.value);
  };

  const validateOtp = () => {
    console.log(realOtp + " " + otp);
    setIsOtpValid(otp == realOtp);
  };

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rand = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(rand);
    return rand;
  }
  const signInWithGoogle = (e) => {
    e.preventDefault();
    console.log("Signing in with Google");
    signInWithPopup(auth, provider).then((data) => {
      const email = data.user.email;
      fetch(userapi + "/get/" + email, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          console.log(response);
          return response.json();
        })
        .then((data) => {
          if (data != null) {
            localStorage.setItem("user", JSON.stringify(data));
            localStorage.setItem("username", data.username);
            // Redirect to home page or another route
            navigate("/../");
          }
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          console.log("No User with Current details");
        });
    });
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form>
        <div className="email-otp-container">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {!otpSent && (
            <button
              type="button"
              style={{ width: "5rem" }}
              onClick={handleSendOtp}
            >
              Send OTP
            </button>
          )}
        </div>
        {otpSent && (
          <div className="email-otp-container">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={handleOtpChange}
            />
            <button
              type="button"
              style={{ width: "5rem", height: "2rem" }}
              onClick={validateOtp}
            >
              Verify OTP
            </button>
          </div>
        )}
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="form-footer">
          <Link to="/forgot-password" className="form-link">
            Forgot Password?
          </Link>
          {isOtpValid && <button onClick={login}>Login</button>}
        </div>
        <div>----OR----</div>
        <button onClick={signInWithGoogle} className="google-sign-in-button">
          Login with Google
        </button>
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
