import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      query: () => '/dashboard'
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetDashboardData } = apiSlice;