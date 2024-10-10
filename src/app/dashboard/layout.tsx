"use client";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import DashboardSidebar from "@/components/UI/DashboardSidebar";
import { useGetProfileQuery } from "@/redux/features/user/userApi";
import withAuth from "@/components/withAuth/withAuth";
import Loading from "@/components/Loading/Loading";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const {
    data: profileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useGetProfileQuery("");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isProfileLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  if (isProfileError) {
    return <div>Error loading profile</div>;
  }

  const profile = profileData?.data;
  let userRole: "user" | "admin" = "user";
  if (profile?.role === "admin") {
    userRole = "admin";
  }

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <DashboardSidebar
        userRole={userRole}
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow-md p-4 lg:hidden flex items-center justify-between">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <button onClick={toggleSidebar} className="text-2xl">
            <FaBars />
          </button>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default withAuth(Layout);
