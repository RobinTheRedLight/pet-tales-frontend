import { baseApi } from "../api/baseApi";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation({
      query: (amount) => ({
        url: "/payments/create-payment-intent",
        method: "POST",
        body: { amount },
      }),
    }),
    getPaymentByEmail: builder.query({
      query: (email) => ({
        url: `/payments/get-payment-by-email?email=${email}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreatePaymentIntentMutation, useGetPaymentByEmailQuery } =
  paymentApi;
