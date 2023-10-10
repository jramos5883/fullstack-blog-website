"use client";

import {
  signInWithGooglePopup,
  createUserProfileDocument,
} from "@/app/utils/firebase/firebase.utils";

export default function SignInPage() {
  const logGoogleUserWithPopup = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserProfileDocument(user);
  };

  return (
    <div>
      Sign In Page!
      <button onClick={logGoogleUserWithPopup}>
        Sign in with Google Popup
      </button>
    </div>
  );
}
