"use client";
import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { Post } from "@/types";
import ImageGallery from "@/components/ImageGallery/ImageGallery";
import CommentSection from "@/components/CommentSection/CommentSection";
import { useCreateCommentMutation } from "@/redux/features/comment/commentApi";
import {
  useCreateOrUpdateVoteMutation,
  useGetVotesByPostIdQuery,
} from "@/redux/features/vote/voteApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

import "react-quill/dist/quill.snow.css";

interface PostCardProps {
  post: Post;
}

const FollowingSinglePostCard: React.FC<PostCardProps> = ({ post }) => {
  const currentUser = useSelector((state: RootState) =>
    selectCurrentUser(state)
  ) as { email: string } | null;
  const currentUserEmail = currentUser?.email;

  const [newComment, setNewComment] = useState<string>("");
  const [isCommentsVisible, setIsCommentsVisible] = useState<boolean>(false);
  const [createComment, { isLoading: isCreating }] = useCreateCommentMutation();
  const [createOrUpdateVote] = useCreateOrUpdateVoteMutation();

  const {
    data: votesData,
    refetch: refetchVotes,
    isLoading,
  } = useGetVotesByPostIdQuery({
    postId: post._id,
    userEmail: currentUserEmail,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  type VoteType = {
    upvotes: number;
    downvotes: number;
    userVotes?: Array<{
      voteType: "upvote" | "downvote";
    }> | null;
  };

  const votes: VoteType = votesData?.data ?? {
    upvotes: 0,
    downvotes: 0,
    userVotes: [],
  };

  const userHasUpvoted = votes.userVotes?.[0]?.voteType === "upvote";
  const userHasDownvoted = votes.userVotes?.[0]?.voteType === "downvote";

  const handleToggleComments = () => {
    setIsCommentsVisible((prev) => !prev);
  };

  const handleSubmitComment = async () => {
    if (newComment.trim()) {
      try {
        await createComment({
          postId: post._id,
          content: newComment.trim(),
        }).unwrap();
        setNewComment("");
      } catch (error) {
        console.error("Failed to create comment:", error);
      }
    }
  };

  const handleVote = async (voteType: "upvote" | "downvote") => {
    try {
      await createOrUpdateVote({
        postId: post._id,
        voteType,
        userEmail: currentUserEmail,
      }).unwrap();
      refetchVotes();
    } catch (error) {
      console.error("Failed to vote:", error);
    }
  };

  return (
    <div className="flex p-4 shadow-md rounded-md mb-4 border ">
      {/* Voting Section */}
      <div className="flex flex-col items-center mr-4 text-gray-500">
        {/* Upvote Button */}
        <button
          className={`hover:text-blue-500 transition duration-200 ${
            userHasUpvoted ? "text-blue-500" : ""
          }`}
          onClick={() => handleVote("upvote")}
        >
          <AiOutlineArrowUp size={24} />
        </button>

        {/* Vote Count (show only upvotes) */}
        <span className="text-sm font-medium mt-1">{votes.upvotes}</span>

        {/* Downvote Button */}
        <button
          className={`hover:text-red-500 transition duration-200 mt-1 ${
            userHasDownvoted ? "text-red-500" : ""
          }`}
          onClick={() => handleVote("downvote")}
        >
          <AiOutlineArrowDown size={24} />
        </button>
      </div>

      {/* Post Content */}
      <div className="flex-1">
        {/* Header Section */}
        <div className="sm:flex sm:justify-between sm:items-center">
          <p className="flex gap-2 mt-2">
            <Link href="#">
              <h2 className="text-2xl font-semibold hover:underline font-nunito">
                {post.title}
              </h2>
            </Link>
            {post.isPremium ? (
              <p className="badge badge-warning">Premium</p>
            ) : (
              <p className="badge badge-neutral">Free</p>
            )}
          </p>
          <div className="text-xs font-semibold">Posted by {post.author}</div>
        </div>

        {/* Content Summary and Read More */}
        <div className="mt-2">
          <div
            dangerouslySetInnerHTML={{
              __html: post.content,
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
          <button
            className="flex items-center mr-6 hover:text-blue-500 transition duration-200 mt-1"
            onClick={handleToggleComments}
          >
            <FaCommentAlt className="mr-1" />
            {isCommentsVisible ? "Hide Comments" : "Show Comments"}
          </button>
        </div>

        {/* Comment Section */}
        {isCommentsVisible && (
          <div className="mt-4">
            {/* Fetch Comments for the Post */}
            <CommentSection
              postId={post._id}
              author={post.author}
              currentUserEmail={currentUserEmail || ""}
            />

            {/* Add New Comment */}
            <div className="mt-4">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="border rounded-md p-2 w-full"
              />
              <button
                onClick={handleSubmitComment}
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
  );
};

export default FollowingSinglePostCard;
