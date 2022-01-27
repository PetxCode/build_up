import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [saveUser, setSaveUser] = useState(null);

  useEffect(() => {
    setSaveUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  return (
    <AuthContext.Provider value={{ saveUser }}>{children}</AuthContext.Provider>
  );
};
