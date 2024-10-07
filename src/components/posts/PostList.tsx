"use client";

import React, { useState, useEffect } from "react";
import { useGetPostsQuery } from "@/redux/features/post/postApi";
import PostCard from "./PostCard";
import { Post } from "@/types";
import debounce from "lodash/debounce";

const PostList = () => {
  const { data, isLoading, isError, error } = useGetPostsQuery("");
  const posts: Post[] = data?.data || [];
  const [selectedCategory, setSelectedCategory] = useState<
    "All" | "Tip" | "Story"
  >("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  useEffect(() => {
    handleSearchAndFilter();
  }, [posts, selectedCategory, searchTerm]);

  // Function to handle the search and filter logic
  const handleSearchAndFilter = debounce(() => {
    let filtered = posts.filter(
      (post) =>
        (selectedCategory === "All" || post.category === selectedCategory) &&
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // If a specific category is selected, sort posts by upvoteCount in descending order
    if (selectedCategory !== "All") {
      filtered = filtered.sort((a, b) => b.upvoteCount - a.upvoteCount);
    }

    setFilteredPosts(filtered);
  }, 300); // 300ms debounce delay

  // Handle search input change with debouncing
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    handleSearchAndFilter();
  };

  // Handle category filter change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value as "All" | "Tip" | "Story");
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
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        {/* Category Filter Dropdown */}
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border rounded-md px-4 py-2"
        >
          <option value="All">All Categories</option>
          <option value="Tip">Tip</option>
          <option value="Story">Story</option>
        </select>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full md:max-w-md px-4 py-2 border rounded-md"
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
