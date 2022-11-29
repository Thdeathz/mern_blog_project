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
    logout: (state, action) => {
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
    refresh: builder.mutation({
      query: () => ({
        url: '/refresh',
        method: 'GET'
      })
    })
  })
})

// RTK api call
export const { useLoginMutation, useRefreshMutation } = authApiSlice

export const { setCredentials, logout } = authSlice.actions

export default authSlice.reducer

// Selector
export const selectCurrentUser = state => state.auth.user
export const selectCurrentToken = state => state.auth.token
