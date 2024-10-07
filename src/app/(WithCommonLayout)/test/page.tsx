"use client";
import {
  useGetPostByUserEmailQuery,
  useGetPostsQuery,
} from "@/redux/features/post/postApi";
import { useGetProfileQuery } from "@/redux/features/user/userApi";
import { Post } from "@/types/post.type";

const Test = () => {
  const {
    data: profileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useGetProfileQuery("");

  const { data: postsData, isLoading: isPostsLoading } =
    useGetPostByUserEmailQuery(profileData?.data?.email || "");

  const { data: allPostsData, isLoading: isAllPostsLoading } =
    useGetPostsQuery("");

  if (isAllPostsLoading) return <div>Loading...</div>;
  if (isProfileLoading) return <div>Loading...</div>;
  if (isProfileError) return <div>Error</div>;
  if (isPostsLoading) return <div>Loading...</div>;

  return (
    <div>
      {console.log(profileData?.data?.email)}
      {console.log(allPostsData?.data.length)}
      {console.log(postsData?.data)}
      {profileData?.data?.name}
      {postsData?.data?.map((post: Post) => (
        <div key={post._id}>{post.title}</div>
      ))}
      {allPostsData?.data?.map((post: Post) => (
        <div key={post._id}>{post.title}</div>
      ))}
    </div>
  );
};

export default Test;
