import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL

export const PATIENT_API_URL = `${BACKEND_URL}/api/patients/`
export const API_URL = `${BACKEND_URL}/api/doctors/`



const registerDoctor = async (doctorData) =>{
      const response = await axios.post(API_URL + 'registerDoctor', doctorData)
      return response.data
}
//login Patient



//login Doctor

const loginDoctor = async (doctorData) =>{
      const response = await axios.post(API_URL + 'loginDoctor', doctorData)
      return response.data
}



//logout Patient

const logoutDoctor = async () =>{
      const response = await axios.get(API_URL + 'logoutDoctor')
      return response.data.message
}
//login staus Patient

const doctorloginStatus = async () =>{
      const response = await axios.get(API_URL + 'loginStatus')
      return response.data
}
//Get  Patient
 //GET User Profile
 const getDoctor = async () => {
      const response = await axios.get(API_URL + "getDoctor");
      return response.data;
    };


 const getDoctorsByHospitalId = async () => {
      const response = await axios.get(API_URL + "getDoctor");
      console.log(response.data)
      return response.data;

    };
 //GET User Profile
 const updateDoctor = async (doctorData) => {
      const response = await axios.patch(API_URL + "updateDoctor", doctorData);
      return response.data;
    };

const doctorService = {
 
      loginDoctor,
      logoutDoctor,
      doctorloginStatus,
      getDoctor,
      updateDoctor,
      registerDoctor,
      getDoctorsByHospitalId
}

export default doctorService