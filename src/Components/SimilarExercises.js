import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import ExerciseCard from './ExerciseCard';
import LeftArrowIcon from '../assets/icons/left-arrow.png';
import RightArrowIcon from '../assets/icons/right-arrow.png';

const LeftArrow = () => {
  const { scrollPrev } = React.useContext(VisibilityContext);
  return (
    <Typography onClick={() => scrollPrev()} sx={{ px: 2 }}>
      <img src={LeftArrowIcon} alt="left-arrow" style={{ width: '24px', height: '24px' }} />
    </Typography>
  );
};

const RightArrow = () => {
  const { scrollNext } = React.useContext(VisibilityContext);
  return (
    <Typography onClick={() => scrollNext()} sx={{ px: 2 }}>
      <img src={RightArrowIcon} alt="right-arrow" style={{ width: '24px', height: '24px' }} />
    </Typography>
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
  
  // Split into two rows: first half for equipment, second half for target? 
  // But we want to show exercises that use the same equipment (from equipmentExercise) and 
  // exercises that target the same muscle group (from targetExercise) separately.
  // However, we must avoid duplicates: an exercise that is in both arrays should only appear once, 
  // but in which row? We'll show it in the equipment row first, and then skip in target row? 
  // Actually, we want to show the equipmentExercise array (without duplicates) in the first row and 
  // the targetExercise array (without duplicates and excluding those already shown in equipment row) in the second row.
  
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
    <Box>
      {/* Equipment Row */}
      {filteredEquipment.length > 0 && (
        <Box sx={{ mb: '40px' }}>
          <Typography variant='h5' mb='24px' color='#333' sx={{ textAlign: 'center' }}>
            Exercises that use the same Equipment
          </Typography>
          <ScrollMenu 
            LeftArrow={<LeftArrow />} 
            RightArrow={<RightArrow />}
          >
            {filteredEquipment.map((exercise) => (
              <Box key={exercise.id} itemId={exercise.id} title={exercise.id} sx={{ minWidth: '180px', m: '0 16px' }}>
                <ExerciseCard movement={exercise} />
              </Box>
            ))}
          </ScrollMenu>
        </Box>
      )}
      
      {/* Target Row */}
      {filteredTarget.length > 0 && (
        <Box sx={{ mb: '40px' }}>
          <Typography variant='h5' mb='24px' color='#333' sx={{ textAlign: 'center' }}>
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
