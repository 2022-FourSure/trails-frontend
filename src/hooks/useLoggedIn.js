import { useState, useEffect } from 'react'
import getCachedUser from '../helpers/getCachedUser';

const loggedInBefore = () => {
  const user = getCachedUser();
  if (user === undefined || user === null) {
    return false; 
  }
  return true;
}

const useLoggedIn = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loadingLoggedIn, setLoadingLoggedIn] = useState(null);

  const setInitialLoggedIn = () => {
    setLoadingLoggedIn(true);
    setLoggedIn(loggedInBefore());
    setLoadingLoggedIn(false);
  }

  useEffect(() => {
    setInitialLoggedIn();
  }, [])

  return {
    loggedIn, 
    loadingLoggedIn,
    setLoggedIn,
  }
}

export default useLoggedIn;