import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import multer from 'multer'
import helmet from 'helmet'
import morgan from 'morgan'
import connectDB from './config/dbconnect.js'
import path from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/auth.js'
import refreshRoutes from './routes/refresh.js'
import userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'
import { verifyToken } from './middleware/verifyJWT.js'
// import User from './models/User.js'
// import Post from './models/Post.js'
// import { users, posts } from './data/index.js'

/* CONFIGURATIONS */
// config to use __dirname when use type = module
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()
const app = express()

// connect to database
const PORT = process.env.PORT || 8080
connectDB()

// build-in middleware for json
app.use(express.json())

// middleware for cookies
app.use(cookieParser())

app.use(helmet())
app.use(
  helmet.crossOriginResourcePolicy({
    policy: 'cross-origin'
  })
)
app.use(morgan('comman'))
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

// serve static file
app.use('/assets', express.static(path.join(__dirname, '/public/assets')))

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage })

/* ROUTES */
app.use('/auth', authRoutes)
app.use('/refresh', refreshRoutes)

app.use(verifyToken)
app.use('/users', userRoutes)
app.use('/posts', postRoutes)

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

  // Insert fake data
  // User.insertMany(users)
  // Post.insertMany(posts)
})
