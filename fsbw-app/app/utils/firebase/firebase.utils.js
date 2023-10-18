import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2OfSC7GjpvL7ecWb9CRUzHXCB8JWKi-0",
  authDomain: "fsbw-app.firebaseapp.com",
  projectId: "fsbw-app",
  storageBucket: "fsbw-app.appspot.com",
  messagingSenderId: "671572917378",
  appId: "1:671572917378:web:307dc5b7843ced0e70489b",
  measurementId: "G-WVZDB9P2C3",
};

// initialize firebase app
const firebaseApp = initializeApp(firebaseConfig);

// google auth provider
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();

// sign in with google popup
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

// firebase database user collection setup
export const db = getFirestore();

// doc takes 3 parameters: collection, document, data
export const createUserProfileDocument = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userAuth);

  const userSnapshot = await getDoc(userDocRef);

  // if user data doesn't exist, create it
  if (!userSnapshot.exists()) {
    const { displayName, email, photoURL } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }
  // if user data already exists, return userDocRef
  return userDocRef;
};

// create user with email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

// sign in created user with email and password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

// sign out user method
export const signOutAuthUser = async () => await signOut(auth);
