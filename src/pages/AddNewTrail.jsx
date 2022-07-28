import React, { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const AddNewTrail = ({ addTrail }) => {
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

    // Function to handle all form data except for the image
    const handleChange = (e) => {
        console.log(e.target)
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    // Function to handle image upload in the form
    const handleImage = (e) => {
        console.log('handleImage ran')
        setFormData({ ...formData, [e.target.id]: e.target.files[0] })
    }

    const handleSubmit = (e) => {
        console.log('handleSubmit ran')
        e.preventDefault()
        console.log('formData', formData)
        // multipart/form-data is needed so backend knows to look for files
        axios.post("http://localhost:8000/trails/", formData, {headers: {"Content-Type": "multipart/form-data"}})
        .then((res) => {
            setFormData(initialState)
            addTrail(res.data)
            navigate("/", { replace: true })
        })
    }

    return (
        <div>
            <h2>Add New Trail</h2>
            <form encType='multipart/form-data' onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={handleChange}
                />

                <label htmlFor="location">Location</label>
                <input
                    id="location"
                    name="location"
                    type="text"
                    onChange={handleChange}
                />

                <label htmlFor="difficulty">Difficulty</label>
                <input
                    id="difficulty"
                    name="difficulty"
                    type="text"
                    onChange={handleChange}
                />

                <label htmlFor="length">Length</label>
                <input
                    id="length"
                    name="length"
                    type="text"
                    onChange={handleChange}
                />

                <label htmlFor="elevationChange">Elevation Change</label>
                <input
                    id="elevationChange"
                    name="elevationChange"
                    type="text"
                    onChange={handleChange}
                />

                <label htmlFor="routeType">Route Type</label>
                <input
                    id="routeType"
                    name="routeType"
                    type="text"
                    onChange={handleChange}
                />

                <label htmlFor="description">Description</label>
                <input
                    id="description"
                    name="description"
                    type="text"
                    onChange={handleChange}
                />

                <label htmlFor="image">Image</label>
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

export default AddNewTrail
