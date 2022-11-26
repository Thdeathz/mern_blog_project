import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header('Authorization')
    if (!token) return res.sendStatus(403)

    if (token.startsWith('Bearer ')) {
      token = token.split(' ')[1]
    }

    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    req.user = verified
    next()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
