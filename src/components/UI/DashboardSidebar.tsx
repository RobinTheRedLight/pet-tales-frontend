"use client";

import React from "react";
import Link from "next/link";
import {
  FaUser,
  FaUsers,
  FaMoneyBill,
  FaFilePdf,
  FaTimes,
  FaHome,
} from "react-icons/fa";
import { BiBookContent } from "react-icons/bi";

interface DashboardSidebarProps {
  userRole: "admin" | "user";
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  userRole,
  sidebarOpen,
  toggleSidebar,
}) => {
  return (
    <aside
      className={`bg-gray-800 text-white w-64 p-6 fixed lg:relative transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform lg:translate-x-0 z-50 lg:z-auto h-full`}
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <button onClick={toggleSidebar} className="lg:hidden text-2xl">
          <FaTimes />
        </button>
      </div>

      <nav className="space-y-4">
        {/* Admin Links */}
        {userRole === "admin" && (
          <>
            <Link href="/">
              <div className="flex items-center space-x-2 p-2 hover:bg-gray-700 cursor-pointer">
                <FaHome />
                <span>Home</span>
              </div>
            </Link>
            <Link href="/dashboard/profile">
              <div className="flex items-center space-x-2 p-2 hover:bg-gray-700 cursor-pointer">
                <FaUser />
                <span>Profile</span>
              </div>
            </Link>
            <Link href="/dashboard/content">
              <div className="flex items-center space-x-2 p-2 hover:bg-gray-700 cursor-pointer">
                <BiBookContent />
                <span>Content</span>
              </div>
            </Link>
            <Link href="/dashboard/users">
              <div className="flex items-center space-x-2 p-2 hover:bg-gray-700 cursor-pointer">
                <FaUsers />
                <span>Users</span>
              </div>
            </Link>
            <Link href="/dashboard/payments">
              <div className="flex items-center space-x-2 p-2 hover:bg-gray-700 cursor-pointer">
                <FaMoneyBill />
                <span>Payment History</span>
              </div>
            </Link>
          </>
        )}

        {/* User Links */}
        {userRole === "user" && (
          <>
            <Link href="/">
              <div className="flex items-center space-x-2 p-2 hover:bg-gray-700 cursor-pointer">
                <FaHome />
                <span>Home</span>
              </div>
            </Link>
            <Link href="/dashboard/profile">
              <div className="flex items-center space-x-2 p-2 hover:bg-gray-700 cursor-pointer">
                <FaUser />
                <span>Profile</span>
              </div>
            </Link>
            <Link href="/dashboard/nutrition">
              <div className="flex items-center space-x-2 p-2 hover:bg-gray-700 cursor-pointer">
                <FaFilePdf />
                <span>Nutrition PDF</span>
              </div>
            </Link>
          </>
        )}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
