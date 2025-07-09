import React, { useContext } from "react";
import Navber from "../Components/CommonComponents/Navber";
import Footer from "../Components/CommonComponents/Footer";
import { Outlet } from "react-router-dom";

const Rootlayout = () => {
  return (
    <>
      <div className="bg-BGWhite">
        <div className="w-full absolute top-0 left-0 z-50">
          <Navber />
        </div>
        <div className="w-full bg-BGWhite">
          <Outlet />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Rootlayout;
