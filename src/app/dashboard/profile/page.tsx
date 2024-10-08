"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/features/user/userApi";
import { Post, ProfileFormInputs } from "@/types";
import Image from "next/image";
import {
  useGetUserFollowersQuery,
  useGetUserFollowingQuery,
} from "@/redux/features/follow/followApi";
import { useGetPostByUserEmailQuery } from "@/redux/features/post/postApi";
import PostCard from "@/components/posts/PostCard";
import { formatDistanceToNow } from "date-fns";
import withAuth from "@/components/withAuth/withAuth";

const Profile = () => {
  const imageHostKey = process.env.NEXT_PUBLIC_IMAGE_HOST_KEY;

  // Fetch profile data
  const {
    data: profileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useGetProfileQuery("");

  // Fetch posts, followers, and following
  const { data: postsData, isLoading: isPostsLoading } =
    useGetPostByUserEmailQuery(profileData?.data?.email || "");

  const { data: followersData, isLoading: isFollowersLoading } =
    useGetUserFollowersQuery(profileData?.data?.email || "");

  const { data: followingData, isLoading: isFollowingLoading } =
    useGetUserFollowingQuery(profileData?.data?.email || "");
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormInputs>({
    defaultValues: {
      name: profileData?.data?.name || "",
      phone: profileData?.data?.phone || "",
      address: profileData?.data?.address || "",
    },
  });

  const [updateProfile] = useUpdateProfileMutation();

  if (
    isProfileLoading ||
    isPostsLoading ||
    isFollowersLoading ||
    isFollowingLoading
  ) {
    return <div>Loading...</div>;
  }

  if (isProfileError) {
    return <div>Error loading profile</div>;
  }

  // Assign data after loading
  const profile = profileData?.data;
  const posts = postsData?.data || [];
  const followers = followersData?.data || [];
  const following = followingData?.data || [];

  // Format the createdAt date
  const createdAtDate = profile?.createdAt ? new Date(profile.createdAt) : null;
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
  };
  const formattedDate = createdAtDate
    ? createdAtDate.toLocaleDateString(undefined, options)
    : "Unknown Date";

  // Handle Profile Update
  const onSubmit: SubmitHandler<ProfileFormInputs> = async (data) => {
    let imageUrl = profile?.image || "";
    try {
      if (data.image && data.image.length > 0) {
        Swal.fire({
          title: "Uploading image...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const image = data.image[0];
        const formData = new FormData();
        formData.append("image", image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        const response = await fetch(url, {
          method: "POST",
          body: formData,
        });
        const imgData = await response.json();

        Swal.close();

        if (imgData.success) {
          imageUrl = imgData.data.url;
        } else {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Image upload failed",
            showConfirmButton: false,
            timer: 1500,
          });
          return;
        }
      }

      const updatedProfile = {
        name: data.name,
        phone: data.phone,
        address: data.address,
        image: imageUrl,
      };

      const result = await updateProfile(updatedProfile).unwrap();
      if (result) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Profile updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsEditing(false);
      }
    } catch (error) {
      Swal.close();
      const errorMessage = (
        error as { data: { errorSources: { message: string }[] } }
      ).data.errorSources[0].message;
      console.log(error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: errorMessage,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (profile) {
      reset({
        name: profile.name,
        phone: profile.phone,
        address: profile.address,
      });
    }
  };

  return (
    <div className="font-nunito max-w-screen-lg mt-5 mx-auto">
      {/* Profile Header */}
      <div className="shadow-md border  rounded-lg">
        <div className="px-4 py-6 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          {/* Profile Picture */}
          <div className="w-24 h-24 mx-auto md:mx-0">
            <Image
              src={profile?.image || "/default-avatar.png"}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
              width={500}
              height={500}
            />
          </div>
          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-xl md:text-2xl font-bold">{profile?.name}</h1>
            <p className="">{profile?.email}</p>
            <div className="flex flex-col md:flex-row items-center md:items-center mt-2 space-y-2 md:space-y-0 md:space-x-4">
              <div className="flex items-center justify-center md:justify-start space-x-1">
                <FaMapMarkerAlt />
                <span>{profile?.address || "Unknown Location"}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-1">
                <FaCalendarAlt />
                <span>Joined {formattedDate}</span>
              </div>
            </div>
          </div>
          {/* Edit Button */}
          <div className="md:self-start">
            <button onClick={handleEditToggle} className="btn btn-outline">
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs with Counts */}
      <div className="max-w-4xl mx-auto mt-4">
        <div className="flex border-b border-gray-300">
          <button
            onClick={() => setActiveTab("posts")}
            className={`flex-1 text-center py-2 ${
              activeTab === "posts"
                ? "font-bold border-b-2 border-blue-500"
                : "text-gray-600"
            }`}
          >
            Posts ({posts.length})
          </button>
          <button
            onClick={() => setActiveTab("followers")}
            className={`flex-1 text-center py-2 ${
              activeTab === "followers"
                ? "font-bold border-b-2 border-blue-500"
                : "text-gray-600"
            }`}
          >
            Followers ({followers.length})
          </button>
          <button
            onClick={() => setActiveTab("following")}
            className={`flex-1 text-center py-2 ${
              activeTab === "following"
                ? "font-bold border-b-2 border-blue-500"
                : "text-gray-600"
            }`}
          >
            Following ({following.length})
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-4xl mx-auto mt-4">
        {activeTab === "posts" && (
          <div>
            {posts.map((post: Post) => {
              const postDate = post.createdAt
                ? new Date(post.createdAt)
                : new Date();
              const timeAgo = formatDistanceToNow(postDate, {
                addSuffix: true,
              });

              return (
                <div key={post._id} className="shadow-md rounded-lg p-4 mb-4">
                  <div className="flex space-x-4">
                    <Image
                      src={profile?.image || "/default-avatar.png"}
                      alt="Profile"
                      className="w-12 h-12 rounded-full"
                      width={500}
                      height={500}
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold">{profile?.name}</span>
                        <span className="text-gray-500">· {timeAgo}</span>
                      </div>
                      <p className="mt-2">
                        <PostCard post={post} />
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {activeTab === "followers" && (
          <div>
            {followers.map((follower: { userEmail: string }, index: number) => (
              <div key={follower.userEmail} className="overflow-x-auto mt-2">
                <table className="table w-1/2 mx-auto border-2">
                  <tbody>
                    {/* row 1 */}
                    <tr className="hover ">
                      <th className="">{index + 1}</th>
                      <td className="">Email:</td>
                      <td className="">{follower.userEmail}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}
        {activeTab === "following" && (
          <div>
            {following.map(
              (followedUser: { followingUserEmail: string }, index: number) => (
                <div
                  key={followedUser.followingUserEmail}
                  className="overflow-x-auto "
                >
                  <table className="table w-1/2 mx-auto border-2">
                    {/* head */}
                    <tbody>
                      {/* row 1 */}
                      <tr className="hover">
                        <th>{index + 1}</th>
                        <td>Email:</td>
                        <td>{followedUser.followingUserEmail}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed flex items-center justify-center inset-0 bg-black bg-opacity-50 z-50 mx-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 rounded-lg w-full max-w-lg bg-white"
          >
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            {/* Name Field */}
            <div className="mb-4">
              <label className="block" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                {...register("name", { required: "Name is required" })}
                className={`w-full mt-2 px-4 py-2 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div className="mb-4">
              <label className="block" htmlFor="phone">
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                {...register("phone", {
                  required: "Phone is required",
                  pattern: {
                    value: /^[0-9]{11}$/,
                    message: "Phone number must be 11 digits",
                  },
                })}
                className={`w-full mt-2 px-4 py-2 border ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Address Field */}
            <div className="mb-4">
              <label className="block" htmlFor="address">
                Address
              </label>
              <textarea
                id="address"
                {...register("address", { required: "Address is required" })}
                className={`w-full mt-2 px-4 py-2 border ${
                  errors.address ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              ></textarea>
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* Image Field */}
            <div className="mb-4">
              <label className="block" htmlFor="image">
                Profile Photo
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                {...register("image")}
                className={`w-full mt-2 px-4 py-2 border ${
                  errors.image ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.image.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={handleEditToggle}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default withAuth(Profile);
