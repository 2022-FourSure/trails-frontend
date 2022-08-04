import React, { useState } from 'react';
import Review from './Review';


const Reviews = ({ reviews, handleSubmit, handleChange }) => {
    const initialState = {content: '', rating: 5}
    const [formData, setFormData] = useState(initialState);

  return (
    <div className='row dflex justify-content-center'>
        <div className='col-md-8 col-lg-6'>
            Trail Reviews and Ratings
            <div className="card shadow-0 border" style={{backgroundColor: "#f0f2f5"}}>
                <div className="card-body p-4">

                    <div className="form-outline mb-4">
                            <form onSubmit={handleSubmit}>
                                    <label className="form-label" htmlFor="content">Add a Review</label>
                                    <div>
                                        <textarea
                                            id="content"
                                            name="content"
                                            type="text"
                                            onChange={handleChange}
                                            class="form-control"
                                        />
                                    </div>

                                    <label htmlFor="rating">Rating</label>
                                    <select
                                        value={formData.rating}
                                        id="rating"
                                        name="rating"
                                        type="text"
                                        onChange={handleChange}
                                    >
                                        <option value="5">5</option>
                                        <option value="4">4</option>
                                        <option value="3">3</option>
                                        <option value="2">2</option>
                                        <option value="1">1</option>
                                    </select>
                                    <input type="submit" value="Submit" />
                                </form>
                    </div>

                    { reviews ? reviews.map(review => {
                        return <Review review={review} key={review._id}  /> })
                        : null
                    }

                </div>
            </div>

        </div>
    </div>
    
  )
}

export default Reviews