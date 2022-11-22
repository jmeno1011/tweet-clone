import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { authService } from "firebaseInit";
import { useState } from "react";
import "./AuthForm.css";

function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (newAccount) {
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
  const toggleAccount = () => setNewAccount((prev) => !prev);

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
          value={newAccount ? "Create Account" : "Sign In"}
        />
        <span>{error}</span>
      </form>
      <span className="toggle-link" onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </span>
    </>
  );
}

export default AuthForm;
