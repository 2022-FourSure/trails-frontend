import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div class="navbar navbar-expand-md bg-dark navbar-dark">
      <div className="container">
        {/* TODO: HR: Add logo to the navbar */}
        <div className="collapse navbar-collapse" id="menu">
          <ul>
              <li className="nav-item"><Link to='/auth/login'>Log In</Link></li>
              <li className="nav-item"><Link to='/auth/signup'>Sign Up</Link></li>
              <li className="nav-item"><Link to='/trails/new'>Create New Trail</Link></li>
              
              
              {/* HR: Links below should be for logged in user only */}
              {/* <Link to='/trails/???'>Log Out</Link> */}
              {/* HR: Keeping this line active for testing purposes */}
              

          </ul>

        </div>

      </div>
    </div>
  )
}

export default Navbar