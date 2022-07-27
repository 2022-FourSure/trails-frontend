import './App.css';
import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import HomePage from './pages/Home'
import DetailsPage from './pages/TrailDetails';
import AddTrailPage from './pages/AddNewTrail';
import EditTrail from './pages/EditTrail'

function App() {
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

    const addToTrail = (trail) => {
      setTrails([...trails, trail])
    }

    const updateTrailState = (id) => {
      setTrails(trails.filter(trail => trail._id !== id))
    }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage trails={trails} updateTrailState={updateTrailState}/>} />
        <Route path='/trails/:id' element={<DetailsPage trails={trails}/>} />
        <Route path='/trails/new' element={<AddTrailPage addTrail={addToTrail}/>} />
        <Route path='/trails/edit/:id' element={<EditTrail setTrails={setTrails}/>} />
      </Routes>
    </div>
  );
}

export default App;
