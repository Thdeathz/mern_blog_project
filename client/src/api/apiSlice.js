import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://127.0.0.1:3500',
  credentials: 'include',
  keepUnusedDataFor: '30s',
  prepareHeaders: (headers, { getState }) => {
    headers.set('Content-Type', 'application/json')
    const token = getState().auth.token
    if (token) {
      headers.set('Authorization', 'Bearer ' + token)
    }
    return headers
  }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.originalStatus === 403) {
    // get new refresh token
    const refreshResult = await baseQuery('/refresh', api, extraOptions)
    if (refreshResult) {
      // store new access token
      api.dispatch(
        setCredentials({
          token: refreshResult.token,
          user: refreshResult.user
        })
      )
      // retry query with new access token
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logout())
    }
  }

  return result
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Auth', 'Post', 'Friend'],
  endpoints: builder => ({})
})
