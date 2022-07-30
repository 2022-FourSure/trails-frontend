import React, { useState, useEffect } from "react"
import axios from 'axios'
import { useParams, useNavigate } from "react-router-dom"
import styled from 'styled-components'

const FormStyle = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: 18px;
    h2 {
        text-align: center;
    }
    div {
        text-align: center;
    }
    input[type=text] {
        text-align: center;
        width: 40%;
        padding: 12px 20px;
        margin: 12px 0;
        border: none;
        border-bottom: 2px solid gray;
    }
    /* textarea {
        width: 42%;
        padding: 15px;
        margin: 12px 0;
        border: 1px solid #ccc;
        border-radius: 4px;
        resize: vertical;
    } */
    input[type=submit] {
        background-color: #959393;
        border: none;
        color: white;
        padding: 10px 20px;
        margin-top: 15px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        cursor: pointer;
    }
`

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
        <FormStyle>
            <h2>Edit Trail</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Trail Name</label>
                    <div>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData?.name}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="name">Location</label>
                    <div>
                        <input
                            id="location"
                            name="location"
                            type="text"
                            value={formData?.location}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="name">Difficulty</label>
                    <div>
                        <input
                            id="difficulty"
                            name="difficulty"
                            type="text"
                            value={formData?.difficulty}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="name">Length</label>
                    <div>
                        <input
                            id="length"
                            name="length"
                            type="text"
                            value={formData?.length}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="name">Elevation Change</label>
                    <div>
                        <input
                            id="elevationChange"
                            name="elevationChange"
                            type="text"
                            value={formData?.elevationChange}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="name">Route Type</label>
                    <div>
                        <input
                            id="routeType"
                            name="routeType"
                            type="text"
                            value={formData?.routeType}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="name">Description</label>
                    <div>
                        <textarea
                            id="description"
                            name="description"
                            type="text"
                            value={formData?.description}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="name">Image</label>
                    <div>
                        <input
                            id="image"
                            name="image"
                            type="file"
                            onChange={handleImage}
                        />
                    </div>
                </div>
                <div>
                    <input type="submit" value="Submit" />
                </div>
            </form>
        </FormStyle>
    )
}

export default EditTrail;
