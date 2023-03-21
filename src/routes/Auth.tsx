import React from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { Icon } from "@iconify/react";
import "./Auth.css";
import { authService } from "../firebaseInit";
import AuthForm from "../component/AuthForm";

function Auth() {
  const onSocialClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const {
      currentTarget: { name },
    } = e;
    let provider: GoogleAuthProvider | GithubAuthProvider | null = null;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    if (provider) {
      const result = await signInWithPopup(authService, provider);
      // console.log(result);
    }
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