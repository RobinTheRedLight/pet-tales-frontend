"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";

type ResetPasswordFormInputs = {
  password: string;
};

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [tokenValid, setTokenValid] = useState<boolean | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormInputs>();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  // Verify token on component mount
  useEffect(() => {
    if (!token) {
      setTokenValid(false);
    } else {
      setTokenValid(true);
    }
  }, [token]);

  const onSubmit: SubmitHandler<ResetPasswordFormInputs> = async (data) => {
    if (!token) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Invalid or missing token.",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    try {
      await resetPassword({ token, password: data.password }).unwrap();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Password has been reset!",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/login");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to reset password.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  if (tokenValid === false) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 font-nunito">
        <div className="shadow-2xl rounded-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold mb-8 text-center">Invalid Token</h2>
          <p className="text-center">
            The password reset token is invalid or missing.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-nunito">
      <div className="shadow-2xl rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Set New Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block" htmlFor="password">
              New Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
              className={`w-full mt-2 px-4 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full mt-6 btn btn-primary text-lg"
            disabled={isLoading}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
