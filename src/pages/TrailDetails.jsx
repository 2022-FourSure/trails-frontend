import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, Link, useNavigate } from "react-router-dom";
import styled from 'styled-components'
import Review from "../components/Review";

const PageContainer = styled.div`
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
`
const TrailDetailContainer = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
`
const ImageContainer = styled.div`
    align-items: center;
    img {
        width: 45vw;
        margin: 40px 40px;
    }
`
const DetailsContainer = styled.div`
    align-items: center;
    width: 40vw;
    margin: 20px 40px;
`
const TrailUpdates = styled.div`
    margin-top: 15px;
    display: flex; 
    gap: 10px;
    button {
        background-color: #959393;
        border: none;
        color: white;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        cursor: pointer;
    }
`
const TrailDetails = ({ trails, setTrails, deleteTrailFromState }) => {
    const initialState = {content: '', rating: 5}
    const [formData, setFormData] = useState(initialState);
    const { id } = useParams();
    const [trail, setTrail] = useState({});
    const [reviews, setReviews] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8000/trails/${id}`)
            .then((res) => res.json())
            .then((json) => {
                console.log('json', json);
                setTrail(json);
            })
            .catch(console.error);
    }, [])

    // CC: I WROTE THIS BUT AM NOT SURE IF THSI IS THE BEST WAY TO DO THIS, IN SEPARATE USEEFFECT
    useEffect(() => {
        setReviews(trail.reviews)
    }, [trail]);

    // Function to handle updating the form data
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    // Function to handle submit of a new review for the hike
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        axios.post(`http://localhost:8000/trails/${id}/reviews`, formData)
        .then((json) => {
            console.log(json)
            setFormData(initialState)
            setTrail(json)
            navigate(`/trails/${id}`, { replace: true })
        })
    }

    // CC: CONSOLE LOGS TO BE DELETED
    console.log('trail.reviews: ', trail.reviews)
    console.log('reviews: ', reviews)

    // Function that deletes the trail
    const deleteTrail = (id) => {
        console.log(trails)
        console.log(id)
        axios.delete(`http://localhost:8000/trails/${id}`)
        .then(res => {
            console.log(res)
            deleteTrailFromState(id)
            navigate('/')
        })
      }

    return (
        <PageContainer>
            {/* ~~~~~~~~~~~Trail Detail Section~~~~~~~~~~~ */}
            <TrailDetailContainer>
                <ImageContainer>
                    <img src={trail.image} alt={trail.name} />
                </ImageContainer>
                <DetailsContainer>
                    <h2>{trail.name}</h2>
                    <p>{trail.location}</p>
                    <p><b>Difficulty:</b> Level {trail.difficulty}</p>
                    <p><b>Length:</b> {trail.length} mile(s)</p>
                    <p><b>Elevation Change:</b> {trail.elevationChange}</p>
                    <div>
                        {trail.description}
                    </div>
                    {/* HR: Should ONLY be available to logged in user. Currently active for test purposes */}
                    <TrailUpdates>
                        <div type="button" className="btn btn-secondary text-light"><Link to={`/trails/edit/${trail._id}`}>Edit Trail</Link></div>
                        <div type="button" className="btn btn-danger" onClick={() => deleteTrail(trail._id)}>Delete</div>
                    </TrailUpdates>
                </DetailsContainer>
            </TrailDetailContainer>

            {/* ~~~~~~~~~~~Trail Detail Section~~~~~~~~~~~ */}

            {/* Reviews section */}
            <div>
                <h2>Add A Review</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="content"></label>
                    <input
                        id="content"
                        name="content"
                        type="text"
                        onChange={handleChange}
                    />

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
                <div>
                    <h2>Reviews</h2>
                    {/* CC: NEED TO GET CONDITIONAL LOGIC IN HERE TO CHECK FOR REVIEWS BEFORE YOU RENDER THIS BUT IT WORKS ONCE YOU HAVE REVIEWS IN STATE */}
                    {/* {reviews.map(review => {
                        return <Review review={review} key={review._id}  />
                    })} */}
    
                    {/* CC: I WAS TRYING TO USE REACT FRAGMENTS TO WRITE JS LOGIC FOR IF REVIEWS ARE THERE OR NOT */}
                    {/* // <> */}
                    {/* // {(if (reviews !== undefined) {reviews.map(review => return <Review review={review} key={review._id} />})} */}
                    {/* // </> */}


                </div>
            </div>
        </PageContainer>
    );
};

export default TrailDetails;
