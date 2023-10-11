import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import hospitalService from '../redux/features/hospital/hospitalSerice'



const useRedirectLoggedHospital = (path) => {
      const navigate = useNavigate()

      useEffect(() => {

            let isLoggedIn;

            const redirectLoggedOutHospital = async () => {
                  try {
                        isLoggedIn = await hospitalService.hospitalLoginStatus()
                  } catch (error) {
                        console.log(error.message)
                  }

                  if(!isLoggedIn){
                        toast.info('Session expired, please login to continue')
                        navigate(path)
                        return
                  }
            }

            redirectLoggedOutHospital()

      }, [path, navigate])
}

export default useRedirectLoggedHospital