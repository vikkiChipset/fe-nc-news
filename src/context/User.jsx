import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const login = (userData) => {
    setLoggedInUser(userData);
  };

  const logout = () => {
    setLoggedInUser(null);
  };

  return (
    <UserContext.Provider value={{ loggedInUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};