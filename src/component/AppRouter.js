import { Route, Routes } from "react-router-dom";
import Profile from "routes/Profile";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";

function AppRouter({ isLoggedIn, userObj, refreshUser }) {
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
