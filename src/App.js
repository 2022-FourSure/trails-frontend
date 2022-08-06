import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Home from "./pages/Home";
import TrailDetails from "./pages/TrailDetails";
import AddNewTrail from "./pages/AddNewTrail";
import EditTrail from "./pages/EditTrail";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import LoggedInRedirect from "./components/LoggedInRedirect";
import CenteredLoader from './components/CenteredLoader';
import UserContext from "./contexts/UserContext";
import useAuth from "./hooks/useAuth";
import { BASE_PROD_URL } from "./api";

const setAxiosDefaults = () => {
  axios.defaults.withCredentials = true;
};

setAxiosDefaults();

function App() {
  const { loadingUser, loggedIn, setLoggedIn, fetchUser } = useAuth();
  // Set state for trails and reviews in the app
  const [loadingTrails, setLoadingTrails] = useState(false);
  const [trails, setTrails] = useState([]);

    useEffect(() => {
        fetch(`${BASE_PROD_URL}/trails`)
            .then((res) => res.json())
            .then((json) => {
                setTrails(json);
            })
            .catch(console.error);
    }, []);

  const addTrail = (trail) => {
    setTrails([...trails, trail]);
  };

  const deleteTrailFromState = (id) => {
    setTrails(trails.filter((trail) => trail._id !== id));
  };

  // useEffect(() => {
  //   fetchTrails();
  // }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  const loading = loadingUser || loadingTrails;

  if (loading) {
    return <CenteredLoader />
  }

  return (
    <UserContext.Provider value={{ loggedIn, setLoggedIn, loadingUser }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/trails" />} />
        <Route
          path="/trails"
          element={
            <Home trails={trails} deleteTrailFromState={deleteTrailFromState} />
          }
        />
        <Route
          path="/trails/:id"
          element={
            <TrailDetails
              trails={trails}
              setTrails={setTrails}
              deleteTrailFromState={deleteTrailFromState}
            />
          }
        />
        <Route
          path="/trails/new"
          element={
            <AuthenticatedRoute>
              <AddNewTrail addTrail={addTrail} />
            </AuthenticatedRoute>
          }
        ></Route>
        <Route
          path="/trails/edit/:id"
          element={
            <AuthenticatedRoute>
              <EditTrail trails={trails} setTrails={setTrails} />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <LoggedInRedirect>
              <LoginPage />
            </LoggedInRedirect>
          }
        ></Route>
        <Route
          path="/signup"
          element={
            <LoggedInRedirect>
              <LoginPage />
            </LoggedInRedirect>
          }
        ></Route>
        <Route
          path="/register"
          element={
            <LoggedInRedirect>
              <RegisterPage />
            </LoggedInRedirect>
          }
        ></Route>
      </Routes>
    </UserContext.Provider>
  );
}
export default App;
