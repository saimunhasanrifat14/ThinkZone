import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchblogSkeleton = () => {
  return (
    <>
      <div className="w-full min-h-screen pt-20 sm:px-15 px-5 ">
        {/* Input Section */}
        <div className="w-full flex flex-col items-center gap-3">
          <form className="flex items-center justify-center gap-3">
            <input
              type="text"
              placeholder="Search blogs..."
              className="px-4 sm:py-3 py-2 rounded-md  w-full sm:w-[330px]  bg-BGGray   text-TextGray  outline-none border  border-gray-500  focus:border-gray-500"
            />
            <button
              type="submit"
              className="bg-BGBlack text-TextWhite px-3 sm:px-6 py-3 sm:py-4 rounded-md cursor-pointer"
            >
              <FaSearch />
            </button>
          </form>
        </div>

        {/* Blog Card Grid Skeleton */}
        <div className="flex sm:flex-row flex-col justify-between gap-4 mt-8 pb-4 animate-pulse ">
          {[1, 2, 3].map((i) => (
            <div key={i} className="sm:w-[32%] w-full bg-gray-200 rounded-xl">
              <div className="w-full sm:h-[250px] h-[200px] bg-gray-300 rounded-t-xl"></div>
              <div className="p-5 flex flex-col gap-2">
                <div className="w-24 h-3 bg-gray-300 rounded"></div>
                <div className="w-4/5 h-5 bg-gray-300 rounded"></div>
                <div className="w-full h-4 bg-gray-300 rounded"></div>
                <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
                <div className="flex items-center gap-2 pt-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchblogSkeleton;
