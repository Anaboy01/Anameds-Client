import React, { useEffect, useState } from 'react';
import PasswordInput from '../../components/Passwordinput';
import { Link, useNavigate } from 'react-router-dom';
import { FaTimes } from "react-icons/fa";
import { BsCheck2All } from "react-icons/bs";
import { validateEmail } from '../../redux/features/patientapi/patientService';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../../components';
import LoadingAnimation from '../../components/LoadiingAnimation';
import { RESET, registerDoctor } from '../../redux/features/doctors/doctorsSlice';



const initialState = {
      name: "",
      password: "",
      password2: "",
      email: "",
      phone: "",
      specialty: "",
      licenseNumber: "",
      rank: "",
    };

const RegisterDoctor = () => {
      const [formData, setFormData] = useState(initialState);
      const { name, password, password2, email, phone, specialty, licenseNumber, rank } = formData;

      const dispatch = useDispatch();
      const navigate = useNavigate();

  const { isLoading, isLoggedIn, isSuccess, message } = useSelector(
    (state) => state.doctor
  );

  const [uCase, setUCase] = useState(false);
  const [num, setNum] = useState(false);
  const [sChar, setSChar] = useState(false);
  const [passLength, setPassLength] = useState(false);

  const timesIcon = <FaTimes color="red" size={15} />;
  const checkIcon = <BsCheck2All color="green" size={15} />;

  const switchIcon = (condition) => {
    if (condition) {
      return checkIcon;
    }
    return timesIcon;
  };

  useEffect(() => {
      // Check Lower and Uppercase
      if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
        setUCase(true);
      } else {
        setUCase(false);
      }
      // Check for numbers
      if (password.match(/([0-9])/)) {
        setNum(true);
      } else {
        setNum(false);
      }
      // Check for special character
      if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
        setSChar(true);
      } else {
        setSChar(false);
      }
      // Check for PASSWORD LENGTH
      if (password.length > 5) {
        setPassLength(true);
      } else {
        setPassLength(false);
      }
    }, [password]);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const doctorRegister = async (e) => {
      e.preventDefault();

      if (!name  || !email || !password) {
            return toast.error("All fields are required");
      }
      if (password.length < 6) {
            return toast.error("Password must be up to 6 characters");
      }
      if (!validateEmail(email)) {
            return toast.error("Please enter a valid email");
      }
      if (password !== password2) {
            return toast.error("Passwords do not match");
      }

const doctorData = {
      name,
      password,
      email,
      phone,
      specialty,
      licenseNumber
};

console.log(doctorData);
await dispatch(registerDoctor(doctorData));
// await dispatch(sendVerificationEmail());
    }

//     useEffect(() => {
//       if (isSuccess && isLoggedIn) {
//         navigate("/doctorProfile");
//       }
  
//       dispatch(RESET());
//     }, [isLoggedIn, isSuccess, dispatch, navigate]);

  return (
    <div className='flex  w-[100vw]  gap-20 bg-[#13131a] font-epilogue pt-4'>

    {isLoading && <Loader/>}
    <div className=' bg-[#2c2f32] text-white p-4 rounded-lg w-[100%] shadow-md md:w-[50%] h-auto pb-4 text-center flex flex-col gap-3 items-center '>

    <form onSubmit={doctorRegister}  className=" bg-[#2c2f32] text-white p-4 rounded-lg w-[100%] shadow-md md:w-[100%] h-auto pb-4 text-center ">
            
            <div className=' justify-center items-center flex flex-col gap-[1rem]'>
                  <input
                  type="text"
                  required
                  placeholder="Full Name"
                  name='name'
                  value={name}
                  className="w-[80%] ns:w-[50%] mt-4  p-2  border-b-[2px] border-gray-600   placeholder-[0.9rem]  bg-transparent text-white"
                  onChange={handleInputChange}
                  />

            <input
                  type="text"
                 
                  placeholder="Phone Number"
                  name='phone'
                  value={phone}
                  className="w-[80%] ns:w-[50%] mt-4  p-2  border-b-[2px] border-gray-600   placeholder-[0.9rem]  bg-transparent text-white"
                  onChange={handleInputChange}
            />
 
                

              <input
                type="email"
                placeholder="Email"
                required
                name="email"
               value={email}
                className="w-[80%] ns:w-[50%] mt-2 mb-4 p-2 border-b-[2px] border-gray-600  placeholder-[0.9rem] text-white bg-transparent"
                onChange={handleInputChange}
              />

            <input
                  type="text"
                  
                  placeholder="Specialty"
                  name='specialty'
                  value={specialty}
                  className="w-[80%] ns:w-[50%] mt-4  p-2  border-b-[2px] border-gray-600   placeholder-[0.9rem]  bg-transparent text-white"
                  onChange={handleInputChange}
            />
            <input
                  type="text"
                  
                  placeholder="LicenseNumber"
                  name='licenseNumber'
                  value={licenseNumber}
                  className="w-[80%] ns:w-[50%] mt-4  p-2  border-b-[2px] border-gray-600   placeholder-[0.9rem]  bg-transparent text-white"
                  onChange={handleInputChange}
            />
            <input
                  type="text"
                  required
                  placeholder="Rank"
                  name='rank'
                  value={rank}
                  className="w-[80%] ns:w-[50%] mt-4  p-2  border-b-[2px] border-gray-600   placeholder-[0.9rem]  bg-transparent text-white"
                  onChange={handleInputChange}
            />

                  <PasswordInput
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={handleInputChange}
                  
                  />
                  <PasswordInput 
                  placeholder="Confirm Password"
                  name="password2"
                  value={password2}
                  onChange={handleInputChange}
                  onPaste={(e) => {
                  e.preventDefault();
                  toast.error("Cannot paste into input field");
                  return false;
                  }}
                  />

                <p className='text-[12px]'>Password must have uppercase, numbers and special characters. and should be 6 or more characters</p>

                <div className="flex items-center text-[2px]">
                  <span className={`text-[2px] mr-1 ${uCase ? 'text-green' : 'text-red'}`}>{switchIcon(uCase)}</span>
                  <span className={`mr-1 text-[2px] ${num ? 'text-green' : 'text-red'}`}>{switchIcon(num)}</span>
                  <span className={`mr-1 text-[2px] ${sChar ? 'text-green' : 'text-red'}`}>{switchIcon(sChar)}</span>
                  <span className={`mr-1 text-[2px] ${passLength ? 'text-green' : 'text-red'}`}>{switchIcon(passLength)}</span>
                </div>

            </div>

            <button className='mt-[2rem] ns:mt-[4rem] w-[50%] bg-transparent outline:none  text-white transition-[1s] duration-[ease-in-out] rounded-2xl border-[solid] border-white border-[2px] border-solid text-center p-1 hover:text-[gray] hover:border-[solid] hover:border-[hsl(0,0%,50%,0.4)]'>Register</button>
          
          </form>

          

    </div>

      
    </div>
  );
};

export default RegisterDoctor;


