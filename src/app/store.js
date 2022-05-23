import { configureStore } from '@reduxjs/toolkit'
import sideNavReducer from './slices/sideNavSlice';
import treeMenuReducer from './slices/treeMenuSlice';

export const store = configureStore({
  reducer: {
    sideNav: sideNavReducer,
    treeMenu: treeMenuReducer
  },
})