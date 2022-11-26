import express from 'express'
import upload from '../config/fileStorage.js'
import { register, login } from '../controllers/authController.js'

const router = express.Router()
router.post('/register', upload.single('picture'), register)
router.post('/login', login)

export default router
