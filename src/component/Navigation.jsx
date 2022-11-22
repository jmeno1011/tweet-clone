import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation({ userObj }) {
  return (
    <nav>
      <ul className="nav-ul">
        <li>
          <Link to={"/"}>
            <Icon icon="ic:baseline-home" />
          </Link>
        </li>
        <li>
          {/* <Link to={"/profile"}>{userObj?.displayName}의 Profile</Link> */}
          <Link to={"/profile"}>
            <Icon icon="iconoir:profile-circled" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
