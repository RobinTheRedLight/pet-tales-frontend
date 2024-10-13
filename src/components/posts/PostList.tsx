"use client";

import React, { useState, useEffect } from "react";
import { useGetPostsQuery } from "@/redux/features/post/postApi";
import PostCard from "./PostCard";
import { Post } from "@/types";
import debounce from "lodash/debounce";
import Loading from "../Loading/Loading";
import { useInView } from "react-intersection-observer";

const PostList = () => {
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const { data, isLoading, isError, error, isFetching } =
    useGetPostsQuery(page);

  // Filters and sorting state
  const [selectedCategory, setSelectedCategory] = useState<
    "All" | "Tip" | "Story"
  >("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"None" | "Upvote">("None");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  // Intersection Observer to detect when the user reaches the bottom
  const [ref, inView] = useInView();

  // Append new posts to the list
  useEffect(() => {
    if (data?.data) {
      if (data.data.length === 0) {
        setHasMore(false);
      } else {
        setAllPosts((prevPosts) => [...prevPosts, ...data.data]);
      }
    }
  }, [data]);

  // Handle infinite scrolling
  useEffect(() => {
    if (inView && hasMore && !isFetching) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore, isFetching]);

  // Apply filters and sorting
  useEffect(() => {
    handleSearchAndFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allPosts, selectedCategory, searchTerm, sortOrder]);

  const handleSearchAndFilter = debounce(() => {
    let filtered = allPosts.filter(
      (post) =>
        (selectedCategory === "All" || post.category === selectedCategory) &&
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOrder === "Upvote") {
      filtered = filtered.sort((a, b) => b.upvoteCount - a.upvoteCount);
    }

    setFilteredPosts(filtered);
  }, 300);

  // Handle input changes
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

  // Handle initial loading error
  if (isError && page === 1) {
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
      {filteredPosts.length === 0 && !isLoading ? (
        <div className="text-center text-gray-500">No posts found.</div>
      ) : (
        filteredPosts.map((post: Post, index) => {
          // Attach the ref to the last post for infinite scrolling
          if (index === filteredPosts.length - 1) {
            return (
              <div ref={ref} key={post._id}>
                <PostCard post={post} />
              </div>
            );
          } else {
            return <PostCard key={post._id} post={post} />;
          }
        })
      )}

      {/* Loading Indicator */}
      {isFetching && page > 1 && (
        <div className="flex justify-center my-4">
          <Loading />
        </div>
      )}

      {/* Initial Loading Indicator */}
      {isLoading && page === 1 && <Loading />}
    </div>
  );
};

export default PostList;
