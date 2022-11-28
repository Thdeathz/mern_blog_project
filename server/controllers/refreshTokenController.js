import User from '../models/User.js'
import jwt from 'jsonwebtoken'

export const refreshToken = async (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(401)

  const refreshToken = cookies.jwt
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'None'
    // secure: true
  })

  const user = await User.findOne({ refreshToken }).exec()
  // Detected refresh token reuse
  if (!user) {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (err) return res.sendStatus(403) // Forbidden

      const hackedUser = await User.findById(decoded.id)
      hackedUser.refreshToken = []
      await hackedUser.save()
    })

    return res.sendStatus(403) // Forbidden
  }

  // gen new access and refresh token for this user
  const newRefreshTokenArray = user.refreshToken.filter(rt => rt !== refreshToken)

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      user.refreshToken = [...newRefreshTokenArray]
      await user.save()
    }

    if (err || user._id.toString() !== decoded.id) return res.sendStatus(403) // Forbidden

    // refresh token was still valid --> gen new access, refresh token
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

    // save new refresh token
    user.refreshToken = [...newRefreshTokenArray, newRefreshToken]
    await user.save()

    res.cookie('jwt', newRefreshToken, {
      httpOnly: true,
      sameSite: 'None',
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000
    })

    return res.status(200).json({ token: accessToken })
  })
}
