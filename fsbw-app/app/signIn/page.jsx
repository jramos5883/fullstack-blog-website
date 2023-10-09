"use client";

import { signInWithGooglePopup } from "@/app/utils/firebase/firebase.utils";

export default function SignInPage() {
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    console.log(response);
  };
  return (
    <div>
      Sign In Page!
      <button onClick={logGoogleUser}>Sign in with Google</button>
    </div>
  );
}
