import { useState, useContext } from "react";
import { Button } from "@mui/material";

import { UserContext } from "../contexts/user.context";

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
    // may need a setCurrentUser(user); for google sign in as well
    setCurrentUser(user);
  };

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const { setCurrentUser } = useContext(UserContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // handles form submission of data from form fields
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      setCurrentUser(user);

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
    <div className="">
      <form
        className="flex flex-col items-center bg-lime-300"
        onSubmit={handleSubmit}
      >
        <h1>Sign In</h1>
        <p>Already have an account?</p>
        <p>Sign in with your email and password.</p>

        <div className="grid grid-cols-2 gap-4">
          <label className="col-start-1 col-span-1 text-2xl flex items-center justify-end">
            Email:
          </label>
          <input
            className="col-start-2 col-span-1 h-8 text-2xl"
            type="email"
            required
            name="email"
            value={email}
            onChange={handleChange}
          />

          <label className="col-start-1 col-span-1 text-2xl flex items-center justify-end">
            Password:
          </label>
          <input
            className="col-start-2 col-span-1 h-8 text-2xl"
            type="password"
            required
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div className="py-4 flex flex-row items-center justify-center">
          <div className="">
            <Button className="" type="submit" variant="contained">
              Sign In
            </Button>
          </div>
        </div>
        <div className="pb-4">
          <p> Or sign in with Google.</p>
          <Button className="" onClick={signInWithGoogle} variant="contained">
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}
