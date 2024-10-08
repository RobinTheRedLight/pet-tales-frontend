import { baseApi } from "@/redux/api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/admin/allUsers",
        method: "GET",
      }),
      providesTags: ["AllUsers"],
    }),

    getAllAdminPosts: builder.query({
      query: () => ({
        url: "/admin/allPosts",
        method: "GET",
      }),
      providesTags: ["AdminPosts"],
    }),

    updateUserAdmin: builder.mutation({
      query: (adminData) => {
        return {
          url: `/admin/makeAdmin/${adminData.id}`,
          method: "PUT",
          body: adminData.data,
        };
      },
      invalidatesTags: ["AllUsers"],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AllUsers"],
    }),

    getAllPayments: builder.query({
      query: () => ({
        url: "/admin/allPayments",
        method: "GET",
      }),
      providesTags: ["AllPayments"],
    }),

    togglePostPublishStatus: builder.mutation({
      query: (id: string) => ({
        url: `/admin/${id}/toggle-publish`,
        method: "PATCH",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserAdminMutation,
  useGetAllPaymentsQuery,
  useTogglePostPublishStatusMutation,
  useGetAllAdminPostsQuery,
} = adminApi;
