import { createEntityAdapter, createSelector } from '@reduxjs/toolkit'
import { apiSlice } from '~/api/apiSlice'

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt)
})

const initialState = postsAdapter.getInitialState({})

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getPosts: builder.query({
      query: () => '/posts',
      transformResponse: responseData => {
        return postsAdapter.setAll(initialState, responseData)
      },
      providesTags: (result, error, arg) => [
        { type: 'Post', id: 'LIST' },
        ...result.ids.map(id => ({ type: 'Post', id }))
      ]
    }),
    addNewPost: builder.mutation({
      query: newPostData => ({
        url: '/posts',
        method: 'POST',
        body: newPostData
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }]
    }),
    postReaction: builder.mutation({
      query: ({ userId, postId }) => ({
        url: `/posts/${postId}/like`,
        method: 'PATCH',
        body: JSON.stringify({ userId })
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }]
    }),
    getPostsByUserId: builder.query({
      query: userId => `/posts/${userId}/posts`,
      transformResponse: responseData => {
        return postsAdapter.setAll(initialState, responseData)
      },
      providesTags: (result, error, arg) => [
        { type: 'Post', id: 'LIST' },
        ...result.ids.map(id => ({ type: 'Post', id }))
      ],
      invalidatesTags: [{ type: 'Post', id: 'LIST' }]
    })
  })
})

export const {
  useGetPostsQuery,
  useAddNewPostMutation,
  usePostReactionMutation,
  useGetPostsByUserIdQuery
} = postsApiSlice

// return query result object
export const selectPostResult = postsApiSlice.endpoints.getPosts.select()

// create memoized query object
const selectPostsData = createSelector(selectPostResult, postsResult => postsResult.data)

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
} = postsAdapter.getSelectors(state => selectPostsData(state) ?? initialState)
