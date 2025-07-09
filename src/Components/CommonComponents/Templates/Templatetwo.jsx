import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { getDatabase, push, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import { UserContext } from "../../../Context/UserContext";
import useUploadCloudinary from "../../../Hooks/useCloudinaryUpload";

const Templatetwo = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [profileError, setProfileError] = useState("");
  const [profileName, setProfileName] = useState(null);
  const fileInputRef = useRef(null);
  const { uploadImage, loading, error } = useUploadCloudinary();
  const db = getDatabase();
  const auth = getAuth();
  const { user } = useContext(UserContext);

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setValue("image", file);
      setProfileName(file.name);
      setProfileError("");
    } else {
      setProfileError("Please select a file.");
    }
  };

  const onSubmit = async (data) => {
    if (!data.image) {
      setProfileError("Image is required");
      return;
    }
    const { image, message, title } = data;
    const profileUrl = await uploadImage(image);
    if (!profileUrl) {
      throw new Error("Upload failed");
    }
    set(push(ref(db, "blogs/")), {
      uploaderName: user.username || "not found",
      uploaderProfile: user.profile_picture || "",
      blogTitle: title || "",
      blogMessage: message || "",
      blogBennar: profileUrl,
      uploadAt: new Date().toISOString(),
      uploaderUid: user.uid,
    });
  };

  return (
    <div className="w-full h-screen bg-BGWhite flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[800px] flex flex-col gap-5"
      >
        <div className="w-full h-full flex gap-4 items-center">
          {/* Left Side */}
          <div className="w-[55%] flex flex-col gap-4">
            <div>
              <input
                placeholder="Add title"
                className="p-2.5 w-full text-TextBlack text-sm bg-BGGray rounded-lg border border-gray-300 focus:ring-TextDateColor focus:border-TextDateColor"
                type="text"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <textarea
                id="message"
                rows="4"
                className="block p-2.5 w-full text-sm text-TextBlack bg-BGGray rounded-lg border border-gray-300 focus:ring-TextDateColor focus:border-TextDateColor"
                placeholder="Write your thoughts here..."
                {...register("message", { required: "Message is required" })}
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message.message}</p>
              )}
            </div>
          </div>

          {/* Right Side */}
          <div className="w-[45%]">
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-[350px] h-45 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-BGGray dark:border-gray-600 dark:hover:border-gray-500"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">
                  JPG, PNG, SVG or GIF (MAX. 800x400px)
                </p>
                {profileError && (
                  <p className="text-red-500 text-sm text-center mt-2">
                    {profileError}
                  </p>
                )}
                {profileName && (
                  <p className="mt-2 text-sm text-gray-500">
                    Selected file:{" "}
                    <span className="font-semibold text-buttonsBG">
                      {profileName}
                    </span>
                  </p>
                )}
              </div>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-5 bg-ButttonBG text-white rounded-xl cursor-pointer"
        >
          {loading ? "Uploading" : "Upload Blog"}
        </button>
      </form>
    </div>
  );
};

export default Templatetwo;
