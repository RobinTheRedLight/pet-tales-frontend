"use client";

import React, { useState, useEffect } from "react";
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
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetUserFollowingQuery,
} from "@/redux/features/follow/followApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  // Get current user info from Redux
  const currentUser = useSelector((state: RootState) =>
    selectCurrentUser(state)
  ) as { email: string } | null;
  const currentUserEmail = currentUser?.email;

  // Local component state
  const [newComment, setNewComment] = useState<string>("");
  const [isCommentsVisible, setIsCommentsVisible] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  // API hooks
  const [createComment, { isLoading: isCreating }] = useCreateCommentMutation();
  const [createOrUpdateVote] = useCreateOrUpdateVoteMutation();
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();

  // Fetch votes for the post and user-specific votes
  const {
    data: votesData,
    refetch: refetchVotes,
    isLoading,
  } = useGetVotesByPostIdQuery({
    postId: post._id,
    userEmail: currentUserEmail,
  });

  // Fetch following status for the current user
  const { data: followingData } = useGetUserFollowingQuery(
    currentUserEmail || "",
    {
      skip: !currentUserEmail,
    }
  );

  useEffect(() => {
    if (followingData?.data) {
      setIsFollowing(
        followingData.data.some(
          (follow: { followingUserEmail: string }) =>
            follow.followingUserEmail === post.author
        )
      );
    }
  }, [followingData, post.author]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Type definition for the vote
  type VoteType = {
    upvotes: number;
    downvotes: number;
    userVotes?: Array<{
      voteType: "upvote" | "downvote";
    }> | null;
  };

  // Default value for votes
  const votes: VoteType = votesData?.data ?? {
    upvotes: 0,
    downvotes: 0,
    userVotes: [],
  };

  // Determine user's vote status based on fetched votes
  const userHasUpvoted = votes.userVotes?.[0]?.voteType === "upvote";
  const userHasDownvoted = votes.userVotes?.[0]?.voteType === "downvote";

  // Comment visibility toggle
  const handleToggleComments = () => {
    setIsCommentsVisible((prev) => !prev);
  };

  // Submit comment handler
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

  // Handle voting (upvote or downvote)
  const handleVote = async (voteType: "upvote" | "downvote") => {
    if (!currentUserEmail) {
      console.error("User not logged in. Cannot vote.");
      return;
    }
    try {
      await createOrUpdateVote({
        postId: post._id,
        voteType,
        userEmail: currentUserEmail,
      }).unwrap();
      refetchVotes(); // Refresh votes after a successful vote
    } catch (error) {
      console.error("Failed to vote:", error);
    }
  };

  // Handle follow/unfollow
  const handleFollow = async () => {
    if (!currentUserEmail) {
      console.error("User not logged in. Cannot follow.");
      return;
    }
    try {
      if (isFollowing) {
        await unfollowUser({ userIdToUnfollow: post.author }).unwrap();
      } else {
        await followUser({ userIdToFollow: post.author }).unwrap();
      }
      setIsFollowing((prev) => !prev);
    } catch (error) {
      console.error("Failed to follow/unfollow user:", error);
    }
  };

  return (
    <div className="flex p-4 shadow-md rounded-md mb-4">
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
        <div className="flex justify-between items-center">
          <Link href={`/posts/${post._id}`}>
            <h2 className="text-xl font-semibold hover:underline">
              {post.title}
            </h2>
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-xs text-gray-400">
              Posted by {post.author}
            </span>
            <button
              className={`px-4 py-1 text-sm rounded-md transition duration-200 ${
                isFollowing ? "bg-red-500 text-white" : "bg-blue-500 text-white"
              } hover:${isFollowing ? "bg-red-600" : "bg-blue-600"}`}
              onClick={handleFollow}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          </div>
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
          <button
            className="flex items-center mr-6 hover:text-blue-500 transition duration-200"
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
            <CommentSection postId={post._id} />

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

export default PostCard;
