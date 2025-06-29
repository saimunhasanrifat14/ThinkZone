import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

const Footer = () => {
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
    const { user, loading } = useContext(UserContext);
    console.log("log form user footer", user);
    

  return (
    <>
      <footer className="bg-BGGray">
        <div className="mx-auto w-full px-15 py-10 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-TextBlack">
                  {user.username}
                </span>
            </div>
            <div className="">
              <ul className="flex gap-6 items-start">
                {navItem?.map((nav) => (
                  <li key={nav.id} className="menuUnderLine">
                    <NavLink
                      to={`${nav.pathRoute}`}
                      className="text-TextGray font-medium text-[17px] font-popins hover:underline"
                    >
                      {nav.item}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <hr className="my-3 border-gray-400 sm:mx-auto lg:my-8" />
          <div className="flex justify-center w-full">
            <span className="text-sm text-TextGray sm:text-center">
              © 2023{" "}
              <a href="https://flowbite.com/" className="hover:underline">
                Flowbite™
              </a>
              . All Rights Reserved.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
