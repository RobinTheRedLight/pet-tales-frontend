"use client";
import Loading from "@/components/Loading/Loading";
import PublishPostCard from "@/components/posts/PublishPostCard";
import withAdminAuth from "@/components/withAdminAuth/withAdminAuth";
import { useGetAllAdminPostsQuery } from "@/redux/features/admin/adminApi";
import { Post } from "@/types";
import React from "react";

const Content = () => {
  const { data, isLoading } = useGetAllAdminPostsQuery("");

  if (isLoading) {
    return <Loading />;
  }
  const posts: Post[] = data?.data || [];

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        Content Management
      </h1>
      {posts.map((post) => (
        <div key={post._id} className="mb-4">
          <PublishPostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default withAdminAuth(Content);
