"use client";

import SinglePostCard from "@/components/posts/SinglePostCard";
import { useParams, useRouter } from "next/navigation";
import { useGetPostByIdQuery } from "@/redux/features/post/postApi";
import { useGetPaymentByEmailQuery } from "@/redux/payment/paymentApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import withAuth from "@/components/withAuth/withAuth";
import Loading from "@/components/Loading/Loading";

const SinglePostPage = () => {
  const currentUser = useSelector((state: RootState) =>
    selectCurrentUser(state)
  ) as { email: string; role: string } | null;

  const currentUserEmail = currentUser?.email;

  const params = useParams();
  const id = params?.id;

  const { data, isLoading } = useGetPostByIdQuery(id as string);
  const { data: paymentData, isLoading: isPaymentLoading } =
    useGetPaymentByEmailQuery(currentUserEmail);

  const router = useRouter();

  if (isLoading || isPaymentLoading) {
    return <Loading />;
  }

  const post = data?.data;

  let isPremiumUser = false;
  if (paymentData?.data?.userEmail) {
    isPremiumUser = true;
  }

  const isAuthor = currentUserEmail === post?.author;
  console.log(currentUserEmail, post?.author);

  if (
    post?.isPremium &&
    !isPremiumUser &&
    !isAuthor &&
    currentUser?.role !== "admin"
  ) {
    localStorage.setItem("lastAttemptedPostId", id as string);
    router.push("/posts/premium");
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto mt-2">
      {post ? (
        <SinglePostCard key={post._id} post={post} />
      ) : (
        <div className="text-center text-gray-500">No posts found.</div>
      )}
    </div>
  );
};

export default withAuth(SinglePostPage);
