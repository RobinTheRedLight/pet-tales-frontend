import { baseApi } from "@/redux/api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/admin/allUsers",
        method: "GET",
      }),
      providesTags: ["allUsers"],
    }),

    updateUserAdmin: builder.mutation({
      query: (adminData) => {
        return {
          url: `/admin/makeAdmin/${adminData.id}`,
          method: "PUT",
          body: adminData.data,
        };
      },
      invalidatesTags: ["allUsers"],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["allUsers"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserAdminMutation,
} = adminApi;
