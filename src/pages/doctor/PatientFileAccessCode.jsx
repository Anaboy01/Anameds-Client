import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { accessPatientDataWithCode, RESET } from '../../redux/features/patientapi/patientSlice';
import { GrInsecure } from 'react-icons/gr';
import { toast } from 'react-toastify';

const PatientFileAccessCode = () => {
  const [accessCode, setAccessCode] = useState('');

  const { email } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSuccess, isLoggedIn } = useSelector((state) => state.patient);

  const fileAccess = async (e) => {
    e.preventDefault();
    if (accessCode === '') {
      return toast.error('Please fill in the login code');
    }
    

    const code = {
      accessCode,
    };

    // Dispatch the action and wait for it to complete
    const actionResult = await dispatch(accessPatientDataWithCode({ code, email }));

    // Check if the action was successful before navigating
    if (accessPatientDataWithCode.fulfilled.match(actionResult)) {
      navigate('/AllPatientFiles', { state: { data: actionResult.payload } });

    }
  };

  useEffect(() => {
    // Remove the navigation logic from here
    dispatch(RESET());
  }, [dispatch]);

  return (
    <div className='flex  flex-col w-[100vw] h-[100vh] gap-20 bg-[#13131a] font-epilogue'>
      <div className=' bg-[#2c2f32] text-white p-4 rounded-lg w-[100%] shadow-md md:w-[50%] h-auto pb-4 text-center flex flex-col gap-3 items-center font-epilogue '>
        <div className='text-white'>
          <GrInsecure size={35} />
        </div>
        <h2>Enter Login Code</h2>
        <form
          onSubmit={fileAccess}
          className='bg-[#2c2f32] text-white p-4 rounded-lg w-[100%] shadow-md md:w-[100%] h-auto pb-4 text-center '
        >
          <div className=' justify-center items-center flex flex-col gap-[1rem]'>
            <input
              type='text'
              placeholder='Login Code'
              required
              name='accessCode'
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              className='w-[80%] ns:w-[50%] mt-2 mb-4 p-2 border-b-[2px] border-gray-600  placeholder-[0.9rem] text-white bg-transparent text-center'
            />
          </div>

          <div className='flex flex-col items-center gap-1 gap'>
            <button className='mt-[2rem] ns:mt-[4rem] w-[50%] bg-transparent outline:none  text-white transition-[1s] duration-[ease-in-out] rounded-2xl border-[solid] border-white border-[2px] border-solid text-center p-1 hover:text-[gray] hover:border-[solid] hover:border-[hsl(0,0%,50%,0.4)]'>
               Patient Records
            </button>

            <span className='text-gray-400 text-sm'>
              Input the Access code sent to the patient Email
            </span>
          </div>
        </form>

       
      </div>
    </div>
  );
};

export default PatientFileAccessCode;
