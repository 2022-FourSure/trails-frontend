import React from 'react'

const Review = ({ review }) => {
  return (
    <div className="d-flex p-2">
        <div className="mx-2">{review.content}</div>
        <div>Rating:{review.rating}</div>
    </div>
  )
}

export default Review