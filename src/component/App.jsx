import { authService } from "firebaseInit";
import { useState } from "react";
import AppRouter from "./AppRouter";

function App() {
  console.log("auth:", authService);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; 2022 Tweet-clone </footer>
    </>
  );
}

export default App;
