"use client";
import React from "react";
import { useGetPostsQuery } from "@/redux/features/post/postApi";
import Link from "next/link";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import "react-quill/dist/quill.snow.css";
import { Post } from "@/types";
import ImageGallery from "@/components/ImageGallery/ImageGallery";

const PostList = () => {
  const { data, isLoading, isError, error } = useGetPostsQuery("");
  const posts = data?.data || [];

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
    <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {posts.map((post: Post) => (
        <div key={post._id} className="flex p-4 shadow-md rounded-md mb-4">
          {/* Voting Section */}
          <div className="flex flex-col items-center mr-4 text-gray-500">
            <button className=" hover:text-blue-500 transition duration-200">
              <AiOutlineArrowUp size={24} />
            </button>
            <span className="text-sm font-medium mt-1">123</span>
            <button className="hover:text-red-500 transition duration-200 mt-1">
              <AiOutlineArrowDown size={24} />
            </button>
          </div>

          {/* Post Content */}
          <div className="flex-1">
            {/* Header Section */}
            <div className="flex justify-between items-center">
              <Link href={`/posts/${post._id}`}>
                <h2 className="text-xl font-semibold hover:underline">
                  {post.title}
                </h2>
              </Link>
              <span className="text-xs text-gray-400">
                Posted by {post.author}
              </span>
            </div>

            {/* Content Summary and Read More */}
            <div className="mt-2 text-gray-700">
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    post.content.length > 200
                      ? post.content.slice(0, 200) + "..."
                      : post.content,
                }}
                className="prose prose-sm"
              />
              {post.content.length > 200 && (
                <Link href={`/posts/${post._id}`}>
                  <span className="text-blue-600 hover:underline cursor-pointer">
                    Read More
                  </span>
                </Link>
              )}
            </div>

            {/* Image Gallery */}
            {post.images && post.images.length > 0 && (
              <div className="mt-4">
                <ImageGallery images={post.images} title={post.title} />
              </div>
            )}

            {/* Interaction Section */}
            <div className="mt-4 flex items-center text-sm text-gray-600">
              <button className="flex items-center mr-6 hover:text-blue-500 transition duration-200">
                <FaCommentAlt className="mr-1" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
