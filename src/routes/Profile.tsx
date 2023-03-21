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
  const [newDisplayName, setNewDisplayName] = useState<string>("");
  const [editOpen, setEditOpen] = useState<boolean>(false);
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

  const editCancel = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewDisplayName("");
    setEditOpen(!editOpen);
  }

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
          {
            !editOpen ?
              <input className="profile-btn" type="button" value={"Edit"} onClick={() => setEditOpen(!editOpen)} />
              :
              <>
                <input className="profile-btn" type="button" value={"Cancel"} onClick={editCancel} />
              </>
          }
        </header>
        {
          !editOpen ?
            <h5 className="display-name">{userObj.displayName}님</h5>
            :
            <div className="profile-edit-row">
              <input
                className="profile-edit-input"
                type={"text"}
                placeholder="Display Name"
                onChange={onChange}
                value={newDisplayName || ""}
              />
              <input className="profile-btn" type="submit" value={"Update Profile"} />
            </div>
        }
      </form>
      {/* <button onClick={onLogoutClick}>Log Out</button> */}
    </div>
  );
}

export default Profile;
