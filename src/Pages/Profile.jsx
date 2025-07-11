import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { getDatabase, ref, update } from "firebase/database";
import { getAuth } from "firebase/auth";
import useUploadCloudinary from "../Hooks/useCloudinaryUpload";
import { MdCreate } from "react-icons/md";

const Profile = () => {
  const { user } = useContext(UserContext);
  const { uploadImage, loading, error } = useUploadCloudinary();

  const [profileError, setProfileError] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const fileInputRef = useRef(null);
  const db = getDatabase();
  const auth = getAuth();

  // for input value store
  const [NewName, setNewName] = useState("");
  const [NewBio, setNewBio] = useState("");
  const [infosaveLoading, setinfosaveLoading] = useState(false);
  const [err, seterr] = useState(false);

  useEffect(() => {
    if (user) {
      setNewName(user.username || "");
      setNewBio(user.bio || "");
    }
  }, [user]);

  const handleUpdateProfile = async (profile) => {
    try {
      setSaveLoading(true);
      const profileUrl = await uploadImage(profile);
      if (!profileUrl) throw new Error("Upload failed");
      const updateData = { profile_picture: profileUrl };
      await update(ref(db, `users/${user.userkey}`), updateData);

      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setProfileError("Something went wrong. Please try again.");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleSaveChange = async () => {
    if (NewName == "") {
      seterr("Name is requred");
      return;
    }
    // update new data on firebase
    let updateData = {
      username: NewName,
      bio: NewBio,
    };
    try {
      await update(ref(db, `users/${user.userkey}`), updateData);
      setinfosaveLoading(true);
      setTimeout(() => {
        setinfosaveLoading(false);
      }, 1000);
    } catch (error) {
      console.log("error from updata data", error);
    } finally {
    }
  };

  return (
    <div className="sm:px-15 px-5 sm:pb-15 pb-5 pt-20 flex sm:flex-row flex-col gap-6 sm:justify-between w-full min-h-screen bg-BGWhite">
      <div className="sm:w-[30%] w-full">
        <div className="w-full flex flex-col items-center bg-BGGray p-5 rounded">
          <div className="w-full flex flex-col gap-3 items-center  relative">
            {profileError && (
              <p className="text-red-500 text-sm text-center">{profileError}</p>
            )}
            <div className="w-35 h-35 relative">
              <img
                className="w-full h-full object-cover rounded-full"
                src={
                  user?.profile_picture ||
                  "https://www.w3schools.com/howto/img_avatar.png"
                }
                alt="Profile"
              />
              {saveLoading ? (
                <span className="w-full h-full bg-[#00000084] text-white font-semibold rounded-full absolute top-0 left-0 flex items-center justify-center">
                  Loading...
                </span>
              ) : (
                ""
              )}
            </div>
            <span
              onClick={() =>
                fileInputRef.current && fileInputRef.current.click()
              }
              className=" absolute sm:right-28 right-18 sm:top-4 top-4 p-2 text-xl rounded-full bg-ButttonBG text-white cursor-pointer"
            >
              <MdCreate />
            </span>
            <input
              className="px-2 text-center text-3xl font-bold text-TextBlack bg-transparent outline-none border-2 border-gray-500 rounded-md py-1 w-full"
              value={NewName}
              type="text"
              onChange={(e) => setNewName(e.target.value)}
            />
            <textarea
              placeholder="Add your bio here..."
              value={NewBio}
              onChange={(e) => setNewBio(e.target.value)}
              className="px-2 h-[120px] resize-none text-center text-TextBlack bg-transparent outline-none border-2 border-gray-500 rounded-md py-1 w-full"
            ></textarea>
            <button
              onClick={handleSaveChange}
              className="py-2 w-full rounded-md bg-ButttonBG text-white cursor-pointer font-semibold"
            >
              {infosaveLoading ? "Saved" : "Save change"}
            </button>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={(e) => handleUpdateProfile(e.target.files[0])}
            />
          </div>
        </div>
      </div>
      <div className="text-TextBlack sm:w-[70%] w-full bg-BGGray rounded p-5">Right side</div>
    </div>
  );
};

export default Profile;
