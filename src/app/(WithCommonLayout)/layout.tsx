"use client";
import Navbar from "@/components/UI/Navbar";
import withAuth from "@/components/withAuth/withAuth";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main>{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default withAuth(Layout);
