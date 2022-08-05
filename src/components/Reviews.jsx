import React, { useState } from 'react';
import Review from './Review';


const Reviews = ({ reviews, handleSubmit, handleChange }) => {
    const initialState = {content: '', rating: 5}
    const [formData, setFormData] = useState(initialState);

  return (
    <div className='row d-flex justify-content-center'>
        <div className='col-md-10 col-lg-8'>
            <div className="card shadow-0 border" style={{backgroundColor: "#f0f2f5"}}>
                <div className="card-body">

                    <div className="form-outline mb-4">
                            <form onSubmit={handleSubmit}>
                                    {/* <label className="form-label" htmlFor="content"></label> */}
                                    <div>
                                        <textarea
                                            id="content"
                                            name="content"
                                            type="text"
                                            onChange={handleChange}
                                            className="form-control my-2"
                                            placeholder="Add a Review"
                                        />
                                    </div>

                                    <div className="d-flex justify-content-between">
                                        {/* <label htmlFor="rating"></label> */}
                                        <select
                                            className='form-select w-25 my-1'
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

                                        <button 
                                            type="submit" 
                                            className="submit-btn btn my-2 text-white"
                                            >
                                            Submit
                                        </button>
                                    </div>

        
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