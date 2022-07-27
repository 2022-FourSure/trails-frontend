import React from 'react'
import Trail from '../components/Trail'

const Trails = ({trails}) => {
  return (
    <div>
      {trails.map((trail) => {
        return (
          <Trail trail={trail} key={trail._id}/>
        )
      })}
    </div>
  )
}

export default Trails