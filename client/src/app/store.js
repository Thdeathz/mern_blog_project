import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '~/api/apiSlice'
import userReducer from '~/redux/userSlice'
import authReducer from '~/redux/authSlice'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
const persisConfig = { key: 'root', storage, whitelist: ['user'], version: 1 }

const reducer = combineReducers({
  user: userReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer
})

const persistedReducer = persistReducer(persisConfig, reducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PERSIST, PURGE, REGISTER, PAUSE]
      }
    }).concat(apiSlice.middleware)
})

export default store
