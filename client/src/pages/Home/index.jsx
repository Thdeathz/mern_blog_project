import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Box, useMediaQuery } from '@mui/material'
import Navbar from '../Navbar'
import { AdvertWidget, FriendListWidget, MyPostWidget, PostsWidget, UserWidget } from '../Widgets'
import { selectCurrentUser } from '~/redux/authSlice'

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)')
  const currentUser = useSelector(selectCurrentUser)

  useEffect(() => {
    document.title = 'Thdeathz'
  }, [])

  return (
    <Box>
      {console.log('==> re-render')}
      <Navbar />
      <Box
        width="100%"
        padding="2rem"
        display={isNonMobileScreens ? 'flex' : 'block'}
        gap="0.5rem"
        justifyContent="space-between"
        position="relative"
      >
        <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
          <Box position="sticky" top="7rem">
            <UserWidget user={currentUser} />
          </Box>
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? '42%' : undefined}
          mt={isNonMobileScreens ? undefined : '2rem'}
        >
          <MyPostWidget picturePath={currentUser.picturePath} />
          <PostsWidget />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <Box
              position="sticky"
              top="7rem"
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              gap="2rem"
              height="max-content"
              sx={{}}
            >
              <AdvertWidget />
              <FriendListWidget userId={currentUser._id} />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default HomePage
