"use client";

import React from "react";
import { Toaster, toast } from "sonner";
import sidebarImage from "../../assets/sidebar.jpg";
import CreatePost from "../modules/home/Hero";

function Sidebar() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Thank you for sharing your thoughts!");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div>
      <CreatePost />
      {/* Second Content */}
      <div className="relative flex items-center justify-center mt-4 rounded-lg max-w-md p-4">
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
        <div className="absolute inset-0"></div>

        {/* Content */}
        <div className="relative z-10 p-3 max-w-md w-full">
          <h2 className="text-2xl font-semibold text-white text-center mb-4">
            Send Your Thoughts
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-medium text-white"
              >
                Your Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="mt-1 h-8 p-1 block w-full bg-white bg-opacity-80 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary text-xs"
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-white"
              >
                Your Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="mt-1 h-8 p-1 block w-full bg-white bg-opacity-80 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary text-xs"
              />
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className="block text-xs font-medium text-white"
              >
                Your Thoughts
              </label>
              <textarea
                name="message"
                id="message"
                rows={2}
                required
                className="mt-1 p-1 block w-full bg-white bg-opacity-80 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary text-xs"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="w-full h-8 px-2 bg-blue-700 text-white text-xs font-semibold rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Share Thoughts
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
