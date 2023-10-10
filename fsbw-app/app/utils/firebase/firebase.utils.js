import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2OfSC7GjpvL7ecWb9CRUzHXCB8JWKi-0",
  authDomain: "fsbw-app.firebaseapp.com",
  projectId: "fsbw-app",
  storageBucket: "fsbw-app.appspot.com",
  messagingSenderId: "671572917378",
  appId: "1:671572917378:web:307dc5b7843ced0e70489b",
  measurementId: "G-WVZDB9P2C3",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
