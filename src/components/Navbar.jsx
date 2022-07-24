import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        {/* TODO: HR: Add logo to the navbar */}
        <ul>
            <Link to='/auth/login'>Log In</Link>
            <Link to='/auth/signup'>Sign Up</Link>
            {/* HR: For logged in user only */}
            {/* <Link to='/trails/new'>Create New Trail</Link> */}
            {/* <Link to='/trails/???'>Log Out</Link> */}
        </ul>
    </div>
  )
}

export default Navbar