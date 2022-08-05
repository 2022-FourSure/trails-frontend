const isLoggedIn = () => {
  return localStorage.getItem('loggedIn') || false;
}

export default isLoggedIn