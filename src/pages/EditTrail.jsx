import React, { useState, useEffect } from "react"
import axios from 'axios'
import { useParams, useNavigate } from "react-router-dom"

const EditTrail = ({ setTrails }) => {
    
    const { id } = useParams()
    const navigate = useNavigate()

    const initialState = {
        name: "",
        location: "",
        difficulty: "",
        length: "",
        elevationChange: "",
        routeType: "",
        description: "",
        image: "",
    }

    const [formData, setFormData] = useState(initialState);

        // Function to handle all form data except for the image
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    // Function to handle image upload in the form
    const handleImage = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.files[0] })
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        axios.patch(`http://localhost:8000/trails/${id}`, formData)
        .then((res) => {
            setFormData(initialState)
            setTrails(res.data)
            navigate(`/`, { replace: true })
        })
    }

    useEffect(()=> {
        axios.get(`http://localhost:8000/trails/${id}`)
        .then(res => {
            setFormData(res.data)
        })
    }, [id])

    return (
        <div>
            <h2>Edit Trail</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData?.name}
                    onChange={handleChange}
                />

                <label htmlFor="name">Location</label>
                <input
                    id="location"
                    name="location"
                    type="text"
                    value={formData?.location}
                    onChange={handleChange}
                />

                <label htmlFor="name">Difficulty</label>
                <input
                    id="difficulty"
                    name="difficulty"
                    type="text"
                    value={formData?.difficulty}
                    onChange={handleChange}
                />

                <label htmlFor="name">Length</label>
                <input
                    id="length"
                    name="length"
                    type="text"
                    value={formData?.length}
                    onChange={handleChange}
                />

                <label htmlFor="name">Elevation Change</label>
                <input
                    id="elevationChange"
                    name="elevationChange"
                    type="text"
                    value={formData?.elevationChange}
                    onChange={handleChange}
                />

                <label htmlFor="name">Route Type</label>
                <input
                    id="routeType"
                    name="routeType"
                    type="text"
                    value={formData?.routeType}
                    onChange={handleChange}
                />

                <label htmlFor="name">Description</label>
                <input
                    id="description"
                    name="description"
                    type="text"
                    value={formData?.description}
                    onChange={handleChange}
                />

                <label htmlFor="name">Image</label>
                <input
                    id="image"
                    name="image"
                    type="file"
                    onChange={handleImage}
                />

                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default EditTrail;
