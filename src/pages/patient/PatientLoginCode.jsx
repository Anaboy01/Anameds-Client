import React, { useEffect, useState } from 'react'
import { GrInsecure } from 'react-icons/gr'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RESET, loginPatientWithCode } from '../../redux/features/patientapi/patientSlice';
import { toast } from 'react-toastify';




const PatientLoginCode = () => {

  const [loginCode, setLoginCode] = useState('')

  const {email} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isLoading, isLoggedIn, isSuccess} = useSelector(
    (state) => state.patient
    );

  
    const loginUserWithCode = async (e) =>{
      e.preventDefault()
      if (loginCode === '') {
            return toast.error("Please fill in the login code");
      }
      if (loginCode.length !== 6) {
            return toast.error("Access code must be 6 characters");
      }

      const code = {
            loginCode
      }
      await dispatch(loginPatientWithCode({code, email}))
    }

    useEffect(() => {
        if (isSuccess && isLoggedIn) {
          navigate("/patientProfile");
        }

        

      dispatch(RESET());
    }, [isLoggedIn, isSuccess, dispatch, navigate]);

  
  return (
    <div className='flex justify-center items-center w-[100vw] h-[100vh] gap-20 bg-[#13131a] font-epilogue'>
      <div className=' bg-[#2c2f32] text-white p-4 rounded-lg w-[100%] shadow-md md:w-[50%] h-auto pb-4 text-center flex flex-col gap-3 items-center font-epilogue '>
        <div className='text-white'>
                      <GrInsecure size={35} />

        </div>
        <h2>Enter Login Code</h2>
        <form onSubmit={loginUserWithCode}  className='bg-[#2c2f32] text-white p-4 rounded-lg w-[100%] shadow-md md:w-[100%] h-auto pb-4 text-center '>


          <div className=' justify-center items-center flex flex-col gap-[1rem]'>
            <input
              type="text"
              placeholder="Login Code"
              required
              name="loginCode"
              value={loginCode}
              onChange={(e) => setLoginCode(e.target.value)}
              className="w-[80%] ns:w-[50%] mt-2 mb-4 p-2 border-b-[2px] border-gray-600  placeholder-[0.9rem] text-white bg-transparent text-center"
              
            />
          </div>

          <div className='flex flex-col items-center gap-1 gap'>
            <button className='mt-[2rem] ns:mt-[4rem] w-[50%] bg-transparent outline:none  text-white transition-[1s] duration-[ease-in-out] rounded-2xl border-[solid] border-white border-[2px] border-solid text-center p-1 hover:text-[gray] hover:border-[solid] hover:border-[hsl(0,0%,50%,0.4)]'>Proceed to Login</button>

            <span className='text-gray-400 text-sm'>
                    Check your email for login access code
            </span>
          </div>


        </form>

        <div className='flex justify-between w-full items-center'>
                <p className='text-blue-600'><Link to='/'>- Home</Link> </p>
          
                <p  className='cursor-pointer text-green-500'> <b>Resend Code</b></p>
        </div>
      </div>
      
    </div>
  )
}

export default PatientLoginCode