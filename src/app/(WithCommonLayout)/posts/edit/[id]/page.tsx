// import React, { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import {
//   useGetPostByIdQuery,
//   useUpdatePostMutation,
// } from "@/redux/features/post/postApi";
// import { useRouter } from "next/router";

// const EditPost = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const { data: post, isLoading: isLoadingPost } = useGetPostByIdQuery(
//     id as string
//   );
//   const [updatePost, { isLoading }] = useUpdatePostMutation();
//   const { register, handleSubmit, reset } = useForm();

//   useEffect(() => {
//     if (post) {
//       reset(post);
//     }
//   }, [post, reset]);

//   const onSubmit = async (data) => {
//     try {
//       await updatePost({ id: post.id, ...data }).unwrap();
//       router.push(`/posts/${post.id}`);
//     } catch (error) {
//       console.error("Failed to update post", error);
//     }
//   };

//   if (isLoadingPost) {
//     return <div>Loading post...</div>;
//   }

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <h1>Edit Post</h1>
//       <label>
//         Title:
//         <input {...register("title", { required: true })} />
//       </label>
//       <label>
//         Content:
//         <textarea {...register("content", { required: true })} />
//       </label>
//       <label>
//         Category:
//         <select {...register("category", { required: true })}>
//           <option value="Tip">Tip</option>
//           <option value="Story">Story</option>
//         </select>
//       </label>
//       <label>
//         Is Premium:
//         <input type="checkbox" {...register("isPremium")} />
//       </label>
//       {/* Handle image uploads if necessary */}
//       <button type="submit" disabled={isLoading}>
//         {isLoading ? "Updating..." : "Update Post"}
//       </button>
//     </form>
//   );
// };

// export default EditPost;
