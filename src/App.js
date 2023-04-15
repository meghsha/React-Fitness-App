import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {Box} from '@mui/material';

import './App.css';
import ExerciseDetail from './pages/ExerciseDetail';
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import Footer from './Components/Footer';
 
function App() {
  return (
      <Box width='400' sx={{ width: { xl: '1488px'}}} m='auto'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/orange/:id' element={<ExerciseDetail />} />
        </Routes>
        <Footer />
      </Box>
  );
}

export default App;