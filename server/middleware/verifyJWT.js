import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401)

    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
      if (err) return res.sendStatus(403)

      res.id = decode.id
      next()
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
