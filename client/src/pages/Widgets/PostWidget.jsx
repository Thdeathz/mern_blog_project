/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined
} from '@mui/icons-material'
import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { FlexBetween, WidgetWrapper } from '~/components'
import Friend from '~/components/Friend'
import { selectCurrentToken, selectCurrentUser } from '~/redux/authSlice'
import { selectPostById, usePostReactionMutation } from '~/redux/postsSlice'

const PostWidget = ({ postId }) => {
  const dispatch = useDispatch()
  const {
    userId: postUserId,
    firstName,
    lastName,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments
  } = useSelector(state => selectPostById(state, postId))
  const [isComment, setIsComment] = useState(false)
  const [postReaction] = usePostReactionMutation()
  const token = useSelector(selectCurrentToken)
  const { _id: loggedInUserId } = useSelector(selectCurrentUser)
  const isLiked = likes[loggedInUserId]
  const likeCount = Object.keys(likes).length

  const { palette } = useTheme()
  const main = palette.neutral.main
  const primary = palette.primary.main

  const patchLike = async () => {
    try {
      await postReaction({ userId: loggedInUserId, postId }).unwrap()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={`${firstName} ${lastName}`}
        subtitle={location}
        userPicturePath={userPicturePath}
        me={postUserId === loggedInUserId}
      />
      <Typography color={main} sx={{ mt: '1rem' }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{
            borderRadius: '0.75rem',
            marginTop: '0.75rem'
          }}
          src={`http://localhost:3500/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? <FavoriteOutlined sx={{ color: primary }} /> : <FavoriteBorderOutlined />}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComment(!isComment)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComment && (
        <Box mt="0.5rem">
          {comments.map((comment, index) => (
            <Box key={`${firstName}-${index}`}>
              <Divider />
              <Typography sx={{ color: main, m: '0.5rem 0', pl: '1rem' }}>{comment}</Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  )
}
export default PostWidget
