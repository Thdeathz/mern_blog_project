import React from 'react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Dropzone from 'react-dropzone'
import { Box, Button, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { FlexBetween } from '~/components'
import { setCredentials, useLoginMutation, useRegisterMutation } from '~/redux/authSlice'
import useStorage from '~/hooks/useStorage'

const registerSchema = yup.object().shape({
  firstName: yup.string().required('required'),
  lastName: yup.string().required('required'),
  email: yup.string().email('invaild email').required('required'),
  password: yup.string().required('required'),
  location: yup.string().required('required'),
  occupation: yup.string().required('required')
})

const loginSchema = yup.object().shape({
  email: yup.string().email('invaild email').required('required'),
  password: yup.string().required('required')
})

const initialValuesRegister = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  location: '',
  occupation: '',
  picture: ''
}

const initialValuesLogin = {
  email: '',
  password: ''
}

// eslint-disable-next-line react/prop-types
const Form = ({ isLogin, isRegister }) => {
  const { palette } = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isNonMobileScreens = useMediaQuery('(min-width:600px)')
  const uploadFile = useStorage()
  const [login, { isLoading }] = useLoginMutation()
  const [register, { isLoading: registerLogin }] = useRegisterMutation()

  const handleRegister = async (values, onSubmitProps) => {
    try {
      if (values.picture) {
        const imageUrl = await uploadFile(values.picture)
        await register({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          location: values.location,
          occupation: values.occupation,
          picturePath: imageUrl
        }).unwrap()
      } else {
        await register({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          location: values.location,
          occupation: values.occupation
        }).unwrap()
      }

      onSubmitProps.resetForm()
      navigate('/login')
    } catch (error) {
      console.error(error)
    }
  }

  const handleLogin = async (values, onSubmitProps) => {
    const loggedInUser = await login(values).unwrap()

    onSubmitProps.resetForm()
    if (loggedInUser) {
      dispatch(
        setCredentials({
          token: loggedInUser.token,
          user: loggedInUser.user
        })
      )
      navigate('/')
    }
  }

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await handleLogin(values, onSubmitProps)
    if (isRegister) await handleRegister(values, onSubmitProps)
  }
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              '& > div': {
                gridColumn: isNonMobileScreens ? undefined : 'span 4'
              }
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  sx={{
                    gridColumn: 'span 2'
                  }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{
                    gridColumn: 'span 2'
                  }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{
                    gridColumn: 'span 4'
                  }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                  helperText={touched.occupation && errors.occupation}
                  sx={{
                    gridColumn: 'span 4'
                  }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={acceptedFiles => setFieldValue('picture', acceptedFiles[0])}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{
                          '&:hover': {
                            cursor: 'pointer'
                          }
                        }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{
                gridColumn: 'span 4'
              }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{
                gridColumn: 'span 4'
              }}
            />
          </Box>

          {/* BUTTON */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: '2rem 0',
                p: '1rem',
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                '&:hover': {
                  color: palette.primary.main
                }
              }}
            >
              {isLogin ? 'LOGIN' : 'REGISTER'}
            </Button>
            <Typography
              onClick={() => {
                isLogin ? navigate('/register') : navigate('/login')
                resetForm()
              }}
              sx={{
                textDecoration: 'underline',
                colot: palette.primary.main,
                '&:hover': {
                  cursor: 'pointer',
                  colot: palette.primary.light
                }
              }}
            >
              {isLogin ? "Don't have account? Sign Up here." : 'Already have account ? Login here'}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  )
}

export default Form
