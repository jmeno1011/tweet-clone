import React, { useState } from "react";
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
  const [accountToggle, setAccountToggle] = useState<boolean>(false);

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
        {
          accountToggle ?
            <div style={{ fontSize: "2rem" }}>Join to Twitter</div> :
            <div style={{ fontSize: "2rem" }}>Log in to Twitter</div>
        }

      </div>
      <AuthForm accountToggle={accountToggle} setAccountToggle={setAccountToggle} />
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