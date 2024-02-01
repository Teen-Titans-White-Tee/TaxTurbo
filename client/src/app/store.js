import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../userSlice';
import { apiSlice, apiUser } from '../apiSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [apiUser.reducerPath]: apiUser.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware,apiUser.middleware),

});