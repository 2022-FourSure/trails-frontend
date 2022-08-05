import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const TrailContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 31%;
  @media screen and (max-width: 766px) {
    width: 50%;
  }
  margin: 0 auto;
  z-index: 2;
  box-shadow: 5px 5px 15px #d3d3d3;
  
`

const TrailDetail = styled.div`
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  text-align: center;
  font-size: 1.6vw;
  margin: 10px 15px;
  @media screen and (max-width: 766px) {
    font-size: 2.5vw;
  }
  h3 {
    font-size: 1.6vw;
    @media screen and (max-width: 766px) {
      font-size: 2.5vw;
    }
  }
`
const linkStyle = {
  color: '#0b830b'
}

const TrailImage = styled.div`
  display: flex;
  flex-direction: column;
  img {
    height: 32vw;
    object-fit: cover;
  }
`

const Trail = ({ trail }) => {
  return (

    <div className="col-xs-12 col-md-6 col-lg-4">

      <div className="card">
        <img 
            src={trail.image} 
            alt={trail.name} 
            className="card-img-top trail-img-sm" 
            />
        <div className="card-body">
          <h3 className="card-title">{trail.name}</h3>
          <p>{trail.location}</p>
          <Link to={`/trails/${trail._id}`} style={linkStyle}>More Details</Link>
        </div>
     </div>

    </div>


    // <TrailContainer>
    //   <TrailImage>
    //     <img src={trail.image} alt={trail.name} />
    //   </TrailImage>
    //   <TrailDetail>
    //     <h3>{trail.name}</h3>
    //     <Link to={`/trails/${trail._id}`} style={linkStyle}>More Details</Link>
    //   </TrailDetail>
    // </TrailContainer>

  )
}

export default Trail