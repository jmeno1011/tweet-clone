import { updateProfile } from "firebase/auth";
import { authService } from "firebaseInit";
import { useEffect, useState } from "react";
import AppRouter from "./AppRouter";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    // firebase 스스로 계정 변화 확인함
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) =>
            updateProfile(user, { displayName: user.displayName }),
        });
      } else {
        setIsLoggedIn(false);
      }
      if (user.displayName === null) {
        const displayNme = user.email.split("@")[0];
        setUserObj({
          displayName: displayNme,
          uid: user.uid,
          updateProfile: (args) =>
            updateProfile(user, { displayName: displayNme }),
        });
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        "Initializing..."
      )}
      {/* <footer>&copy; 2022 Tweet-clone </footer> */}
    </>
  );
}

export default App;
