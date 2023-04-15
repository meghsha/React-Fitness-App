import React from 'react';
import { useState } from 'react';
import { Box } from '@mui/material';
import HeroBanner from '../Components/HeroBanner';
import SearchExercises from '../Components/SearchExercises';
import Exercises from '../Components/Exercises';

const Home = () => {

  const [exercise, setExercise] = useState([])
  const [bodyPart, setBodyPart] = useState('all')

  return (
    <Box>
      <HeroBanner/>
      <SearchExercises 
        setExercise={setExercise}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
      />
      <Exercises 
        setExercise={setExercise}
        bodyPart={bodyPart}
        exercise={exercise}
      />
    </Box>
  )
}

export default Home