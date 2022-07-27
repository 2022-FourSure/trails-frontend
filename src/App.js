import './App.css';
import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import HomePage from './pages/Home'
import DetailsPage from './pages/TrailDetails';
import AddTrailPage from './pages/AddNewTrail';
import EditTrail from './pages/EditTrail'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/trails/:id' element={<DetailsPage />} />
        <Route path='/trails/new' element={<AddTrailPage/>} />
        <Route path='/trails/edit/:id' element={<EditTrail/>} />
      </Routes>
    </div>
  );
}

export default App;
