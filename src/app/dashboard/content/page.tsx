"use client";
import PublishPostCard from "@/components/posts/PublishPostCard";
import { useGetAllAdminPostsQuery } from "@/redux/features/admin/adminApi";
import { Post } from "@/types";
import React from "react";

const Content = () => {
  const { data, isLoading } = useGetAllAdminPostsQuery("");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }
  const posts: Post[] = data?.data || [];

  return (
    <div>
      {posts.map((post) => (
        <div key={post._id} className="mb-4">
          <PublishPostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default Content;
