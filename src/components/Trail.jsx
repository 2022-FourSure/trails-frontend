import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const TrailContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30vw;
  min-width: 200px;
  margin: 0 auto;
  /* margin-top: -85px; */
  z-index: 2;
  box-shadow: 5px 5px 15px #d3d3d3;
  
`

const TrailDetail = styled.div`
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  text-align: center;
  font-size: 1.6vw;
  margin: 10px 15px;
  h3 {
    font-size: 1.6vw;
  }
`
const linkStyle = {
  color: '#0b830b'
}

const TrailImage = styled.div`
  display: flex;
  flex-direction: column;
  width: 30vw;
  min-width: 200px;
  img {
    height: 32vw;
    object-fit: cover;
  }
`

const Trail = ({ trail }) => {
  return (
    <TrailContainer>
      <TrailImage>
        <img src={trail.image} alt={trail.name} />
      </TrailImage>
      <TrailDetail>
        <h3>{trail.name}</h3>
        <Link to={`/trails/${trail._id}`} style={linkStyle}>More Details</Link>
      </TrailDetail>
    </TrailContainer>

  )
}

export default Trail