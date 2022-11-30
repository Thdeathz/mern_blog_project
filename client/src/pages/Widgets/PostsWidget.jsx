import React from 'react'
import { useSelector } from 'react-redux'
import { selectPostIds, useGetPostsQuery } from '~/redux/postsSlice'
import PostWidget from './PostWidget'

// eslint-disable-next-line react/prop-types
const PostsWidget = ({ userId, isProfile = false }) => {
  const { isLoading, isSuccess, isError, error } = useGetPostsQuery()
  const postsIds = useSelector(selectPostIds)

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {postsIds.map(id => (
            <PostWidget key={id} postId={id} />
          ))}
        </>
      )}
    </>
  )
}

export default PostsWidget
