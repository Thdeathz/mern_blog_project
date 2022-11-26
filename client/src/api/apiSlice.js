import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { buildQueries } from '@testing-library/react'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://127.0.0.1:3500',
  prepareHeaders: headers => {
    const token = null
    if (token) {
      headers.set('Authorization', 'Bearer ' + token)
    }
    return headers
  }
})

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  tagTypes: [],
  endpoints: builder => ({})
})
