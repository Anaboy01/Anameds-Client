import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL

export const API_URL = `${BACKEND_URL}/api/hospitals/`
export const DOCTOR_API_URL = `${BACKEND_URL}/api/doctors/`

//Validate email




//Register Hospital

const registerHospital = async (hospitalData) =>{
      const response = await axios.post(API_URL + 'registerHospital', hospitalData)
      return response.data
}

//login Hospital

const loginHospital = async (hospitalData) =>{
      const response = await axios.post(API_URL + 'loginHospital', hospitalData)
      return response.data
}

//logout Hospital

const logoutHospital = async () =>{
      const response = await axios.get(API_URL + 'logoutHospital')
      return response.data.message
}
//login staus Hospital

const hospitalLoginStatus = async () =>{
      const response = await axios.get(API_URL + 'hospitalLoginStatus')
      return response.data
}
//Get  Hospital
 //GET User Hospital
 const getHospital = async () => {
      const response = await axios.get(API_URL + "getHospital");
      return response.data;
    };
 //GET User Hospital
 const updateHospital = async (hospitalData) => {
      const response = await axios.patch(API_URL + "updateHospital", hospitalData);
      return response.data;
    };



   

const hospitalService = {
      registerHospital,
      loginHospital,
      logoutHospital,
      hospitalLoginStatus,
      getHospital,
      updateHospital,
     
     
}

export default hospitalService