import { useState, useEffect, useContext } from 'react'
import isEmptyExtended from '../helpers/isEmptyExtended';
import axios from 'axios'
import cacheUser from '../helpers/cacheUser';
import removeCachedUserAndLogout from '../helpers/removeCachedUserAndLogOut';
import useLoggedIn from '../hooks/useLoggedIn';

const useFetchUser = () => {
  const [loadingUser, setLoadingUser] = useState(false);
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
      const res = await axios.get('http://localhost:8000/user', { withCredentials: true })
      const user = res?.data?.user || {};
      if (!isEmptyExtended(user)) {
        cacheUser(user);
        setLoggedIn(true)
      }
      setLoadingUser(false);
    } catch (error) {
      console.log('error finding user', error)
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

export default useFetchUser