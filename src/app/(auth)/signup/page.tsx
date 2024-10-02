"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { SignupFormInputs } from "@/types";
import { useSignUpMutation } from "@/redux/features/auth/authApi";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignUp = () => {
  const router = useRouter();
  const imageHostKey = process.env.NEXT_PUBLIC_IMAGE_HOST_KEY;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>();

  const [signup] = useSignUpMutation();

  const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
    let imageUrl = "";
    try {
      Swal.fire({
        title: "Uploading image...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const image = data.image[0];
      const formData = new FormData();
      formData.append("image", image);
      const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const imgData = await response.json();

      Swal.close();

      if (imgData.success) {
        imageUrl = imgData.data.url;
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
      const userInfos = {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        address: data.address,
        image: imageUrl,
        role: "user",
      };
      const result = await signup(userInfos).unwrap();
      if (result) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Congratulations, your account has been successfully created",
          showConfirmButton: false,
          timer: 1500,
        });

        router.push("/login");
      }
    } catch (error) {
      Swal.close();

      const errorMessage = (
        error as { data: { errorSources: { message: string }[] } }
      ).data.errorSources[0].message;
      console.log(error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: errorMessage,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4 font-nunito">
      <div className=" shadow-2xl rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
            <div>
              <label className="block " htmlFor="name">
                Name
              </label>
              <input
                id="name"
                {...register("name", { required: "Name is required" })}
                className={`w-full mt-2 px-4 py-2 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
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

            {/* Password Field */}
            <div>
              <label className="block " htmlFor="password">
                Password
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

            {/* Phone Field */}
            <div>
              <label className="block " htmlFor="phone">
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                {...register("phone", {
                  required: "Phone is required",
                  pattern: {
                    value: /^[0-9]{11}$/,
                    message: "Phone number must be 11 digits",
                  },
                })}
                className={`w-full mt-2 px-4 py-2 border ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          {/* Image Field */}
          <div className="mt-6">
            <label className="block" htmlFor="image">
              Photo
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              {...register("image", { required: "Photo is required" })}
              className={`w-full mt-2 px-4 py-2 border ${
                errors.image ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          {/* Address Field */}
          <div className="mt-6">
            <label className="block" htmlFor="address">
              Address
            </label>
            <textarea
              id="address"
              {...register("address", { required: "Address is required" })}
              className={`w-full mt-2 px-4 py-2 border ${
                errors.address ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            ></textarea>
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          <button type="submit" className="w-full mt-8 btn btn-primary text-lg">
            Sign Up
          </button>

          <p className="text-sm text-center mt-4 ">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
