"use client";

import FollowingPostCard from "@/components/posts/FollowingPostCard";
import withAuth from "@/components/withAuth/withAuth";
import { useGetPostByUserEmailQuery } from "@/redux/features/post/postApi";
import { Post } from "@/types";
import { useParams } from "next/navigation";

const FollowingUserPosts = () => {
  const params = useParams();
  const id =
    typeof params?.id === "string" ? decodeURIComponent(params.id) : "";

  const { data: postsData, isLoading: isPostsLoading } =
    useGetPostByUserEmailQuery(id);

  if (isPostsLoading) {
    return <div>Loading...</div>;
  }

  const posts = postsData?.data || [];

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-center border p-4 font-semibold">Posts by {id}</h1>
      {posts.map((post: Post) => (
        <div key={post._id} className="my-4">
          <FollowingPostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default withAuth(FollowingUserPosts);