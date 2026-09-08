import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import ExerciseCard from './ExerciseCard';

const SimilarExercises = ({targetExercise, equipmentExercise}) => {
  // Combine and deduplicate exercises
  const allExercises = [...targetExercise, ...equipmentExercise];
  const uniqueExercises = Array.from(new Map(allExercises.map(item => [item.id, item])).values());
  
  // Take first 6 exercises for similarity section
  const similarExercises = uniqueExercises.slice(0, 6);

  return (
    <Box>
      {similarExercises.length > 0 && (
        <Box sx={{ mb: '40px' }}>
          <Typography variant='h5' mb='20px' color='#333' sx={{ textAlign: 'center' }}>
            Similar Exercises
          </Typography>
          <Stack 
            direction='row' 
            spacing={2} 
            sx={{ 
              overflowX: 'auto', 
              pb: '20px',
              '&::-webkit-scrollbar': { height: '8px' },
              '&::-webkit-scrollbar-track': { background: '#f1f1f1' },
              '&::-webkit-scrollbar-thumb': { background: '#888', borderRadius: '4px' }
            }}
          >
            {similarExercises.map((exercise) => (
              <ExerciseCard 
                key={exercise.id} 
                movement={exercise} 
                sx={{ minWidth: '180px', flexShrink: 0 }}
              />
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default SimilarExercises;
