import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  treeMenu: [],
  loaded: false
}

export const treeMenuSlice = createSlice({
  name: 'treeMenu',
  initialState,
  reducers: {
    setTreeMenu: (state, action) => {
      state.treeMenu = action.payload;
    },
    setTreeMenuLoaded: (state, action) => {
      state.loaded = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setTreeMenu, setTreeMenuLoaded } = treeMenuSlice.actions

export default treeMenuSlice.reducer