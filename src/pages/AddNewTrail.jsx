import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  FormControl,
  Container,
  Form,
  Button,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import styled from "styled-components";
import { BASE_PROD_URL } from "../api";
import getAxiosError from "../helpers/getAxiosError";

const FormStyle = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
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
  input[type="text"] {
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
  input[type="submit"] {
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
  input[type="submit"] {
    transition-duration: 0.4s;
  }

  input[type="submit"]:hover {
    background-color: #095479;
    border: 2px solid #095479;
    color: white;
  }
`;

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
  };

  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");

  // Function to handle all form data except for the image
  const handleChange = (e) => {
    console.log(e.target);
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Function to handle image upload in the form
  const handleImage = (e) => {
    console.log("handleImage ran");
    setFormData({ ...formData, [e.target.id]: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    console.log("handleSubmit ran");
    e.preventDefault();
    console.log("formData", formData);
    // multipart/form-data is needed so backend knows to look for files
    axios
      .post(`${BASE_PROD_URL}/trails`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setFormData(initialState);
        addTrail(res.data);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        setError(getAxiosError(err));
      });
  };

  return (
    <Container>
      <Row>
        <Col xs={6} className='mx-auto'>
          <Card className="card trail-card">
            <h4>Add New Trail</h4>
            {error.length > 0 ? (
              <Alert variant={"danger"}>{error}</Alert>
            ) : null}
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Trail Name</Form.Label>
                  <FormControl
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Name"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Location</Form.Label>
                  <FormControl
                    id="location"
                    name="location"
                    type="text"
                    placeholder="Location (city, state)"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Difficulty</Form.Label>
                  <FormControl
                    id="difficulty"
                    name="difficulty"
                    type="number"
                    placeholder="Enter a number for difficulty"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Length</Form.Label>
                  <FormControl
                    id="length"
                    name="length"
                    type="number"
                    placeholder="Enter a number for length"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Elevation Change</Form.Label>
                  <FormControl
                    id="elevationChange"
                    name="elevationChange"
                    type="number"
                    placeholder="Enter a number for elevation change"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Route Type (e.g. Loop) </Form.Label>
                  <FormControl
                    id="routeType"
                    name="routeType"
                    type="text"
                    placeholder="Enter Route Type (e.g. Loop)"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Description </Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Add description"
                    id="description"
                    name="description"
                    onChange={handleChange}
                    type="text"
                    style={{ height: "100px" }}
                  />
                </Form.Group>
                <Form.Label>Optional: Add Trail Image </Form.Label>
                <FormControl
                  id="image"
                  name="image"
                  type="file"
                  onChange={handleImage}
                />
                <div className="d-grid mt-5">
                  <Button
                    variant="primary"
                    type="submit"
                    className="uppercase bs-bg-primary"
                    size="lg"
                  >
                    Add Trail
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddNewTrail;
