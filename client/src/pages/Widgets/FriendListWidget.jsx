import { Box, Typography, useTheme } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Friend, WidgetWrapper } from '~/components'
import { useGetFriendsQuery } from '~/redux/friendsSlice'

// eslint-disable-next-line react/prop-types
const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch()
  const { palette } = useTheme()
  const { data: friendsList, isLoading } = useGetFriendsQuery(userId)

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <WidgetWrapper>
          <Typography
            color={palette.neutral.dark}
            variant="h5"
            fontWeight="500"
            sx={{ mb: '1.5rem' }}
          >
            Friend List
          </Typography>
          <Box display="flex" flexDirection="column" gap="1.5rem">
            {friendsList.ids.map(id => (
              <Friend
                key={id}
                friendId={id}
                name={`${friendsList.entities[id].firstName} ${friendsList.entities[id].lastName}`}
                subtitle={friendsList.entities[id].occupation}
                userPicturePath={friendsList.entities[id].picturePath}
              />
            ))}
            {friendsList.ids.length === 0 && (
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
      )}
    </>
  )
}

export default FriendListWidget
