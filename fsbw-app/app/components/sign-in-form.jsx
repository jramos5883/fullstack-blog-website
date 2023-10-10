import { useState } from "react";
import { Button } from "@mui/material";

import {
  signInWithGooglePopup,
  createUserProfileDocument,
  signInAuthUserWithEmailAndPassword,
} from "../utils/firebase/firebase.utils";

const defaultFormFields = {
  email: "",
  password: "",
};

export default function SignInForm() {
  const signInWithGoogle = async () => {
    // takes user info from google sign in to create a user document in the users collection
    const { user } = await signInWithGooglePopup();

    // used to create user in firestore db on first login
    await createUserProfileDocument(user);
  };

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // handles form submission of data from form fields
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response);
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/invalid-login-credentials") {
        alert("Invalid login credentials, please try again");
      }
      console.log(error);
    }
  };
  // handles input change for all form fields
  const handleChange = async (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div>
      <h1>Already have an account?</h1>
      <h1>Sign in with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          required
          name="email"
          value={email}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          required
          name="password"
          value={password}
          onChange={handleChange}
        />

        <Button type="submit" variant="contained">
          Sign In
        </Button>
        <Button onClick={signInWithGoogle} variant="contained">
          Google Sign In
        </Button>
      </form>
    </div>
  );
}
