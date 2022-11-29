import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, picturePath, friends, location, occupation } =
      req.body

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !picturePath ||
      !friends ||
      !location ||
      !occupation
    )
      return res.sendStatus(400)

    const duplicate = await User.findOne({ email }).exec()
    if (duplicate) return res.status(409) // conflict

    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000)
    })
    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

/* LOGIN */
export const login = async (req, res) => {
  try {
    const cookies = req.cookies
    const { email, password } = req.body
    if (!email || !password)
      return res.status(400).json({ message: 'Email and password are required.' })

    const user = await User.findOne({ email: email }).exec()
    if (!user) return res.status(401).json({ message: 'User does not exist.' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ message: 'Invaild password.' })

    // gen new access and refresh token
    const accessToken = jwt.sign(
      {
        id: user._id
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '60s' }
    )
    const newRefreshToken = jwt.sign(
      {
        id: user._id
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    )

    // remove unuse refresh token
    let newRefreshTokenArray = !cookies?.jwt
      ? user.refreshToken
      : user.refreshToken.filter(rt => rt !== cookies.jwt)
    if (cookies?.jwt) {
      const refreshToken = cookies.jwt
      const user = await User.findOne({ refreshToken }).exec()

      // Detected refresh token reuse
      if (!user) newRefreshTokenArray = []

      res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'None',
        secure: true
      })
    }

    // saving refresh token with current user
    user.refreshToken = [...newRefreshTokenArray, newRefreshToken]
    const result = await user.save()

    res.cookie('jwt', newRefreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000
    })

    res.status(200).json({
      token: accessToken,
      user: {
        _id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        picturePath: result.picturePath,
        friends: result.friends,
        location: result.location,
        occupation: result.occupation,
        viewedProfile: result.viewedProfile,
        impressions: result.impressions
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const logout = async (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(204) // No content

  const refreshToken = cookies.jwt

  // check refresh token in database
  const user = await User.findOne({ refreshToken }).exec()
  if (!user) {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'None',
      secure: true
    })
    return res.sendStatus(403) // Forbidden
  }

  // delte refresh token in database
  user.refreshToken = user.refreshToken.filter(rt => rt !== refreshToken)
  await user.save()

  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'None',
    secure: true
  })

  res.status(200).json({ message: 'Logout successfully.' })
}
