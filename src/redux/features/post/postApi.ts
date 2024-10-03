import { baseApi } from "@/redux/api/baseApi";

const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (params) => ({
        url: "/posts/",
        method: "GET",
        params, // For filtering, pagination, etc.
      }),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      providesTags: (result = [], error, arg) =>
        result
          ? [
              ...result.map(({ id }: { id: string }) => ({
                type: "Post" as const,
                id,
              })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }],
    }),

    getPostById: builder.query({
      query: (id: string) => ({
        url: `/posts/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Post", id }],
    }),

    createPost: builder.mutation({
      query: (postData) => ({
        url: "/posts/",
        method: "POST",
        body: postData,
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),

    updatePost: builder.mutation({
      query: ({ id, ...postData }) => ({
        url: `/posts/${id}`,
        method: "PATCH",
        body: postData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Post", id }],
    }),

    deletePost: builder.mutation({
      query: (id: string) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Post", id },
        { type: "Post", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi;

export default postApi;
