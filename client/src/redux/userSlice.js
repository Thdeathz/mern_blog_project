import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  mode: 'light',
  posts: []
}

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setMode: state => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
    },
    setLogout: state => {
      state.user = null
      state.token = null
      state.posts = []
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends
      } else {
        console.error('User friend non-existent')
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map(post => {
        if (post._id === action.payload.post._id) return action.payload.post
        return post
      })
      state.posts = updatedPosts
    }
  }
})

export const { setMode, setLogout, setFriends, setPosts, setPost } = userReducer.actions
export default userReducer.reducer
