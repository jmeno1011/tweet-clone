import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../firebaseInit";
import { UserObj } from "../types";
import "./Profile.css";

type ProfileProps = {
  userObj?: UserObj | null;
  refreshUser: () => void;
}

function Profile({ userObj, refreshUser }: ProfileProps) {
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState("");
  const onLogoutClick = () => {
    authService.signOut();
    navigate("/");
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = authService.currentUser;
    console.log(user);
    if (newDisplayName !== "" && user) {
      await userObj.updateProfile(user, { displayName: newDisplayName, });
      refreshUser();
    }
  };

  return (
    <div className="profile-container">
      <form onSubmit={onSubmit}>
        <header className="profile-header">
          <h3>Edit Your Profile</h3>
          <input type="submit" value={"Update Profile"} />
        </header>
        <input
          type={"text"}
          placeholder="Display Name"
          onChange={onChange}
          value={newDisplayName || ""}
        />
      </form>
      <button onClick={onLogoutClick}>Log Out</button>
    </div>
  );
}

export default Profile;
