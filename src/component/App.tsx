import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { authService } from "../firebaseInit";
import { UserObj } from "../types";
import AppRouter from "./AppRouter";

function App() {
  const [init, setInit] = useState<boolean>(false);
  const [userObj, setUserObj] = useState<UserObj | null>(null);

  useEffect(() => {
    console.log("authService.currentUser: ",authService.currentUser)
    
    // firebase 스스로 계정 변화 확인함
    authService.onAuthStateChanged((user: User | null) => {
      if (user) {
        console.log(user);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          email: user.email
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
        email: user.email
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
