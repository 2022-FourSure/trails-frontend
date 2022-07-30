import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, Link, useNavigate } from "react-router-dom";
import styled from 'styled-components'

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

const TrailDetails = ({ trails, deleteTrailFromState}) => {
    const initialState = {
        content: "",
        rating: "",
        userId: "",
        trailId: "",
    }

    // const navigate = useNavigate();
    const [formData, setFormData] = useState(initialState);
    const [trail, setTrail] = useState({});
    const [reviews, setReviews] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        // CC: THIS NEEDS TO BE UPDATED WITH BACKEND FOR REVIEWS
        fetch(`http://localhost:8000/trails/${id}`)
            .then((res) => res.json())
            .then((json) => {
                setTrail(json);
                console.log(json);
            })
            .catch(console.error);
    }, [id]);

     // Function to add a review to state
     const addReview = (review) => {
        setReviews([...reviews, review])
      }
      // Function to remove a review from state
      const deleteReview = (id) => {
        setReviews(reviews.filter(review => review._id !== id))
      }

    // CC's NOTES FROM BILLIE, PLEASE KEEP FOR NOW
    // Do reviews.find => give me all reviews wehere ID is this trailID
    // If you associate a trail to review, or review to a trail
    // As long as your post body has your ID in it, you don't need your trail ID
    // Then you do your update/delete or wahtever you're trying to do

    // Function to handle updating the form data
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    // CC: THIS WILL BE UPDATED TO POST TO THE CORRECT BACKEND REVIEWS ROUTE
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        axios.post("http://localhost:8000/trails/", formData)
        .then((res) => {
            setFormData(initialState)
            addReview(res.data)
            // navigate("/", { replace: true })
        })
    }

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
                        <Link to={`/trails/edit/${trail._id}`}>Edit Trail</Link>
                        <button onClick={() => deleteTrail(trail._id)}>Delete</button>
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
                    {console.log(trails?.reviews)}
                </div>
            </div>
        </PageContainer>
    );
};

export default TrailDetails;
