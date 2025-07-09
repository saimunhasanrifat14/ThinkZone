import React, { useContext } from "react";
import { ThemeContext } from "../../Context/ThemeProvider";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { IoIosCreate } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { getAuth, signOut } from "firebase/auth";
import ProfileDropdown from "../NavberComponents/ProfileDropdown";

const Navber = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

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

  return (
    <>
      <nav className="flex items-center w-full justify-between bg-transparent py-3 sm:px-15 px-5">
        <h2 className="text-TextBlack text-xl sm:text-2xl font-bold">
          Think<span className="text-TextDateColor">Zone</span>
        </h2>
        <div className="flex gap-15 items-center">
          <ul className="hidden sm:flex items-center gap-10 ">
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
          <div className="flex items-center sm:gap-4 gap-2">
            <button
              className="p-3 rounded-full bg-BGGray text-TextBlack text-xl cursor-pointer"
              onClick={toggleTheme}
            >
              {theme === "light" ? <MdLightMode /> : <MdDarkMode />}
            </button>
            <ProfileDropdown />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navber;
