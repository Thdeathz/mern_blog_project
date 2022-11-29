import { Box, IconButton, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setFriends } from '~/redux/userSlice'
import UserImage from './UserImage'
import FlexBetween from './FlexBetween'
import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material'
import { selectCurrentToken, selectCurrentUser } from '~/redux/authSlice'

// eslint-disable-next-line react/prop-types
const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { _id, friends } = useSelector(selectCurrentUser)
  const token = useSelector(selectCurrentToken)

  const { palette } = useTheme()
  const primaryLight = palette.primary.light
  const primaryDark = palette.primary.dark
  const main = palette.neutral.main
  const medium = palette.neutral.medium

  const isFriend = Boolean(friends.find(friend => friend._id === friendId))

  const patchFriend = async () => {
    const response = await fetch(`http://localhost:3500/users/${_id}/${friendId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()
    dispatch(setFriends({ friends: data }))
  }

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`)
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              '&:hover': {
                cursor: 'pointer',
                color: palette.primary.light
              }
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton onClick={() => patchFriend()} sx={{ backgroundColor: primaryLight, p: '0.6rem' }}>
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </FlexBetween>
  )
}

export default Friend
