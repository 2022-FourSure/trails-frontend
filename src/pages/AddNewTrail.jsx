import React, { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const AddNewTrail = () => {
    const initialState = {
        name: "",
        location: "",
        difficulty: "",
        length: "",
        elevationChange: "",
        routeType: "",
        description: "",
        file: "",
    }

    const navigate = useNavigate()

    const [formData, setFormData] = useState(initialState)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/trails/", formData).then((res) => {
            navigate("/", { replace: true })
        })
    }

    return (
        <div>
            <h2>Add New Trail</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={handleChange}
                />

                <label htmlFor="name">Location</label>
                <input
                    id="location"
                    name="location"
                    type="text"
                    onChange={handleChange}
                />

                <label htmlFor="name">Difficulty</label>
                <input
                    id="difficulty"
                    name="difficulty"
                    type="text"
                    onChange={handleChange}
                />

                <label htmlFor="name">Length</label>
                <input
                    id="length"
                    name="length"
                    type="text"
                    onChange={handleChange}
                />

                <label htmlFor="name">Elevation Change</label>
                <input
                    id="elevationChange"
                    name="elevationChange"
                    type="text"
                    onChange={handleChange}
                />

                <label htmlFor="name">Route Type</label>
                <input
                    id="routeType"
                    name="routeType"
                    type="text"
                    onChange={handleChange}
                />

                <label htmlFor="name">Description</label>
                <input
                    id="description"
                    name="description"
                    type="text"
                    onChange={handleChange}
                />

                {/* TODO: HR: Not sure how to send the image to the backend and store in cloudinary */}
                <label htmlFor="name">Image</label>
                <input
                    id="file"
                    name="file"
                    type="file"
                    onChange={handleChange}
                />

                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default AddNewTrail
