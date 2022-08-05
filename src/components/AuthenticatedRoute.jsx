import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from '../contexts/UserContext';
import CenteredLoader from '../components/CenteredLoader';

export const AuthenticatedRoute = ({ children }) => {
  const { loggedIn, loadingUser } = useContext(UserContext);
  if (loadingUser || loadingUser === 'pending') {
    return <CenteredLoader />
  }
  if (!loggedIn) {
    return <Navigate to='/login'></Navigate>;
  }
  return children
};


export default AuthenticatedRoute;