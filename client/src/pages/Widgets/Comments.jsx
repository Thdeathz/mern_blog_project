/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Box, Divider, InputBase, Typography, useTheme } from '@mui/material'
import { FlexBetween, IconPopover, UserImage } from '~/components'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useSelector } from 'react-redux'
import { SentimentSatisfiedAltOutlined } from '@mui/icons-material'

const Comments = ({ userPicturePath, comments }) => {
  const { palette } = useTheme()
  const theme = useSelector(state => state.setting.mode)
  const [comment, setComment] = useState('')

  return (
    <Box mt="0.5rem">
      {console.log('===> comment re-render')}
      <Divider
        sx={{
          marginY: '0.5rem'
        }}
      />
      <FlexBetween gap="0.75rem" sx={{ alignItems: 'flex-start' }}>
        <UserImage image={userPicturePath} size="45px" />
        <Box
          width="100%"
          display="flex"
          style={{
            backgroundColor: palette.neutral.light,
            borderRadius: '1rem',
            padding: '0.25rem 1rem'
          }}
        >
          <InputBase
            placeholder="Enter your comment..."
            multiline
            value={comment}
            onChange={e => setComment(e.target.value)}
            sx={{ flexGrow: '1' }}
          />
          <IconPopover icon={<SentimentSatisfiedAltOutlined fontSize="medium" />}>
            <Picker
              theme={theme}
              data={data}
              onEmojiSelect={e => setComment(`${comment}${e.native}`)}
            />
          </IconPopover>
        </Box>
      </FlexBetween>

      <Box display="flex" flexDirection="column" gap="0.75rem" mt="0.5rem">
        {comments?.map((comment, index) => (
          <Box
            key={`comment-${index}`}
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-start"
            gap="0.75rem"
          >
            <UserImage image={''} size="45px" />
            <Box
              sx={{
                backgroundColor: palette.neutral.light,
                borderRadius: '1rem',
                padding: '0.5rem 1rem'
              }}
            >
              <Typography fontSize="small">Author</Typography>
              <Typography fontSize="medium" sx={{ overflowWrap: ' break-word' }}>
                {comment}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default React.memo(Comments)
