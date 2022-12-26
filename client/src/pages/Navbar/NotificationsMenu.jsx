import { MoreHorizOutlined, Notifications } from '@mui/icons-material'
import { Box, ButtonBase, IconButton, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { FlexBetween, IconPopover } from '~/components'
import EachNotification from './EachNotification'

const NotificationsMenu = () => {
  const [selectedMenu, setSelectedMenu] = useState('all')

  const { palette } = useTheme()
  const neutralLight = palette.neutral.light
  const primaryLight = palette.primary.light
  const primaryDark = palette.primary.dark

  return (
    <IconPopover icon={<Notifications sx={{ fontSize: '25px' }} />}>
      <Box
        display="flex"
        flexDirection="column"
        gap="0.75rem"
        sx={{
          padding: '1rem',
          width: '20vw',
          maxHeight: '80vh',
          overflow: 'auto',
          overflowY: 'auto',
          overflowX: 'hidden'
        }}
      >
        <FlexBetween>
          <Typography variant="h3" fontWeight="500">
            Notifications
          </Typography>
          <FlexBetween gap="4px">
            <IconButton>
              <MoreHorizOutlined sx={{ fontSize: '20px' }} />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        <Box display="flex" justifyContent="flex-start" alignItems="center" gap="0.5rem">
          <ButtonBase
            sx={{
              backgroundColor: `${selectedMenu === 'all' ? primaryLight : null}`,
              fontSize: '1rem',
              p: '0.5rem 0.75rem',
              borderRadius: '1.2rem ',
              '&:hover': {
                backgroundColor: `${selectedMenu === 'all' ? primaryDark : neutralLight}`
              }
            }}
            onClick={() => setSelectedMenu('all')}
          >
            All
          </ButtonBase>
          <ButtonBase
            sx={{
              backgroundColor: `${selectedMenu === 'unread' ? primaryLight : null}`,
              fontSize: '1rem',
              p: '0.5rem 0.75rem',
              borderRadius: '1.2rem ',
              '&:hover': {
                backgroundColor: `${selectedMenu === 'unread' ? primaryDark : neutralLight}`
              }
            }}
            onClick={() => setSelectedMenu('unread')}
          >
            Unread
          </ButtonBase>
        </Box>

        <FlexBetween flexDirection="column">
          <FlexBetween sx={{ width: '100%' }}>
            <Typography variant="h5">Earlier</Typography>
            <ButtonBase
              sx={{
                fontSize: '1rem',
                p: '0.75rem 0.5rem',
                borderRadius: '0.2rem',
                '&:hover': {
                  backgroundColor: neutralLight
                }
              }}
            >
              See all
            </ButtonBase>
          </FlexBetween>
          <EachNotification />
          <EachNotification />
          <EachNotification />
          <EachNotification />
          <EachNotification />
          <EachNotification />
          <EachNotification />
          <EachNotification />
          <EachNotification />
          <EachNotification />
          <EachNotification />
          <EachNotification />
          <EachNotification />
          <EachNotification />
          <EachNotification />
          <EachNotification />
        </FlexBetween>
      </Box>
    </IconPopover>
  )
}

export default React.memo(NotificationsMenu)
