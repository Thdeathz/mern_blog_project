import { Box, ButtonBase, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { UserImage } from '~/components'
import { selectCurrentUser } from '~/redux/authSlice'

const EachUserMessage = () => {
  const { firstName, lastName, picturePath } = useSelector(selectCurrentUser)

  const { palette } = useTheme()
  const medium = palette.neutral.medium

  return (
    <ButtonBase
      sx={{
        width: '100%',
        display: 'flex',
        gap: '0.75rem',
        padding: '0.75rem 0.5rem',
        borderRadius: '5px',
        '&:hover': {
          backgroundColor: medium
        }
      }}
    >
      <UserImage image={picturePath} />
      <Box display="flex" flexDirection="column" alignItems="flex-start" sx={{ flexGrow: '1' }}>
        <Typography variant="h5" fontWeight="400">{`${firstName} ${lastName}`}</Typography>
        <Typography variant="h6" fontWeight="400" sx={{ textOverflow: 'ellipsis' }}>
          Some message
        </Typography>
      </Box>
    </ButtonBase>
  )
}

export default React.memo(EachUserMessage)
