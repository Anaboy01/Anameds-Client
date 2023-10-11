import React, { useEffect, useState } from 'react';
import PasswordInput from '../../components/Passwordinput';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RESET, loginDoctor } from '../../redux/features/doctors/doctorsSlice';
import { validateEmail } from '../../redux/features/patientapi/patientService';

const initialState = {
      email: "",
      password: "",
    };


const DoctorLogin = () => {

 

  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;

  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isError, twoFactor, isLoading, isLoggedIn, isSuccess} = useSelector(
        (state) => state.doctor
  );

  const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
  };

  const loginDoctors = async (e) =>{
        e.preventDefault();

              if (!email || !password) {
                    return toast.error("All fields are required");
              }
            
              if (!validateEmail(email)) {
                    return toast.error("Please enter a valid email");
              }

        const doctorData = {
              email,
              password,
        };

        // console.log(userData);
        await dispatch(loginDoctor(doctorData));
        //await dispatch(sendVerificationEmail());
  }

  useEffect(() => {
        if (isSuccess && isLoggedIn) {
          navigate("/doctorProfile");
        }

        // if (isError && twoFactor){
        //       dispatch(sendLoginCode(email))
        //       navigate(`/loginCode/${email}`)
        // }
    
  dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate, isError, twoFactor, email]);

  

  // const googleLogin = async (credentialResponse) => {

  //       console.log(credentialResponse)
  //       await dispatch(
  //             loginWithGoogle({userToken: credentialResponse.credential })
  //       )

  // }
  

  return (
    <div className='flex justify-center items-center w-[100vw] h-[100vh] gap-20 bg-[#13131a] font-epilogue'>
    <div className=' bg-[#2c2f32] text-white p-4 rounded-lg w-[100%] shadow-md md:w-[50%] h-auto pb-4 text-center flex flex-col gap-3 items-center '>

        <form onSubmit={loginDoctors} className='bg-[#2c2f32] text-white p-4 rounded-lg w-[100%] shadow-md md:w-[100%] h-auto pb-4 text-center '>

        <h2 className='font-openSan text-2xl mb-[1rem] hidden ns:block'>Your medical records at your finger tips!</h2>
            <p className='mb-[2rem] font-epilogue italic'>Have more control over your own medical records</p>
            <div className=' justify-center items-center flex flex-col gap-[1rem]'>
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                className="w-[80%] ns:w-[50%] mt-2 mb-4 p-2 border-b-[2px] border-gray-600  placeholder-[0.9rem] text-white bg-transparent"
                onChange={handleInputChange}
              />

                  <PasswordInput
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                    
                  />  
            </div>

            <button className='mt-[2rem] ns:mt-[4rem] w-[50%] bg-transparent outline:none  text-white transition-[1s] duration-[ease-in-out] rounded-2xl border-[solid] border-white border-[2px] border-solid text-center p-1 hover:text-[gray] hover:border-[solid] hover:border-[hsl(0,0%,50%,0.4)]'>Sign in</button>


        </form>

        <p> Don't have an account? please &nbsp; 
                  <Link to='/register'>
                      <span className='text-green-900'>Sign up</span>
                  </Link>
        </p>

        <div className='w-[100%] flex items-left justify-between '>
       
                  <Link to='/doctorForgotenPassword'>
                        <span className='text-[royalblue]'>Forgoten Password?</span>
                  </Link>
                  <Link to='/'>
                        <span className='text-[royalblue]'>Home</span>
                  </Link>
        </div>

    </div>

      
    </div>
  );
};

export default DoctorLogin;


