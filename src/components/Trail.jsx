import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const TrailContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30vw;
  min-width: 200px;
  margin: 25px auto;
  box-shadow: 5px 5px 15px #e0dede;
`

const TrailDetail = styled.div`
  text-align: center;
  font-size: 1em;
  margin: 15px 20px;
`

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

const Trail = ({trail}) => {
  return (
    <TrailContainer>
      <TrailImage>
        <img src={trail.image} alt={trail.name} />
      </TrailImage>
      <TrailDetail>
        <h3>{trail.name}</h3>
        <Link to={`/trails/${trail._id}`}>More Details</Link>
      </TrailDetail>
    </TrailContainer>
  )
}

export default Trail