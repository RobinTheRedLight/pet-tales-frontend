"use client";

import { IoCreateOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { fadeUp } from "@/Animation/constant";

const CreatePost = () => {
  return (
    <section className="flex items-center justify-center pt-4">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="w-full max-w-md bg-white shadow-md rounded-lg p-6"
      >
        {/* Title */}
        <h2 className="text-gray-800 text-xl font-semibold mb-4 text-center">
          Share Your Story
        </h2>

        {/* Create Post Button */}
        <div className="flex justify-center">
          <a
            href="/posts/create"
            className="flex items-center bg-orange-600 px-6 py-1 lg:py-3 lg: rounded-full text-white lg:text-lg font-medium hover:bg-orange-700 transition duration-300"
          >
            <span className="mr-2">Create Post</span>
            <IoCreateOutline size={20} />
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default CreatePost;
