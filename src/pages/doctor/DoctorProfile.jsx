import React, { useEffect, useLayoutEffect, useState } from 'react'

import { avatar } from '../../assets'
import { useDispatch, useSelector } from 'react-redux'

import { Loader } from '../../components'
import useRedirectLoggedDoctor from '../../customHook/useRedirectLoggedDoctor'
import { getDoctor, selectADoctor, updateDoctor } from '../../redux/features/doctors/doctorsSlice'
import { FaHeart, FaNotesMedical, FaStar, FaComment } from 'react-icons/fa'
import { BiPlusMedical } from 'react-icons/bi'
import { BsJournalMedical } from 'react-icons/bs'
import IconCard from '../../components/doctorComponent/IconCard'


const cloud_name = import.meta.env.VITE_APP_CLOUD_NAME
const upload_preset = import.meta.env.VITE_APP_UPLOAD_PRESET

export const shortenText = (text, n ) => {
      if(text.length > n){
            const shortenedText = text.substring(0, n).concat('...')

            return shortenedText
      }

      return text
}

const DoctorProfile = () => {
      useRedirectLoggedDoctor('/signin/doctorLogin')

      const dispatch = useDispatch()

      const {isLoading, isLoggedIn, isSuccess, message, doctor} = useSelector(
            (state) => state.doctor
      )

       // Set the initial state with default values from the JSON data
  const initialState = {
      name: doctor?.name || '',
      
      email: doctor?.contactInfo?.email || '',
      phone: doctor?.contactInfo?.phone || '',
      specialty: doctor?.specialty || '',
      licenseNumber: doctor?.licenseNumber || '',
      isVerified: doctor?.isVerified || false,
    };
          

      const [profile, setProfile] = useState(initialState)
      const [profileImage, setProfileImage] = useState(null)
      const [imagePreview, setImagePreview] = useState(null)

    

    

      useEffect(() => {
            dispatch(getDoctor())
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

                  const doctorData ={
                        name:profile.name,
                        specialty: profile.specialty,
                        phone: profile.phone,
                        licenseNumber:profile.licenseNumber
                  }
                  dispatch(updateDoctor(doctorData))
      


            } catch (error) {
                  toast.error(error.message)
            }

           

      }

      useLayoutEffect(() => {
                if(doctor){
                  setProfile({
                        ...profile,
                        name: doctor?.name,
                        licenseNumber: doctor?.licenseNumber,
                        email: doctor?.contactInfo?.email,
                        phone: doctor?.contactInfo?.phone,
                        specialty: doctor?.specialty,
                        role: doctor.role,
                        isVerified: doctor.isVerified,
                  })
                }  
      }, [doctor])
  return (
      <div className='bg-[#1c1c24] flex justify-left gap-4  flex-col rounded-[10px] sm-p-10 p-6 text-white font-epilogue'>
            {/* <div className='bg-[#2c2f32] p-4 rounded-md shadow-md self-center'>
            {isLoading && <Loader/>}
                  <img src={imagePreview === null ? doctor?.photo : imagePreview} alt="profile-pic" className='w-48 ns:w-80 rounded-lg' />

                  <p>{doctor?.role}</p>
            </div> */}
            <form onSubmit={saveProfile} className='flex flex-col  bg-[#2c2f32] p-4 rounded-md shadow-md '>
                        {/* <p className='flex flex-col'>
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

                        </p> */}
                        <p className='flex flex-col'>
                              <label>
                                       Name:
                              </label>
                              <input
                              type='text'
                              name='name' // Change this to 'firstName'
                              className='bg-transparent border rounded-md p-1'
                              value={profile?.name} // Change this to 'profile.firstName'
                              onChange={handleInputChange}
                              />
                        </p>
                        <p className='flex flex-col'>
                              <label>
                                      Speciality:
                              </label>
                              <input
                              type='text'
                              name='speciality' // Change this to 'lastName'
                              className='bg-transparent border rounded-md p-1'
                              value={profile?.specialty} // Change this to 'profile.lastName'
                              onChange={handleInputChange}
                              />
                        </p>
                        <p className='flex flex-col'>
                              <label>
                                    License Number:
                              </label>
                              <input
                              type='text'
                              name='licenseNumber' // Change this to 'lastName'
                              className='bg-transparent border rounded-md p-1'
                              value={profile?.licenseNumber} // Change this to 'profile.lastName'
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
                              className='rounded-md p-1 first-line:'
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

            <div className='flex items-center flex-wrap gap-3  bg-transparent p-2 rounded-md shadow-md '>
                  <IconCard
                  icon={<BiPlusMedical />}
                  content="Create patient File"
                  to="/fileEmail" // Specify the path for this card
                  />
                  <IconCard
                  icon={<FaNotesMedical />}
                  content="Access patient File"
                  to="/requestFile" // Specify the path for this card
                  />
                  <IconCard
                  icon={<BsJournalMedical />}
                  content="Access Patient File You Created"
                  to="/created-patientFile" // Specify the path for this card
                  />
                  <IconCard
                  icon={<BsJournalMedical />}
                  content="Home"
                  to="/" // Specify the path for this card
                  />
            </div>

           
    </div>
    
  )
}

export const DoctorName = () => {

      const doctor = useSelector(selectADoctor)

      const doctorname = doctor?.name || '...'
      

      return  <p className='text-white font-openSan'>
      Hi, {shortenText(doctorname, 5)} |
      </p>
}

export default DoctorProfile