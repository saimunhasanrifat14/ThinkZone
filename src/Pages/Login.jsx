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

  const [eye, setEye] = useState(false);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const auth = getAuth();
  const db = getDatabase();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /**
   * todo : handleSubmit function implement
   * @param data - Contains email and password.
   * @description : This function is used to handle the submit event of the form.
   */
  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      setloading(true);
      await signInWithEmailAndPassword(auth, email, password);

      const user = auth.currentUser;

      if (user.emailVerified) {
        navigate("/rootlayout/home");
      } else {
        await sendEmailVerification(user);
        navigate("/EmailVarification");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.code === "auth/network-request-failed") {
        seterror("Network error! try again.");
      } else if (error.code === "auth/invalid-email") {
        seterror("Invalid email format.");
      } else {
        seterror("Something went wrong. Please try again.");
      }
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-BGWhite flex items-center justify-center">
      <div className="w-[330px] sm:w-[380px] bg-BGWhite">
        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-TextDarkGray">
            Welcome Back
          </h2>
          {error ? (
            <p className="text-red-400 text-sm mt-1">{error}</p>
          ) : (
            <p className="text-gray-400 text-sm mt-1">
              Login to continue using your account
            </p>
          )}
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
            className="w-full bg-ButttonBG text-white font-medium py-2 px-4 rounded-md cursor-pointer"
          >
            {loading ? "Loading" : "Login"}
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
