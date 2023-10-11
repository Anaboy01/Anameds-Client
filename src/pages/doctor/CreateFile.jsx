import React, { useState } from 'react'
import { ImageInput, VideoInput, Prescription, Tests } from '../../components/createFile'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addPatientFile } from '../../redux/features/patientapi/patientSlice';
import MultiVideoInput from '../../components/createFile/MultiVideoInput';

const cloud_name = import.meta.env.VITE_APP_CLOUD_NAME; // Replace with your Cloudinary cloud name
const upload_preset = import.meta.env.VITE_APP_UPLOAD_PRESET; // Replace with your Cloudinary upload preset


const initialState = {

      fileName: "",
      prescriptions: [],
      diagnosis: "",
      tests: [],
      note: "",
      images: [],
      videos: [],
      
    };


const CreateFile = () => {
      const [formData, setFormData] = useState(initialState);
      const { fileName, prescriptions, diagnosis, tests, note, images, videos } = formData;

      const {email} = useParams()
      const dispatch = useDispatch();
      

     

      const { isLoggedIn, isSuccess} = useSelector(
            (state) => state.patient
      );

      const handleTestFieldChange = (updatedTests) => {
            setFormData({
              ...formData,
              tests: updatedTests
            });
      };

     
        
      const handleVideoChange = async (videos) => {
      
            setFormData({
              ...formData,
              videos,
            });
          };

  
 
  
    // Function to handle image change and upload
    const handleImageChange = async (images) => {
     
      setFormData({
        ...formData,
        images,
      });
    };
  
   


    const handlePrescriptionChange = (prescriptions) => {
    
      setFormData({
        ...formData,
        prescriptions,
      });
    };

      const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
          };

      const createPatientFile = async (e) => {
            e.preventDefault();

            if (!fileName) {
                  return toast.error("File name is required");
            }

            const patientData = {
                  fileName, prescriptions, diagnosis, tests, note, images, videos
            }

            // console.log(patientData)

            await dispatch(addPatientFile({patientData, email}));
      }


  return (
    <form onSubmit={createPatientFile} className='bg-[#1c1c24] flex justify-left gap-4  flex-col rounded-[10px] sm-p-10 p-6 text-white'>
      <div className='bg-[#2c2f32] p-4 rounded-md flex flex-col '><label>File Name:</label> 
            <input type="text" placeholder='Your file name' value={fileName} name='fileName' className='p-3 bg-transparent border rounded-sm ns:w-[50%] ' onChange={handleInputChange} />
      </div>
      <div className='bg-[#2c2f32] p-4 rounded-md'>
      <h1>Test Fields:</h1>
            <Tests onInputChange={handleTestFieldChange}/>
      </div>
      <div className='bg-[#2c2f32] p-4 rounded-md '>
            <p className='mb-[3rem]'>Note:</p>
            <textarea name="note" value={note} cols="30" rows="10" placeholder='Your Observations' className='p-3 text-white bg-transparent border rounded-md' onChange={handleInputChange}></textarea>
      </div>

      <div className='bg-[#2c2f32] p-4 rounded-md '>
      <h1>Prescriptions:</h1>
            <Prescription addPrescriptionsToFormData={handlePrescriptionChange}/>
      </div>
      <div className='bg-[#2c2f32] rounded-md p-4'>
      <h1>Images:</h1>
            <ImageInput  addImagesToFormData={handleImageChange}/>
      </div>
      <div className='bg-[#2c2f32] rounded-md p-4'>
      <h1>Videos:</h1>
            <MultiVideoInput addVideosToFormData={handleVideoChange}/>
      </div>

      <button  className='w-[50%] sm:w-[30%] h-8 bg-transparent outline:none text-white transition-[1s] duration-[ease-in-out] rounded-2xl border-[solid] border-white border-[2px] border-solid hover:text-[gray] hover:border-[solid] hover:border-[hsl(0,0%,50%,0.4)] self-center' type='submit'>Create</button>
    </form>
  )
}

export default CreateFile