"use client";

import {
  signInWithGooglePopup,
  createUserProfileDocument,
} from "@/app/utils/firebase/firebase.utils";

import SignUpForm from "../components/sing-up-form";

export default function SignInPage() {
  const logGoogleUserWithPopup = async () => {
    // takes user info from google sign in to create a user document in the users collection
    const { user } = await signInWithGooglePopup();

    // used to create user in firestore db on first login
    const userDocRef = await createUserProfileDocument(user);
  };

  return (
    <div>
      Sign In Page!
      <button onClick={logGoogleUserWithPopup}>
        Sign in with Google Popup
      </button>
      <SignUpForm />
    </div>
  );
}
