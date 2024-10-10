/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserAdminMutation,
} from "@/redux/features/admin/adminApi";
import { User } from "@/types/user.type";

import Swal from "sweetalert2";
import withAdminAuth from "@/components/withAdminAuth/withAdminAuth";
import Loading from "@/components/Loading/Loading";

const Users: React.FC = () => {
  const { data, isLoading, error } = useGetAllUsersQuery("");
  const users = data?.data as User[];

  const [deleteUser] = useDeleteUserMutation();
  const [updateUserAdmin] = useUpdateUserAdminMutation();

  const [deletingUserId, setDeletingUserId] = useState<string>("");
  const [updatingUserId, setUpdatingUserId] = useState<string>("");

  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleDelete = async (id: string) => {
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
      setSuccessMessage("");
      setErrorMessage("");
      setDeletingUserId(id);
      try {
        await deleteUser(id).unwrap();
        await Swal.fire({
          title: "Deleted!",
          text: "The user has been deleted.",
          icon: "success",
        });
      } catch (err) {
        setErrorMessage("Failed to delete user.");
        await Swal.fire({
          title: "Error",
          text: "Failed to delete user.",
          icon: "error",
        });
      } finally {
        setDeletingUserId("");
      }
    }
  };

  const handleMakeAdmin = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to promote this user to admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make admin!",
    });

    if (result.isConfirmed) {
      setSuccessMessage("");
      setErrorMessage("");
      setUpdatingUserId(id);
      try {
        await updateUserAdmin({ id, data: { role: "admin" } }).unwrap();
        await Swal.fire({
          title: "Promoted!",
          text: "The user has been promoted to admin.",
          icon: "success",
        });
      } catch (err) {
        await Swal.fire({
          title: "Error",
          text: "Failed to promote user to admin.",
          icon: "error",
        });
      } finally {
        setUpdatingUserId("");
      }
    }
  };

  if (isLoading) return <Loading />;
  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-500">Error loading users</div>
      </div>
    );

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">User Management</h1>
      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 border border-green-200 text-green-800 rounded">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="mb-4 p-4 bg-red-100 border border-red-200 text-red-800 rounded">
          {errorMessage}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
              <th className="py-3 px-2 sm:px-5 text-left">Name</th>
              <th className="py-3 px-2 sm:px-5 text-left">Email</th>
              <th className="py-3 px-2 sm:px-5 text-left">Role</th>
              <th className="py-3 px-2 sm:px-5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {users?.map((user: User) => (
              <tr
                key={user._id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-4 px-2 sm:px-5">{user.name}</td>
                <td className="py-4 px-2 sm:px-5">{user.email}</td>
                <td className="py-4 px-2 sm:px-5">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.role === "admin"
                        ? "bg-green-200 text-green-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="py-4 px-2 sm:px-5 text-center">
                  <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <button
                      onClick={() => handleDelete(user._id)}
                      disabled={deletingUserId === user._id}
                      className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 sm:py-2 px-2 sm:px-4 rounded text-xs sm:text-sm disabled:opacity-50 w-full sm:w-auto"
                    >
                      {deletingUserId === user._id ? "Deleting..." : "Delete"}
                    </button>
                    {user.role !== "admin" && (
                      <button
                        onClick={() => handleMakeAdmin(user._id)}
                        disabled={updatingUserId === user._id}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 sm:py-2 px-2 sm:px-4 rounded text-xs sm:text-sm disabled:opacity-50 w-full sm:w-auto"
                      >
                        {updatingUserId === user._id
                          ? "Promoting..."
                          : "Make Admin"}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {users?.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 px-5 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default withAdminAuth(Users);
