import { useState, useEffect, useContext } from 'react'
import isEmptyExtended from '../helpers/isEmptyExtended';
import axios from 'axios'
import cacheUser from '../helpers/cacheUser';
import removeCachedUserAndLogout from '../helpers/removeCachedUserAndLogOut';
import getCachedUser from '../helpers/getCachedUser';
import safeJsonParse from '../helpers/safeJsonParse';

const loggedInBefore = () => {
  const user = getCachedUser();
  if (user === undefined || user === null) {
    return false;
  }
  return true;
}


const useInitialState = () => {
  const [loadingInitialState, setLoadingInitialState] = useState(false);
  const [user, setUser] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');
  

  const setUserFromCache = () => {
    const cachedLogin = loggedInBefore();
    if (cachedLogin) {
      setLoggedIn(true);
      const parsedCachedUser = safeJsonParse(getCachedUser());
      setUser(parsedCachedUser)
      return null;
    }
  }

  const resetInitialState = () => {
    setLoadingInitialState(false);
    setLoggedIn(false);
    setUser({});
  }


  const fetchUser = async (refetch) => {
    try {
      if (loggedIn && !refetch) {
        return null;
      }
      setError('');
      const res = await axios.get('http://localhost:8000/user', { withCredentials: true })
      const user = res?.data?.user || {};
      if (!isEmptyExtended(user)) {
        cacheUser(user);
        setLoggedIn(true)
        setUser(user)
      }
      setLoadingInitialState(false);
    } catch (error) {
      console.log('error finding user', error)
      setError(error);
      resetInitialState();
      removeCachedUserAndLogout();
    } finally {
      setLoadingInitialState(false)
    }
  }

  

  useEffect(() => {
    setLoadingInitialState(true);
  }, [])

  useEffect(() => {
    setUserFromCache();
  }, [])

  useEffect(() => {
    fetchUser();
  }, [])


  const refetchUser = async () => fetchUser(true);



  return {
    loadingInitialState,
    user,
    resetInitialState,
    loggedIn,
    setLoggedIn,
  }
}

export default useInitialState