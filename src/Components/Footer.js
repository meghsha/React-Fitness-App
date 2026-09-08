import React from 'react';
import { Box, Typography } from '@mui/material';

import Logo from '../assets/images/Logo-1.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: '#f8f9fa',
        pt: 4,
        pb: 3,
        mt: 5,
        textAlign: 'center',
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ mb: 2 }}
      >
        © {new Date().getFullYear()} | Fitness App. All rights reserved.
      </Typography>
      <Link to='/'>
      <img
        src={Logo}
        alt="Fitness App logo"
        style={{
          width: '10rem',
          height: 'auto',
        }}
      />
      </Link>
    </Box>
  );
};

export default Footer;