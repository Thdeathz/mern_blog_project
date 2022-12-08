import {
  AttachFileOutlined,
  CloseOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  SentimentSatisfiedAltOutlined
} from '@mui/icons-material'
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputBase,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/authSlice'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { FlexBetween, IconPopover, UserImage } from '.'
import Dropzone from 'react-dropzone'
import useStorage from '~/hooks/useStorage'
import { useAddNewPostMutation } from '~/redux/postsSlice'

// eslint-disable-next-line react/prop-types
const CreatePostModal = ({ isOpenImage = false, setIsOpen }) => {
  const { palette } = useTheme()
  const { _id, firstName, lastName, picturePath, occupation } = useSelector(selectCurrentUser)
  const theme = useSelector(state => state.setting.mode)
  const uploadFile = useStorage()
  const [addNewPost, { isLoading }] = useAddNewPostMutation()
  const isNonMoblieScreens = useMediaQuery('(min-width:1000px)')

  const [isImage, setIsImage] = useState(isOpenImage)
  const [image, setImage] = useState(null)

  const [post, setPost] = useState('')

  const medium = palette.neutral.medium
  const mediumMain = palette.neutral.mediumMain
  const background = palette.background.alt

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
    setIsOpen(false)
  }

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(image?.preview)
    }
  }, [image])

  return (
    <FlexBetween width="30vw" flexDirection="column">
      <Box position="relative" width="100%">
        <Typography align="center" variant="h4" fontWeight="500">
          Create Post
        </Typography>
        <IconButton
          onClick={() => setIsOpen(false)}
          sx={{
            backgroundColor: background,
            padding: '0.2rem',
            position: 'absolute',
            top: '0',
            right: '0'
          }}
        >
          <CloseOutlined sx={{ color: mediumMain }} />
        </IconButton>
      </Box>

      <Divider width="100%" sx={{ margin: '1.25rem 0' }} />

      <FlexBetween
        width="100%"
        flexDirection="column"
        gap="0.5rem"
        sx={{ alignItems: 'flex-start' }}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box
            onClick={() => {
              navigate(`/profile/${postUserId}`)
            }}
          >
            <Typography
              color={palette.neutral.main}
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
            <Typography color={medium} fontSize="0.75rem">
              {occupation}
            </Typography>
          </Box>
        </FlexBetween>

        <FlexBetween
          width="100%"
          flexDirection="column"
          sx={{ alignItems: 'flex-end', maxHeight: '50vh', overflowY: 'auto' }}
        >
          {isImage ? (
            <Box display="flex" width="100%" sx={{ flexGrow: '1' }}>
              <InputBase
                fullWidth
                multiline
                autoFocus
                onChange={e => setPost(e.target.value)}
                value={post}
                placeholder={`What's on your mind...`}
              />
              <IconPopover icon={<SentimentSatisfiedAltOutlined fontSize="medium" />}>
                <Picker
                  theme={theme}
                  data={data}
                  onEmojiSelect={e => setPost(`${post}${e.native}`)}
                />
              </IconPopover>
            </Box>
          ) : (
            <>
              <Box width="100%" minHeight="10vh" sx={{ flexGrow: '1' }}>
                <InputBase
                  fullWidth
                  multiline
                  autoFocus
                  onChange={e => setPost(e.target.value)}
                  value={post}
                  placeholder={`What's on your mind...`}
                />
              </Box>

              <IconPopover icon={<SentimentSatisfiedAltOutlined fontSize="medium" />}>
                <Picker
                  theme={theme}
                  data={data}
                  onEmojiSelect={e => setPost(`${post}${e.native}`)}
                />
              </IconPopover>
            </>
          )}

          {isImage && (
            <Box
              width="100%"
              borderRadius="5px"
              border={`1px solid ${medium}`}
              mt="1rem"
              p="0.5rem"
            >
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
                          height="20vh"
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
                        backgroundColor: background,
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
        </FlexBetween>
      </FlexBetween>

      <FlexBetween
        width="100%"
        my="0.75rem"
        p="0.75rem"
        gap="0.75rem"
        sx={{
          justifyContent: 'flex-start',
          borderRadius: '5px',
          border: '1px solid',
          borderColor: palette.neutral.light
        }}
      >
        <Typography>Add to your post</Typography>
        <Box display="flex">
          <IconButton
            onClick={() => setIsImage(true)}
            sx={{
              backgroundColor: background
            }}
          >
            <ImageOutlined sx={{ color: mediumMain }} />
          </IconButton>
          <IconButton
            sx={{
              backgroundColor: background
            }}
          >
            <GifBoxOutlined sx={{ color: mediumMain }} />
          </IconButton>
          <IconButton
            sx={{
              backgroundColor: background
            }}
          >
            <AttachFileOutlined sx={{ color: mediumMain }} />
          </IconButton>
          <IconButton
            sx={{
              backgroundColor: background
            }}
          >
            <MicOutlined sx={{ color: mediumMain }} />
          </IconButton>
        </Box>
      </FlexBetween>

      <Button
        fullWidth
        disabled={!Boolean(post)}
        onClick={handlePost}
        sx={{ backgroundColor: medium }}
      >
        {isLoading ? <CircularProgress size={21} /> : <>Post</>}
      </Button>
    </FlexBetween>
  )
}

export default React.memo(CreatePostModal)
