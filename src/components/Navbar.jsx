import { Link } from 'react-router-dom'
import React, { useContext } from "react";
import { Button } from 'react-bootstrap';
import LogoutComponent from "./LogoutComponent";
import UserContext from '../contexts/UserContext';

const loggedoutLinks = [
  {path: '/login', text: 'Login'},
  {path: '/register', text: 'Register'}
]

const LoggedoutNavLinks = () => {
  return loggedoutLinks.map((loggedoutLink) => (
    <li className="nav-item" key={loggedoutLink.text}>
      <Link 
        className='trail-nav-link'
        to={loggedoutLink.path}>
          {loggedoutLink.text}
      </Link>
    </li>
  ))
}

const Navbar = () => {
  const { loggedIn } = useContext(UserContext);
  return (
    <nav className="navbar navbar-expand-md bg-white navbar-light nav-links">
      <Link to="/trails" className="navbar-brand">
        <img 
          style={{marginLeft: "-0px"}} 
          className="me-3 navbar-brand" 
          src="/assets/logo.jpeg" 
          width="150px"
          >
        </img>
        Take a Hike
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navmenu"
      >
        <span className="navbar-toggler-icon"></span>

      </button>

      <div className='collapse navbar-collapse' id='navmenu'>
        <ul className='navbar-nav nav-links'>
          {!loggedIn ? <LoggedoutNavLinks /> : null}
          <li className='nav-item'>
            <Link
              className='trail-nav-link'
              to={'/trails/new'}>
              <Button className='bs-bg-primary bold'>Create New Trail</Button> 
            </Link>
          </li>
          {loggedIn ? <LogoutComponent /> : null}    
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;
