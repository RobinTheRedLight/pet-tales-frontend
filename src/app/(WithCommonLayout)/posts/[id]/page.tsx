// "use client";

// import React from "react";
// import { useRouter } from "next/navigation";
// import {
//   useGetPostByIdQuery,
//   useDeletePostMutation,
// } from "@/redux/features/post/postApi";

// const PostDetails = () => {
//   const router = useRouter();
//   const { _id } = router.query;
//   const {
//     data: post,
//     isLoading,
//     isError,
//     error,
//   } = useGetPostByIdQuery(id as string);
//   const [deletePost] = useDeletePostMutation();

//   if (isLoading) {
//     return <div>Loading post...</div>;
//   }

//   if (isError) {
//     return <div>Error loading post: {error.toString()}</div>;
//   }

//   const handleDelete = async () => {
//     await deletePost(post.id);
//     router.push("/posts");
//   };

//   return (
//     <div>
//       <h1>{post.title}</h1>
//       <p>{post.content}</p>
//       {/* Display images if any */}
//       {post.images &&
//         post.images.map((img, index) => (
//           <img key={index} src={img} alt="Post Image" />
//         ))}
//       {/* Show Edit and Delete buttons if the user is the author */}
//       <button onClick={() => router.push(`/posts/edit/${post.id}`)}>
//         Edit
//       </button>
//       <button onClick={handleDelete}>Delete</button>
//     </div>
//   );
// };

// export default PostDetails;
