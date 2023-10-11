"use client";

import { createContext, useState } from "react";

// the actually value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// component that provides the value to all children
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
