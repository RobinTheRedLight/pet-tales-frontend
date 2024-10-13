"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCreatePostMutation } from "@/redux/features/post/postApi";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { CreatePostFormInputs } from "@/types";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import Image from "next/image";
import withAuth from "@/components/withAuth/withAuth";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const CreatePost = () => {
  const router = useRouter();
  const imageHostKey = process.env.NEXT_PUBLIC_IMAGE_HOST_KEY;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostFormInputs>();
  const [createPost] = useCreatePostMutation();
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [content, setContent] = useState<string>("");

  const onSubmit: SubmitHandler<CreatePostFormInputs> = async (data) => {
    try {
      Swal.fire({
        title: "Uploading...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Handle multiple image uploads
      const imageUrls: string[] = [];
      const files = data.images;
      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        formData.append("image", files[i]);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        const response = await fetch(url, {
          method: "POST",
          body: formData,
        });
        const imgData = await response.json();
        if (imgData.success) {
          imageUrls.push(imgData.data.url);
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
        formData.delete("image"); // Reset formData for the next image
      }

      Swal.close();

      const postData = {
        title: data.title,
        content: content,
        category: data.category,
        images: imageUrls,
        isPremium: data.isPremium,
      };

      await createPost(postData).unwrap();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Post created successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/dashboard/profile");
    } catch (error) {
      Swal.close();
      console.error("Failed to create post", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to create post",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  // Handle image preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const imagesArray: string[] = filesArray.map((file) =>
        URL.createObjectURL(file)
      );
      setPreviewImages(imagesArray);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-nunito">
      <div className="shadow-2xl rounded-lg p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Create New Post</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Title Field */}
          <div>
            <label className="block" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              {...register("title", { required: "Title is required" })}
              className={`w-full mt-2 px-4 py-2 border ${
                errors.title ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Content Field */}
          <div className="mt-6">
            <label className="block" htmlFor="content">
              Content
            </label>
            <ReactQuill
              value={content}
              onChange={setContent}
              className={`mt-2 ${
                errors.content ? "border-red-500" : "border-gray-300"
              }`}
              theme="snow"
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ["bold", "italic", "underline", "strike"],
                  [{ list: "ordered" }, { list: "bullet" }],
                ],
              }}
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">
                {errors.content.message}
              </p>
            )}
          </div>

          {/* Category and IsPremium Fields */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Field */}
            <div>
              <label className="block" htmlFor="category">
                Category
              </label>
              <select
                id="category"
                {...register("category", { required: "Category is required" })}
                className={`w-full mt-2 px-4 py-2 border ${
                  errors.category ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="">Select Category</option>
                <option value="Tip">Tip</option>
                <option value="Story">Story</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* IsPremium Field */}
            <div className="flex items-center mt-8 md:mt-0">
              <input
                id="isPremium"
                type="checkbox"
                {...register("isPremium")}
                className="mr-2"
              />
              <label htmlFor="isPremium">Mark as Premium Content</label>
            </div>
          </div>

          {/* Images Field */}
          <div className="mt-6">
            <label className="block" htmlFor="images">
              Images
            </label>
            <input
              id="images"
              type="file"
              accept="image/*"
              multiple
              {...register("images")}
              onChange={handleImageChange}
              className={`w-full mt-2 px-4 py-2 border ${
                errors.images ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.images && (
              <p className="text-red-500 text-sm mt-1">
                {errors.images.message}
              </p>
            )}
          </div>

          {/* Image Preview */}
          {previewImages.length > 0 && (
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
              {previewImages.map((image, index) => (
                <div
                  key={index}
                  className="w-full h-32 overflow-hidden rounded-md"
                >
                  <Image
                    src={image}
                    alt={`Preview ${index}`}
                    className="object-cover w-full h-full"
                    width={500}
                    height={500}
                  />
                </div>
              ))}
            </div>
          )}

          <button type="submit" className="w-full mt-8 btn btn-primary text-lg">
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default withAuth(CreatePost);
