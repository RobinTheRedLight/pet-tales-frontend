import React from "react";
import Link from "next/link";
import { FaTags, FaUserFriends } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="flex flex-col space-y-4 mt-10">
      {/* Trending Posts */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Trending Posts</h2>
        <ul className="space-y-2">
          <li>
            <Link
              href="/posts/trending1"
              className="text-blue-600 hover:underline"
            >
              How to Care for Your Pet
            </Link>
          </li>
          <li>
            <Link
              href="/posts/trending2"
              className="text-blue-600 hover:underline"
            >
              Top 10 Pet Foods
            </Link>
          </li>
          <li>
            <Link
              href="/posts/trending3"
              className="text-blue-600 hover:underline"
            >
              Training Your Dog 101
            </Link>
          </li>
        </ul>
      </div>

      {/* Categories */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Categories</h2>
        <ul className="space-y-2">
          <li className="flex items-center">
            <FaTags className="mr-2 text-gray-500" />
            <Link href="/category/care" className="hover:underline">
              Pet Care
            </Link>
          </li>
          <li className="flex items-center">
            <FaTags className="mr-2 text-gray-500" />
            <Link href="/category/food" className="hover:underline">
              Pet Food
            </Link>
          </li>
          <li className="flex items-center">
            <FaTags className="mr-2 text-gray-500" />
            <Link href="/category/training" className="hover:underline">
              Training Tips
            </Link>
          </li>
        </ul>
      </div>

      {/* Popular Users */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Popular Users</h2>
        <ul className="space-y-2">
          <li className="flex items-center">
            <FaUserFriends className="mr-2 text-gray-500" />
            <Link href="/users/user1" className="hover:underline">
              User123
            </Link>
          </li>
          <li className="flex items-center">
            <FaUserFriends className="mr-2 text-gray-500" />
            <Link href="/users/user2" className="hover:underline">
              PetLover45
            </Link>
          </li>
          <li className="flex items-center">
            <FaUserFriends className="mr-2 text-gray-500" />
            <Link href="/users/user3" className="hover:underline">
              DogTrainer101
            </Link>
          </li>
        </ul>
      </div>

      {/* Popular Tags */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Popular Tags</h2>
        <div className="flex flex-wrap gap-2">
          <span className="bg-gray-200 px-2 py-1 rounded-md text-sm">
            #PetCare
          </span>
          <span className="bg-gray-200 px-2 py-1 rounded-md text-sm">
            #DogTraining
          </span>
          <span className="bg-gray-200 px-2 py-1 rounded-md text-sm">
            #HealthyFood
          </span>
          <span className="bg-gray-200 px-2 py-1 rounded-md text-sm">
            #PetLovers
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
