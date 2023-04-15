import React from 'react'
import { useState, useEffect } from 'react';
import {Box, Stack, Typography, Pagination} from '@mui/material'
import { exerciseOptions, fetchData } from '../utils/fetchData';
import ExerciseCard from './ExerciseCard';

const Exercises = ({bodyPart, exercise, setExercise}) => {

  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 12;

  const indexOfLastExercise = currentPage * exercisesPerPage
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage
  const currentExercises = exercise.slice(indexOfFirstExercise, indexOfLastExercise)

  const paginate = (e, value) => {
    setCurrentPage(value);
    console.log(value)
    window.scrollTo({ top: 1750, behavior: 'smooth'})
  }

  useEffect(  () => {
    const fetchExercisesData = async () => {
      let exercisesData = []

      if(bodyPart === 'all'){
        exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
      } else {
        exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, exerciseOptions);
      }
  
      setExercise(exercisesData);
    }

    fetchExercisesData();
  }, [bodyPart])

  return (
    <Box id='exercise'
      sx={{mt: {lg: '110px'}}}
      mt='50px'
      p = '20px'
    >
      <Typography variant='h3' mb='46px'>
        Showing Results
      </Typography>
      <Stack direction='row'
        sx={{ gap: {lg: '110px', xs: '50px'}}}
        flexWrap='wrap' justifyContent='center'
      >
        {currentExercises.map((movement, index) => (
          <ExerciseCard key={index} movement={movement} />
        ))}
      </Stack>
      <Stack 
        mt='100px'
        alignItems='center'
      >
        {exercise.length > 12 && (
          <Pagination 
            color='standard'
            shape='rounded'
            defaultPage={1}
            count={Math.ceil(exercise.length/ exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size='large'
          />

        )}

      </Stack>

    </Box>
  )
}

export default Exercises