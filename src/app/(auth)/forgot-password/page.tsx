"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { useForgotPasswordMutation } from "@/redux/features/auth/authApi";
import Link from "next/link";

type ForgotPasswordFormInputs = {
  email: string;
};

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormInputs>();
  const [forgotPassword] = useForgotPasswordMutation();

  const onSubmit: SubmitHandler<ForgotPasswordFormInputs> = async (data) => {
    try {
      await forgotPassword({ email: data.email }).unwrap();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Password reset email sent!",
        showConfirmButton: false,
        timer: 1500,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to send password reset email.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-nunito">
      <div className="shadow-2xl rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Reset Your Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
              className={`w-full mt-2 px-4 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <button type="submit" className="w-full mt-6 btn btn-primary text-lg">
            Send Reset Link
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Remembered your password?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
