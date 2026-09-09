import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import ExerciseCard from './ExerciseCard';

import LeftArrowIcon from '../assets/icons/left-arrow.png';
import RightArrowIcon from '../assets/icons/right-arrow.png';

const LeftArrow = () => {
  const { scrollPrev } = React.useContext(VisibilityContext);

  return (
    <Box
      onClick={() => scrollPrev()}
      className="similar-left-arrow"
      sx={{
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src={LeftArrowIcon}
        alt="left-arrow"
        style={{
          width: '28px',
          height: '28px',
        }}
      />
    </Box>
  );
};

const RightArrow = () => {
  const { scrollNext } = React.useContext(VisibilityContext);

  return (
    <Box
      onClick={() => scrollNext()}
      className="similar-right-arrow"
      sx={{
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src={RightArrowIcon}
        alt="right-arrow"
        style={{
          width: '28px',
          height: '28px',
        }}
      />
    </Box>
  );
};

const SimilarExercises = ({ targetExercise, equipmentExercise }) => {
  // Deduplicate exercises across both arrays to avoid showing the same exercise twice
  const allExercises = [...equipmentExercise, ...targetExercise];
  const seen = new Set();
  const uniqueExercises = allExercises.filter(exercise => {
    if (seen.has(exercise.id)) {
      return false;
    }
    seen.add(exercise.id);
    return true;
  });
  
  const equipmentSeen = new Set();
  const filteredEquipment = equipmentExercise.filter(exercise => {
    if (equipmentSeen.has(exercise.id)) {
      return false;
    }
    equipmentSeen.add(exercise.id);
    return true;
  });
  
  const targetSeen = new Set();
  const filteredTarget = targetExercise.filter(exercise => {
    // Skip if already in equipmentSeen (to avoid duplicate)
    if (equipmentSeen.has(exercise.id) || targetSeen.has(exercise.id)) {
      return false;
    }
    targetSeen.add(exercise.id);
    return true;
  });

  return (
    <Box sx={{ ml: '1rem' }}>
      {/* Equipment Row */}
      {filteredEquipment.length > 0 && (
        <Box sx={{ mb: '40px' }}>
          <Typography variant='h4' ml="1rem" mb='24px'  color='#333' sx={{ textAlign: 'left' }}>
            Exercises that use the same Equipment
          </Typography>
          <ScrollMenu 
            LeftArrow={<LeftArrow />} 
            RightArrow={<RightArrow />}
          >
            {filteredEquipment.map((exercise) => (
              <Box key={exercise.id} itemId={exercise.id} title={exercise.id} sx={{ minWidth: {
                  xs: '280px',
                  sm: '320px',
                  md: '350px',
                }, m: '0 16px' }}>
                <ExerciseCard movement={exercise} />
              </Box>
            ))}
          </ScrollMenu>
        </Box>
      )}
      
      {/* Target Row */}
      {filteredTarget.length > 0 && (
        <Box sx={{ mb: '40px' }}>
          <Typography variant='h4' ml="1rem" mb='24px' color='#333' sx={{ textAlign: 'left' }}>
            Exercises that target the same Muscle group
          </Typography>
          <ScrollMenu 
            LeftArrow={<LeftArrow />} 
            RightArrow={<RightArrow />}
          >
            {filteredTarget.map((exercise) => (
              <Box key={exercise.id} itemId={exercise.id} title={exercise.id} sx={{ minWidth: '180px', m: '0 16px' }}>
                <ExerciseCard movement={exercise} />
              </Box>
            ))}
          </ScrollMenu>
        </Box>
      )}
    </Box>
  );
};

export default SimilarExercises;
