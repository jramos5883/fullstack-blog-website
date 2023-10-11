"use client";

import SignUpForm from "../components/sign-up-form";
import SignInForm from "../components/sign-in-form";

export default function Authentication() {
  return (
    <main className="">
      <SignInForm />
      <SignUpForm />
    </main>
  );
}
