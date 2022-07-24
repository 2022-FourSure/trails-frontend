import React from 'react'
import {Link} from 'react-router-dom'

const Trail = ({trail}) => {
  return (
    <div>
      <div>
        <img src={trail.image} alt={trail.name} />
      </div>
      <div>
        <h3>{trail.name}</h3>
        <Link to={`/trails/${trail._id}`}>More Details</Link>
      </div>
    </div>
  )
}

export default Trail