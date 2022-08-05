import React, { useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import isLoggedIn from '../helpers/isLoggedIn';
import UserContext from '../contexts/UserContext';
import Loader from "../components/Loader";

export const AuthenticatedRoute = ({ children }) => {
  const { loggedIn } = useContext(UserContext);
  if (!loggedIn) {
    return <Navigate to='/login'></Navigate>;
  }
  return children
};


export default AuthenticatedRoute;