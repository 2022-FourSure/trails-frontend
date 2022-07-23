import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        {/* TODO: Add logo to the navbar */}
        <ul>
            <Link to='/auth/login'>Log In</Link>
            <Link to='/auth/signup'>Sign Up</Link>
        </ul>
    </div>
  )
}

export default Navbar