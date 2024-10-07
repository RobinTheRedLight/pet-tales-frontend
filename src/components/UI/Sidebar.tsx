"use client";

import React from "react";
import { Toaster, toast } from "sonner";
import sidebarImage from "../../assets/sidebar.jpg";

function Sidebar() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Thank you for sharing your thoughts!");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="relative min-h-0.5 flex items-center justify-center mt-20 rounded-lg">
      <Toaster richColors />
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${sidebarImage.src})`,
          filter: "brightness(0.9)",
        }}
      ></div>

      {/* Overlay for background image */}
      <div className="absolute inset-0 "></div>

      {/* Content */}
      <div className="relative z-10 p-6 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Send Your Thoughts
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white"
            >
              Your Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="mt-1 p-2 block w-full bg-white bg-opacity-80 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Your Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="mt-1 p-2 block w-full bg-white bg-opacity-80 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            />
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-white"
            >
              Your Thoughts
            </label>
            <textarea
              name="message"
              id="message"
              rows={5}
              required
              className="mt-1 p-2 block w-full bg-white bg-opacity-80 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-700 text-white font-semibold rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Share Thoughts
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Sidebar;
