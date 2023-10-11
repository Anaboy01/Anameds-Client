import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { requestAccessToPatientData } from '../../redux/features/patientapi/patientSlice';

const initialState = {
  email: "",
};

const RequestAPatientFile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(initialState);
  const { email } = formData;

  const { isError, twoFactor, isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.patient
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Pass the email as a payload to the action
    await dispatch(requestAccessToPatientData({ email }));

    navigate(`/accessFile/${email}`);
  };

  

  return (
    <div className=' bg-[#2c2f32] text-white p-4 rounded-lg w-[100%] shadow-md h-auto pb-4 text-center flex flex-col gap-3 items-center '>
      <form
        onSubmit={handleSubmit}
        className='bg-[#2c2f32] text-white p-4 rounded-lg w-[100%] shadow-md md:w-[100%] h-auto pb-4 text-center '
      >
        <div className='justify-center items-center flex flex-col gap-[1rem]'>
          <input
            type="email"
            placeholder="Email"
            required
            name="email"
            value={email}
            onChange={handleInputChange}
            className="w-[80%] ns:w-[50%] mt-2 mb-4 p-2 border-b-[2px] border-gray-600  placeholder-[0.9rem] text-white bg-transparent"
          />
        </div>
        <button
          type="submit"
          className='mt-[2rem] ns:mt-[4rem] w-[50%] bg-transparent outline:none  text-white transition-[1s] duration-[ease-in-out] rounded-2xl border-[solid] border-white border-[2px] border-solid text-center p-1 hover:text-[gray] hover:border-[solid] hover:border-[hsl(0,0%,50%,0.4)]'
        >
          Send Request
        </button>
      </form>
    </div>
  );
};

export default RequestAPatientFile;
