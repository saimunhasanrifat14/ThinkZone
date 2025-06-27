import { getAuth } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { formatCustomDate } from "../Utils/dateUtils";
import Blog from "./Blog";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedBlog } from "../Features/Slices/blogSlice";

const Home = () => {
  const [TherdLastBLogs, setTherdLastBLogs] = useState([]);
  const [lastTwoBlogs, setlastTwoBlogs] = useState([]);

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
        const lastBlog = data[data.length - 3];
        const lastTwoBlog = data.slice(-2);
        setTherdLastBLogs(lastBlog);
        setlastTwoBlogs(lastTwoBlog);
        setLoading(false);
      });
    };

    fetchData();
  }, []);

  const handleClick = (item) => {
    dispatch(setSelectedBlog(item));
    navigate("/rootlayout/blogdetails");
  };

  return (
    <>
      <div className="w-full bg-BGWhite">
        <header className="">
          <div className="">
            <h1 className="text-[120px] text-TextBlack font-bold text-center w-full border-b-2 border-b-gray-500 border-t-2 border-t-gray-500">
              THE BLOG
            </h1>
          </div>
        </header>
        <div className="px-15 pb-10 pt-8">
          <h2 className="text-2xl text-TextBlack font-semibold pb-5">
            Recent blog posts
          </h2>
          <div className="w-full h-[470px] flex justify-between items-center gap-8">
            <div className="w-[50%] h-full">
              {TherdLastBLogs && (
                <div onClick={() => handleClick(TherdLastBLogs)} className="w-full h-full bg-BGGray rounded-xl cursor-pointer">
                  <img
                    className="w-full h-[60%]"
                    src={TherdLastBLogs.blogBennar}
                    alt=""
                  />
                  <div className="w-full h-[40%] p-5 flex flex-col justify-between">
                    <div className="flex flex-col gap-2">
                      <span className="text-TextDateColor font-semibold">
                        {formatCustomDate(TherdLastBLogs.uploadAt)}
                      </span>
                      <h3 className="text-2xl font-bold text-TextBlack line-clamp-1">
                        {TherdLastBLogs.blogTitle}
                      </h3>
                      <p className="text-sm text-TextGray line-clamp-2">
                        {TherdLastBLogs.blogMessage}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        className="w-8 h-8 rounded-full"
                        src={TherdLastBLogs.uploaderProfile}
                        alt=""
                      />
                      <h3 className="text-TextBlack font-semibold">
                        {TherdLastBLogs.uploaderName}
                      </h3>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="w-[50%] h-full flex flex-col justify-between">
              {lastTwoBlogs?.map((item) => (
                <div onClick={() => handleClick(item)} className="w-full h-[47%] bg-BGGray rounded-xl flex gap-2 cursor-pointer">
                  <img className="w-[50%]" src={item.blogBennar} alt="" />
                  <div className="w-[50%] px-3 py-6 flex flex-col justify-between">
                    <div className="flex flex-col gap-2">
                      <span className="text-TextDateColor text-sm font-semibold">
                        {formatCustomDate(item.uploadAt)}
                      </span>
                      <h3 className="text-xl font-bold text-TextBlack line-clamp-1">
                        {item.blogTitle}
                      </h3>
                      <p className="text-sm text-TextGray line-clamp-3">
                        {item.blogMessage}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        className="w-6 h-6 rounded-full"
                        src={item.uploaderProfile}
                        alt=""
                      />
                      <h3 className="text-TextBlack text-sm font-semibold">
                        {item.uploaderName}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full h-full">
          <Blog Showmore={true} />
        </div>
      </div>
    </>
  );
};

export default Home;
