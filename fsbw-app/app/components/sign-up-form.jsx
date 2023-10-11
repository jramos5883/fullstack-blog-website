import { useState } from "react";
import { Button } from "@mui/material";

import {
  createAuthUserWithEmailAndPassword,
  createUserProfileDocument,
} from "../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignUpForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // handles form submission of data from form fields
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      // adds displayName to user object if not using google sign in
      await createUserProfileDocument(user, { displayName });

      // reset form fields after sucessfully creating user
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create new user, email already in use");
      } else {
        console.log("User creation encountered an error", error);
      }
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
        className="flex flex-col items-center bg-lime-500"
        onSubmit={handleSubmit}
      >
        <h1>Sign up</h1>
        <p>Don't have an account?</p>
        <p>Create an account below.</p>
        <div className="grid grid-cols-2 gap-4">
          <label className="col-start-1 col-span-1 text-2xl flex items-center justify-end">
            Display Name:
          </label>
          <input
            className="col-start-2 col-span-1 h-8 text-2xl"
            type="text"
            required
            name="displayName"
            value={displayName}
            onChange={handleChange}
          />

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

          <label className="col-start-1 col-span-1 text-2xl flex items-center justify-end">
            Confirm Password:
          </label>
          <input
            className="col-start-2 col-span-1 h-8 text-2xl"
            type="password"
            required
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div className="py-4">
          <Button type="submit" variant="contained">
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
}
