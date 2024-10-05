"use client";

import React, { useState } from "react";
import { useGetPostsQuery } from "@/redux/features/post/postApi";
import PostCard from "./PostCard";
import { Post } from "@/types";

const PostList = () => {
  const { data, isLoading, isError, error } = useGetPostsQuery("");
  const posts: Post[] = data?.data || [];
  const [activeTab, setActiveTab] = useState<"Tip" | "Story">("Story");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error:{" "}
        {error instanceof Error ? error.message : "An unknown error occurred"}
      </div>
    );
  }

  const filteredPosts = posts.filter(
    (post: Post) => post.category === activeTab
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Tabs for categories */}
      <div
        role="tablist"
        className="tabs tabs-boxed tabs-lg flex justify-center mb-6"
      >
        <button
          role="tab"
          className={`tab ${activeTab === "Tip" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("Tip")}
        >
          Tip
        </button>
        <button
          role="tab"
          className={`tab ${activeTab === "Story" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("Story")}
        >
          Story
        </button>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center text-gray-500">No posts found.</div>
      ) : (
        filteredPosts.map((post: Post) => (
          <PostCard key={post._id} post={post} />
        ))
      )}
    </div>
  );
};

export default PostList;
