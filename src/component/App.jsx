import { authService } from "firebaseInit";
import { useEffect, useState } from "react";
import AppRouter from "./AppRouter";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // firebase 스스로 계정 변화 확인함
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}
      <footer>&copy; 2022 Tweet-clone </footer>
    </>
  );
}

export default App;
