/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import {
  ChatBubbleOutlined,
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  MoreHorizOutlined,
  ShareOutlined
} from '@mui/icons-material'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import formatDistance from 'date-fns/formatDistance'
import { FlexBetween, UserImage, WidgetWrapper } from '~/components'
import { selectCurrentUser } from '~/redux/authSlice'
import { selectPostById, usePostReactionMutation } from '~/redux/postsSlice'
import Comments from './Comments'

const PostWidget = ({ postId }) => {
  const {
    userId: postUserId,
    firstName,
    lastName,
    description,
    picturePath,
    userPicturePath,
    likes,
    comments,
    createdAt
  } = useSelector(state => selectPostById(state, postId))
  const [isComment, setIsComment] = useState(false)
  const [postReaction] = usePostReactionMutation()
  const { _id: loggedInUserId, picturePath: currentUserAvatar } = useSelector(selectCurrentUser)
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
      <FlexBetween>
        <FlexBetween gap="1rem">
          <UserImage image={userPicturePath} />
          <Box
            onClick={() => {
              navigate(`/profile/${postUserId}`)
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
              {`${firstName} ${lastName}`}
            </Typography>
            <Typography color={palette.neutral.medium} fontSize="0.75rem">
              {formatDistance(new Date(createdAt), new Date())}
            </Typography>
          </Box>
        </FlexBetween>
        <IconButton>
          <MoreHorizOutlined fontSize="large" sx={{ color: main }} />
        </IconButton>
      </FlexBetween>
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
          src={
            picturePath.startsWith('http')
              ? picturePath
              : `http://localhost:3500/assets/${picturePath}`
          }
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
              {isComment ? <ChatBubbleOutlined /> : <ChatBubbleOutlineOutlined />}
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComment && <Comments userPicturePath={currentUserAvatar} comments={comments} />}
    </WidgetWrapper>
  )
}
export default PostWidget
