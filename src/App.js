import './App.css';
import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx'
import Home from './pages/Home'
import TrailDetails from './pages/TrailDetails' ;
import AddNewTrail from './pages/AddNewTrail';
import EditTrail from './pages/EditTrail'

function App() {

  // Set state for trails and reviews in the app
  const [trails, setTrails] = useState([]);

    useEffect(() => {
        // HR: Wrote out the whole link to hit PORT 8000
        fetch("http://localhost:8000/trails/")
            .then((res) => res.json())
            .then((json) => {
                setTrails(json);
            })
            .catch(console.error);
    }, []);

    // Create some functions to manipulate state to be passed as props
    // Function to add a trail to state
    const addToTrail = (trail) => {
      setTrails([...trails, trail])
    }
    // Function to remove a trail from state
    const deleteTrailFromState = (id) => {
      setTrails(trails.filter(trail => trail._id !== id))
    }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home trails={trails} deleteTrailFromState={deleteTrailFromState}/>} />
        <Route path='/trails/:id' element={<TrailDetails trails={trails} deleteTrailFromState={deleteTrailFromState}/>} />
        <Route path='/trails/new' element={<AddNewTrail addTrail={addToTrail}/>} />
        <Route path='/trails/edit/:id' element={<EditTrail trails={trails} setTrails={setTrails}/>} />
      </Routes>
    </div>
  );
}

export default App;
