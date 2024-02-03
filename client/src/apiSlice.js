import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


// Define a service using a base URL and expected endpoints
export const importedTransactions = createApi({
  reducerPath: 'importedTransactions',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' , credentials: 'include'}),
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: () => '/plaid/getTransactions'
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


console.log(importedTransactions.useGetUserDataQuery);
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {  useGetTransactionsQuery} = importedTransactions;
export const {useGetUserDataQuery, usePostDeductionMutation, usePostEarningsMutation} = apiUser;