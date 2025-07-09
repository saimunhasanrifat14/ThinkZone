import React from "react";
import { useSelector } from "react-redux";
import { formatCustomDate } from "../Utils/dateUtils";

const BlogDetails = () => {
  const blog = useSelector((state) => state.blog.selectedBlog);
  console.log(blog);
  if (!blog) {
    return;
  }
  return (
    <>
      <div className="w-full min-h-[710px] bg-BGWhite flex items-center justify-center pt-10 sm:pt-15">
        <div className="w-[550px] flex flex-col items-center gap-4 py-10 px-4 sm:px-0">
          <h2 className="text-TextBlack sm:text-5xl text-3xl font-bold text-center">
            {blog?.blogTitle}
          </h2>
          <div className="flex items-center gap-2 pb-5">
            <img
              className="w-10 h-10 rounded-full"
              src={blog?.uploaderProfile}
              alt=""
            />
            <div className="flex flex-col ">
              <span className="text-md text-TextDateColor font-semibold">
                {blog?.uploaderName}
              </span>
              <span className="text-sm text-TextGray">
                {formatCustomDate(blog.uploadAt)}
              </span>
            </div>
          </div>
          {blog.blogBennar && (
            <img className="w-full" src={blog.blogBennar} alt="" />
          )}
          {blog.blogMessage && (
            <p className="text-justify text-TextGray">{blog.blogMessage}</p>
          )}
          {blog.subtitle && (
            <h3 className="text-start w-full text-TextBlack sm:text-3xl text-xl font-semibold mt-4">
              {blog.subtitle}
            </h3>
          )}
          {blog.blogMessage2 && (
            <p className="text-justify text-TextGray">{blog.blogMessage2}</p>
          )}
          {blog.notes && (
            <div className="mt-4">
              <p className="text-TextGray bg-BGGray py-2 px-4 rounded-md w-full border-l-6">
                {blog.notes}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
