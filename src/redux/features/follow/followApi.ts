import { baseApi } from "@/redux/api/baseApi";

const followApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    followUser: builder.mutation({
      query: ({ userIdToFollow }) => ({
        url: "/follow/",
        method: "POST",
        body: { userIdToFollow },
      }),
      invalidatesTags: ["Follow"],
    }),
    unfollowUser: builder.mutation({
      query: ({ userIdToUnfollow }) => ({
        url: "/follow/unfollow",
        method: "POST",
        body: { userIdToUnfollow },
      }),
      invalidatesTags: ["Follow"],
    }),
    getUserFollowers: builder.query({
      query: (userId) => ({
        url: `/follow/followers/${userId}`,
        method: "GET",
      }),
      providesTags: ["Follow"],
    }),
    getUserFollowing: builder.query({
      query: (userId) => ({
        url: `/follow/following/${userId}`,
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
