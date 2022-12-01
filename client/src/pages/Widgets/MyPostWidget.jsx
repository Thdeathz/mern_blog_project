import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { useSelector } from 'react-redux'
import { FlexBetween, UserImage, WidgetWrapper } from '~/components'
import Dropzone from 'react-dropzone'
import {
  AttachFileOutlined,
  CloseOutlined,
  EditOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined
} from '@mui/icons-material'
import { selectCurrentUser } from '~/redux/authSlice'
import { useAddNewPostMutation } from '~/redux/postsSlice'
import useStorage from '~/hooks/useStorage'

// eslint-disable-next-line react/prop-types
const MyPostWidget = ({ picturePath }) => {
  const [isImage, setIsImage] = useState(false)
  const [image, setImage] = useState(null)
  const [post, setPost] = useState('')
  const uploadFile = useStorage()
  const { palette } = useTheme()
  const { _id } = useSelector(selectCurrentUser)
  const [addNewPost, { isLoading }] = useAddNewPostMutation()
  const isNonMoblieScreens = useMediaQuery('(min-width:1000px)')

  const mediumMain = palette.neutral.mediumMain
  const medium = palette.neutral.medium

  const handleUploadImage = async file => {
    if (file) {
      file.preview = URL.createObjectURL(file)
      setImage(file)
    }
  }

  const handlePost = async () => {
    if (image) {
      const imageUrl = await uploadFile(image)
      await addNewPost({
        userId: _id,
        description: post,
        picturePath: imageUrl
      }).unwrap()
    } else {
      await addNewPost({
        userId: _id,
        description: post
      }).unwrap()
    }

    setIsImage(false)
    setImage(null)
    setPost('')
  }

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(image?.preview)
    }
  }, [image])

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={e => setPost(e.target.value)}
          value={post}
          sx={{
            width: '100%',
            backgroundColor: palette.neutral.light,
            borderRadius: '2rem',
            padding: '1rem 2rem'
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box borderRadius="5px" border={`1px solid ${medium}`} mt="1rem" p="1rem">
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={acceptedFiles => handleUploadImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <Box position="relative">
                <Box
                  {...getRootProps()}
                  width="100%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="auto"
                  sx={{
                    borderRadius: '5px',
                    backgroundColor: palette.neutral.light
                  }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      height="300px"
                      width="100%"
                      sx={{
                        borderRadius: '5px',
                        '&:hover': {
                          cursor: 'pointer',
                          backgroundColor: medium
                        }
                      }}
                    >
                      <p>Add Image Here</p>
                    </Box>
                  ) : (
                    <img
                      width="100%"
                      alt="preview"
                      style={{
                        borderRadius: '5px',
                        cursor: 'pointer'
                      }}
                      src={image.preview}
                    />
                  )}
                </Box>
                <IconButton
                  onClick={() => {
                    setIsImage(false)
                    setImage(null)
                  }}
                  sx={{
                    backgroundColor: palette.background.alt,
                    padding: '0.2rem',
                    position: 'absolute',
                    top: '0.25rem',
                    right: '0.25rem'
                  }}
                >
                  <CloseOutlined sx={{ color: mediumMain }} />
                </IconButton>
              </Box>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: '1.25rem 0' }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" sx={{ cursor: 'pointer' }} onClick={() => setIsImage(!isImage)}>
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

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: '3rem'
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  )
}

export default MyPostWidget
