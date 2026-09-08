import React from 'react';
import { Box, Typography, Stack, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgColor: '#f8f9fa', pt: 4, pb: 3, mt: 5 }}>
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
        {'© '}
        {new Date().getFullYear()}
        {"| Fitness App. All rights reserved."}
      </Typography>
    </Box>
  );
};

export default Footer;
