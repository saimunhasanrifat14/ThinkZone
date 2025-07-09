import { getAuth } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useRef, useState } from "react";
import { formatCustomDate } from "../Utils/dateUtils";
import Blog from "./Blog";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedBlog } from "../Features/Slices/blogSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import {
  FaAngleLeft,
  FaChevronRight,
  FaLongArrowAltRight,
} from "react-icons/fa";
import HeroSection from "../Components/HomeComponent/HeroSection";

const Home = () => {
  const [TherdLastBLogs, setTherdLastBLogs] = useState([]);
  const [lastTwoBlogs, setlastTwoBlogs] = useState([]);
  const [allBlogs, setAllBlogs] = useState([]);

  const [loading, setLoading] = useState(false);
  const db = getDatabase();
  const auth = getAuth();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      const userRef = ref(db, "blogs/");
      onValue(userRef, (snapshot) => {
        let data = [];
        snapshot.forEach((item) => {
          data.push({ ...item.val(), BLogkey: item.key });
        });
        const lastBlog = data[data.length - 1];
        const lastTwoBlog = data.slice(-3, -1);
        setTherdLastBLogs(lastBlog);
        setlastTwoBlogs(lastTwoBlog);
        setAllBlogs(data);
        setLoading(false);
      });
    };

    fetchData();
  }, []);

  const handleClick = (item) => {
    dispatch(setSelectedBlog(item));
    navigate("/rootlayout/blogdetails");
  };

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <>
      <div className="w-full bg-BGWhite">
        <div className="">
          <HeroSection />
        </div>
        <div className="px-5 sm:px-15 pb-10 pt-8">
          <h2 className="text-2xl text-TextBlack font-semibold pb-5">
            Recent blog posts
          </h2>
          <div className="w-full sm:h-[470px] flex sm:flex-row flex-col justify-between items-center sm:gap-8 gap-4">
            <div className="sm:w-[50%] w-full h-full">
              {TherdLastBLogs && (
                <div
                  onClick={() => handleClick(TherdLastBLogs)}
                  className="w-full h-full bg-BGGray rounded-xl cursor-pointer"
                >
                  <img
                    className="w-full sm:h-[60%] h-[45%]"
                    src={TherdLastBLogs.blogBennar}
                    alt=""
                  />
                  <div className="w-full h-[40%] p-5 flex flex-col sm:gap-0 gap-2 justify-between">
                    <div className="flex flex-col gap-2">
                      <span className="sm:text-sm text-xs text-TextDateColor font-semibold">
                        {formatCustomDate(TherdLastBLogs.uploadAt)}
                      </span>
                      <h3 className="sm:text-2xl text-xl font-bold text-TextBlack line-clamp-1">
                        {TherdLastBLogs.blogTitle}
                      </h3>
                      <p className="sm:text-sm text-xs text-TextGray line-clamp-2">
                        {TherdLastBLogs.blogMessage}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        className="w-8 h-8 rounded-full"
                        src={TherdLastBLogs.uploaderProfile}
                        alt=""
                      />
                      <h3 className="sm:text-md text-sm text-TextBlack font-semibold">
                        {TherdLastBLogs.uploaderName}
                      </h3>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="sm:w-[50%] w-full h-full flex flex-col sm:gap-0 gap-4 justify-between">
              {lastTwoBlogs?.map((item) => (
                <div
                  onClick={() => handleClick(item)}
                  className="w-full h-[47%] bg-BGGray rounded-xl flex gap-2 cursor-pointer"
                >
                  <img className="w-[50%]" src={item.blogBennar} alt="" />
                  <div className="w-[50%] px-3 sm:py-6 py-3 flex flex-col justify-between">
                    <div className="flex flex-col sm:gap-2 gap-1">
                      <span className="sm:text-sm text-xs text-TextDateColor font-semibold">
                        {formatCustomDate(item.uploadAt)}
                      </span>
                      <h3 className="sm:text-2xl text-md font-bold text-TextBlack line-clamp-1">
                        {item.blogTitle}
                      </h3>
                      <p className="sm:text-sm text-xs text-TextGray sm:line-clamp-3 line-clamp-2">
                        {item.blogMessage}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 pt-4 sm:pt-0">
                      <img
                        className="w-6 h-6 rounded-full"
                        src={item.uploaderProfile}
                        alt=""
                      />
                      <h3 className=" sm:text-md text-TextBlack text-sm font-semibold">
                        {item.uploaderName}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* for desktop size */}
        <div className="w-full h-full hidden sm:block">
          <Blog Showmore={true} />
        </div>
        {/* for mobile size */}
        <div className="block sm:hidden px-5 sm:pb-0 pb-6">
          {/* Heading */}
          <div className="flex items-center justify-between pb-5">
            <h2 className="text-2xl text-TextBlack font-semibold ">Blogs</h2>
            <div className="flex items-center gap-2">
              <button
                ref={prevRef}
                className="p-2 sm:text-md text-sm bg-BGGray text-TextDateColor rounded-full"
              >
                <FaAngleLeft />
              </button>
              <button
                ref={nextRef}
                className="p-2 sm:text-md text-xs bg-BGGray text-TextDateColor rounded-full"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>

          <Swiper
            spaceBetween={15}
            slidesPerView={1}
            modules={[Navigation]}
            loop={true}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
          >
            {allBlogs.slice(0, 4).map((item, index) => (
              <SwiperSlide key={index}>
                <div
                  onClick={() => handleClick(item)}
                  className="bg-BGGray rounded-xl cursor-pointer"
                >
                  <img
                    className="w-full h-[200px]"
                    src={item.blogBennar}
                    alt=""
                  />
                  <div className="p-5 flex flex-col gap-2">
                    <span className="sm:text-sm text-xs text-TextDateColor font-semibold">
                      {formatCustomDate(item.uploadAt)}
                    </span>
                    <h3 className="sm:text-2xl text-xl font-bold text-TextBlack line-clamp-1">
                      {item.blogTitle}
                    </h3>
                    <p className="sm:text-sm text-xs text-TextGray line-clamp-2">
                      {item.blogMessage}
                    </p>
                    <div className="flex items-center gap-2 pt-2">
                      <img
                        className="w-8 h-8 rounded-full"
                        src={item.uploaderProfile}
                        alt=""
                      />
                      <h3 className="sm:text-md text-sm text-TextBlack font-semibold">
                        {item.uploaderName}
                      </h3>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Show More Button */}
          <div className="w-full flex justify-center mt-5">
            <Link
              to="/rootlayout/blog"
              className="py-2 px-4 bg-ButttonBG text-sm sm:text-md rounded-md text-white flex items-center gap-2 font-semibold"
            >
              Show More{" "}
              <span className="mt-1">
                <FaLongArrowAltRight />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
