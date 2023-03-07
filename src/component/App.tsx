import { updateProfile } from "firebase/auth";
// import { authService } from "firebaseInit";
import { useEffect, useState } from "react";
import { authService } from "../firebaseInit";
import AppRouter from "./AppRouter";

export type UserObj = {
  displayName?: string | null;
  uid?: String;
  updateProfile: (args: any) => void;
}

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState<UserObj | null>(null);

  useEffect(() => {
    // firebase 스스로 계정 변화 확인함
    authService.onAuthStateChanged((user: any) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => updateProfile(user, args),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user?.displayName,
      uid: user?.uid,
      updateProfile: (args) => updateProfile(user!, args),
    });
  };

  return (
    <>
      {init ? (
        <AppRouter
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
          refreshUser={refreshUser}
        />
      ) : (
        "Initializing..."
      )}
      <footer>&copy; 2022 Tweet-clone </footer>
    </>
  );
}

export default App;
