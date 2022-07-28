import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, Link, useNavigate } from "react-router-dom";

const TrailDetails = ({ trails, reviews, addReview, deleteReview }) => {
    const initialState = {
        content: "",
        rating: "",
        userId: "",
        trailId: "",
    }

    // const navigate = useNavigate();
    const [formData, setFormData] = useState(initialState);
    const [trail, setTrail] = useState({});
    const { id } = useParams();

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

    return (
        <div>
            <div>
                <img src={trail.image} alt={trail.name} />
            </div>
            <div>
                <h2>{trail.name}</h2>
                <p>{trail.location}</p>
                <p>Difficulty: Level {trail.difficulty}</p>
                <p>Length: {trail.length} mile(s)</p>
                <p>Elevation Change: {trail.elevationChange}</p>
            </div>
            <div>
              {trail.description}
            </div>
            {/* HR: Should ONLY be available to logged in user. Currently active for test purposes */}
            <div>
                <Link to={`/trails/edit/${trail._id}`}>Edit Trail</Link>
                <button>Delete</button>
            </div>

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

            </div>
        </div>
    );
};

export default TrailDetails;
