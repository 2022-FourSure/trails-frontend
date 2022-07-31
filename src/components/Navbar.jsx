import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <div>
        {/* TODO: HR: Add logo to the navbar */}
        <div>
          <ul>
              <li><Link to='/auth/login'>Log In</Link></li>
              <li><Link to='/auth/signup'>Sign Up</Link></li>
              <li><Link to='/trails/new'>Create New Trail</Link></li>
            
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