"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { GrLike, GrDislike } from "react-icons/gr";
import { FaRegComment, FaTrashAlt, FaEdit } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
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
import PostLoading from "../Loading/PostLoading";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface PostCardProps {
  post: Post;
}

const SinglePostCard: React.FC<PostCardProps> = ({ post }) => {
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

  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleClickOutside = (event: any) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    <div className="flex flex-col px-4 pt-2 pb-2 shadow-md rounded-md mb-4 border bg-white">
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
          <div className="flex flex-col items-end gap-2">
            {currentUserEmail && currentUserEmail === post.author ? (
              <>
                <div className="relative">
                  {/* More icon button */}
                  <button
                    onClick={toggleOptions}
                    className=" hover:bg-gray-100 p-1 rounded-full text-black"
                  >
                    <IoIosMore size={24} />
                  </button>

                  {/* Popup dropdown menu */}
                  {showOptions && (
                    <div
                      ref={optionsRef}
                      className="absolute top-8 right-0 bg-white border border-gray-300 shadow-lg rounded-md w-40 z-10"
                    >
                      <button
                        className="w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100"
                        onClick={() => {
                          setIsEditModalOpen(true);
                          setShowOptions(false); // Close after action
                        }}
                      >
                        <span className="flex items-center gap-2">
                          <FaEdit /> Edit Post
                        </span>
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                        onClick={() => {
                          handleDeletePost();
                          setShowOptions(false); // Close after action
                        }}
                      >
                        <span className="flex items-center gap-2">
                          <FaTrashAlt /> Delete Post
                        </span>
                      </button>
                    </div>
                  )}
                </div>
                <span className="text-xs text-gray-400">
                  Posted by {post.author}
                </span>
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
          <Link href={`/posts/${post._id}`}>
            <p className="text-2xl font-semibold hover:underline font-nunito my-2">
              {post.title}
            </p>
          </Link>
          <div
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
            className="prose max-w-none text-justify "
          />
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
