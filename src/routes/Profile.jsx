import { signOut } from "firebase/auth";
import { authService } from "firebaseInit";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile({ userObj, refreshUser }) {
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogoutClick = () => {
    signOut(authService);
    navigate("/");
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
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
          value={newDisplayName}
        />
        <input type="submit" value={"Update Profile"} />
      </form>
      <button onClick={onLogoutClick}>Log Out</button>
    </div>
  );
}

export default Profile;
