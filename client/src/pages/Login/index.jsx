import React, { useEffect } from 'react'
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import Form from './Form'

const LoginPage = () => {
  const theme = useTheme()
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)')

  useEffect(() => {
    document.title = 'Login'
  }, [])
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{
        overflow: 'hidden'
      }}
    >
      <Box
        width={isNonMobileScreens ? '50%' : '93%'}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Box
          width="100%"
          backgroundColor={theme.palette.background.alt}
          p="0 6% 1rem 6%"
          textAlign="center"
        >
          <Typography fontWeight="bold" fontSize="32px" color="primary">
            Thdeathz
          </Typography>
        </Box>
        <Typography fontWeight="500" variant="h5" sx={{ mb: 1 }}>
          Hello👋👋👋
        </Typography>
        <Form isLogin={true} />
      </Box>
    </Box>
  )
}

export default LoginPage
