import { async } from "@firebase/util";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { authService } from "firebaseInit";
import { useState } from "react";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);

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
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } else {
      // log in
      signInWithEmailAndPassword(authService, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type={"text"}
          placeholder="Email"
          required
          value={email}
          name="email"
          onChange={onChange}
        />
        <input
          type={"password"}
          placeholder="Password"
          required
          value={password}
          name="password"
          onChange={onChange}
        />
        <input
          type={"submit"}
          value={newAccount ? "Create Account" : "Log In"}
        />
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
}

export default Auth;
