import express from 'express'
import upload from '../config/fileStorage.js'
import { createPost, getFeedPosts, getUserPosts, likePost } from '../controllers/postsController.js'
import { verifyToken } from '../middleware/verifyJWT.js'

const router = express.Router()

/* CREATE */
router.post('/', verifyToken, upload.single('picture'), createPost)

/* READ */
router.get('/', verifyToken, getFeedPosts)
router.get('/:userId/posts', verifyToken, getUserPosts)

/* UPDATE */
router.patch('/:id/like', verifyToken, likePost)

export default router
