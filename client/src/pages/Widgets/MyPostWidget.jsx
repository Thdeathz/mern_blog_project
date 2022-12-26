import React, { useState } from 'react'
import {
  Box,
  ButtonBase,
  ClickAwayListener,
  Divider,
  Modal,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { FlexBetween, UserImage, WidgetWrapper } from '~/components'
import {
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined
} from '@mui/icons-material'
import CreatePostModal from '~/components/CreatePostModal'

// eslint-disable-next-line react/prop-types
const MyPostWidget = ({ picturePath }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { palette } = useTheme()
  const isNonMoblieScreens = useMediaQuery('(min-width:1000px)')

  const mediumMain = palette.neutral.mediumMain
  const medium = palette.neutral.medium

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.25rem">
        <UserImage image={picturePath} size="45px" />
        <ButtonBase
          sx={{
            width: '100%',
            height: '45px',
            justifyContent: 'flex-start',
            px: '1rem',
            backgroundColor: palette.neutral.light,
            borderRadius: '50px',
            '&:hover': {
              backgroundColor: palette.neutral.medium
            }
          }}
          onClick={() => setIsOpen(true)}
        >
          {`What's on your mind...`}
        </ButtonBase>
      </FlexBetween>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(true)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <WidgetWrapper>
          <ClickAwayListener onClickAway={() => setIsOpen(false)}>
            <Box>
              <CreatePostModal setIsOpen={setIsOpen} />
            </Box>
          </ClickAwayListener>
        </WidgetWrapper>
      </Modal>

      <Divider sx={{ margin: '1.25rem 0' }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" sx={{ cursor: 'pointer' }}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{
              '&:hover': {
                color: medium
              }
            }}
          >
            Image
          </Typography>
        </FlexBetween>
        {isNonMoblieScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}
      </FlexBetween>
    </WidgetWrapper>
  )
}

export default MyPostWidget
