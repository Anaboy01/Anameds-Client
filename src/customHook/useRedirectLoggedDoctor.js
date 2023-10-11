import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import doctorService from '../redux/features/doctors/doctorService'



const useRedirectLoggedDoctor = (path) => {
      const navigate = useNavigate()

      useEffect(() => {

            let isLoggedIn;

            const redirectLoggedOutDoctor = async () => {
                  try {
                        isLoggedIn = await doctorService.doctorloginStatus()
                  } catch (error) {
                        console.log(error.message)
                  }

                  if(!isLoggedIn){
                        toast.info('Session expired, please login to continue')
                        navigate(path)
                        return
                  }
            }

            redirectLoggedOutDoctor()

      }, [path, navigate])
}

export default useRedirectLoggedDoctor