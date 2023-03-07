import { updateProfile, User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { authService } from "../firebaseInit";
import AppRouter from "./AppRouter";

export interface UserObj {
  displayName?: string | null;
  uid?: string;
  updateProfile?: (profile: { displayName?: string }) => Promise<void>;
}

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState<UserObj | null>(null);

  useEffect(() => {
    // firebase 스스로 계정 변화 확인함
    authService.onAuthStateChanged((user: User | null) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (profile) => updateProfile(user, profile),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    if (user) {
      setUserObj({
        displayName: user.displayName,
        uid: user.uid,
        updateProfile: (profile) => updateProfile(user, profile),
      });
    }
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
