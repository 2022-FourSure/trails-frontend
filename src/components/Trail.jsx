import React from 'react'
import {Link} from 'react-router-dom'

const linkStyle = {
    color: '#0b830b'
  }

const Trail = ({ trail }) => {
  return (

    <div className="col-xs-12 col-md-6 col-lg-4">

      <div className="card">
        <img 
            src={trail.image} 
            alt={trail.name} 
            className="card-img-top trail-img-sm" 
            />
        <div className="card-body text-center">
          <h5 className="card-title">{trail.name}</h5>
          <p>{trail.location}</p>
          <Link to={`/trails/${trail._id}`} style={linkStyle}>More Details</Link>
        </div>
     </div>

    </div>
  )
}

export default Trail