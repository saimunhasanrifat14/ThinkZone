import React from "react";
import { Link } from "react-router-dom";
import TemplateOneImage from "../assets/TemplateOne.png";
const CreateBlog = () => {
  return (
    <>
      <div className="w-full min-h-screen bg-BGWhite sm:px-15 px-5 pt-20">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="sm:w-[32%] w-full bg-BGGray rounded-lg">
            <div className="p-4 flex flex-col items-center ">
              <h3 className="text-3xl text-TextBlack font-semibold mb-2">
                Template One
              </h3>
              <p className="text-sm text-TextGray mb-4">
                A simple and elegant template for your blog.
              </p>
              <Link
                to={"/rootlayout/templateone"}
                className="inline-block bg-TextDateColor text-white px-4 py-2 rounded hover:bg-black transition-colors"
              >
                Use This Template
              </Link>
            </div>
          </div>
          <div className="sm:w-[32%] w-full bg-BGGray rounded-lg">
            <div className="p-4 flex flex-col items-center ">
              <h3 className="text-3xl text-TextBlack font-semibold mb-2">
                Template Two
              </h3>
              <p className="text-sm text-TextGray mb-4">
                A simple and elegant template for your blog.
              </p>
              <Link
                to={"/rootlayout/templatetwo"}
                className="inline-block bg-TextDateColor text-white px-4 py-2 rounded hover:bg-black transition-colors"
              >
                Use This Template
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateBlog;
