import axios from "axios";
import React, { useState, useContext } from "react";
import { Button, Form, Alert, Container, Row, Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import isSuccesfulStatus from "../helpers/isSuccessfulStatus";
import cacheUser from "../helpers/cacheUser";
import UserContext from '../contexts/UserContext';

const getAxiosError = (err) => {
  const dataError = err?.response?.data?.error || false; 
  if (dataError) {
    return dataError
  }
  return err.message
}


export const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  
  const { setLoggedIn } = useContext(UserContext);


  let userData = {
    email: email,
    password: password,
  };

  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoginError('')
      const res = await axios.post("http://localhost:8000/login", userData);
      const { status, error } = res; 
      if (isSuccesfulStatus(status)) {
        cacheUser(res.data.user);
        setLoggedIn(true);
        navigate("/");
      }
      else {
        setLoginError(error);
      }
    } catch (error) {
      setLoginError(getAxiosError(error))
      console.log("error at login", error);
    }
  };

  return (
    <Container className='mt-4'>
      <Row>
        <Col md={6} className='mx-auto'>
          <Card className='card auth-card'>
            <h4>Login</h4>
            {loginError.length > 0 ? <Alert variant={'danger'}>{loginError}</Alert> : null}
            <Card.Body>
              <Form onSubmit={handleLogin}>
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
                  <Button variant="primary" type="submit" className='uppercase bs-bg-primary' size='lg'>
                    Login
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

export default LoginComponent;
