const PostLoading = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex w-52 flex-col gap-4 ">
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-4 w-28"></div>
          </div>
        </div>
        <div className="skeleton h-32 w-full"></div>
      </div>
    </div>
  );
};

export default PostLoading;
