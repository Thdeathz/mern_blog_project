import React, { useEffect } from 'react'
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import Form from '../Login/Form'

const RegisterPage = () => {
  const theme = useTheme()
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)')

  useEffect(() => {
    document.title = 'Register'
  }, [])
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Thdeathz
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? '50%' : '93%'}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: 1 }}>
          Hello👋👋👋
        </Typography>
        <Form isRegister={true} />
      </Box>
    </Box>
  )
}

export default RegisterPage
