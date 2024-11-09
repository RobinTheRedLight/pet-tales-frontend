"use client";
import React, { useState } from "react";
import Link from "next/link";
import { GrLike, GrDislike } from "react-icons/gr";
import { FaRegComment } from "react-icons/fa";
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
import { toast, Toaster } from "sonner";
import "react-quill/dist/quill.snow.css";
import PostLoading from "../Loading/PostLoading";

interface PostCardProps {
  post: Post;
}

const FollowingPostCard: React.FC<PostCardProps> = ({ post }) => {
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
    return <PostLoading />;
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
    if (!currentUserEmail) {
      toast.error("Please login to comment");
      setNewComment("");
      return;
    }
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
    if (!currentUserEmail) {
      toast.error("Please login to vote");
      return;
    }
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
    <div className="max-w-4xl mx-auto flex flex-col px-4 pt-2 pb-2 shadow-md rounded-md mb-4 border bg-white">
      <Toaster richColors />

      {/* Post Content */}
      <div className="flex-1">
        {/* Header Section */}
        <div className="sm:flex sm:justify-between sm:items-center">
          <p className="flex mt-2 gap-2">
            <p className="text-xl font-nunito ">{post.category}</p>

            {post.isPremium ? (
              <p className="badge badge-warning badge-sm">Premium</p>
            ) : (
              <p className="badge badge-neutral badge-sm">Free</p>
            )}
          </p>
          <span className="text-xs text-gray-400">Posted by {post.author}</span>
        </div>

        {/* Content Summary and Read More */}
        <div className="mt-2">
          <Link href={`/posts/${post._id}`}>
            <p className="text-2xl font-semibold hover:underline font-nunito my-2">
              {post.title}
            </p>
          </Link>
          <div
            dangerouslySetInnerHTML={{
              __html:
                post.content.length > 200
                  ? post.content.slice(0, 200) + "..."
                  : post.content,
            }}
            className="prose max-w-none text-justify "
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
      </div>

      {/* Voting Section at Bottom */}
      <div className="flex items-center justify-between mt-2 border-t pt-1">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4 bg-gray-100 rounded-lg p-2 text-black">
            <button
              className={`hover:text-blue-500 transition duration-200 ${
                userHasUpvoted ? "text-blue-500" : ""
              }`}
              onClick={() => handleVote("upvote")}
            >
              <GrLike size={20} />
            </button>
            <span className="text-sm font-medium">{votes.upvotes}</span>
            <button
              className={`hover:text-red-500 transition duration-200 ${
                userHasDownvoted ? "text-red-500" : ""
              }`}
              onClick={() => handleVote("downvote")}
            >
              <GrDislike size={20} />
            </button>
          </div>
          {/* Interaction Section */}
          <div className="bg-gray-100 rounded-lg p-2 flex items-center text-sm  text-black">
            <button
              className="flex items-center mr-6 hover:text-blue-500 transition duration-200 mt-1"
              onClick={handleToggleComments}
            >
              <FaRegComment size={20} className="mr-1" />
              {isCommentsVisible ? "Hide Comments" : "Show Comments"}
            </button>
          </div>
        </div>
      </div>

      {/* Comment Section */}
      {isCommentsVisible && (
        <div className="mt-4">
          <CommentSection
            postId={post._id}
            author={post.author}
            currentUserEmail={currentUserEmail || ""}
          />
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
  );
};

export default FollowingPostCard;
