const cacheUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
}

export default cacheUser
