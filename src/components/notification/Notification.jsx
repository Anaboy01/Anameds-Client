import React from 'react'
import { useDispatch } from 'react-redux'
import { RESET, sendPatientVerificationEmail } from '../../redux/features/patientapi/patientSlice'

const Notification = () => {

      const dispatch = useDispatch()

      const sendVerEmail = async () =>{
            await dispatch(sendPatientVerificationEmail())
            await dispatch(RESET())

      }
  return (
    <div className=' font-epilogue text-white flex flex-col ns:flex-row'>
       <p>
            <b className='text-red-600'>MESSAGE:</b> &nbsp;
       </p>
       <div className='flex '>
       <p className='whitespace-pre-wrap'>
            To verify your account, check your email for a Verification link.
            &nbsp;<b className='text-green-600 cursor-pointer' onClick={sendVerEmail}>Resend Link</b>
       </p>
      
            
       
       </div>
    </div>
  )
}

export default Notification