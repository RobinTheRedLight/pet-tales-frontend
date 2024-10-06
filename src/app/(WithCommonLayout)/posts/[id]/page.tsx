"use client";
import React, { useState } from "react";
import { useGetPostByIdQuery } from "@/redux/features/post/postApi";
import Link from "next/link";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import "react-quill/dist/quill.snow.css";
import ImageGallery from "@/components/ImageGallery/ImageGallery";
import CommentSection from "@/components/CommentSection/CommentSection";
import { useCreateCommentMutation } from "@/redux/features/comment/commentApi";
import { useParams } from "next/navigation";
import PaymentForm from "@/components/Payment/PaymentForm";
import { Toaster } from "sonner";

const PostPage = () => {
  const [newComments, setNewComments] = useState<{ [key: string]: string }>({});
  const [createComment, { isLoading: isCreating }] = useCreateCommentMutation();
  const [visibleComments, setVisibleComments] = useState<string | null>(null);
  const params = useParams();
  const id = params.id;
  const { data, isLoading, isError, error } = useGetPostByIdQuery(id as string);

  if (isLoading) {
    return <div>Loading post...</div>;
  }

  if (isError) {
    return <div>Error loading post: {error.toString()}</div>;
  }

  const post = data?.data || [];

  return (
    <div className="max-w-4xl mx-auto p-4 ">
      <Toaster />
      <div className="flex p-4 shadow-md rounded-md mb-4 bg-gray-100">
        {/* Voting Section */}
        <div className="flex flex-col items-center mr-4 text-gray-500">
          <button className="hover:text-blue-500 transition duration-200">
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
          <div className="flex justify-between items-center mb-10">
            <Link href={`/posts/${post._id}`}>
              <h2 className="text-xl font-semibold hover:underline">
                {post.title}
              </h2>
            </Link>
            <span className="text-xs text-gray-400">
              Posted by {post.author}
            </span>
          </div>

          {/* Image Gallery */}
          {post.images && post.images.length > 0 && (
            <div className="mt-4">
              <ImageGallery images={post.images} title={post.title} />
            </div>
          )}

          {/* Content Summary and Read More */}
          <div className="mt-10 text-gray-700 ">
            <div
              dangerouslySetInnerHTML={{
                __html: post.content,
              }}
              className="prose prose-sm"
            />
          </div>
          {/* Interaction Section */}
          <div className="mt-4 flex items-center text-sm text-gray-600">
            <button
              className="flex items-center mr-6 hover:text-blue-500 transition duration-200"
              onClick={() => {
                setVisibleComments((prev) =>
                  prev === post._id ? null : post._id
                );
              }}
            >
              <FaCommentAlt className="mr-1" />
              {visibleComments === post._id ? "Hide Comments" : "Show Comments"}
            </button>
          </div>

          {/* Comment Section */}
          {visibleComments === post._id && (
            <div className="mt-4">
              {/* Fetch Comments for the Post */}
              <CommentSection postId={post._id} />

              {/* Add New Comment */}
              <div className="mt-4">
                <input
                  type="text"
                  value={newComments[post._id] || ""}
                  onChange={(e) =>
                    setNewComments({
                      ...newComments,
                      [post._id]: e.target.value,
                    })
                  }
                  placeholder="Add a comment..."
                  className="border rounded-md p-2 w-full"
                />
                <button
                  onClick={async () => {
                    if (newComments[post._id]) {
                      await createComment({
                        postId: post._id,
                        content: newComments[post._id],
                      });
                      setNewComments({ ...newComments, [post._id]: "" });
                    }
                  }}
                  disabled={isCreating}
                  className={`bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600 ${
                    isCreating ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isCreating ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <PaymentForm />
    </div>
  );
};

export default PostPage;
