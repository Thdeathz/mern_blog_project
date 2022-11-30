import { createEntityAdapter, createSelector } from '@reduxjs/toolkit'
import { apiSlice } from '~/api/apiSlice'

const friendsAdapter = createEntityAdapter({})

const initialState = friendsAdapter.getInitialState({})

export const friendsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getFriends: builder.query({
      query: userId => `users/${userId}/friends`,
      transformResponse: responseData => {
        return friendsAdapter.setAll(initialState, responseData)
      },
      providesTags: (result, error, arg) => [
        { type: 'Friend', id: 'LIST' },
        ...result.ids.map(id => ({ type: 'Friend', id }))
      ]
    }),
    addRemoveFriend: builder.mutation({
      query: ({ userId, friendId }) => ({
        url: `/users/${userId}/${friendId}`,
        method: 'PATCH'
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Friend', id: arg.id }]
    }),
    getUserProfile: builder.query({
      query: userId => `/users/${userId}`,
      providesTags: (result, error, arg) => [{ type: 'Friend', id: 'DETAIL' }]
    })
  })
})

export const { useGetFriendsQuery, useAddRemoveFriendMutation, useGetUserProfileQuery } =
  friendsApiSlice

export const selectFriendResult = friendsApiSlice.endpoints.getFriends.select()

// create memoized query object
const selectFriendsList = createSelector(selectFriendResult, friendsList => friendsList.data)

export const {
  selectAll: selectAllFriends,
  selectById: selectFriendById,
  selectIds: selectFriendIds
} = friendsAdapter.getSelectors(state => selectFriendsList(state) ?? initialState)
