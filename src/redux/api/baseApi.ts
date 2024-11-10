import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://pet-tales-backend.vercel.app/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: [
    "Profile",
    "AllUsers",
    "Post",
    "UserPost",
    "Comment",
    "Vote",
    "Follow",
    "singlePost",
    "AllPayments",
    "AdminPosts",
    "Payment",
  ],
  endpoints: () => ({}),
});
