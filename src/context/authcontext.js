import { logIn,signUp } from '@/api';
import React, { createContext, useContext, useState, useCallback } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Login function using API call
  const login = async (email, password) => {
    try {
      // Call the logIn function from api.js
      const { data } = await logIn({ email, password });
      const { token } = data;
      localStorage.setItem('token', token); // Store token in localStorage
      setUser({ email }); // Set user state (can include more user details if needed)
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  // Signup function using API call
  const signup = async (name, email, password) => {
    try {
      // Call the signUp function from api.js
      await signUp({ name, email, password });
      return true;
    } catch (error) {
      console.error('Signup failed:', error);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Check if user is already logged in (when the app loads)
  const checkUser = useCallback(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Set placeholder user email (normally this would come from an API)
      setUser({ email: 'user@example.com' });
    }
  }, []);

  // Provide values and functions to children components
  const value = {
    user,
    login,
    signup,
    logout,
    checkUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
