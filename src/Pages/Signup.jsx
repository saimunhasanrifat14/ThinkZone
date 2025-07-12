import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { MdLightMode } from "react-icons/md";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { getDatabase, push, ref, set } from "firebase/database";

const SignUp = () => {
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
    clearErrors,
  } = useForm();

  const inputDetails = [
    {
      id: 1,
      name: "fullName",
      placeholder: "Your Full Name",
      label: "Full Name",
      type: "text",
    },
    {
      id: 2,
      name: "email",
      placeholder: "you@example.com",
      label: "Email",
      type: "email",
    },
    {
      id: 3,
      name: "password",
      placeholder: "••••••••",
      label: "Password",
      type: "password",
    },
  ];

  const onSubmit = async (data) => {
    const { email, fullName, password } = data;
    try {
      setloading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: fullName || "User",
        photoURL: "https://www.w3schools.com/howto/img_avatar.png",
      });
      await sendEmailVerification(user);
      await set(push(ref(db, "users/")), {
        username: fullName || "User",
        email: email,
        profile_picture: "https://www.w3schools.com/howto/img_avatar.png",
        uid: user.uid,
      });
      setloading(false);
      navigate("/EmailVarification");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        seterror("auth/email-already-in-use");
      } else if (err.code === "auth/weak-password") {
        seterror("Password should be at least 6 characters long.");
      } else if (err.code === "auth/invalid-email") {
        seterror("Please enter a valid email.");
      } else {
        seterror("Something went wrong. Please try again.");
      }
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-BGWhite relative">
      <div className="w-full h-screen flex items-center justify-center bg-BGWhite">
        <div className="w-[330px] sm:w-[380px] bg-BGWhite">
          {/* Heading */}
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-TextDarkGray">
              Get started with easy registration
            </h2>

            {error ? (
              <p className="text-red-400 text-sm mt-1">{error}</p>
            ) : (
              <p className="text-gray-400 text-sm mt-1">
                Free register and enjoy it
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
                {/* Password Eye Icon */}
                {item.name === "password" && (
                  <span
                    onClick={() => setEye(!eye)}
                    className="absolute right-[12px] top-[34px] cursor-pointer text-[17px] text-gray-600"
                  >
                    {eye ? <FaEye /> : <FaEyeSlash />}
                  </span>
                )}
                {/* Validation Error */}
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
              className="w-full bg-ButttonBG  text-white font-medium py-2 px-4 rounded-md cursor-pointer"
            >
              {loading ? "Loading" : "Sign Up"}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-sm text-TextGray mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-TextDateColor">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
