import React, { useEffect, useState } from 'react';
import PasswordInput from '../../components/Passwordinput';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HOSPITALRESET, registerHospital } from '../../redux/features/hospital/hospitalSlice';
import { FaTimes } from 'react-icons/fa';
import { BsCheck2All } from 'react-icons/bs';
import { validateEmail } from '../../redux/features/patientapi/patientService';

const initialState = {
      name: "",
      description:"",
      phone:"",
      website:"",
      city:"",
      country:"",
      state:"",
      email: "",
      password: "",
      password2: "",
    };


const HospitalRegister = () => {

      const [formData, setFormData] = useState(initialState);
      const { name, description, phone, website, city, country, state, email, password,password2} = formData;

      const dispatch = useDispatch();
      const navigate = useNavigate();

  const { isLoading, isLoggedIn, isSuccess, message } = useSelector(
    (state) => state.hospital
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

    const registerAnHospital = async (e) => {
      e.preventDefault();

      if (!name || !email || !password) {
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

const hospitalData = {
      name, email, password, state, city, country, phone, website, description
};

console.log(hospitalData);
await dispatch(registerHospital(hospitalData));
// await dispatch(sendVerificationEmail());
    }

    useEffect(() => {
      if (isSuccess && isLoggedIn) {
        navigate("/hospitalProfile");
      }
  
      dispatch(HOSPITALRESET());
    }, [isLoggedIn, isSuccess, dispatch, navigate]);
  

  return (
    <div className='flex justify-center items-center w-[100vw]  gap-20 bg-[#13131a] font-epilogue pt-4'>
    <div className=' bg-[#2c2f32] text-white p-4 rounded-lg w-[100%] shadow-md md:w-[50%] h-auto pb-4 text-center flex flex-col gap-3 items-center '>

    <form onSubmit={registerAnHospital}  className=" bg-[#2c2f32] text-white p-4 rounded-lg w-[100%] shadow-md md:w-[100%] h-auto pb-4 text-center ">
            <h2 className='font-openSan text-2xl mb-[1rem] hidden ns:block'>Your medical records at your finger tips!</h2>
            <p className='mb-[2rem] font-epilogue italic'>Have more control over your own medical records</p>
            <div className=' justify-center items-center flex flex-col gap-[1rem]'>
                  <input
                  type="text"
                  required
                  placeholder="Hospital Name"
                  name='name'
                  value={name}
                  className="w-[80%] ns:w-[50%] mt-4  p-2  border-b-[2px] border-gray-600   placeholder-[0.9rem]  bg-transparent text-white"
                  onChange={handleInputChange}
                  />

            <input
                  type="text"
                  required
                  placeholder="Description"
                  name='description'
                  value={description}
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
                  required
                  placeholder="Phone Number"
                  name='phone'
                  value={phone}
                  className="w-[80%] ns:w-[50%] mt-4  p-2  border-b-[2px] border-gray-600   placeholder-[0.9rem]  bg-transparent text-white"
                  onChange={handleInputChange}
            />

            <input
                  type="text"
                  required
                  placeholder="Website"
                  name='website'
                  value={website}
                  className="w-[80%] ns:w-[50%] mt-4  p-2  border-b-[2px] border-gray-600   placeholder-[0.9rem]  bg-transparent text-white"
                  onChange={handleInputChange}
            />

            <input
                  type="text"
                  required
                  placeholder="City"
                  name='city'
                  value={city}
                  className="w-[80%] ns:w-[50%] mt-4  p-2  border-b-[2px] border-gray-600   placeholder-[0.9rem]  bg-transparent text-white"
                  onChange={handleInputChange}
            />

            <input
                  type="text"
                  required
                  placeholder="State"
                  name='state'
                  value={state}
                  className="w-[80%] ns:w-[50%] mt-4  p-2  border-b-[2px] border-gray-600   placeholder-[0.9rem]  bg-transparent text-white"
                  onChange={handleInputChange}
            />

            <input
                  type="text"
                  required
                  placeholder="Country"
                  name='country'
                  value={country}
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

          <p> Already have an account? Please &nbsp; 
                  <Link to='/signin'>
                      <span className='text-green-900'>Sign in</span>
                  </Link>
        </p>

        <div className='w-[100%] flex items-left justify-end '>
                  <Link to='/'>
                        <span className='text-[royalblue]'>Home</span>
                  </Link>
        </div>

    </div>

      
    </div>
  );
};

export default HospitalRegister;


