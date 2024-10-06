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
  }),
});

export const { useCreatePaymentIntentMutation } = paymentApi;
