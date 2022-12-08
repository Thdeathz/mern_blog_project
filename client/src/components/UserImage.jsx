/* eslint-disable react/prop-types */
import React from 'react'
import { Box } from '@mui/material'
import images from '~/assets'

const UserImage = ({ image, size = '45px' }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{
          objectFit: 'cover',
          borderRadius: '50%'
        }}
        width={size}
        height={size}
        alt="user"
        src={
          image
            ? image.startsWith('http')
              ? image
              : `http://localhost:3500/assets/${image}`
            : images.defaultAvatar
        }
      />
    </Box>
  )
}

export default UserImage
