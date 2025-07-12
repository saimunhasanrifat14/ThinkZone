// TemplateOne

import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { UserContext } from "../../../Context/UserContext";
import useUploadCloudinary from "../../../Hooks/useCloudinaryUpload";
import { getDatabase, push, ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";

const TemplateOne = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [defaultBlog, setDefaultBlog] = useState({
    blogTitle: "How to Stay Focused While Coding",
    uploaderName: "Uploader Name",
    uploaderProfile: "https://www.w3schools.com/howto/img_avatar.png",
    uploadAt: new Date().toLocaleDateString(),
    blogBennar:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    blogMessage:
      "Staying focused while learning to code can be hard with so many distractions. Start by setting a small daily goal. Use tools like Pomodoro to manage your time. Turn off social media while studying and take short breaks to refresh your mind. Consistency is the key!",
    subtitle: "Tips for Better Focus",
    blogMessage2:
      "Staying focused while learning to code can be hard with so many distractions. Start by setting a small daily goal. Use tools like Pomodoro to manage your time. Turn off social media while studying and take short breaks to refresh your mind. Consistency is the key!",
    notes:
      "Notes: Remember to take care of your health and well-being. A healthy body leads to a healthy mind.",
  });

  const { user } = useContext(UserContext);
  const { uploadImage, loading, error } = useUploadCloudinary();
  const db = getDatabase();
  const [loadingstate, setLoadingstate] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { blogTitle, blogMessage, subtitle, blogMessage2, notes } = data;
    setLoadingstate(true);
    // upload the image
    const profileUrl = await uploadImage(defaultBlog.blogBennar);

    // Check if the upload was successful
    if (!profileUrl) {
      throw new Error("Upload failed");
    }

    // Save to Firebase
    await set(push(ref(db, "blogs/")), {
      uploaderName: user.username || "Not found",
      uploaderProfile: user.profile_picture || "",
      uploaderUid: user.uid,
      blogTitle: blogTitle || "",
      blogMessage: blogMessage || "",
      subtitle: subtitle || "",
      blogMessage2: blogMessage2 || "",
      notes: notes || "",
      blogBennar: profileUrl
        ? profileUrl
        : "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      uploadAt: new Date().toISOString(),
    });
    // Navigate to the blog page
    navigate("/rootlayout/myblog");
    setLoadingstate(false);
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDefaultBlog({ ...defaultBlog, blogBennar: file });
    }
  };

  return (
    <div className="w-full min-h-[710px] bg-BGWhite flex items-center justify-center pt-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[600px] flex flex-col items-center sm:gap-4 gap-3 py-10 px-4 sm:px-0"
      >
        {/* Blog Title */}
        <TextareaAutosize
          {...register("blogTitle", { required: true })}
          onChange={(e) =>
            setDefaultBlog({ ...defaultBlog, blogTitle: e.target.value })
          }
          defaultValue={defaultBlog.blogTitle}
          className="text-TextBlack sm:text-5xl text-3xl font-bold text-center bg-transparent outline-none focus:border border-gray-300 rounded-md px-2 transition-all duration-200 w-full resize-none"
        />
        {errors.blogTitle && (
          <p className="text-red-500 text-sm">Title is required</p>
        )}
        {/* Author Info */}
        <div className="flex items-center gap-2 pb-5">
          <img
            className="w-10 h-10 rounded-full"
            src={user?.profile_picture || defaultBlog.uploaderProfile}
            alt=""
          />
          <div className="flex flex-col">
            <span className="text-md text-TextDateColor font-semibold">
              {user?.username || defaultBlog.uploaderName}
            </span>
            <span className="text-sm text-TextGray">
              {defaultBlog.uploadAt}
            </span>
          </div>
        </div>
        {/* Blog Banner */}
        <div className="relative w-full group">
          <img
            className="w-full object-cover"
            src={
              defaultBlog.blogBennar instanceof File
                ? URL.createObjectURL(defaultBlog.blogBennar)
                : defaultBlog.blogBennar
            }
            alt="blog banner"
          />
          <div className="absolute inset-0 bg-opacity-40 sm:opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
            <label
              htmlFor="bannerUpload"
              className="bg-[#00000098] text-white sm:px-4 sm:py-2 w-full h-full flex items-center justify-center cursor-pointer font-semibold"
            >
              Change Banner
            </label>
            <input
              id="bannerUpload"
              type="file"
              accept="image/*"
              onChange={handleBannerChange}
              className="hidden"
            />
          </div>
        </div>
        {/* Blog Content */}
        <TextareaAutosize
          {...register("blogMessage", { required: true })}
          defaultValue={defaultBlog.blogMessage}
          onChange={(e) =>
            setDefaultBlog({ ...defaultBlog, blogMessage: e.target.value })
          }
          className="text-justify text-TextGray bg-transparent outline-none focus:border border-gray-300 rounded-md py-1 transition-all duration-200 w-full resize-none"
        />
        {errors.blogMessage && (
          <p className="text-red-500 text-sm">Content is required</p>
        )}

        {/* subtitle */}
        <TextareaAutosize
          {...register("subtitle")}
          defaultValue={defaultBlog.subtitle}
          onChange={(e) =>
            setDefaultBlog({ ...defaultBlog, subtitle: e.target.value })
          }
          className="text-TextBlack sm:text-2xl text-xl font-semibold bg-transparent outline-none focus:border border-gray-300 rounded-md transition-all duration-200 w-full resize-none mt-4"
        />
        {/* Subtitle Error */}
        {errors.subtitle && (
          <p className="text-red-500 text-sm">Subtitle is required</p>
        )}

        {/* more content */}
        <TextareaAutosize
          {...register("blogMessage2", { required: true })}
          defaultValue={defaultBlog.blogMessage2}
          onChange={(e) =>
            setDefaultBlog({ ...defaultBlog, blogMessage2: e.target.value })
          }
          className="text-justify text-TextGray bg-transparent outline-none focus:border border-gray-300 rounded-md py-1 transition-all duration-200 w-full resize-none"
        />
        {errors.blogMessage2 && (
          <p className="text-red-500 text-sm">Content is required</p>
        )}

        {/* Notes */}
        <TextareaAutosize
          {...register("notes")}
          defaultValue={defaultBlog.notes}
          onChange={(e) =>
            setDefaultBlog({ ...defaultBlog, notes: e.target.value })
          }
          className="text-TextGray bg-BGGray py-2 px-4 outline-none focus:border border-gray-300 rounded-md transition-all duration-200 w-full resize-none mt-4 border-l-6 "
        />
        {errors.notes && (
          <p className="text-red-500 text-sm">Notes are required</p>
        )}
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-200 mt-4 cursor-pointer"
        >
          {loadingstate ? "Loading..." : "Upload Blog"}
        </button>
      </form>
    </div>
  );
};

export default TemplateOne;
