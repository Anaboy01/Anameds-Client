import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CampaignDetails, CreateCampaign, Home, Profile } from './pages'
import { Sidebar, Navbar } from './components'
import Contact from './pages/Contact'
import Welcome from './pages/Welcome'
import Layout from './components/Layout'
import Register from './pages/Register'
import MultiInput from './components/createFile/MultiInput'
import MultiVideoInput from './components/createFile/MultiVideoInput'
import TestField from './components/createFile/TestField'

import axios from 'axios'
import {ToastContainer} from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import CreateFile from './pages/doctor/CreateFile'
import DocLayout from './components/layouts/DocLayout'
import PatientFile from './pages/doctor/PatientFile'
import Signin from './pages/Signin'
import PatientLogin from './pages/patient/PatientLogin'
import HospitalRegister from './pages/hospital/HospitalRegister'

import HospitalLogin from './pages/hospital/HospitalLogin'
import DoctorLogin from './pages/doctor/DoctorLogin'
import PatientRegister from './pages/patient/PatientRegister'
import LoadingAnimation from './components/LoadiingAnimation'
import PatLayout from './components/layouts/PatLayout'
import PatientProfile from './pages/patient/PatientProfile'
import { useDispatch, useSelector } from 'react-redux'
import { getPatient, loginStatus, selectIsLoggedIn, selectPatient } from './redux/features/patientapi/patientSlice'
import DoctorProfile from './pages/doctor/DoctorProfile'
import { doctorloginStatus, getDoctor, selectADoctor, selectIsDoctorLoggedIn } from './redux/features/doctors/doctorsSlice'
import HospitalProfile from './pages/hospital/HospitalProfile'
import HosLayout from './components/layouts/HosLayout'
import { getHospital, hospitalLoginStatus, selectHospital, selectIsHospitalLoggedIn } from './redux/features/hospital/hospitalSlice'
import RegisterDoctor from './pages/hospital/RegisterDoctor'
import PatientLoginCode from './pages/patient/PatientLoginCode'
import FileEmail from './pages/doctor/FileEmail'
import AllPatientFiles from './pages/doctor/AllPatientFiles'

import RequestAPatientFile from './pages/doctor/RequestAPatientFile'
import PatientFileAccessCode from './pages/doctor/PatientFileAccessCode'
import CreatedPatientFile from './pages/doctor/CreatedPatientFile'
import CreatedFiles from './pages/doctor/CreatedFiles'
import YourRecords from './pages/patient/YourRecords'
import DoctorTable from './pages/hospital/DoctorTable'

axios.defaults.withCredentials = true



const App = () => {


  const dispatch = useDispatch()

  const isPatientLoggedIn = useSelector(selectIsLoggedIn)
  const isDoctorLoggedIn = useSelector(selectIsDoctorLoggedIn)
  const isHospitalLoggedIn = useSelector(selectIsHospitalLoggedIn)

      const patient = useSelector(selectPatient)
      const doctor = useSelector(selectADoctor)
      const hospital = useSelector(selectHospital)





      useEffect(() => {
        if (isPatientLoggedIn && !patient) {
          dispatch(getPatient());
        }
      }, [dispatch, isPatientLoggedIn, patient]);
      
      useEffect(() => {
        if (isDoctorLoggedIn && !doctor) {
          dispatch(getDoctor());
        }
      }, [dispatch, isDoctorLoggedIn, doctor]);
      
      useEffect(() => {
        if (isHospitalLoggedIn && !hospital) {
          dispatch(getHospital());
        }
      }, [dispatch, isHospitalLoggedIn, hospital]);
      



  return (
    // <div className='relative sm:-8 bg-[#13131a] min-h-screen flex flex-row'>

    
    //   <div className='sm:flex hidden mr-10 relative'>
    //     <Sidebar/>
    //   </div>
        
    //   <div className='px-[10px] pt-[10px] flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5'>
    //     <Navbar/>
    //     <Routes>

    //       <Route path='/' element={<Home/>}/>
    //       {/* <Route path='/welcome' element={<Welcome/>}/> */}
    //       <Route path='/profile' element={<Profile/>}/>
    //       <Route path='/create-campaign' element={<CreateCampaign/>} />
    //       <Route path='/campaign-details/:id' element={<CampaignDetails/>} /> 
                
    //       <Route path='/contact' element={<Contact/>} />        
    //     </Routes>
    //   </div>

      
    // </div>
    <>
      <ToastContainer toastStyle={{ backgroundColor: "#2c2f32" }} />
  <Routes>

      <Route path="/patient-funding" element={<Layout><Home/></Layout>}/>
      <Route path="/createFile/:email" element={<Layout><CreateFile/></Layout>}/>
      <Route path="/patientFile" element={<Layout><PatientFile/></Layout>}/>

    {/* Hospital rellated Routes */}
    <Route path='/signin/hospitalLogin' element={<HospitalLogin/>}/>
    <Route path='/register/hospital' element={<HospitalRegister/>}/>
    <Route path="/hospitalProfile" element={<Layout><HospitalProfile/></Layout>}/>
    <Route path='/register/hospital' element={<HospitalRegister/>}/>
    <Route path='/hospital/doctor' element={<Layout><RegisterDoctor/></Layout>}/>
    <Route path='fileEmail' element={<Layout><FileEmail/></Layout>}/>
    <Route path='hospital-doctors' element={<Layout><DoctorTable/></Layout>}/>

    {/* Patient Related Routes */}
    <Route path='/signin/patientLogin' element={<PatientLogin/>}/>
    <Route path='/register/patient' element={<PatientRegister/>}/>
    <Route path="/patientProfile" element={<Layout><PatientProfile/></Layout>}/>
   <Route path='/patientLoginCode/:email' element={<PatientLoginCode/>}/>
   <Route path="/createdFiles" element={<Layout><CreatedFiles/></Layout>}/>

    {/* Doctor rellated */}
    <Route path='/signin/doctorLogin' element={<DoctorLogin/>}/>
    <Route path="/doctorProfile" element={<Layout><DoctorProfile/></Layout>}/>
    <Route path="/allPatientFiles" element={<Layout><AllPatientFiles/></Layout>}/>
    <Route path="/yourRecords" element={<Layout><YourRecords/></Layout>}/>
    <Route path="/requestFile" element={<Layout><RequestAPatientFile/></Layout>}/>
    <Route path="/accessFile/:email" element={<Layout><PatientFileAccessCode/></Layout>}/>
    <Route path="/created-patientFile" element={<Layout><CreatedPatientFile/></Layout>}/>

      <Route path='/' element={<Layout><Welcome/></Layout>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/contact' element={<Layout><Contact/></Layout>} />   
      <Route path='/create-campaign' element={<Layout><CreateCampaign/></Layout>} />
      {/* <Route path='/load' element={<LoadingAnimation/>}/> */}

      <Route path='/campaign-details/:id' element={<Layout><CampaignDetails/></Layout>} /> 

      
      
      
      </Routes>
    </>
  )
}

export default App