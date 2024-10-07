import { baseApi } from "@/redux/api/baseApi";

const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({
        url: "/posts/",
        method: "GET",
      }),

      providesTags: ["Post"],
    }),

    getPostById: builder.query({
      query: (id: string) => ({
        url: `/posts/${id}`,
        method: "GET",
      }),
      providesTags: ["singlePost"],
    }),

    getPostByUserEmail: builder.query({
      query: (userEmail: string) => ({
        url: `/posts/user/${userEmail}`,
        method: "GET",
      }),
      providesTags: ["Post"],
    }),

    createPost: builder.mutation({
      query: (postData) => ({
        url: "/posts/",
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["Post"],
    }),

    updatePost: builder.mutation({
      query: ({ id, ...postData }) => ({
        url: `/posts/${id}`,
        method: "PATCH",
        body: postData,
      }),
      invalidatesTags: ["singlePost", "Post"],
    }),

    deletePost: builder.mutation({
      query: (id: string) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
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
  useGetPostByUserEmailQuery,
} = postApi;

export default postApi;
