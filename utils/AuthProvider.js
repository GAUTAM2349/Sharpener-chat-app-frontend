import { createContext, useState, useEffect } from "react";

import api from "../config/axiosConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [loggedinUser, setLoggedinUser] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get("/user/login-status");
        setIsAuthenticated(true);
        const user = response.data.user;
        setUser(user);
        setLoggedinUser(user.id);
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setIsLoadingAuth(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoadingAuth, loggedinUser, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
