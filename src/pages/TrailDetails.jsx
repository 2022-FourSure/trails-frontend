import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import styled from 'styled-components'
import Reviews from "../components/Reviews";
import { BASE_PROD_URL } from "../api";

const PageContainer = styled.div`
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    @media screen and (max-width: 766px) {
    }
`
const TrailDetailContainer = styled.div`
    display: flexbox;
    align-content: center;
    justify-content: center;
`
const ImageContainer = styled.div`
    align-items: center;
    margin: auto;
    img {
        width: 45vw;
        box-shadow: 10px 10px 15px #e0dede;
    }
`
const DetailsContainer = styled.div`
    align-items: center;
    margin: auto;
    width: 40vw;
    h2 {
    }
    @media screen and (max-width: 766px) {
    }
`
const TrailDescription = styled.div`
    margin: 2vw 3.5vw;
`
const TrailUpdates = styled.div`
    margin-top: 15px;
    display: flex; 
    gap: 10px;
`
const ReviewsContainer = styled.div`
    background-color: #e9e9e9;
    margin: 2vw 3.5vw;
    padding: 5px 10px;
    text-align: center;
    h2 {
        padding: 1.5vw;
        margin: 0;
    }
    textarea {
        width: 75vw;
        height: 10vh;
    }
`
const RatingContainer = styled.div`
    display: inline-flex;
    margin: 0 5px;
    select {
        margin-left: 3px
    }
`
const SubmitButton = styled.div`
    display: inline-flex;
    margin: 0 5px;
    input[type=submit] {
        background-color: white;
        border: 2px solid #959393;
        border-radius: 4px;
        color: black;
        padding: 5px 10px;
        margin-top: 15px;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
    }
    input[type=submit] {
        transition-duration: 0.4s;
    }

    input[type=submit]:hover {
        background-color: #0b830b;
        border: 2px solid #0b830b;
        color: white;
    }
`

const TrailDetails = ({ trails, setTrails, deleteTrailFromState }) => {
    const initialState = {content: '', rating: 5}
    const [formData, setFormData] = useState(initialState);
    const { id } = useParams();
    const [trail, setTrail] = useState({});
    const [reviews, setReviews] = useState(null);
    const navigate = useNavigate();
    // const [isTrail]

    useEffect(() => {
        fetch(`${BASE_PROD_URL}/trails/${id}`)
            .then((res) => res.json())
            .then((json) => {
                console.log('json', json);
                setTrail(json);
                setReviews(json.reviews);
            })
            .catch(console.error);
    }, [])

    // Function to handle updating the form data
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    // Function to handle submit of a new review for the hike
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${BASE_PROD_URL}/trails/${id}/reviews`, formData)
        .then((json) => {
            console.log(json.data)
            setFormData(initialState)
            setTrail(json.data)
            console.log('json.data.reviews: ', json.data.reviews)
            setReviews(json.data.reviews)
            // CC: THIS WON'T REFRESH
            navigate(`/trails/${id}`, { replace: true })
        })
    }

    // Function that deletes the trail
    const deleteTrail = (id) => {
        console.log(trails)
        console.log(id)
        axios.delete(`${BASE_PROD_URL}/trails/${id}`)
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

                    {/* HR: Should ONLY be available to logged in user.*/}

                    <TrailUpdates>
                        <div 
                            type="button" 
                            className="btn edit-btn text-white"
                            onClick={() => navigate(`/trails/edit/${trail._id}`)}
                            >
                                Edit
                        </div>

                        <div 
                            type="button" 
                            className="btn delete-btn text-white" 
                            onClick={() => deleteTrail(trail._id)}
                            >
                                Delete
                        </div>

                    </TrailUpdates>
                </DetailsContainer>
            </TrailDetailContainer>
            <TrailDescription>
                    {trail.description}
            </TrailDescription>

            {/* ~~~~~~~~~~~Trail Detail Section~~~~~~~~~~~ */}

            {/* Reviews section */}

            <Reviews 
                reviews={reviews} 
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                setTrail={setTrail}
                setReviews={setReviews}
                setFormData={setFormData}
                />

            </PageContainer>
    );
};

export default TrailDetails;
