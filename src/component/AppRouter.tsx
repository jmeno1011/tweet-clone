import { Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";
import React from "react";
import { UserObj } from "../types";

type AppRouterProps = {
  isLoggedIn: boolean;
  userObj?: UserObj | null;
  refreshUser: () => void;
}

function AppRouter({ isLoggedIn, userObj, refreshUser }: AppRouterProps) {
  return (
    <div className="container">
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home userObj={userObj} />} />
            <Route path="/profile" element={<Profile userObj={userObj} refreshUser={refreshUser} />} />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </div>
  );
}

export default AppRouter;
