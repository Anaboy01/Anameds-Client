import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import patientService from '../redux/features/patientapi/patientService'

const useRedirectLoggedPatient = (path) => {
      const navigate = useNavigate()

      useEffect(() => {

            let isLoggedIn;

            const redirectLoggedOutPatient = async () => {
                  try {
                        isLoggedIn = await patientService.loginStatus()
                  } catch (error) {
                        console.log(error.message)
                  }

                  if(!isLoggedIn){
                        toast.info('Session expired, please login to continue')
                        navigate(path)
                        return
                  }
            }

            redirectLoggedOutPatient()

      }, [path, navigate])
}

export default useRedirectLoggedPatient