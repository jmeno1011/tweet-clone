import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { authService } from "firebaseInit";
import { useState } from "react";

function Auth() {
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
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorMessage);
        });
    } else {
      // Sign In
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

  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async (e) => {
    console.log(e.target.name);
    const {
      target: { name },
    } = e;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    const result = await signInWithPopup(authService, provider);
    console.log(result);
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
          value={newAccount ? "Create Account" : "Sign In"}
        />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </span>
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
        <button onClick={onSocialClick} name="github">
          Continue with Github
        </button>
      </div>
    </div>
  );
}

export default Auth;
