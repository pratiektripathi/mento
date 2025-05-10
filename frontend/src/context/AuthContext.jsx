import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext({
  isAuthenticated: false,
  username: null,
  email: null,
  setAuth: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    isAuthenticated: !!sessionStorage.getItem("access_token"),
    username: null,
    email: null,
  });

  useEffect(() => {
    const fetchUser = async () => {
      const token = sessionStorage.getItem("access_token");
      if (auth.isAuthenticated && token && !auth.username) {
        try {
          const response = await axios.get("/api/me/", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setAuth((prev) => ({
            ...prev,
            username: response.data.username,
            email: response.data.email,
          }));
        } catch (error) {
          // If token is invalid/expired, log out
          setAuth({ isAuthenticated: false, username: null, email: null });
          sessionStorage.removeItem("access_token");
          sessionStorage.removeItem("refresh_token");
        }
      }
    };
    fetchUser();
    // Only run on mount or when isAuthenticated changes
    // eslint-disable-next-line
  }, [auth.isAuthenticated]);

  const logout = () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    setAuth({
      isAuthenticated: false,
      username: null,
      email: null,
    });
  };

  return (
    <AuthContext.Provider value={{ ...auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
} 