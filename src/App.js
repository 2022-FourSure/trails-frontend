import './App.css';
import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";
import Home from './pages/Home'
import TrailDetails from './pages/TrailDetails' ;
import AddNewTrail from './pages/AddNewTrail';
import EditTrail from './pages/EditTrail'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/Navbar';
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import LoggedInRedirect from "./components/LoggedInRedirect";
import Loader from "./components/Loader";
import UserContext from './contexts/UserContext';
import useFetchUser from "./hooks/useFetchUser";

function App() {
axios.defaults.withCredentials = true;

function App() {
  const { loadingUser, loggedIn, setLoggedIn, fetchUser } = useFetchUser();

  // Set state for trails and reviews in the app
  const [loadingTrails, setLoadingTrails] = useState(false);
  const [trails, setTrails] = useState([]);

  const fetchTrails = () => {
    setLoadingTrails(true);
    fetch("http://localhost:8000/trails/")
      .then((res) => res.json())
      .then((json) => {
        setLoadingTrails(false);
        setTrails(json);
      })
      .catch((error) => {
        setLoadingTrails(false);
        console.error(error)
      });
  }

  const addTrailToState = (trail) => {
    setTrails([...trails, trail])
  }

  const deleteTrailFromState = (id) => {
    setTrails(trails.filter(trail => trail._id !== id))
  }

  useEffect(() => {
    fetchTrails();
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  const loading = loadingUser || loadingTrails

  if (loading) {
    return (
      <div className='container'>
        <div className="row">
          <div className='col-xs-12 d-flex justify-content-center mt-5'>
            <Loader />
          </div>
        </div>
      </div>
    )
  }

  return (
    <UserContext.Provider value={{ loggedIn, setLoggedIn, loadingUser, }}>
      <Navbar />
        <Routes>
          <Route path='/' element={ <Navigate to='/trails' /> }/>
          <Route path='/trails' element={<Home trails={trails} deleteTrailFromState={deleteTrailFromState}/>} />
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
                <AddNewTrail addTrailToState={addTrailToState}/>
              </AuthenticatedRoute>
            }
          >
          </Route>
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
          >            
          </Route>
          <Route 
            path="/register"
            element={
              <LoggedInRedirect>
                <RegisterPage />
              </LoggedInRedirect>
            }
          >
          </Route>
        </Routes>
    </UserContext.Provider>
  );
 }
}
export default App;
