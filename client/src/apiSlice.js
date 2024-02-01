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
});
export const apiUser = createApi(
  {
    reducerPath: 'data',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/data', credentials: 'include'}),
    endpoints: (builder) => ({
      getUserData: builder.query({
        query: () => '/getuser',
      }),
      postDeduction: builder.mutation({
        query: deduction => ({
          url: '/deductions',
          method: 'POST',
          // Include the entire post object as the body of the request
          body: deduction
        })
      }),
      postEarnings: builder.mutation({
        query: earnings => ({
          url: '/earnings',
          method: 'POST',
          // Include the entire post object as the body of the request
          body: earnings
        })
      })
    })
  });


console.log(apiSlice.useGetUserDataQuery);
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {  useGetTransactionsQuery} = apiSlice;
export const {useGetUserDataQuery, usePostDeductionMutation, usePostEarningsMutation} = apiUser;