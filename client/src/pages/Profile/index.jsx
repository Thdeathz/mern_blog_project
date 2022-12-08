import { Box, useMediaQuery } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectCurrentToken } from '~/redux/authSlice'
import { useGetUserProfileQuery } from '~/redux/friendsSlice'
import Navbar from '../Navbar'
import { FriendListWidget, MyPostWidget, PostsWidget, UserWidget } from '../Widgets'

const ProfilePage = () => {
  const { userId } = useParams()
  const { data: user, isLoading } = useGetUserProfileQuery(userId)
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)')

  useEffect(() => {
    document.title = 'Profile'
  }, [])

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Box>
          {console.log('===>', user)}
          <Navbar />
          <Box
            width="100%"
            padding="2rem"
            display={isNonMobileScreens ? 'flex' : 'block'}
            gap="2rem"
            justifyContent="Center"
            position="relative"
          >
            <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
              <Box position="sticky" top="7rem">
                <UserWidget user={user} />
                <Box m="2rem 0" />
                <FriendListWidget userId={userId} />
              </Box>
            </Box>
            <Box
              flexBasis={isNonMobileScreens ? '42%' : undefined}
              mt={isNonMobileScreens ? undefined : '2rem'}
            >
              <MyPostWidget picturePath={user.picturePath} />
              <PostsWidget userId={userId} />
            </Box>
          </Box>
        </Box>
      )}
    </>
  )
}

export default ProfilePage
