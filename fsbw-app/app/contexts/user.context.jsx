"use client";

import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChangedListener,
  createUserProfileDocument,
} from "../utils/firebase/firebase.utils";

// the actually value you want to access
export const UserContext = createContext({
  currentUser: undefined, // initially undefined
  setCurrentUser: () => {},
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined); // initially undefined

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserProfileDocument(user);
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
