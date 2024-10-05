import { baseApi } from "@/redux/api/baseApi";

const voteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrUpdateVote: builder.mutation({
      query: ({ postId, voteType }) => ({
        url: "/votes",
        method: "POST",
        body: { postId, voteType },
      }),
      invalidatesTags: ["Vote"],
    }),
    getVotesByPostId: builder.query({
      query: ({ postId, userEmail }) => ({
        url: `/votes/${postId}`,
        method: "GET",
        params: { userEmail },
      }),
      providesTags: ["Vote"],
    }),
  }),
});

export const { useCreateOrUpdateVoteMutation, useGetVotesByPostIdQuery } =
  voteApi;
export default voteApi;
