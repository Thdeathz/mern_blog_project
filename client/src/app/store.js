import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '~/api/apiSlice'
import authReducer from '~/redux/authSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
const persisConfig = { key: 'root', storage, version: 1 }
const persistedReducer = persistReducer(persisConfig, authReducer)

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
