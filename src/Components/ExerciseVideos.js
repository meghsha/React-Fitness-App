import React from 'react'
import { Typography, Box, Stack } from '@mui/material'

const ExerciseVideos = ({exerciseVideoData, name}) => {

  // console.log(exerciseVideoData);
  // console.log(name)
  return (
    <Box sx={{ marginTop: {lg: '10rem', xs: '20px'}, ml: '1rem' }} p='20px'>
      <Typography variant='h4' mb='33px'>
        Watch <span style={{ color: '#ff2625', textTransform:'capitalize'}}>{name}</span> Exercise Videos
      </Typography>

      <Stack style={{ marginBottom: "2rem" }} justifyContent={'flex-start'} flexWrap={'wrap'} alignItems={'center'}
        sx={{
          flexDirection: { lg: 'row', xs: 'column' },
          columnGap: { lg: '110px', xs: '0' },
          rowGap: { lg: '4rem', xs: '20px' },
        }}
      >
        {exerciseVideoData?.slice(0, 6).map((item, index) => (
          <a 
            key={index}
            className='exercise-video'
            href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
            target="_blank"
            rel='noreferrer'
          > 
           
            <img  style={{
              borderTopLeftRadius: '2rem',
              overflow: 'hidden',
            }} src={item.video.thumbnails[0].url} alt={item.video.title}/>
            <Typography variant='h6' align='center' color='#000'>
            {item.video.title}
            </Typography>
            {/* <Typography variant='h6' align='center' color='#000'>
            {item.video.channelName}
            </Typography> */}
          </a>
        ))}
      </Stack>
    </Box>
  )
}

export default ExerciseVideos