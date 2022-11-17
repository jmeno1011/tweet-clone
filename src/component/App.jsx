import { authService } from "firebaseInit";
import { useState } from "react";
import AppRouter from "./AppRouter";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; 2022 Tweet-clone </footer>
    </>
  );
}

export default App;
