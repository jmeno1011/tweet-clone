import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

function AppRouter() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Routes>
      {isLoggedIn ? (
        <Route path="/" element={<Home />} />
      ) : (
        <Route path="/" element={<Auth />} />
      )}
    </Routes>
  );
}

export default AppRouter;
