import { useState } from "react";

const useUploadCloudinary = () => {
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  const uploadImage = async (file) => {
    setloading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "TestProject");

    try {
      const Fetch = await fetch(
        "https://api.cloudinary.com/v1_1/df6bqehwu/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await Fetch.json();
      setUrl(data.secure_url);
      setloading(false);
      return data.secure_url;

    } catch (err) {
      console.error("Upload failed", err);
      setError("Upload failed");
      setloading(false);
      return null;
    }
  };

  return { uploadImage, loading, error, url };
};

export default useUploadCloudinary;