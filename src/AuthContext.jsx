import React, { createContext, useState, useContext, useEffect } from "react";
import { authapi, postapi, userapi } from "./constant";
import { jwtDecode } from "jwt-decode";
export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    accessToken: null,
    refreshToken: null,
    accessTokenExpiry: null,
    refreshTokenExpiry: null,
  });

  const saveToken = async (response) => {
    sessionStorage.setItem("access_token", response.access_token);
    sessionStorage.setItem("refresh_token", response.refresh_token);
    sessionStorage.setItem("expires_in", Date.now() + response.expires_in);
    sessionStorage.setItem(
      "refresh_expires_in",
      Date.now() + response.refresh_expires_in
    );
    const userData = await getUserFromJwt(response.access_token);
    setAuthState({
      user: userData,
      accessToken: response.access_token,
      refreshToken: response.refresh_token,
      accessTokenExpiry: Date.now() + response.expires_in,
      refreshTokenExpiry: Date.now() + response.refresh_expires_in,
    });
  };

  const getUserFromJwt = async (token) => {
    const decodedToken = jwtDecode(token);
    const username = decodedToken.preferred_username;
    console.log(username);
    try {
      const response = await fetchWithToken(userapi + "/get/" + username, {
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

  const isLoggedIn = () => {
    return (
      sessionStorage.getItem("access_token") !== null &&
      !isRefreshTokenExpired()
    );
  };

  const isTokenExpired = () => {
    const expiresIn = sessionStorage.getItem("expires_in");
    return Date.now() > expiresIn;
  };

  const isRefreshTokenExpired = () => {
    const refreshExpiresIn = sessionStorage.getItem("refresh_expires_in");
    return Date.now() > refreshExpiresIn;
  };

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

  const fetchWithToken = async (url, options = {}) => {
    if (isTokenExpired()) {
      await refreshToken();
    }
    const accessToken = sessionStorage.getItem("access_token");
    const mergedOptions = {
      ...options,
      headers: {
        ...options.headers,
        "Content-Type": "application/json",

        Authorization: `Bearer ${accessToken}`,
      },
    };
    return fetch(url, mergedOptions);
  };

  const logout = () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    sessionStorage.removeItem("expires_in");
    sessionStorage.removeItem("refresh_expires_in");
    setAuthState({
      user: null,
      accessToken: null,
      refreshToken: null,
      accessTokenExpiry: null,
      refreshTokenExpiry: null,
    });
  };

  useEffect(() => {
    // Auto-refresh token if needed
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        isLoggedIn,
        saveToken,
        logout,
        fetchWithToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
