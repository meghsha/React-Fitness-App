import React from 'react';
import { Typography, Stack, Button } from '@mui/material';
import { useExerciseImage } from '../utils/useExerciseImage';

import BodyPartImage from '../assets/icons/body-part.png';
import TargetImage from '../assets/icons/target.png';
import EquipmentImage from '../assets/icons/equipment.png';

const Detail = ({exerciseDetail}) => {
  const { imageUrl, loading } = useExerciseImage(exerciseDetail.id, 720);

  const { bodyPart, id, name, target, equipment } = exerciseDetail;

  const extraDetails = [
    {
      icons: BodyPartImage,
      name: bodyPart
    },
    {
      icons: TargetImage,
      name: target
    },
    {
      icons: EquipmentImage,
      name: equipment
    }
  ];

  return (
    <Stack 
      gap='60px' 
      sx={{ flexDirection: {lg : 'row'}, p:'20px', alignItems:'center' }}
    >
      {loading ? (
        <div style={{ 
          width: '100%', 
          minHeight: '300px', 
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
          alt={name} 
          loading='lazy' 
          className='detail-image'
          style={{ 
            width: '100%', 
            height: 'auto', 
            display: 'block',
            maxWidth: '100%' 
          }} 
        />
      ) : (
        <div style={{ 
          width: '100%', 
          minHeight: '300px', 
          backgroundColor: '#e0e0e0', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: '#666'
        }}>
          No Image
        </div>
      )}
      <Stack sx={{ gap: {lg: '35px', xs: '20px'} }}>
        <Typography variant='h4'>
          {name}
        </Typography>
        <Typography variant='h6'>
          The exercise is called {name}, which specifically targets {target} and keeps you in High spirits and imroves your overall health. {equipment} is the best machine to perform this phenominal exercise.
        </Typography>
        {extraDetails.map((item) => {
          return <Stack direction='row' gap='24px' key={item.name} alignItems='center'>
            <Button sx={{background: '#fff2db', borderRadius: '50%', width: '100px', height: '50px'}}>
              <img src={item.icons} alt={bodyPart} style={{ width: '50px', height: '50px'}} />
            </Button>
            <Typography variant='h5' textTransform='capitalize'>
              {item.name}
            </Typography>
          </Stack>;
        })}
      </Stack>
    </Stack>
  );
};

export default Detail;
