import { Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import { UserObj } from "./App";
import Navigation from "./Navigation";

type AppRouterProps = {
  isLoggedIn: boolean;
  userObj?: UserObj | null;
  refreshUser: () => void;
}

function AppRouter({ isLoggedIn, userObj, refreshUser }: AppRouterProps) {
  return (
    <>
      <div className="container">
        {isLoggedIn && <Navigation userObj={userObj} />}
        {isLoggedIn ? (
          <Routes>
            <Route path="/" element={<Home userObj={userObj} />} />
            <Route
              path="/profile"
              element={<Profile userObj={userObj} refreshUser={refreshUser} />}
            />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Auth />} />
          </Routes>
        )}
      </div>
    </>
  );
}

export default AppRouter;
