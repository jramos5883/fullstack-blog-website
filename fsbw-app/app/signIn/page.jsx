"use client";

import {
  signInWithGooglePopup,
  createUserProfileDocument,
} from "@/app/utils/firebase/firebase.utils";

export default function SignInPage() {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserProfileDocument(user);
  };
  return (
    <div>
      Sign In Page!
      <button onClick={logGoogleUser}>Sign in with Google</button>
    </div>
  );
}
