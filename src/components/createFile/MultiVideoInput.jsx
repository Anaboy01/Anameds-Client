import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

const cloud_name = import.meta.env.VITE_APP_CLOUD_NAME; // Replace with your Cloudinary cloud name
const upload_preset = import.meta.env.VITE_APP_UPLOAD_PRESET; // Replace with your Cloudinary upload preset

function MultiVideoInput({ addVideosToFormData }) {
  const [videos, setVideos] = useState([]);

  const handleVideoChange = async (index, file) => {
    try {
      // Upload the video to Cloudinary
      const cloudinaryResponse = await uploadVideoToCloudinary(file);
      const cloudinaryUrl = cloudinaryResponse.url;

      // Update the videos array with the Cloudinary URL
      const updatedVideos = [...videos];
      updatedVideos[index] = cloudinaryUrl;
      setVideos(updatedVideos);

      // Pass the updated videos to the parent component
      addVideosToFormData(updatedVideos);
    } catch (error) {
      console.error('Error uploading video to Cloudinary:', error);
    }
  };

  const removeVideo = (index) => {
    const filteredVideos = videos.filter((_, i) => i !== index);
    setVideos(filteredVideos);

    // Pass the updated videos to the parent component
    addVideosToFormData(filteredVideos);
  };

  const uploadVideoToCloudinary = async (videoFile) => {
    const formData = new FormData();
    formData.append('file', videoFile);
    formData.append('upload_preset', upload_preset); // Replace with your Cloudinary upload preset

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/video/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Failed to upload video to Cloudinary');
    }

    return response.json();
  };

  const addVideo = () => {
    setVideos([...videos, null]);
    addVideosToFormData([...videos, null]);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap items-center gap-[1rem]">
        {videos.map((video, index) => (
          <div key={index} className="mb-10">
            <input
              type="file"
              accept="video/*" // Accept video files
              onChange={(e) => handleVideoChange(index, e.target.files[0])}
              className="hidden"
              id={`video-input-${index}`}
            />
            <label
              htmlFor={`video-input-${index}`}
              className="cursor-pointer border p-2 rounded flex justify-between items-center w-48 text-center relative"
            >
              {video ? (
                <video controls width="300">
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                'Choose Video'
              )}
              <div
                onClick={() => removeVideo(index)}
                className="mt-2 bg-transparent text-white px-2 py-1 rounded hover:text-red-700"
              >
                <FaTrash /> {/* React Icon for Delete */}
              </div>
            </label>
          </div>
        ))}
      </div>

      <div
        onClick={addVideo}
        className="bg-transparent border text-white px-4 py-2 rounded transition-[1s] duration-[ease-in-out] rounded-2xl border-[solid] border-white border-[2px] border-solid text-center p-1 hover:text-[gray] hover:border-[solid] hover:border-[hsl(0,0%,50%,0.4)] mt-4 cursor-pointer"
      >
        Add Video
      </div>
    </div>
  );
}

export default MultiVideoInput;
