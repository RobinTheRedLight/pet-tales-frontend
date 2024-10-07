"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  useGetCommentsByPostIdQuery,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} from "@/redux/features/comment/commentApi";
import { Comment } from "@/types";
import { toast, Toaster } from "sonner";

interface CommentSectionProps {
  postId: string;
  author: string;
  currentUserEmail?: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  postId,
  author,
  currentUserEmail,
}) => {
  const { data, isLoading, isError, refetch } = useGetCommentsByPostIdQuery(
    postId,
    { skip: false }
  );
  const comments = data?.data;
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [editCommentId, setEditCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<string>("");

  if (isLoading) {
    return <div className="mt-2">Loading comments...</div>;
  }

  if (isError) {
    return <div className="mt-2 text-red-500">Failed to load comments.</div>;
  }

  if (!comments || !Array.isArray(comments) || comments.length === 0) {
    return <div className="mt-2">No comments available.</div>;
  }

  const handleEdit = async (commentId: string) => {
    if (editContent.trim()) {
      await updateComment({ commentId, content: editContent });
      setEditCommentId(null);
      setEditContent("");
      toast.success("Comment has been updated");
      refetch();
    }
  };

  const handleDelete = async (commentId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteComment(commentId);
        refetch();
        Swal.fire({
          title: "Deleted!",
          text: "The comment has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="mt-2">
      <Toaster richColors />
      {comments.map((comment: Comment) => (
        <div key={comment._id} className="bg-gray-100 p-2 rounded-md mb-2">
          {editCommentId === comment._id ? (
            <div>
              <input
                type="text"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="border rounded-md p-2 w-full mb-2"
              />
              <button
                onClick={() => handleEdit(comment._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditCommentId(null);
                  setEditContent("");
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <p className="text-gray-800 break-words">{comment.content}</p>
              <span className="text-xs text-gray-500">
                Posted by {comment.userEmail}
              </span>
              <div className="mt-2">
                {!currentUserEmail ||
                  (currentUserEmail !== author && (
                    <>
                      <button
                        onClick={() => {
                          setEditCommentId(comment._id);
                          setEditContent(comment.content);
                        }}
                        className="text-blue-500 hover:underline mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(comment._id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </>
                  ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
