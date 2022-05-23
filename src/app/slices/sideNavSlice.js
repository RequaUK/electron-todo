import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  
}

export const sideNavSlice = createSlice({
  name: 'sideNav',
  initialState,
  reducers: {
    set: (state, action) => {
      state.sideNav = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { set } = sideNavSlice.actions

export default sideNavSlice.reducer