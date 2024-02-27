import React, { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const checkToken =()=>{
  }

  // clear errors after 5 seconds
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res);
      handleAuthResponse(res);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res)
      handleAuthResponse(res);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        handleAuthResponse(res);
      } catch (error) {
        handleAuthError(error);
      } finally {
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  const handleAuthResponse = (res) => {
    if (res && res.status === 200 && res.data) {
      setUser(res.data);
      setIsAuthenticated(true);
    } else {
      console.error('Unexpected response structure:', res);
      setErrors(["Unexpected response structure"]);
    }
  };

  const handleAuthError = (error) => {
    console.error('Error in authentication:', error);
    console.error('Error response:', error.response);
    setErrors([error.response?.data?.message || 'Error desconocido']);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        logout,
        isAuthenticated,
        errors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
