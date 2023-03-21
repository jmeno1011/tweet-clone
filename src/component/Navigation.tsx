import { Icon } from "@iconify/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React from "react";
import "./Navigation.css";
import { UserObj } from "../types";
import { authService } from "../firebaseInit";

type NavigationProps = {
  userObj?: UserObj | null;
}

function Navigation({ userObj }: NavigationProps) {

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const onLogoutClick = () => {
    authService.signOut();
    navigate("/");
  };

  return (
    <div className="nav-container">
      <div className="nav-title">
        <h3>Home</h3>
        <button onClick={onLogoutClick}>Log Out</button>
      </div>
      <nav className="nav-nav">
        <ul className="nav-ul">
          <li>
            <Link to={"/"} className={pathname === "/" ? "selected" : ""} >
              <Icon icon="ic:baseline-home" />
            </Link>
          </li>
          <li>
            <Link to={"/profile"} className={pathname === "/profile" ? "selected" : ""}>
              <Icon icon="iconoir:profile-circled" />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;