import React from 'react'
import Trail from '../components/Trail'

const Trails = ({ trails }) => {

  console.log('trails', trails)

  return (

    <div className='container'>
      <div className="row g-4">

          {trails.map((trail) => {
            return (
              <Trail trail={trail} key={trail._id}/>
            )
          })}        
          
      </div>

    </div>

  )
}

export default Trails