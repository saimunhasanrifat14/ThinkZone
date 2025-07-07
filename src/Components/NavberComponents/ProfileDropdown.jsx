import { useContext, useState } from "react";
import { MdDarkMode, MdLightMode, MdSettings } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { IoLogOut, IoReorderThree } from "react-icons/io5";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { UserContext } from "../../Context/UserContext";
import { ThemeContext } from "../../Context/ThemeProvider";
import { HiTemplate } from "react-icons/hi";
import { RiAlignItemLeftFill } from "react-icons/ri";
import { TiHome } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";

const ProfileDropdown = () => {
  const navItem = [
    {
      id: 1,
      item: "Home",
      pathRoute: "/rootlayout/home",
      icon: <TiHome />,
    },

    {
      id: 2,
      item: "Blogs",
      pathRoute: "/rootlayout/blog",
      icon: <RiAlignItemLeftFill />,
    },
    {
      id: 3,
      item: "My Blogs",
      pathRoute: "/rootlayout/myblog",
      icon: <HiTemplate />,
    },
  ];

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, loading } = useContext(UserContext);
  const auth = getAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleConfirmLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  return (
    <div className="relative">
      <img
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full cursor-pointer hidden sm:block"
        src={
          user?.profile_picture ||
          "https://www.w3schools.com/howto/img_avatar.png"
        }
        alt="Profile"
      />
      <button
        onClick={() => setOpen(!open)}
        className="p-3 rounded-full bg-BGGray text-TextBlack text-xl cursor-pointer"
      >
        {open ? <RxCross2 /> : <IoReorderThree />}
      </button>
      {open && (
        <div className="absolute right-0 mt-3 w-[91vw] sm:w-72 h-[89vh] sm:h-[350px] backdrop-blur-2xl bg-[#0000000f] border border-[#effdff1f] rounded-xl overflow-hidden z-50">
          <div className="flex flex-col justify-between h-full">
            <div>
              {/* Profile Section */}
              <div className="flex items-center gap-3 px-4 py-4">
                <img
                  className="w-10 h-10 rounded-full"
                  src={user?.profile_picture}
                  alt="Profile"
                />
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold text-TextBlack">
                    {user?.username || "User Name"}
                  </p>
                  <p className="text-xs text-TextDarkGray">
                    @{user?.username || "username"}
                  </p>
                </div>
              </div>
              {/* Options */}
              <div className="flex flex-col border-t border-gray-400 ">
                <button
                  onClick={() => {
                    navigate("/rootlayout/profile");
                    setOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-3 text-md text-TextBlack cursor-pointer hover:bg-[#0000001e]"
                >
                  <span className="text-xl">
                    <FaUserCircle />
                  </span>{" "}
                  View your profile
                </button>

                <button
                  onClick={() => {
                    navigate("/rootlayout/createblog");
                    setOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-3 text-TextBlack text-md cursor-pointer hover:bg-[#0000001e] "
                >
                  <span className="text-xl">
                    <IoIosCreate />
                  </span>{" "}
                  Create a Blog
                </button>

                <button
                  onClick={() => {
                    navigate("/rootlayout/profile");
                    setOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-3 text-TextBlack text-md cursor-pointer hover:bg-[#0000001e] "
                >
                  <span className="text-xl">
                    <MdSettings />
                  </span>{" "}
                  Settings
                </button>
              </div>
              <div className="border-t border-gray-400">
                <ul className="sm:hidden flex items-start flex-col">
                  {navItem?.map((nav) => (
                    <li key={nav.id} className="menuUnderLine w-full">
                      <NavLink
                        to={`${nav.pathRoute}`}
                        onClick={() => setOpen(false)}
                        className={({ isPending, isActive }) =>
                          isPending
                            ? "w-full flex items-center gap-2 text-TextBlack  py-3 px-4 text-[17px] font-normal font-popins cursor-pointer"
                            : isActive
                            ? "w-full flex items-center gap-2 text-TextDateColor  py-3 px-4 text-[17px] font-semibold font-popins cursor-pointer"
                            : "w-full flex items-center gap-2 text-TextBlack  py-3 px-4 text-[17px] font-normal font-popins cursor-pointer"
                        }
                      >
                        <span>{nav.icon}</span> {nav.item}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-400">
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="w-full flex items-center gap-3 p-4 text-md text-TextBlack hover:text-red-600 hover:bg-[#0000001e] cursor-pointer"
              >
                <span className="text-xl">
                  <IoLogOut />
                </span>{" "}
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
      {showLogoutModal && (
        <div className="fixed bg-[#00000093] inset-0 flex items-center justify-center z-80">
          <div className="bg-BGGray w-[280px] h-[150px] rounded-2xl shadow-lg text-center flex flex-col justify-between">
            <div className="flex flex-col items-center  justify-center h-full ">
              <h3 className="font-bold text-lg text-TextBlack">Confirm</h3>
              <p className="text-sm text-TextDarkGray mt-2">
                Are you sure you want to log out?
              </p>
            </div>
            <div className="flex justify-between mt-5 border-t border-gray-400  text-sm font-semibold">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="text-TextBlack bg-BGGray w-1/2 py-2 cursor-pointer rounded-bl-2xl hover:bg-BGWhite"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                className="text-TextBlack bg-BGGray w-1/2 py-2 border-l border-gray-400 cursor-pointer rounded-br-2xl hover:bg-BGWhite"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
