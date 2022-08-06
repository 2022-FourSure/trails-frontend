import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import removeCachedUserAndLogOut from "../helpers/removeCachedUserAndLogOut";
import UserContext from "../contexts/UserContext";
import { BASE_PROD_URL } from "../api";

export const LogoutNavLink = () => {
  let navigate = useNavigate();
  const { setLoggedIn, loggedIn } = useContext(UserContext);
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BASE_PROD_URL}/logout`);
      removeCachedUserAndLogOut();
      setLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.log("error at logout", error);
    }
  };

  return (
    <div>
      {loggedIn ? (
        <Button variant="link" className="no-decoration" onClick={handleLogout}>
          Logout
        </Button>
      ) : null}
    </div>
  );
};

export default LogoutNavLink;
