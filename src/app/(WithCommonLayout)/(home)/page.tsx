import Hero from "@/components/modules/home/Hero";
import PostList from "@/components/posts/PostList";
import Sidebar from "@/components/UI/Sidebar";

const page = () => {
  return (
    <div className="relative">
      <Hero />
      <div className="flex">
        <div className="flex-grow">
          <PostList />
        </div>
        <div className="hidden md:block sticky top-0 h-screen">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default page;
