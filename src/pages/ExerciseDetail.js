import { useEffect, useState } from 'react'
import React from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material';
import Detail from '../Components/Detail';
import SimilarExercises from '../Components/SimilarExercises';
import ExerciseVideos from '../Components/ExerciseVideos';
import {exerciseOptions, youtubeOptions, fetchData} from '../utils/fetchData'

const ExerciseDetail = () => {

  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideoData, setexerciseVideoData] = useState([]);
  const [targetExercise, settargetExercise] = useState([]);
  const [equipmentExercise, setequipmentExercise] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchExercisesData = async () => {
      const youtubeSearchDataUrl = 'https://youtube-search-and-download.p.rapidapi.com'
      const exerciseDetailUrl = 'https://exercisedb.p.rapidapi.com'

      const exerciseDetailData = await fetchData(`${exerciseDetailUrl}/exercises/exercise/${id}`, exerciseOptions)
      setExerciseDetail(exerciseDetailData);

      const exerciseVideosData = await fetchData(`${youtubeSearchDataUrl}/search?query=${exerciseDetailData.name}`, youtubeOptions);
      setexerciseVideoData(exerciseVideosData.contents);

      const exerciseTargetData = await fetchData(`${exerciseDetailUrl}/exercises/target/${exerciseDetailData.target}`, exerciseOptions)
      settargetExercise(exerciseTargetData);

      const exerciseEquipmentData = await fetchData(`${exerciseDetailUrl}/exercises/equipment/${exerciseDetailData.equipment}`, exerciseOptions)
      setequipmentExercise(exerciseEquipmentData);
      
      // console.log(exerciseTargetData)
    }

    fetchExercisesData();
  }, [id])

  console.log(exerciseDetail);

  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos exerciseVideoData={exerciseVideoData} name={exerciseDetail.name} />
      <SimilarExercises targetExercise={targetExercise} equipmentExercise={equipmentExercise} />
    </Box>
  )
}

export default ExerciseDetail