import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

const cloud_name = import.meta.env.VITE_APP_CLOUD_NAME; // Replace with your Cloudinary cloud name
const upload_preset = import.meta.env.VITE_APP_UPLOAD_PRESET; // Replace with your Cloudinary upload preset

function MultiInput({ addImagesToFormData }) {
  const [images, setImages] = useState([]);

  const handleImageChange = async (index, file) => {
    try {
      // Upload the image to Cloudinary
      const cloudinaryResponse = await uploadImageToCloudinary(file);
      const cloudinaryUrl = cloudinaryResponse.url;

      // Update the images array with the Cloudinary URL
      const updatedImages = [...images];
      updatedImages[index] = cloudinaryUrl;
      setImages(updatedImages);

      // Pass the updated images to the parent component
      addImagesToFormData(updatedImages);
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
    }
  };

  const removeImage = (index) => {
    const filteredImages = images.filter((_, i) => i !== index);
    setImages(filteredImages);

    // Pass the updated images to the parent component
    addImagesToFormData(filteredImages);
  };

  const uploadImageToCloudinary = async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', upload_preset); // Replace with your Cloudinary upload preset

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Failed to upload image to Cloudinary');
    }

    return response.json();
  };

  const addImage = () => {
    setImages([...images, null]);
    addImagesToFormData([...images, null]);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap items-center gap-[1rem]">
        {images.map((image, index) => (
          <div key={index} className="mb-10">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(index, e.target.files[0])}
              className="hidden"
              id={`image-input-${index}`}
            />
            <label
              htmlFor={`image-input-${index}`}
              className="cursor-pointer border flex p-2 rounded justify-between items-center w-48 text-center relative"
            >
              {image ? (
                <>
                  <img
                    src={image}
                    alt="Selected Image"
                    className="w-full h-auto max-h-32 object-contain bg-[#2c2f32]"
                  />
                </>
              ) : (
                'Choose Image'
              )}
              <div
                onClick={() => removeImage(index)}
                className="mt-2 bg-transparent text-white px-2 py-1 rounded hover:text-red-700"
              >
                <FaTrash /> {/* React Icon for Delete */}
              </div>
            </label>
          </div>
        ))}
      </div>

      <div
        onClick={addImage}
        className="bg-transparent border text-white px-4 py-2 rounded transition-[1s] duration-[ease-in-out] rounded-2xl border-[solid] border-white border-[2px] border-solid text-center p-1 hover:text-[gray] hover:border-[solid] hover:border-[hsl(0,0%,50%,0.4)] mt-4 cursor-pointer"
      >
        Add Image
      </div>
    </div>
  );
}

export default MultiInput;
