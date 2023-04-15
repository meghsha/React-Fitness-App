import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Stack, Typography } from '@mui/material';

const ExerciseCard = ({ movement}) => {
  return (
    <Link className='exercise-card' to={`/orange/${movement.id}`}>
        <img src={movement.gifUrl} alt={movement.name} loading='lazy'/>
        <Stack direction='row'>
            <Button sx={{ ml: '21px', color: '#fff', background: '#ee99a9', fontSize: '16px', borderRadius: '20px', textTransform: 'capitalize'}}>
                {movement.target}
            </Button>
            <Button sx={{ ml: '21px', color: '#fff', background: '#fcc757', fontSize: '16px', borderRadius: '20px', textTransform: 'capitalize'}}>
                {movement.bodyPart}
            </Button>
            <Button sx={{ ml: '21px', color: '#fff', background: '#faa157', fontSize: '16px', borderRadius: '20px', textTransform: 'capitalize'}}>
                {movement.equipment}
            </Button>
        </Stack>
        <Typography ml='21px' color="#000" fontWeight='bold' mt='11px'
            pb='5px' textTransform='capitalize' fontSize='20px'
        >
            {movement.name}
        </Typography>
    </Link>
  )
}

export default ExerciseCard