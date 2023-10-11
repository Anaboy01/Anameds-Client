import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useRedirectLoggedHospital from '../../customHook/useRedirectHospital'
import { getHospital, updateHospital } from '../../redux/features/hospital/hospitalSlice'
import { RxAvatar } from 'react-icons/rx'
import IconCard from '../../components/doctorComponent/IconCard'
import { BsFillPeopleFill } from 'react-icons/bs'

const HospitalProfile = () => {
      useRedirectLoggedHospital('/signin/hospitalLogin')

      const dispatch = useDispatch()

      const {isLoading, isLoggedIn, isSuccess, message, hospital} = useSelector(
            (state) => state.hospital
      )

       // Set the initial state with default values from the JSON data
  const initialState = {
      name: hospital?.name || '',
      description: hospital?.description || '',
      email: hospital?.contactInfo?.email || '',
      phone: hospital?.contactInfo?.phone || '',
      website: hospital?.contactInfo?.website || '',
      photo: hospital?.photo || '',
      role: hospital?.role || '',
      isVerified: hospital?.isVerified || false,
    };
          

      const [profile, setProfile] = useState(initialState)
      const [profileImage, setProfileImage] = useState(null)
      const [imagePreview, setImagePreview] = useState(null)

    

    

      useEffect(() => {
            dispatch(getHospital())
      }, [dispatch])

      // const handleImageChange =(e) => {
      //       setProfileImage(e.target.files[0])
      //       setImagePreview(URL.createObjectURL(e.target.files[0]))
      // }

      const handleInputChange = (e) => {
            const { name, value } = e.target;
            setProfile({ ...profile, [name]: value });
      };

      const saveProfile = async (e) => {
            e.preventDefault();

            let imageURL
            try {
                  // if(profileImage !== null && (
                  //       profileImage.type === 'image/jpeg' ||
                  //       profileImage.type === 'image/jpg' ||
                  //       profileImage.type === 'image/png' 
                  // )){
                  //       const image = new FormData()
                  //       image.append('file', profileImage)
                  //       image.append('cloud_name', cloud_name)
                  //       image.append('upload_preset', upload_preset)

                  //       //Save Image to Cloudinary

                  //       const response = await fetch(
                  //             `https://api.cloudinary.com/v1_1/dispu86tu/image/upload`,
                  //             {method: 'post', body: image}

                  //             //dpmv3axph
                  //       )

                  //       const imgData = await response.json()
                  //       console.log(imgData)

                  //       imageURL = imgData.url.toString()
                  // }

                  // SAVE PROFILE TO MONGODB

                  const hospitalData ={
                        name:profile.name,
                        phone: profile.phone,
                        description: profile.description,
                        website: profile.website,
                        state: profile.state,
                        country: profile.country,
                        city: profile.city
                        
                  }
                  dispatch(updateHospital(hospitalData))
      


            } catch (error) {
                  toast.error(error.message)
            }

           

      }

      useLayoutEffect(() => {
                if(hospital){
                  setProfile({
                        ...profile,
                        name: hospital?.name,
                        state: hospital?.location?.state,
                        email: hospital?.contactInfo?.email,
                        phone: hospital?.contactInfo?.phone,
                        website: hospital?.contactInfo?.website,
                        description: hospital.description,
                        isVerified: hospital.isVerified,
                        city: hospital?.location?.city,
                        country: hospital?.location?.country,
                  })
                }  
      }, [hospital])
  return (
      <div className='bg-[#1c1c24] flex justify-left gap-4  flex-col rounded-[10px] sm-p-10 p-6 text-white font-epilogue'>
            {/* <div className='bg-[#2c2f32] p-4 rounded-md shadow-md self-center'>
            {isLoading && <Loader/>}
                  <img src={imagePreview === null ? hospital?.photo : imagePreview} alt="profile-pic" className='w-48 ns:w-80 rounded-lg' />

                  <p>{hospital?.role}</p>
            </div> */}
            <form onSubmit={saveProfile} className='flex flex-col  bg-[#2c2f32] p-4 rounded-md shadow-md gap-2'>
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
                                      First Name:
                              </label>
                              <input
                              type='text'
                              name='firstName' // Change this to 'firstName'
                              className='bg-transparent border rounded-md p-1'
                              value={profile?.name} // Change this to 'profile.firstName'
                              onChange={handleInputChange}
                              />
                        </p>
                        <p className='flex flex-col'>
                              <label>
                                      Description:
                              </label>
                              <input
                              type='text'
                              name='description' // Change this to 'lastName'
                              className='bg-transparent border rounded-md p-1'
                              value={profile?.description} // Change this to 'profile.lastName'
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
                        <p className='flex flex-col'>
                              <label>
                                    Website:
                              </label>
                              <input
                              type='text'
                              name='website'
                              className='rounded-md p-1 border bg-transparent'
                              value={profile?.website}
                              onChange={handleInputChange}
                              
                              />
                        </p>
                        <p className='flex flex-col'>
                              <label>
                                    City:
                              </label>
                              <input
                              type='text'
                              name='city'
                              className='rounded-md p-1 border bg-transparent'
                              value={profile?.city}
                              onChange={handleInputChange}
                              
                              />
                        </p>
                        <p className='flex flex-col'>
                              <label>
                                    State:
                              </label>
                              <input
                              type='text'
                              name='state'
                              className='rounded-md p-1 border bg-transparent'
                              value={profile?.state}
                              onChange={handleInputChange}
                              
                              />
                        </p>
                        <p className='flex flex-col'>
                              <label>
                                    Country:
                              </label>
                              <input
                              type='text'
                              name='country'
                              className='rounded-md p-1 border bg-transparent'
                              value={profile?.country}
                              onChange={handleInputChange}
                              
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
                  icon={<RxAvatar />}
                  content="Register Doctor"
                  to="/hospital/doctor" // Specify the path for this card
                  />
                  <IconCard
                  icon={<BsFillPeopleFill />}
                  content="Register Doctor"
                  to="/hospital-doctors" // Specify the path for this card
                  />
            </div>


      
    </div>
    
  )
}

export default HospitalProfile