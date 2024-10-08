"use client";

import React from "react";
import { useTogglePostPublishStatusMutation } from "@/redux/features/admin/adminApi";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { RootState } from "@/redux/store";
import { Post } from "@/types";
import Link from "next/link";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

interface PostCardProps {
  post: Post;
}

const PublishPostCard: React.FC<PostCardProps> = ({ post }) => {
  const currentUser = useSelector((state: RootState) =>
    selectCurrentUser(state)
  ) as { role: string } | null;

  const [togglePostPublishStatus, { isLoading }] =
    useTogglePostPublishStatusMutation();

  const isUserAdmin = currentUser?.role === "admin";

  const handlePublish = async () => {
    if (!isUserAdmin) return;

    try {
      const result = await Swal.fire({
        title: post.isPublishable ? "Unpublish Post?" : "Publish Post?",
        text: `Are you sure you want to ${
          post.isPublishable ? "unpublish" : "publish"
        } this post?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#4F46E5", // Tailwind's indigo-600
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      });

      if (result.isConfirmed) {
        await togglePostPublishStatus(post._id).unwrap();
        await Swal.fire({
          title: "Success!",
          text: "Post status updated successfully.",
          icon: "success",
          confirmButtonColor: "#4F46E5",
        });
      }
    } catch (error) {
      console.error("Failed to update the post:", error);
      await Swal.fire({
        title: "Error",
        text: "Failed to update the post. Please try again.",
        icon: "error",
        confirmButtonColor: "#EF4444", // Tailwind's red-500
      });
    }
  };

  return (
    <div className="bg-white shadow rounded-lg mb-4">
      <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-gray-500">Author</p>
          <p className="text-lg font-semibold text-gray-700">{post.author}</p>
        </div>
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-gray-500">Title</p>
          <Link href={`/posts/${post._id}`}>
            <p className="text-lg font-semibold text-indigo-600 underline">
              {post.title}
            </p>
          </Link>
        </div>
        {isUserAdmin && (
          <button
            onClick={handlePublish}
            disabled={isLoading}
            className={`${
              post.isPublishable
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            } text-white font-medium py-2 px-4 rounded-lg focus:outline-none disabled:opacity-50`}
          >
            {isLoading
              ? "Updating..."
              : post.isPublishable
              ? "Unpublish"
              : "Publish"}
          </button>
        )}
      </div>
    </div>
  );
};

export default PublishPostCard;
