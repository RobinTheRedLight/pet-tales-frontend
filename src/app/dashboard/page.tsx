"use client";
import React from "react";

const DashboardPage: React.FC = () => {
  return (
    <div>
      <div className="text-center p-4">
        <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
        <p className="text-gray-600 mt-4">
          Choose a section from the sidebar to get started.
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
