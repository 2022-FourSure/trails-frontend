import { useState, useEffect } from 'react'
import isEmptyExtended from '../helpers/isEmptyExtended';
import axios from 'axios'
import cacheUser from '../helpers/cacheUser';
import removeCachedUserAndLogout from '../helpers/removeCachedUserAndLogOut';
import useLoggedIn from '../hooks/useLoggedIn';
import { BASE_PROD_URL } from '../api';

const useAuth = () => {
  const [loadingUser, setLoadingUser] = useState('pending');
  const [userError, setUserError] = useState('');
  const { loggedIn, loadingLoggedIn, setLoggedIn } = useLoggedIn();

  const fetchUser = async (refetch) => {
    try {
      setLoadingUser(true);
      if (loggedIn && !refetch) {
        setLoadingUser(false);
        return null;
      }
      setUserError('');
      const res = await axios.get(`${BASE_PROD_URL}/user`, { withCredentials: true })
      const user = res?.data?.user || {};
      if (!isEmptyExtended(user)) {
        cacheUser(user);
        setLoggedIn(true)
      }
      setLoadingUser(false);
    } catch (error) {
      console.error('error fetching user', error)
      setUserError(error);
      removeCachedUserAndLogout();
    } finally {
      setLoadingUser(false)
    }
  }

  const refetchUser = async () => fetchUser(true);

  useEffect(() => {
    fetchUser();
  }, [loadingLoggedIn]);

  return {
    userError,
    loadingUser,
    fetchUser,
    loggedIn,
    setLoggedIn,
    refetchUser,
  }
}

export default useAuth