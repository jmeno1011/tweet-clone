import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";
import React from "react";
import "./Navigation.css";
import { UserObj } from "../types";

type NavigationProps = {
  userObj?: UserObj | null;
}

function Navigation({ userObj }: NavigationProps) {
  const { pathname } = useLocation();
  return (
    <div className="nav-container">
      <h3 className="nav-title">Home</h3>
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