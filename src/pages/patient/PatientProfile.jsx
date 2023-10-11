import React, { useEffect, useLayoutEffect, useState } from 'react'
import useRedirectLoggedPatient from '../../customHook/useRedirectLoggedPatient'
import { avatar } from '../../assets'
import { useDispatch, useSelector } from 'react-redux'
import { getPatient, selectPatient, updatePatient } from '../../redux/features/patientapi/patientSlice'
import { Loader } from '../../components'
import MyCampaigns from '../MyCampaigns'
import Notification from '../../components/notification/Notification'
import { FaNotesMedical } from 'react-icons/fa'
import IconCard from '../../components/doctorComponent/IconCard'
import PatientIconCard from '../../components/patientComponet/PatientIconCard'

const cloud_name = import.meta.env.VITE_APP_CLOUD_NAME
const upload_preset = import.meta.env.VITE_APP_UPLOAD_PRESET

export const shortenText = (text, n ) => {
      if(text.length > n){
            const shortenedText = text.substring(0, n).concat('...')

            return shortenedText
      }

      return text
}

const PatientProfile = () => {
      useRedirectLoggedPatient('/signin')

      const dispatch = useDispatch()

      const {isLoading, isLoggedIn, isSuccess, message, patient} = useSelector(
            (state) => state.patient
      )

       // Set the initial state with default values from the JSON data
  const initialState = {
      firstName: patient?.name?.firstName || '',
      lastName: patient?.name?.lastName || '',
      email: patient?.contactInfo?.email || '',
      phone: patient?.contactInfo?.phone || '',
      photo: patient?.photo || '',
      role: patient?.role || '',
      isVerified: patient?.isVerified || false,
    };
          

      const [profile, setProfile] = useState(initialState)
      const [profileImage, setProfileImage] = useState(null)
      const [imagePreview, setImagePreview] = useState(null)

    

    

      useEffect(() => {
            dispatch(getPatient())
      }, [dispatch])

      const handleImageChange =(e) => {
            setProfileImage(e.target.files[0])
            setImagePreview(URL.createObjectURL(e.target.files[0]))
      }

      const handleInputChange = (e) => {
            const { name, value } = e.target;
            setProfile({ ...profile, [name]: value });
      };

      const saveProfile = async (e) => {
            e.preventDefault();

            let imageURL
            try {
                  if(profileImage !== null && (
                        profileImage.type === 'image/jpeg' ||
                        profileImage.type === 'image/jpg' ||
                        profileImage.type === 'image/png' 
                  )){
                        const image = new FormData()
                        image.append('file', profileImage)
                        image.append('cloud_name', cloud_name)
                        image.append('upload_preset', upload_preset)

                        //Save Image to Cloudinary

                        const response = await fetch(
                              `https://api.cloudinary.com/v1_1/dispu86tu/image/upload`,
                              {method: 'post', body: image}

                              //dpmv3axph
                        )

                        const imgData = await response.json()
                        console.log(imgData)

                        imageURL = imgData.url.toString()
                  }

                  // SAVE PROFILE TO MONGODB

                  const patientData ={
                        firstName:profile.firstName,
                        lastName: profile.lastName,
                        phone: profile.phone,
                        photo: profileImage ? imageURL : profile.photo
                  }
                  dispatch(updatePatient(patientData))
      


            } catch (error) {
                  toast.error(error.message)
            }

           

      }

      useLayoutEffect(() => {
                if(patient){
                  setProfile({
                        ...profile,
                        firstName: patient?.name?.firstName,
                        lastName: patient?.name?.lastName,
                        email: patient?.contactInfo?.email,
                        phone: patient?.contactInfo?.phone,
                        photo: patient.photo,
                        role: patient.role,
                        isVerified: patient.isVerified,
                  })
                }  
      }, [patient])
  return (
      <div className='bg-[#1c1c24] flex justify-left gap-4  flex-col rounded-[10px] sm-p-10 p-6 text-white font-epilogue'>
            {isLoading && <Loader/>}
            {!profile.isVerified && <Notification/>}
            <div className='bg-[#2c2f32] p-4 rounded-md shadow-md self-center'>
            
                  <img src={imagePreview === null ? patient?.photo : imagePreview} alt="profile-pic" className='w-48 ns:w-80 rounded-lg' />

                  <p>{patient?.role}</p>
            </div>
            <form onSubmit={saveProfile} className='flex flex-col  bg-[#2c2f32] p-4 rounded-md shadow-md '>
                        <p className='flex flex-col'>
                               <label>
                                    Change Photo:
                              </label>
                              <input
                              type='file'
                              className='outline-none border border-gray-300 bg-transparent w-full p-1 rounded-md'
                              accept='image/*'
                              name='image'
                              onChange={handleImageChange}
                              />

                        </p>
                        <p className='flex flex-col'>
                              <label>
                                      First Name:
                              </label>
                              <input
                              type='text'
                              name='firstName' // Change this to 'firstName'
                              className='bg-transparent border rounded-md p-1'
                              value={profile?.firstName} // Change this to 'profile.firstName'
                              onChange={handleInputChange}
                              />
                        </p>
                        <p className='flex flex-col'>
                              <label>
                                      Last Name:
                              </label>
                              <input
                              type='text'
                              name='lastName' // Change this to 'lastName'
                              className='bg-transparent border rounded-md p-1'
                              value={profile?.lastName} // Change this to 'profile.lastName'
                              onChange={handleInputChange}
                              />
                        </p>
                        <p className='flex flex-col'>
                              <label>
                                    Phone:
                              </label>
                              <input
                              type='text'
                              name='phone' // Change this to 'phone'
                              className='rounded-md p-1 border bg-transparent'
                              value={profile?.phone} // Change this to 'profile.phone'
                              onChange={handleInputChange}
                              />
                        </p>
                        <p className='flex flex-col'>
                              <label>
                                    Email:
                              </label>
                              <input
                              type='email'
                              name='email'
                              className='rounded-md p-1'
                              value={profile?.email}
                              onChange={handleInputChange}
                              disabled
                              />
                        </p>

                        <div className='flex justify-center items-center'>
                              
                              <button className='mt-[2rem] ns:mt-[4rem] w-[50%] bg-transparent outline:none  text-white transition-[1s] duration-[ease-in-out] rounded-2xl border-[solid] border-white border-[2px] border-solid text-center p-1 hover:text-[gray] hover:border-[solid] hover:border-[hsl(0,0%,50%,0.4)]'>
                                    Update Profile
                              </button>
                        </div>
            </form>

            <div className='bg-[#2c2f32] p-4 rounded-md'>
                  <MyCampaigns/>
            </div>
            <div className='bg-[#2c2f32] p-4 rounded-md'>
                  <PatientIconCard
                  icon={<FaNotesMedical />}
                  content="Your Records"
                  to="/yourRecords"
                  patientData={patient}
                   // Pass the patient data as a prop
                  />
                  {console.log(patient)}
            </div>
    </div>
    
  )
}

export const PatientName = () => {

      const patient = useSelector(selectPatient)

      const patientname = patient?.name?.firstName || '...'

      return  <p className='text-white font-openSan'>
      Hi, {shortenText(patientname, 5)} |
      </p>
}

export default PatientProfile