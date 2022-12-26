import {
  BorderColorOutlined,
  Message,
  MoreHorizOutlined,
  Search,
  VideoCall,
  ZoomOutMapOutlined
} from '@mui/icons-material'
import { Box, ButtonBase, IconButton, InputBase, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { FlexBetween, IconPopover, UserImage } from '~/components'
import { selectCurrentUser } from '~/redux/authSlice'
import EachUserMessage from './EachUserMessage'

const MessagesMenu = () => {
  const { palette } = useTheme()
  const neutralLight = palette.neutral.light

  return (
    <IconPopover icon={<Message sx={{ fontSize: '25px' }} />}>
      <Box
        display="flex"
        flexDirection="column"
        gap="0.75rem"
        sx={{
          padding: '1rem',
          width: '20vw',
          maxHeight: '80vh',
          overflowY: 'auto',
          overflowX: 'hidden'
        }}
      >
        <FlexBetween>
          <Typography variant="h3" fontWeight="500">
            Chat
          </Typography>
          <FlexBetween gap="4px">
            <IconButton>
              <MoreHorizOutlined sx={{ fontSize: '20px' }} />
            </IconButton>
            <IconButton>
              <ZoomOutMapOutlined sx={{ fontSize: '20px' }} />
            </IconButton>
            <IconButton>
              <VideoCall sx={{ fontSize: '20px' }} />
            </IconButton>
            <IconButton>
              <BorderColorOutlined sx={{ fontSize: '20px' }} />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        <FlexBetween
          backgroundColor={neutralLight}
          gap="0.4rem"
          borderRadius="9999px"
          padding="0.1rem 1rem 0.1rem 0.5rem"
        >
          <Search sx={{ fontSize: '25px' }} />
          <InputBase fullWidth placeholder="Search..." sx={{ fontSize: '16px' }} />
        </FlexBetween>

        <FlexBetween flexDirection="column">
          <EachUserMessage />
          <EachUserMessage />
          <EachUserMessage />
          <EachUserMessage />
          <EachUserMessage />
          <EachUserMessage />
          <EachUserMessage />
          <EachUserMessage />
          <EachUserMessage />
          <EachUserMessage />
          <EachUserMessage />
          <EachUserMessage />
          <EachUserMessage />
        </FlexBetween>
      </Box>
      <Box py="0.75rem" sx={{ borderTop: `0.1rem solid rgba(255, 255, 255, 0.12)` }}>
        <Typography
          sx={{
            textAlign: 'center',
            cursor: 'pointer',
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          See more in Messenger
        </Typography>
      </Box>
    </IconPopover>
  )
}

export default React.memo(MessagesMenu)
