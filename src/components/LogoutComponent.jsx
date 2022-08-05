import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import removeCachedUserAndLogOut from '../helpers/removeCachedUserAndLogOut';
import UserContext from '../contexts/UserContext';

export const LogoutComponent = () => {
  let navigate = useNavigate();
  const { setLoggedIn, loggedIn } = useContext(UserContext);
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8000/logout");
      console.log("logging out ")
      removeCachedUserAndLogOut();
      setLoggedIn(false);
      navigate('/')
    } catch (error) {
      console.log("error at logout", error);
    }
  };

  return (
    <div>
      {loggedIn ? <button onClick={handleLogout}>Logout</button> : null}
    </div>
  );
};

export default LogoutComponent;
