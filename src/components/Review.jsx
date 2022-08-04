import React from 'react'

const Review = ({ review }) => {
  return (
    <div className="card mb-4">
        <div className="card-body">
            <p>{review.content}</p>
        </div>
        <div className='d-flex justify-content-end'>
           <div className='dropdown mx-5'>
              <p>Rating: {review.rating}/5</p>
           </div>
        </div>
    </div>
  )
}

export default Review