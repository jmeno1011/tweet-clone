import { signOut } from "firebase/auth";
import { authService } from "firebaseInit";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const onLogoutClick = () => {
    signOut(authService);
    navigate("/");
  };
  return (
    <div>
      <button onClick={onLogoutClick}>Log Out</button>
    </div>
  );
}

export default Profile;
