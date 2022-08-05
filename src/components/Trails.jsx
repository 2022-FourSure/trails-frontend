import React from 'react'
import Trail from '../components/Trail'
// import styled from 'styled-components'

// const TrailsContainer = styled.div`
//     min-width: 100vw;
//     display:  flex;
//     flex-wrap: wrap;
//     gap: 20px;
// `

const Trails = ({ trails }) => {

  console.log('trails', trails)

  return (
    // <TrailsContainer>

    <div className='container'>
      <div className="row g-4">

          {trails.map((trail) => {
            return (
              <Trail trail={trail} key={trail._id}/>
            )
          })}        
          
      </div>

    </div>

    // </TrailsContainer>
  )
}

export default Trails