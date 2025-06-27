import React from "react";
import { useSelector } from "react-redux";
import { formatCustomDate } from "../Utils/dateUtils";

const BlogDetails = () => {
  const blog = useSelector((state) => state.blog.selectedBlog);
  console.log(blog);
  if(!blog){
    return
  }
  return (
    <>
      <div className="w-full min-h-[710px] bg-BGWhite flex items-center justify-center">
        <div className="w-[550px] flex flex-col items-center gap-4 py-10">
          <h2 className="text-TextBlack text-5xl font-bold text-center">{blog.blogTitle}</h2>
          <div className="flex items-center gap-2 pb-5">
            <img
              className="w-10 h-10 rounded-full"
              src={blog.uploaderProfile}
              alt=""
            />
            <div className="flex flex-col ">
              <span className="text-md text-TextDateColor font-semibold">{blog.uploaderName}</span>
              <span className="text-sm text-TextGray">{formatCustomDate(blog.uploadAt)}</span>
            </div>
          </div>
          <img className="w-full" src={blog.blogBennar} alt="" />
          <p className="text-justify text-TextGray">{blog.blogMessage}</p>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
