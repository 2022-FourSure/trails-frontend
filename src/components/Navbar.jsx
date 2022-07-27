import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        {/* TODO: HR: Add logo to the navbar */}
        <ul>
            <Link to='/auth/login'>Log In</Link>
            <Link to='/auth/signup'>Sign Up</Link>
            {/* HR: Links below should be for logged in user only */}
            {/* <Link to='/trails/???'>Log Out</Link> */}
            {/* HR: Keeping this line active for testing purposes */}
            <Link to='/trails/new'>Create New Trail</Link>

        </ul>
    </div>
  )
}

export default Navbar