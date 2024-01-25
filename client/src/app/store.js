import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../counterSlice';

export const store = configureStore({
  reducer: {
    user: userReducer, 
  },
})