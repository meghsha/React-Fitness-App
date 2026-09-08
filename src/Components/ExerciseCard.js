import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Stack, Typography } from '@mui/material';
import { useExerciseImage } from '../utils/useExerciseImage';

const ExerciseCard = ({ movement }) => {
  const { imageUrl, loading, error } = useExerciseImage(movement.id, 360);

  return (
    <Link className='exercise-card' to={`/orange/${movement.id}`}>
      {loading ? (
        // Placeholder while loading - maintain same aspect ratio as expected
        <div style={{ 
          width: '100%', 
          minHeight: '150px', 
          backgroundColor: '#f0f0f0', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: '#999'
        }}>
          Loading...
        </div>
      ) : imageUrl ? (
        <img 
          src={imageUrl} 
          alt={movement.name} 
          loading='lazy'
          style={{ 
            display: 'block',
            maxWidth: '100%' 
          }} 
        />
      ) : (
        // Fallback if no image or error
        <div style={{ 
          width: '100%', 
          minHeight: '150px', 
          backgroundColor: '#e0e0e0', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: '#666'
        }}>
          No Image
        </div>
      )}
      <Stack direction='row'>
        <Button sx={{ ml: '21px', color: '#fff', background: '#ee99a9', fontSize: '16px', borderRadius: '20px', textTransform: 'capitalize' }}>
          {movement.target}
        </Button>
        <Button sx={{ ml: '21px', color: '#fff', background: '#fcc757', fontSize: '16px', borderRadius: '20px', textTransform: 'capitalize' }}>
          {movement.bodyPart}
        </Button>
        <Button sx={{ ml: '21px', color: '#fff', background: '#faa157', fontSize: '16px', borderRadius: '20px', textTransform: 'capitalize' }}>
          {movement.equipment}
        </Button>
      </Stack>
      <Typography ml='21px' color="#000" fontWeight='bold' mt='11px'
          pb='5px' textTransform='capitalize' fontSize='20px'
      >
          {movement.name}
      </Typography>
    </Link>
  );
};

export default ExerciseCard;
