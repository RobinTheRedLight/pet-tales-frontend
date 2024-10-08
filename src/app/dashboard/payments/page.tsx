"use client";
import React from "react";
import { useGetAllPaymentsQuery } from "@/redux/features/admin/adminApi";
import { IPayment } from "@/types";
import withAdminAuth from "@/components/withAdminAuth/withAdminAuth";

const Payments: React.FC = () => {
  const { data, isLoading, error } = useGetAllPaymentsQuery("");
  const payments = data?.data as IPayment[];

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading payments...</div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-500">Error loading payments</div>
      </div>
    );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Payment History</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
              <th className="py-3 px-5 text-left">User Email</th>
              <th className="py-3 px-5 text-left">Amount</th>
              <th className="py-3 px-5 text-left">Payment ID</th>
              {/* Add additional headers if needed */}
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {payments?.map((payment: IPayment) => (
              <tr
                key={payment._id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-4 px-5">{payment.userEmail}</td>
                <td className="py-4 px-5">${payment.amount.toFixed(2)}</td>
                <td className="py-4 px-5">{payment.paymentIntentId}</td>
                {/* Add additional data if needed */}
              </tr>
            ))}
            {payments?.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-4 px-5 text-gray-500">
                  No payments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default withAdminAuth(Payments);
