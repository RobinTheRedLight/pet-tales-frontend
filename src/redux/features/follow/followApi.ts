import { baseApi } from "@/redux/api/baseApi";

const followApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    followUser: builder.mutation({
      query: ({ userEmailToFollow }) => ({
        url: "/follow/",
        method: "POST",
        body: { userEmailToFollow },
      }),
      invalidatesTags: ["Follow"],
    }),
    unfollowUser: builder.mutation({
      query: ({ userEmailToUnfollow }) => ({
        url: "/follow/unfollow",
        method: "POST",
        body: { userEmailToUnfollow },
      }),
      invalidatesTags: ["Follow"],
    }),
    getUserFollowers: builder.query({
      query: (userEmail) => ({
        url: `/follow/followers/${userEmail}`,
        method: "GET",
      }),
      providesTags: ["Follow"],
    }),
    getUserFollowing: builder.query({
      query: (userEmail) => ({
        url: `/follow/following/${userEmail}`,
        method: "GET",
      }),
      providesTags: ["Follow"],
    }),
  }),
});

export const {
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetUserFollowersQuery,
  useGetUserFollowingQuery,
} = followApi;
export default followApi;
