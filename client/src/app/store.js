import { configureStore } from '@reduxjs/toolkit';
import { importedTransactions, apiUser } from '../apiSlice';

export const store = configureStore({
  reducer: {
    [importedTransactions.reducerPath]: importedTransactions.reducer,
    [apiUser.reducerPath]: apiUser.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(importedTransactions.middleware,apiUser.middleware),

});