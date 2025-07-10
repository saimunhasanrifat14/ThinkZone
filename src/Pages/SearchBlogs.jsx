import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { formatCustomDate } from "../Utils/dateUtils";
import { useLocation, useNavigate } from "react-router-dom";
import { setSelectedBlog } from "../Features/Slices/blogSlice";
import { useDispatch } from "react-redux";
import SearchblogSkeleton from "../assets/Skeletons/SearchblogSkeleton";

const SearchBlogs = () => {
  const location = useLocation();
  const initialQuery = location.state?.query || ""; // Receive query

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const db = getDatabase();
  const [loading, setloading] = useState(false);
  const [BLogs, setBlog] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [inputValue, setInputValue] = useState(initialQuery);

  useEffect(() => {
    const fetchData = () => {
      setloading(true);
      const userRef = ref(db, "blogs/");
      onValue(userRef, (snapshot) => {
        let data = [];
        snapshot.forEach((item) => {
          data.push({ ...item.val(), BLogkey: item.key });
        });
        setBlog(data.slice().reverse());
        setloading(false);
      });
    };

    fetchData();
  }, []);

  // Auto run search on first load if initial query exists
  useEffect(() => {
    if (initialQuery) {
      const query = initialQuery.toLowerCase();
      const filtered = BLogs.filter(
        (blog) =>
          blog.blogTitle.toLowerCase().includes(query) ||
          blog.uploaderName.toLowerCase().includes(query)
      );
      setFilteredBlogs(filtered);
    }
  }, [BLogs, initialQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = inputValue.trim().toLowerCase();
    if (!query) {
      setFilteredBlogs([]);
      return;
    }
    const filtered = BLogs.filter(
      (blog) =>
        blog.blogTitle.toLowerCase().includes(query) ||
        blog.uploaderName.toLowerCase().includes(query)
    );
    setFilteredBlogs(filtered);
  };

  const handleClick = (item) => {
    dispatch(setSelectedBlog(item));
    navigate("/rootlayout/blogdetails");
  };

  if (loading) {
    return <SearchblogSkeleton />;
  }

  return (
    <>
      <div className="w-full min-h-screen pt-20 sm:px-15 px-5 ">
        {/* Search option */}
        <div className="w-full flex flex-col items-center gap-3">
          <form
            onSubmit={handleSearch}
            className="flex items-center justify-center gap-3"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
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
        {/* filtered blogs */}
        <div className="flex sm:flex-row flex-col justify-between gap-4 mt-8 pb-4 page-enter-animation">
          {filteredBlogs.length > 0
            ? filteredBlogs?.map((item) => (
                <div
                  onClick={() => handleClick(item)}
                  className="sm:w-[32%] w-full bg-BGGray rounded-xl cursor-pointer"
                >
                  <img
                    className="w-full sm:h-[250px] h-[200px]"
                    src={item.blogBennar}
                    alt=""
                  />
                  <div className="p-5 flex flex-col sm:gap-2 gap-1">
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
              ))
            : ""}
        </div>
      </div>
    </>
  );
};

export default SearchBlogs;
