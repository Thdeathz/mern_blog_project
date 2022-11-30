import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '~/api/apiSlice'
import settingReducer from '~/redux/settingSlice'
import authReducer from '~/redux/authSlice'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
const persisConfig = { key: 'root', storage, whitelist: ['setting'], version: 1 }

const reducer = combineReducers({
  setting: settingReducer,
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
