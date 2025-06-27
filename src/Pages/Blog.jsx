import { getAuth } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { formatCustomDate } from "../Utils/dateUtils";
import { Link, useNavigate } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setSelectedBlog } from "../Features/Slices/blogSlice";

const Blog = ({ Showmore = false }) => {
  const [BLogs, setBlog] = useState([]);
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
        setBlog(data);
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
      <div className="px-15 py-10 bg-BGWhite">
        <h2 className="text-2xl text-TextBlack font-semibold pb-5">
          {Showmore ? "Blogs" : "All Blogs"}
        </h2>
        <div className="w-full flex justify-between gap-7 flex-wrap">
          {BLogs?.slice(0, Showmore ? 3 : BLogs.length).map((item) => (
            <div
              onClick={() => handleClick(item)}
              className="w-[32%] bg-BGGray rounded-xl cursor-pointer"
            >
              <img className="w-full h-[250px]" src={item.blogBennar} alt="" />
              <div className="p-5 flex flex-col gap-2">
                <span className="text-TextDateColor font-semibold">
                  {formatCustomDate(item.uploadAt)}
                </span>
                <h3 className="text-2xl font-bold text-TextBlack line-clamp-1">
                  {item.blogTitle}
                </h3>
                <p className="text-sm text-TextGray line-clamp-2">
                  {item.blogMessage}
                </p>
                <div className="flex items-center gap-2 pt-2">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={item.uploaderProfile}
                    alt=""
                  />
                  <h3 className="text-TextBlack font-semibold">
                    {item.uploaderName}
                  </h3>
                </div>
              </div>
            </div>
          ))}
          <div className="w-full flex justify-center">
            {Showmore ? (
              <Link
                to={"/rootlayout/blog"}
                className="py-2 px-4 bg-ButttonBG rounded-md text-white flex items-center gap-2"
              >
                Show More{" "}
                <span className="mt-1">
                  <FaLongArrowAltRight />
                </span>
              </Link>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
