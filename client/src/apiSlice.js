import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: () => '/transactions'
    })
  })
}, {
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/auth'}),
  endpoints: (builder) => ({
  })
}, {
  reducerPath: 'data',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/data'}),
  endpoints: (builder) => ({
    getUserData: builder.query({
      query: () => '/data/getUser',
    }),
  })
});


// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserDataQuery, useGetTransactionsQuery, } = apiSlice;