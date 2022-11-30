import { Box, IconButton, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UserImage from './UserImage'
import FlexBetween from './FlexBetween'
import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material'
import { setFriends, selectCurrentUser } from '~/redux/authSlice'
import {
  selectFriendIds,
  useAddRemoveFriendMutation,
  useGetFriendsQuery
} from '~/redux/friendsSlice'

// eslint-disable-next-line react/prop-types
const Friend = ({ friendId, name, subtitle, userPicturePath, me = false }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [addRemoveFriend] = useAddRemoveFriendMutation()
  const { _id, friends } = useSelector(selectCurrentUser)

  const { palette } = useTheme()
  const primaryLight = palette.primary.light
  const primaryDark = palette.primary.dark
  const main = palette.neutral.main
  const medium = palette.neutral.medium

  const isFriend = Boolean(friends.find(id => id === friendId))

  const patchFriend = async () => {
    try {
      const res = await addRemoveFriend({
        userId: _id,
        friendId: friendId
      }).unwrap()
      if (res) {
        const newFriendsIds = res.map(friend => friend.id)
        dispatch(setFriends(newFriendsIds))
      }
    } catch (error) {
      console.error(error)
    }
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
      {!me && (
        <IconButton
          onClick={() => patchFriend()}
          sx={{ backgroundColor: primaryLight, p: '0.6rem' }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}
    </FlexBetween>
  )
}

export default Friend
