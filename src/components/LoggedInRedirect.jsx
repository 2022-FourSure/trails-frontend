import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from '../contexts/UserContext';
import CenteredLoader from '../components/CenteredLoader';

export const LoggedInRedirect = ({ children }) => {
  const { loggedIn, loadingUser } = useContext(UserContext);

  if (loadingUser || loadingUser === 'pending') {
    return <CenteredLoader />
  }
  
  if (loggedIn) {
    return <Navigate to='/'></Navigate>;
  }
  return children
};


export default LoggedInRedirect;