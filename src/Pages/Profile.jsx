import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { getDatabase, ref, update } from "firebase/database";
import { getAuth } from "firebase/auth";
import useUploadCloudinary from "../Hooks/useCloudinaryUpload";

const Profile = () => {
  const { user } = useContext(UserContext);
  const { uploadImage, loading, error } = useUploadCloudinary();

  const [profile, setProfile] = useState(null);
  const [profileError, setProfileError] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const fileInputRef = useRef(null);
  const db = getDatabase();
  const auth = getAuth();

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    setProfile(file);
    setProfileError("");
  };

  const handleUpdateProfile = async () => {
    if (!profile) {
      setProfileError("Please select a profile picture first.");
      return;
    }

    try {
      const profileUrl = await uploadImage(profile);
      if (!profileUrl) throw new Error("Upload failed");

      const updateData = { profile_picture: profileUrl };
      await update(ref(db, `users/${user.userkey}`), updateData);

      setSaveLoading(true);
      setTimeout(() => {
        setSaveLoading(false);
      }, 2000);

      setProfile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error("Profile update error:", err);
      setProfileError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="p-40 flex items-center justify-between w-full h-[700px] bg-BGWhite">
      <div className="flex gap-10 items-center">
        <img
          className="w-50 h-50 rounded-full border-2 border-gray-500"
          src={
            user?.profile_picture ||
            "https://www.w3schools.com/howto/img_avatar.png"
          }
          alt="Profile"
        />
        <h2 className="text-[80px] font-bold text-TextBlack">
          {user?.username || "Not Found"}
        </h2>
      </div>

      <div className="flex flex-col gap-2 w-[300px]">
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-BGGray dark:border-gray-600 dark:hover:border-gray-500"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
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
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
              {profileError && (
                <p className="text-red-500 text-sm text-center">
                  {profileError}
                </p>
              )}
              {/* Show selected file name */}
              {profile && (
                <p className="mt-2 text-sm text-gray-500">
                  Selected file:{" "}
                  <span className="font-semibold text-buttonsBG">
                    {profile.name}
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

        <button
          onClick={handleUpdateProfile}
          disabled={loading || saveLoading}
          className="bg-ButttonBG py-2 px-4 rounded-xl text-white cursor-pointer"
        >
          {saveLoading
            ? "Updated"
            : loading
            ? "Uploading..."
            : "Update Profile Photo"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
