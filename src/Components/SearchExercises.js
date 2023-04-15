import React from 'react'
import { useState, useEffect } from 'react'
import {Box, Stack, Typography, Button, TextField} from '@mui/material'
import {exerciseOptions, fetchData} from '../utils/fetchData'
import HorizontalScrollBar from './HorizontalScrollBar'

const SearchExercises = ( {bodyPart, setBodyPart, setExercise}) => {
  const [search, setSearch] = useState('')
  const [bodyParts, setBodyParts] = useState([])

  useEffect( () => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);

      setBodyParts(['all', ...bodyPartsData])
    }
    fetchExercisesData();
  }, [])

  // console.log(bodyPart);

  const handleSearch = async () => {
    if(search){
      const exerciseData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
      // console.log(exerciseData)
      const searchedExercises = exerciseData.filter(
        (exercise) => exercise.name.toLowerCase().includes(search) 
      || exercise.target.toLowerCase().includes(search)
      || exercise.bodyPart.toLowerCase().includes(search)
      || exercise.equipment.toLowerCase().includes(search));

      setSearch('')
      setExercise(searchedExercises);
    }
  }

  return (
    <Stack alignItems='center' mt='37px' justifyContent='center' p='20px'>
        <Typography sx={{ fontSize: {lg: '44px', xs: '30px'}}} fontWeight={700} mb='50px' textAlign={'center'}>
            Awesome Exercises you <br/>
            Should Know
        </Typography>
        <Box position={'relative'} mb={'72px'}>
            <TextField sx={{ input: { fontWeight: '700', border: 'none', borderRadius: '4px'}, width: {lg: '800px', xs: '350px'}, backgroundColor: '#fff', borderRadius: '40px'}} height='76px' value={search} onChange={(e) => {setSearch(e.target.value.toLowerCase())}} placeholder='Search Exercises' type='text'>

            </TextField>
            <Button className='search-btn'
              sx={{ backgroundColor: '#ff2625', color: '#fff', textTransform: 'none', width: { lg: '175px', xs: '80px'}, fontSize: {lg: '20px', xs: '14px'}, height: '56px', position: 'absolute', right: 0}} 
              onClick={handleSearch}
            >
              Search
            </Button>
        </Box>

        <Box sx={{ position: 'relative', width: '100%', p: '20px'}}> 
          <HorizontalScrollBar  data= {bodyParts} bodyPart={bodyPart} setBodyPart={setBodyPart}/>
        </Box>

    </Stack>
  )
}

export default SearchExercises