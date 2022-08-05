import axios from "axios";
import { React, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container, Row, Card, Alert, Col } from "react-bootstrap";
import cacheUser from "../helpers/cacheUser";
import isSuccesfulStatus from "../helpers/isSuccessfulStatus";
import UserContext from '../contexts/UserContext';
import getAxiosError from "../helpers/getAxiosError";

export const RegisterComponent = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerError, setRegisterError] = useState("");

  const { setLoggedIn } = useContext(UserContext);

  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      let userData = {
        name: name,
        email: email,
        password: password,
      };
      const res = await axios.post("http://localhost:8000/register", userData);
      const { status, error } = res; 
      if (isSuccesfulStatus(status)) {
        const user = res.data
        cacheUser(user);
        setLoggedIn(true)
        navigate("/");
      }
      else {
        console.log('res in else ', res)
        setRegisterError(error);
      }
    } catch (error) {
      setRegisterError(getAxiosError(error))
      console.log("error at register ", error);
    }
  };
  return (
    <Container className='mt-4'>
      <Row>
        <Col md={6} className='mx-auto'>
          <Card className='card auth-card'>
            <h4>Sign Up</h4>
            {registerError.length > 0 ? <Alert variant={'danger'}>{registerError}</Alert> : null}
            <Card.Body>
              <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your name with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <div className="d-grid">
                  <Button variant="primary" className='uppercase bs-bg-primary' type="submit" size='lg'>
                    Sign Up
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

export default RegisterComponent;

//If response succesful where should i go? //& api call for the user
//get data and status in rresponse
//await catch

//Api request to figure out if someone is logged in from backend
