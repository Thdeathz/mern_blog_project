import { Box, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Navbar from '../Navbar'
import { FriendListWidget, MyPostWidget, PostsWidget, UserWidget } from '../Widgets'

const ProfilePage = () => {
  const [user, setUser] = useState(null)
  const { userId } = useParams()
  const token = useSelector(state => state.token)
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)')

  useEffect(() => {
    document.title = 'Profile'
  }, [])
  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`http://localhost:3500/users/${userId}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await response.json()
      setUser({ ...data })
    }

    return () => getUser()
  }, [userId])
  return (
    <Box>
      <Navbar />
      {!user ? (
        <p> Loading</p>
      ) : (
        <Box
          width="100%"
          padding="2rem"
          display={isNonMobileScreens ? 'flex' : 'block'}
          gap="2rem"
          justifyContent="Center"
        >
          <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
            <UserWidget userId={userId} picturePath={user.picturePath} />
            <Box m="2rem 0" />
            <FriendListWidget userId={userId} />
          </Box>
          <Box
            flexBasis={isNonMobileScreens ? '42%' : undefined}
            mt={isNonMobileScreens ? undefined : '2rem'}
          >
            <MyPostWidget picturePath={user.picturePath} />
            <PostsWidget userId={userId} />
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default ProfilePage
