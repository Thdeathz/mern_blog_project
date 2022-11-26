import { Box, Typography, useTheme } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Friend, WidgetWrapper } from '~/components'
import { setFriends } from '~/redux/authSlice'

// eslint-disable-next-line react/prop-types
const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch()
  const { palette } = useTheme()
  const token = useSelector(state => state.token)
  const friends = useSelector(state => state.user.friends)

  useEffect(() => {
    const getFriends = async () => {
      const response = await fetch(`http://localhost:3500/users/${userId}/friends`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
      })

      const data = await response.json()
      dispatch(setFriends({ friends: data }))
    }

    return () => getFriends()
  }, [])

  return (
    <WidgetWrapper>
      <Typography color={palette.neutral.dark} variant="h5" fontWeight="500" sx={{ mb: '1.5rem' }}>
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends?.map(friend => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
        {friends.length === 0 && (
          <Typography
            sx={{
              color: palette.neutral.medium
            }}
          >
            {`No friends ><!`}
          </Typography>
        )}
      </Box>
    </WidgetWrapper>
  )
}

export default FriendListWidget
