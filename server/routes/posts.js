import express from 'express'
import upload from '../config/fileStorage.js'
import { createPost, getFeedPosts, getUserPosts, likePost } from '../controllers/postsController.js'

const router = express.Router()

/* CREATE */
router.post('/', upload.single('picture'), createPost)

/* READ */
router.get('/', getFeedPosts)
router.get('/:userId/posts', getUserPosts)

/* UPDATE */
router.patch('/:id/like', likePost)

export default router
