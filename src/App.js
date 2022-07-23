import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import DetailsPage from './pages/DetailsPage.jsx'

function App() {
  return (
    <div>

      <Routes>
        <Route path='/trails/' element={<HomePage />} />
        <Route path='/trails/:id' element={<DetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
