import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentToken } from '~/redux/authSlice'
import { setPosts } from '~/redux/userSlice'
import PostWidget from './PostWidget'

// eslint-disable-next-line react/prop-types
const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch()
  const posts = useSelector(state => state.user.posts)
  const token = useSelector(selectCurrentToken)

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch('http://localhost:3500/posts', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
      })

      const data = await response.json()
      dispatch(setPosts({ posts: data }))
    }

    const getUserPosts = async () => {
      const response = await fetch(`http://localhost:3500/posts/${userId}/posts`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
      })

      const data = await response.json()
      dispatch(setPosts({ posts: data }))
    }

    return () => {
      if (isProfile) {
        getUserPosts()
      } else {
        getPosts()
      }
    }
  }, [])

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  )
}

export default PostsWidget
