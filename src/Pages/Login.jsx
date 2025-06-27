import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, push, ref, set } from "firebase/database";

const Login = () => {
  const [eye, setEye] = useState(false);
  const auth = getAuth();
  const db = getDatabase();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log("data form auth " , auth.currentUser);
  
  const onSubmit = (data) => {
    const { email, password } = data;

    signInWithEmailAndPassword(auth, email, password).then((userinfo) => {
      console.log(userinfo);
      if (auth.currentUser.emailVerified) {
        navigate("/rootlayout/home");
      } else {
        navigate("/login");
      }
    });
  };

  const inputDetails = [
    {
      id: 1,
      name: "email",
      placeholder: "you@example.com",
      label: "Email",
      type: "email",
    },
    {
      id: 2,
      name: "password",
      placeholder: "••••••••",
      label: "Password",
      type: "password",
    },
  ];


  return (
    <div className="w-full h-screen bg-BGWhite flex items-center justify-center">
      <div className="w-[300px] sm:w-[380px] bg-BGWhite">
        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-TextDarkGray">
            Welcome Back
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Login to continue using your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {inputDetails.map((item) => (
            <div key={item.id} className="relative">
              <label
                htmlFor={item.name}
                className="block text-sm font-medium text-TextGray"
              >
                {item.label}
              </label>
              <input
                {...register(item.name, {
                  required: `${item.label} is required`,
                })}
                name={item.name}
                type={
                  item.type === "password"
                    ? eye
                      ? "text"
                      : "password"
                    : item.type
                }
                id={item.id}
                placeholder={item.placeholder}
                className="mt-1 w-full px-3 py-2 text-TextGray border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-TextDateColor focus:border-TextDateColor text-sm placeholder:text-TextGray"
              />
              {/* Password Eye Toggle */}
              {item.name === "password" && (
                <span
                  onClick={() => setEye(!eye)}
                  className="absolute right-[12px] top-[34px] cursor-pointer text-[17px] text-gray-600"
                >
                  {eye ? <FaEye /> : <FaEyeSlash />}
                </span>
              )}
              {errors[item.name] && (
                <span className="text-red-500 text-xs">
                  {errors[item.name].message}
                </span>
              )}
            </div>
          ))}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-ButttonBG text-white font-medium py-2 px-4 rounded-md"
          >
            Login
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-sm text-TextGray mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="font-medium text-TextDateColor">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
