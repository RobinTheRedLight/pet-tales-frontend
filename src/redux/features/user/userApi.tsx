import { baseApi } from "@/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "users/me",
        method: "GET",
      }),
      providesTags: ["profile"],
    }),

    updateProfile: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/users/me",
          method: "PUT",
          body: userInfo,
        };
      },
      invalidatesTags: ["profile"],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = userApi;
