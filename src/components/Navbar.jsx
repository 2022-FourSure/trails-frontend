import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import LogoutNavLink from "./LogoutNavLink";

const loggedoutLinks = [
  { path: "/login", text: "Login" },
  { path: "/register", text: "Sign Up" },
];

const LoggedoutNavLinks = () => {
  return loggedoutLinks.map((loggedoutLink) => (
    <li className="nav-item" key={loggedoutLink.text}>
      <Link className="nav-link" to={loggedoutLink.path}>
        {loggedoutLink.text}
      </Link>
    </li>
  ));
};

const Navbar = () => {
  const { loggedIn } = useContext(UserContext);

  return (
    <nav className="navbar navbar-expand-md bg-white navbar-light">
      <div className="container emphasis-font">
        <Link to="/trails" className="navbar-brand">
          <img
            style={{ marginLeft: "-0px" }}
            className="me-3 navbar-brand"
            src="/assets/logo.jpeg"
            width="150px"
          ></img>
          Take a Hike
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navmenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navmenu">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a href="/trails/new" className="nav-link">
                Create New Trail
              </a>
            </li>
            {loggedIn ? <LogoutNavLink /> : <LoggedoutNavLinks />}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
