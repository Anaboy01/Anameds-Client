import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { money } from '../assets';
import { CustomButton, FormField, Loader } from '../components';
import { checkIfImage } from '../utils';
import { useStateContext } from '../context';

const cloud_name = import.meta.env.VITE_APP_CLOUD_NAME; // Replace with your Cloudinary cloud name
const upload_preset = import.meta.env.VITE_APP_UPLOAD_PRESET; // Replace with your Cloudinary upload preset

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();

  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null); // State for image preview

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setForm({ ...form, image: imageFile });

    // Generate a preview for the selected image
    const imageUrl = URL.createObjectURL(imageFile);
    setImagePreview(imageUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.image) {
      setIsLoading(true);

      try {
        const cloudinaryResponse = await uploadImageToCloudinary(form.image);
        const cloudinaryUrl = cloudinaryResponse.url;

        await createCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
          image: cloudinaryUrl,
        });

        setIsLoading(false);
        navigate('/');
      } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        setIsLoading(false);
      }
    } else {
      alert('Please select an image file to upload.');
    }
  };

  const uploadImageToCloudinary = async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', upload_preset);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image to Cloudinary');
    }

    return response.json();
  };

  return (
    <div className='bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm-p-10 p-4 '>
      {isLoading && <Loader />}
      <div className=' flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]'>
        <h1 className=' font-epilogue font-bold sm:text-[25px] text-18[px] leading-[38px] text-white '>start a campaign</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField 
            labelName='Your Name*'
            placeholder='John Doe'
            value={form.name}
            inputType='text'
            handleChange={(e) => handleFormFieldChange('name', e)}
          />
          <FormField
            labelName='Campaign Title*'
            placeholder='Write your title'
            value={form.title}
            inputType='text'
            handleChange={(e) => handleFormFieldChange('title', e)}
          />
        </div>
        <FormField
            labelName='Story*'
            placeholder='Write your story'
            value={form.description}
            isTextArea
            handleChange={(e) => handleFormFieldChange('description', e)}
          />

          <div className='w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px] '>
            <img src={money} alt='money' className='w-[40px] h-[40px] object-contain'/>
            <h4 className='font-epilogue font-bold text-[25px] text-white ml-[20px]'> You Will Get 100% of the raised amount</h4>
          </div>
          <div className="flex flex-wrap gap-[40px]">
          <FormField 
            labelName='Goal *'
            placeholder='ETH 0.50'
            value={form.target}
            inputType='text'
            handleChange={(e) => handleFormFieldChange('target', e)}
          />
          <FormField
            labelName='End Date *'
            placeholder='End Date'
            value={form.deadline}
            inputType='date'
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
          </div>
          {/* Input for image file */}
          <div className='flex flex-col text-white'>
            <label>
              Upload your image
            </label>
            <input
              type='file'
              accept='image/*'
              onChange={handleImageChange}
              className='bg-transparent border md:w-[50%]'
            />
          </div>

          {/* Display image preview */}
          {imagePreview && (
            <div className='mt-[20px]'>
              <label></label>
              <img src={imagePreview} alt='Image Preview' className='w-[200px] h-[auto]' />
            </div>
          )}

          <div className='flex justify-center items-center mt-[40px] '>
            <CustomButton 
              btnType='submit'
              title='Submit new campaign'
              styles='bg-[#1dc071]'/>
          </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
