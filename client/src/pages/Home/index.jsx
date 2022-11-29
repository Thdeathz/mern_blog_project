import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Box, useMediaQuery } from '@mui/material'
import Navbar from '../Navbar'
import { AdvertWidget, FriendListWidget, MyPostWidget, PostsWidget, UserWidget } from '../Widgets'
import { selectCurrentUser } from '~/redux/authSlice'

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)')
  const { _id, picturePath } = useSelector(selectCurrentUser)

  useEffect(() => {
    document.title = 'Thdeathz'
  }, [])

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem"
        display={isNonMobileScreens ? 'flex' : 'block'}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? '42%' : undefined}
          mt={isNonMobileScreens ? undefined : '2rem'}
        >
          <MyPostWidget picturePath={picturePath} />
          {/* <PostsWidget userId={_id} /> */}
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0"></Box>
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default HomePage
