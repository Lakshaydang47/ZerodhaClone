import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext({
  token: null,
  user: null,
  isAuthenticated: false,
  loading: true,
  login: () => {},
  signup: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user on mount if token exists
  useEffect(() => {
    const loadUser = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
          const res = await axios.get("http://localhost:3002/auth/user", {
            headers: { Authorization: `Bearer ${storedToken}` },
          });
          setUser(res.data);
          setToken(storedToken);
        } catch (error) {
          // Token is invalid or expired
          localStorage.removeItem("token");
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (email, password) => {
    const res = await axios.post("http://localhost:3002/auth/login", {
      email,
      password,
    });
    const { token: newToken, user: userData } = res.data;
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(userData);
    return res.data;
  };

  const signup = async (username, email, password) => {
    const res = await axios.post("http://localhost:3002/auth/signup", {
      username,
      email,
      password,
    });
    const { token: newToken, user: userData } = res.data;
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(userData);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        loading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
