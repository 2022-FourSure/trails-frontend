const getCachedUser = () => {
  return localStorage.getItem('user');
}

export default getCachedUser
