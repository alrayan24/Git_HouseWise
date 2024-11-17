import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null); // Store the token here

  const login = (userData, token) => {
    setUser(userData);
    setAuthToken(token); // Save the token when user logs in
    console.log("User data set in context:", userData); 
  };

  const logout = () => {
    setUser(null);
    setAuthToken(null); // Clear the token when logging out
  };

  return (
    <AuthContext.Provider value={{ user,setUser, authToken, login, logout,  }}>
      {children}
    </AuthContext.Provider>
  );
};
