import { updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../firebaseInit";
import { UserObj } from "../types";

type ProfileProps = {
  userObj: UserObj | null;
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
    if (newDisplayName !== "" && user) {
      await userObj?.updateProfile(user, { displayName: newDisplayName, });
      refreshUser();
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type={"text"}
          placeholder="Display Name"
          onChange={onChange}
          value={newDisplayName || ""}
        />
        <input type="submit" value={"Update Profile"} />
      </form>
      <button onClick={onLogoutClick}>Log Out</button>
    </div>
  );
}

export default Profile;
