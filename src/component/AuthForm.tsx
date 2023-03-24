import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import { authService } from "../firebaseInit";
import "./AuthForm.css";

interface AuthFormProps {
  accountToggle: boolean;
  setAccountToggle: (accountToggle: boolean) => void;
}

function AuthForm({ accountToggle, setAccountToggle }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (accountToggle) {
      // create account
      createUserWithEmailAndPassword(authService, email, password)
        .then((userCredentail) => {
          console.log(userCredentail);
          // signed in
          // const user = userCredentail.user;
        })
        .catch((error) => {
          // const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorMessage);
        });
    } else {
      // Sign In
      signInWithEmailAndPassword(authService, email, password)
        .then((userCredential) => {
          // Signed in
          // const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          // const errorCode = error.code;
          // const errorMessage = error.message;
        });
    }
  };
  // const toggleAccount = () => setAccountToggle(!prev);

  return (
    <>
      <form className="auth-form" onSubmit={onSubmit}>
        <input
          className="formInput"
          type={"text"}
          placeholder="Email"
          required
          value={email}
          name="email"
          onChange={onChange}
        />
        <input
          className="formInput"
          type={"password"}
          placeholder="Password"
          required
          value={password}
          name="password"
          onChange={onChange}
        />
        <input
          className="formBtn"
          type={"submit"}
          value={accountToggle ? "Create Account" : "Sign In"}
        />
        {error ? <span>{error}</span> : null}
      </form>
      <span className="toggle-link" onClick={() => setAccountToggle(!accountToggle)}>
        {accountToggle ? "Sign In" : "Create Account"}
      </span>
    </>
  );
}

export default AuthForm;
