import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  mode: 'light'
}

export const settingReducer = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setMode: state => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
    }
  }
})

export const { setMode } = settingReducer.actions
export default settingReducer.reducer
