import React from 'react';
import { Box,Stack,Typography } from '@mui/material';
import Logo from '../assets/assets/images/Logo-1.png'

const Footer = () => {
  return (
    <Box>
    <Stack gap ="40px" alignItems="center" px="40px" pt="24px"> 
    <img src={Logo} alt="logo" width="200px" height="40px"/>
    <Typography variant="h5" pb="40px" mt="20px">
      Made with 💕 by vishruth
    </Typography>
    </Stack>
    </Box>
  )
}

export default Footer
