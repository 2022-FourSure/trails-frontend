import './App.css';
import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar';
import Home from './pages/Home'
import TrailDetails from './pages/TrailDetails' ;
import AddNewTrail from './pages/AddNewTrail';
import EditTrail from './pages/EditTrail'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import UserContext from './hooks/UserContext';
import useGetUser from './hooks/useGetUser';

function App() {

  const { user, userLoading, getUser } = useGetUser();
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

    const addTrailToState = (trail) => {
      setTrails([...trails, trail])
    }

    const deleteTrailFromState = (id) => {
      setTrails(trails.filter(trail => trail._id !== id))
    }

  return (
    <div>
      <Navbar />
      <UserContext.Provider value={{ user, userLoading, getuser }} >
      <Routes>
        <Route path='/' element={ <Navigate to='/trails' /> }/>
        <Route path='/trails' element={<Home trails={trails} deleteTrailFromState={deleteTrailFromState}/>} />
        <Route path='/trails/:id' element={<TrailDetails trails={trails} setTrails={setTrails} deleteTrailFromState={deleteTrailFromState}/>} />
        <Route path='/trails/new' element={<AddNewTrail addTrailToState={addTrailToState}/>} />
        <Route path='/trails/edit/:id' element={<EditTrail trails={trails} setTrails={setTrails}/>} />
        <Route path='/login' element={ <LoginPage/>}/>
        <Route path='/register' element={<RegisterPage />}/>
      </Routes>
      </UserContext.Provider>
    </div>
  );
}
export default App;
