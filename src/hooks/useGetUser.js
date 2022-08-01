import { useState, useEffect } from 'react'
import axios from 'axios'

const useGetUser = () => {
  const [ user, setUser ] = useState(null);
  const [ userLoading, setUserLoading ] = useState(true);
  
  const getUser = async () => {
    try {
      const res = await axios.get('http://localhost:8000/user')
      console.log('this is my getUser', res)
      setUser(res.data.user);
      setUserLoading(false);
    } catch (error) {
      console.log('error finding user', error)
    }
  }

  useEffect(()=> {
    getUser();
  }, []);

  return {
   user, 
   userLoading,
   getUser,
  }
}

export default useGetUser;