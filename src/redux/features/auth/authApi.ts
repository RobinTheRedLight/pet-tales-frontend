import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),

    signUp: builder.mutation({
      query: (userInfos) => ({
        url: "/auth/signup",
        method: "POST",
        body: userInfos,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation } = authApi;
