import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from '../contexts/UserContext';

export const LoggedInRedirect = ({ children }) => {
  const { loggedIn } = useContext(UserContext);
  
  if (loggedIn) {
    return <Navigate to='/'></Navigate>;
  }
  return children
};


export default LoggedInRedirect;