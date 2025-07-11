import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { MdOutlineMailOutline } from "react-icons/md";

const EmailVarification = () => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();

  const handleCheckVerification = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      await auth.currentUser.reload();
      if (auth.currentUser.emailVerified) {
        navigate("/rootlayout/home");
      } else {
        setErrorMsg("Your email is not verified yet!");
      }
    } catch (error) {
      setErrorMsg("Your email is not verified yet!");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {})
      .catch((error) => {
        if(error.code === "auth/too-many-requests") {
          setErrorMsg("Failed! Please wait 5 minute and try again.");
        }
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-BGWhite px-5">
      <div className="max-w-xl w-full sm:p-8 text-center rounded-3xl sm:shadow-xl">
        <div className="flex justify-center mb-6 z-10">
          <span className="bg-BGWhite p-4 rounded-full shadow-md text-[50px] text-TextDateColor">
            <MdOutlineMailOutline />
          </span>
        </div>
        {errorMsg !== "" ? (
          <p className="sm:text-2xl text-xl font-bold text-red-500 mb-2">{errorMsg}</p>
        ) : (
          <h2 className="sm:text-2xl text-xl font-bold text-TextBlack mb-2">
            Check your Email, please!
          </h2>
        )}
        <p className="m-auto text-sm sm:text-md mb-2 text-TextGray sm:max-w-[350px]">
          We’ve already sent out the verification link. Please check it
          and confirm it’s really you.
        </p>
        <button
          onClick={handleCheckVerification}
          className="bg-ButttonBG text-white font-semibold py-2 px-6 rounded-full cursor-pointer"
          disabled={loading}
        >
          {loading ? "Checking..." : "Done!"}
        </button>
        <p className="text-sm text-gray-500 sm:mt-4 mt-2">
          Didn’t get e-mail?{" "}
          <span
            className="text-TextDateColor hover:underline cursor-pointer"
            onClick={handleResend}
          >
            Resend
          </span>
        </p>
      </div>
    </div>
  );
};

export default EmailVarification;