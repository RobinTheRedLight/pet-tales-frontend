"use client";

import React, { useState, useEffect } from "react";
import { useGetPostsQuery } from "@/redux/features/post/postApi";
import PostCard from "./PostCard";
import { Post } from "@/types";
import debounce from "lodash/debounce";

const PostList = () => {
  const { data, isLoading, isError, error } = useGetPostsQuery("");
  const posts: Post[] = data?.data || [];
  const [activeTab, setActiveTab] = useState<"Tip" | "Story">("Story");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  useEffect(() => {
    handleSearchAndFilter();
  }, [posts, activeTab, searchTerm]);

  // Function to handle the search and filter logic
  const handleSearchAndFilter = debounce(() => {
    let filtered = posts.filter(
      (post) =>
        post.category === activeTab &&
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort posts by upvoteCount in descending order
    filtered = filtered.sort((a, b) => b.upvoteCount - a.upvoteCount);

    setFilteredPosts(filtered);
  }, 300); // 300ms debounce delay

  // Handle search input change with debouncing
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    handleSearchAndFilter();
  };

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

  return (
    <div className="max-w-4xl mx-auto p-4 mt-10">
      {/* Tabs for categories */}
      <div
        role="tablist"
        className="tabs tabs-lifted tabs-lg flex justify-center mb-6"
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

      {/* Search Input */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full max-w-lg px-4 py-2 border rounded-md"
        />
      </div>

      {/* Filtered and Sorted Posts */}
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
