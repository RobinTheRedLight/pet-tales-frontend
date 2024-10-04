import { baseApi } from "@/redux/api/baseApi";

const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCommentsByPostId: builder.query({
      query: (postId: string) => ({
        url: `/comments/${postId}`,
        method: "GET",
      }),
      providesTags: ["Comment"],
    }),

    createComment: builder.mutation({
      query: (commentData) => ({
        url: "/comments",
        method: "POST",
        body: commentData,
      }),
      invalidatesTags: ["Comment"],
    }),

    updateComment: builder.mutation({
      query: ({ commentId, ...updateData }) => ({
        url: `/comments/${commentId}`,
        method: "PATCH",
        body: updateData,
      }),
      invalidatesTags: ["Comment"],
    }),

    deleteComment: builder.mutation({
      query: (commentId: string) => ({
        url: `/comments/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCommentsByPostIdQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentApi;

export default commentApi;
