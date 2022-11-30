import { createSlice } from '@reduxjs/toolkit'
import { apiSlice } from '~/api/apiSlice'

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload
      state.user = user
      state.token = token
    },
    setFriends: (state, action) => {
      state.user.friends = action.payload
    },
    setLogout: (state, action) => {
      state.user = null
      state.token = null
    }
  }
})

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/auth/login',
        method: 'POST',
        body: { ...credentials }
      })
    }),
    register: builder.mutation({
      query: newUserData => ({
        url: '/auth/register',
        method: 'POST',
        body: newUserData
      })
    }),
    refresh: builder.mutation({
      query: () => ({
        url: '/refresh',
        method: 'GET'
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'GET'
      })
    })
  })
})

// RTK api call
export const { useLoginMutation, useRegisterMutation, useRefreshMutation, useLogoutMutation } =
  authApiSlice

export const { setCredentials, setFriends, setLogout } = authSlice.actions

export default authSlice.reducer

// Selector
export const selectCurrentUser = state => state.auth.user
export const selectCurrentToken = state => state.auth.token
