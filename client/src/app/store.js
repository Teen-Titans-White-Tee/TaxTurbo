import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../counterSlice';
import { apiSlice } from '../apiSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    [apiSlice.api]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});