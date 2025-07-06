import React, { useContext } from "react";
import { ThemeContext } from "../../Context/ThemeProvider";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { IoIosCreate } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { getAuth, signOut } from "firebase/auth";

const Navber = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, loading } = useContext(UserContext);
  const auth = getAuth();
  const navigate = useNavigate();

  const navItem = [
    {
      id: 1,
      item: "Home",
      pathRoute: "/rootlayout/home",
    },

    {
      id: 2,
      item: "Blogs",
      pathRoute: "/rootlayout/blog",
    },
    {
      id: 3,
      item: "My Blogs",
      pathRoute: "/rootlayout/myblog",
    },

    {
      id: 4,
      item: "Profile",
      pathRoute: "/rootlayout/profile",
    },
  ];

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };
  return (
    <>
      <nav className="flex items-center w-full justify-between bg-transparent py-3 px-15">
        <h2 className="text-TextBlack text-2xl font-bold">
          {user ? user.username : "Not Found"}
        </h2>
        <div className="flex gap-15 items-center">
          <ul className="flex items-center gap-10">
            {navItem?.map((nav) => (
              <li key={nav.id} className="menuUnderLine">
                <NavLink
                  to={`${nav.pathRoute}`}
                  className={({ isPending, isActive }) =>
                    isPending
                      ? "text-TextBlack text-[17px] font-normal font-popins"
                      : isActive
                      ? "text-TextDateColor text-[17px] font-semibold font-popins"
                      : "text-TextBlack text-[17px] font-normal font-popins"
                  }
                >
                  {nav.item}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="p-3 rounded-full bg-BGWhite text-TextDarkGray text-xl cursor-pointer"
            >
              <IoLogOut />
            </button>
            <button
              className="p-3 rounded-full bg-BGWhite text-TextDarkGray text-xl cursor-pointer"
              onClick={toggleTheme}
            >
              {theme === "light" ? <MdLightMode /> : <MdDarkMode />}
            </button>
            <Link
              className=" p-3 rounded-full text-xl bg-BGWhite cursor-pointer text-TextDarkGray"
              to={"/rootlayout/createblog"}
            >
              <IoIosCreate />
            </Link>

            <img
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => navigate("/rootlayout/profile")}
              src={
                user
                  ? user.profile_picture
                  : "https://www.w3schools.com/howto/img_avatar.png"
              }
              alt=""
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navber;
