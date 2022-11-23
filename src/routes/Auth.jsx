import AuthForm from "component/AuthForm";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { authService } from "firebaseInit";
import { Icon } from "@iconify/react";
import "./Auth.css";

function Auth() {
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
    <div className="container">
      <div
        style={{
          padding: 16,
          display: "flex",
          color: "#04aaff",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "2.75rem",
        }}
      >
        <Icon icon="mdi:twitter" />
        <div style={{ fontSize: "2rem" }}>Log in to Twitter</div>
      </div>
      <AuthForm />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button className="social-btn" onClick={onSocialClick} name="google">
          <span>Continue with Google</span>
          <Icon icon="mdi:google-plus" />
        </button>
        <button className="social-btn" onClick={onSocialClick} name="github">
          <span>Continue with Github</span>
          <Icon icon="mdi:github" />
        </button>
      </div>
    </div>
  );
}

export default Auth;
