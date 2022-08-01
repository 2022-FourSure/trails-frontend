import React from 'react'
import { Link } from 'react-router-dom'
import LogoutComponent from "./LogoutComponent";
import UserContext from '../contexts/UserContext';

const loggedoutLinks = [
  { path: '/login', text: 'Login' },
  { path: '/register', text: 'Register' }
]

const LoggedoutNavLinks = () => {
  return loggedoutLinks.map((loggedoutLink) => (
    <Link key={loggedoutLink.text} to={loggedoutLink.path}>{loggedoutLink.text}</Link>
  ))
}

const Navbar = () => {
  const { loggedIn } = useContext(UserContext);
  return (
    <nav className="navbar navbar-expand-md bg-white navbar-light">
      <div className="container emphasis-font">

        <Link to="/trails" class="navbar-brand">
          <img 
            style={{marginLeft: "-0px"}} 
            class="me-3 navbar-brand" 
            src="/assets/logo.jpeg" 
            width="150px"
            >
          </img>
          Take a Hike
        </Link>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navmenu"
        >
          <span class="navbar-toggler-icon"></span>

        </button>

        <div className='collapse navbar-collapse' id='navmenu'>
          <ul className='navbar-nav ms-auto'>
            {!loggedIn ? <LoggedoutNavLinks /> : null}
            {loggedIn ? <LogoutComponent /> : null}
              {/* <li className='nav-item'><Link to='/trails/new'>Create New Trail</Link></li> */}
              
              <li className='nav-item'>
                <a href='/trails/new' class="nav-link">
                  Create New Trail
                </a>
              </li>

              <li className='nav-item'>
                <a href='/auth/login' class="nav-link">
                  Log In
                </a>
              </li>   

              <li className='nav-item'>
                <a href='/auth/signup' class="nav-link">
                  Sign Up
                </a>
              </li>        
                  
              {/* HR: Links below should be for logged in user only */}
              {/* <Link to='/trails/???'>Log Out</Link> */}
              {/* HR: Keeping this line active for testing purposes */}
              

          </ul>

        </div>

      </div>
    </nav>
  )
}

export default Navbar