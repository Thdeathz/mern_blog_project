import Post from '../models/Post.js'
import User from '../models/User.js'

const responseFormat = posts => {
  return posts.map(
    ({
      _id,
      userId,
      firstName,
      lastName,
      location,
      description,
      userPicturePath,
      picturePath,
      likes,
      comments,
      createdAt
    }) => {
      return {
        id: _id,
        userId,
        firstName,
        lastName,
        location,
        description,
        userPicturePath,
        picturePath,
        likes,
        comments,
        createdAt
      }
    }
  )
}

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body
    const user = await User.findById(userId)
    if (!userId) return res.status(404).json({ message: 'User not found.' })
    const newPost = await Post.create({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: []
    })

    const posts = await Post.find()
    res.status(201).json(posts)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find()
    const formatedPosts = responseFormat(posts)
    res.status(200).json(formatedPosts)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params
    const posts = await Post.find({ userId })

    const formatedPosts = responseFormat(posts)
    res.status(200).json(formatedPosts)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params
    const { userId } = req.body
    const post = await Post.findById(id)
    const isLiked = post.likes.get(userId)

    if (isLiked) {
      post.likes.delete(userId)
    } else {
      post.likes.set(userId, true)
    }
    const updatedPost = await Post.findByIdAndUpdate(id, { likes: post.likes }, { new: true })

    res.status(200).json(updatedPost)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
