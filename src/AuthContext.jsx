import React, { createContext, useState, useContext, useEffect } from "react";
import { authapi, postapi, userapi } from "./constant";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isLoading: true,
    user: null,
    accessToken: null,
    refreshToken: null,
    accessTokenExpiry: null,
    refreshTokenExpiry: null,
  });

  const isTokenExpired = (expiry) => {
    return Date.now() > expiry;
  };

  const initializeAuthFromStorage = () => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    const accessTokenExpiry = parseInt(localStorage.getItem("expires_in"), 10);
    const refreshTokenExpiry = parseInt(
      localStorage.getItem("refresh_expires_in"),
      10
    );

    if (accessToken && refreshToken && !isTokenExpired(refreshTokenExpiry)) {
      try {
        const userData = jwtDecode(accessToken);
        setAuthState({
          isLoading: false,
          user: userData,
          accessToken,
          refreshToken,
          accessTokenExpiry,
          refreshTokenExpiry,
        });
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.clear();
        setAuthState({
          isLoading: false,
          user: null,
          accessToken: null,
          refreshToken: null,
          accessTokenExpiry: null,
          refreshTokenExpiry: null,
        });
      }
    } else {
      localStorage.clear();
      setAuthState({
        isLoading: false,
        user: null,
        accessToken: null,
        refreshToken: null,
        accessTokenExpiry: null,
        refreshTokenExpiry: null,
      });
    }
  };

  useEffect(() => {
    initializeAuthFromStorage();
  }, []);

  const refreshToken = async () => {
    const refreshToken = sessionStorage.getItem("refresh_token");
    const response = await fetch(authapi + "/update-token", {
      method: "POST",
      headers: {
        // headers if required
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: refreshToken }),
    });
    const data = await response.json();
    saveToken(data);
  };
  const isRefreshTokenExpired = () => {
    const refreshExpiresIn = sessionStorage.getItem("refresh_expires_in");
    return Date.now() > refreshExpiresIn;
  };

  const getUserFromJwt = async (token) => {
    const decodedToken = jwtDecode(token);
    const username = decodedToken.preferred_username;
    console.log(username);
    try {
      const response = await fetch(userapi + "/get/" + username, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        console.log(data);
        return data; // This will be the user data
      } else {
        console.error("Response is not valid JSON");
        // Handle the error or return a default value as needed
      }
    } catch (error) {
      console.error("Error fetching current user:", error);
      // Handle the error or return a default value as needed
    }
  };

  const saveToken = (response) => {
    localStorage.setItem("access_token", response.access_token);
    localStorage.setItem("refresh_token", response.refresh_token);
    const accessTokenExpiry = Date.now() + response.expires_in;
    const refreshTokenExpiry = Date.now() + response.refresh_expires_in;
    localStorage.setItem("expires_in", accessTokenExpiry.toString());
    localStorage.setItem("refresh_expires_in", refreshTokenExpiry.toString());

    try {
      const userData = jwtDecode(response.access_token);
      localStorage.setItem("username", userData.preferred_username);
      setAuthState({
        isLoading: false,
        user: userData,
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
        accessTokenExpiry,
        refreshTokenExpiry,
      });
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  };

  const isLoggedIn = () => {
    const accessToken = localStorage.getItem("access_token");
    const accessTokenExpiry = parseInt(localStorage.getItem("expires_in"), 10);
    return accessToken !== null && !isTokenExpired(accessTokenExpiry);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("expires_in");
    localStorage.removeItem("refresh_expires_in");
    setAuthState({
      isLoading: false,
      user: null,
      accessToken: null,
      refreshToken: null,
      accessTokenExpiry: null,
      refreshTokenExpiry: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        isLoggedIn,
        saveToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
