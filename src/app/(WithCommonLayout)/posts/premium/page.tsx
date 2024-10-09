"use client";
import PaymentForm from "@/components/Payment/PaymentForm";
import withAuth from "@/components/withAuth/withAuth";
import Link from "next/link";

const Premium = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-nunito bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Access Premium Content
        </h1>
        <p className="text-lg text-gray-600 mb-6 text-center">
          To access this premium content, please complete the payment below.
          You&apos;ll enjoy exclusive benefits and valuable insights that only
          premium users can see.
        </p>
        <PaymentForm />
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Cancel and return to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Premium);
