"use client";

import React, { useState, useEffect } from "react";
import { useGetPostsQuery } from "@/redux/features/post/postApi";
import PostCard from "./PostCard";
import { Post } from "@/types";
import debounce from "lodash/debounce";
import Loading from "../Loading/Loading";
const PostList = () => {
  const { data, isLoading, isError, error } = useGetPostsQuery("");
  const posts: Post[] = data?.data || [];
  const [selectedCategory, setSelectedCategory] = useState<
    "All" | "Tip" | "Story"
  >("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"None" | "Upvote">("None");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  useEffect(() => {
    handleSearchAndFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts, selectedCategory, searchTerm, sortOrder]);

  const handleSearchAndFilter = debounce(() => {
    let filtered = posts.filter(
      (post) =>
        (selectedCategory === "All" || post.category === selectedCategory) &&
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOrder === "Upvote") {
      filtered = filtered.sort((a, b) => b.upvoteCount - a.upvoteCount);
    }

    setFilteredPosts(filtered);
  }, 300);

  // Handle search input change with debouncing
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    handleSearchAndFilter();
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value as "All" | "Tip" | "Story");
    handleSearchAndFilter();
  };

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as "None" | "Upvote");
    handleSearchAndFilter();
  };

  if (isLoading) {
    return <Loading />;
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
    <div className="max-w-3xl mx-auto ">
      {/* Search and Filter Section */}

      <div className=" bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center justify-between gap-4 mb-6 mt-4">
        <div className="flex gap-2">
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

          {/* Sort Order Dropdown */}
          <select
            value={sortOrder}
            onChange={handleSortOrderChange}
            className="border rounded-md px-4 py-2"
          >
            <option value="None">No Sorting</option>
            <option value="Upvote">Sort by Upvotes</option>
          </select>
        </div>

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
