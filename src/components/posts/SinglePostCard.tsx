"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { FaCommentAlt, FaTrashAlt, FaEdit } from "react-icons/fa";
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
import {
  useDeletePostMutation,
  useUpdatePostMutation,
} from "@/redux/features/post/postApi";
import Swal from "sweetalert2";
import { toast, Toaster } from "sonner";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/navigation";
import Loading from "../Loading/Loading";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface PostCardProps {
  post: Post;
}

const SinglePostCard: React.FC<PostCardProps> = ({ post }) => {
  const router = useRouter();
  const currentUser = useSelector((state: RootState) =>
    selectCurrentUser(state)
  ) as { email: string } | null;
  const currentUserEmail = currentUser?.email;

  const [newComment, setNewComment] = useState<string>("");
  const [isCommentsVisible, setIsCommentsVisible] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editContent, setEditContent] = useState<string>(post.content);
  const [editTitle, setEditTitle] = useState<string>(post.title);

  const [createComment, { isLoading: isCreating }] = useCreateCommentMutation();
  const [createOrUpdateVote] = useCreateOrUpdateVoteMutation();
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();
  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();

  const {
    data: votesData,
    refetch: refetchVotes,
    isLoading,
  } = useGetVotesByPostIdQuery({
    postId: post._id,
    userEmail: currentUserEmail,
  });

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
    return <Loading />;
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

  const handleFollow = async () => {
    if (!currentUserEmail) {
      toast.error("Please login to follow this user");
      return;
    }
    try {
      if (isFollowing) {
        await unfollowUser({ userEmailToUnfollow: post.author }).unwrap();
      } else {
        await followUser({ userEmailToFollow: post.author }).unwrap();
      }
      setIsFollowing((prev) => !prev);
    } catch (error) {
      console.error("Failed to follow/unfollow user:", error);
    }
  };

  const handleDeletePost = async () => {
    if (currentUserEmail === post.author) {
      try {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
          await deletePost(post._id).unwrap();
          router.back();
          await Swal.fire({
            title: "Deleted!",
            text: "Your post has been deleted.",
            icon: "success",
          });
        }
      } catch (error) {
        console.error("Failed to delete post:", error);
        await Swal.fire({
          title: "Error",
          text: "Failed to delete the post. Please try again.",
          icon: "error",
        });
      }
    }
  };

  const handleEditPost = async () => {
    if (!currentUserEmail || currentUserEmail !== post.author) {
      return;
    }
    try {
      await updatePost({
        id: post._id,
        title: editTitle,
        content: editContent,
      }).unwrap();
      setIsEditModalOpen(false);
      Swal.fire({
        title: "Success!",
        text: "Your post has been updated.",
        icon: "success",
      });
    } catch (error) {
      console.error("Failed to update post:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to update the post. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <div className="flex p-4 shadow-md rounded-md mb-4 border ">
      <Toaster richColors />
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
            <p className="text-xl  font-nunito">{post.category}</p>
            {post.isPremium ? (
              <p className="badge badge-sm badge-warning">Premium</p>
            ) : (
              <p className="badge badge-sm  badge-neutral">Free</p>
            )}
          </p>
          <div className="flex flex-col items-end gap-2">
            {currentUserEmail && currentUserEmail === post.author ? (
              <>
                <span className="text-xs text-gray-400">
                  Posted by {post.author}
                </span>
                <div className="flex gap-4">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => setIsEditModalOpen(true)}
                  >
                    <span className="flex items-center gap-2">
                      <FaEdit /> Edit Post
                    </span>
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={handleDeletePost}
                  >
                    <span className="flex items-center gap-2">
                      <FaTrashAlt /> Delete Post
                    </span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="sm:flex items-center gap-2">
                  <span className="text-xs font-semibold ">
                    Posted by {post.author}
                  </span>
                  <div className="flex gap-2 justify-end sm:block">
                    {isFollowing && (
                      <Link
                        href={`/post/${post.author}`}
                        className="btn btn-xs btn-outline  btn-success sm:mr-2"
                      >
                        view posts
                      </Link>
                    )}
                    <button
                      className={`px-1 sm:px-4  sm:py-1 text-sm rounded-md transition duration-200 ${
                        isFollowing
                          ? "bg-red-500 text-white"
                          : "bg-blue-500 text-white"
                      } hover:${isFollowing ? "bg-red-600" : "bg-blue-600"}`}
                      onClick={handleFollow}
                    >
                      {isFollowing ? "Unfollow" : "Follow"}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Content Summary and Read More */}
        <div className="mt-2">
          <Link href="#">
            <h2 className="text-2xl font-semibold hover:underline font-nunito my-2">
              {post.title}
            </h2>
          </Link>
          <div
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
            className="prose max-w-none text-black text-justify "
          />
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

      {/* Edit Post Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-lg p-6 w-full max-w-lg"
            style={{ maxHeight: "80vh", overflowY: "auto" }}
          >
            <h2 className="text-xl font-bold mb-4">Edit Post</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium" htmlFor="editTitle">
                Title
              </label>
              <input
                type="text"
                id="editTitle"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium"
                htmlFor="editContent"
              >
                Content
              </label>
              <ReactQuill
                value={editContent}
                onChange={setEditContent}
                theme="snow"
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                  ],
                }}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={handleEditPost}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePostCard;
