import { LogoutOutlined } from '@mui/icons-material'
import { Box, ButtonBase, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IconPopover, UserImage } from '~/components'
import { setLogout, useLogoutMutation } from '~/redux/authSlice'

// eslint-disable-next-line react/prop-types
const UserMenu = ({ userId, fullname, avatar }) => {
  const { palette } = useTheme()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [logout, { isLoading }] = useLogoutMutation()
  const medium = palette.neutral.medium

  const handleLogout = async () => {
    try {
      await logout()
      dispatch(setLogout())
      navigate('/login')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <IconPopover icon={<UserImage image={avatar} size="35px" />} style={{ padding: '0px' }}>
      <Box display="flex" flexDirection="column" gap="0.75rem" sx={{ padding: '1rem' }}>
        <ButtonBase
          sx={{
            padding: '0.5rem 1rem',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.2)',
            borderRadius: '5px',
            '&:hover': {
              backgroundColor: medium
            }
          }}
          onClick={() => navigate(`/profile/${userId}`)}
        >
          <UserImage image={avatar} size="30x" />
          <Typography sx={{ fontSize: '1rem', marginLeft: '10px', fontWeight: '500' }}>
            {fullname}
          </Typography>
        </ButtonBase>
        <ButtonBase
          sx={{
            paddingY: '0.5rem',
            borderRadius: '5px',
            '&:hover': {
              backgroundColor: medium
            }
          }}
          onClick={handleLogout}
        >
          <Box width="100%" display="flex" alignItems="center" gap="4px" px="4px">
            <LogoutOutlined />
            <Typography sx={{ fontSize: '1rem', fontWeight: '500' }}>Log Out</Typography>
          </Box>
        </ButtonBase>
      </Box>
    </IconPopover>
  )
}

export default React.memo(UserMenu)
