import React, { useContext, useEffect, useState } from "react";
import DarkBg from "../../assets/heroBackground.png";
import LightBg from "../../assets/heroBackground2.png";

import { ThemeContext } from "../../Context/ThemeProvider";
import { FaSearch } from "react-icons/fa";
import { getDatabase, onValue, ref } from "firebase/database";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const { theme } = useContext(ThemeContext);
  const backgroundImage = theme === "dark" ? DarkBg : LightBg;
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const query = inputValue.trim().toLowerCase();
    if (!query) {
      setFilteredBlogs([]);
      return;
    }
    navigate("/rootlayout/searchblogs", {
      state: { query }, 
    });
  };

  return (
    <>
      <div className="relative w-full h-screen overflow-hidden">
        {/* Animated Background Image */}
        <img
          src={backgroundImage}
          alt="ThinkZoon Hero Background"
          className="absolute inset-0 w-full h-full object-cover object-center animate-bgEnter"
        />

        {/* Foreground Content */}
        <div className="relative z-10 flex items-center justify-center w-full h-full text-white px-4">
          <div className="max-w-3xl flex flex-col items-center gap-3 text-center HeroContentAnimation">
            <h1 className="typing-text text-4xl text-TextBlack md:text-5xl font-bold mb-4">
              Start Blogging <span className="text-TextDateColor">Today</span>
            </h1>
            <p className="text-sm md:text-base text-TextGray mb-6 px-5">
              Share your stories, thoughts, and ideas—write, read, and explore
              meaningful blogs with thinkZoon. Unleash your creativity in a
              space made for expression.
            </p>
            <div className="sm:w-auto w-[320px] ">
              <form
                onSubmit={handleSearch}
                className="flex items-center justify-center gap-3"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Search blogs..."
                  className="px-4 sm:py-3 py-2 rounded-md  w-full sm:w-[330px]  bg-BGGray   text-TextGray  outline-none border  border-BGGray  focus:border-gray-500"
                />
                <button
                  type="submit"
                  className="bg-BGBlack text-TextWhite px-3 sm:px-6 py-3 sm:py-4 rounded-md cursor-pointer"
                >
                  <FaSearch />
                </button>
              </form>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Explore trending blogs by{" "}
              <span className="underline">keyword</span>,{" "}
              <span className="underline">title</span>, or{" "}
              <span className="underline">author</span>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
