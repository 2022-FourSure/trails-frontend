import React, { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import styled from 'styled-components'

const FormStyle = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: 18px;
    background-color: #e9e9e9;
    margin: 4vw;
    padding: 20px;
    h2 {
        text-align: center;
    }
    div {
        text-align: center;
    }
    input[type=text] {
        width: 50%;
        padding: 12px 20px;
        margin: 12px 0;
        border: none;
        border-bottom: 2px solid gray;
    }
    textarea {
        width: 40vw;
        height: 15vh;
        font-size: 15px;
    }
    input[type=submit] {
        background-color: white;
        border: 2px solid #095479;
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
        background-color: #095479;
        border: 2px solid #095479;
        color: white;
    }
`

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
    axios.post("http://localhost:8000/trails/", formData, { headers: { "Content-Type": "multipart/form-data" } })
      .then((res) => {
        setFormData(initialState)
        addTrail(res.data)
        navigate("/", { replace: true })
      })
  }

  return (
    <FormStyle>
      <h2>Add New Trail</h2>
      {/* HR: Placeholders are commented out because it gives an error where you can't submit if the input fields have placeholders */}
      <form encType='multipart/form-data' onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Trail Name</label>
          <div>
            <input
              id="name"
              name="name"
              type="text"
              // placeholder="Name"
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="location">Location</label>
          <div>
            <input
              id="location"
              name="location"
              type="text"
              // placeholder="Location (city, state)"
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="difficulty">Difficulty</label>
          <div>
            <input
              id="difficulty"
              name="difficulty"
              type="text"
              // placeholder="Difficulty (level 1 - 5)"
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="length">Length</label>
          <div>
            <input
              id="length"
              name="length"
              type="text"
              // placeholder="Length (miles)"
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="elevationChange">Elevation Change</label>
          <div>
            <input
              id="elevationChange"
              name="elevationChange"
              type="text"
              // placeholder="Elevation Change (numerical)"
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="routeType">Route Type</label>
          <div>
            <input
              id="routeType"
              name="routeType"
              type="text"
              // placeholder="Route Type (e.g. Loop)"
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <div>
            <textarea
              id="description"
              name="description"
              type="text"
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="image">Image</label>
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

export default AddNewTrail