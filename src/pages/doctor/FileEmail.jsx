import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const FileEmail = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Navigate to a new page with the email as a route parameter
    navigate(`/createFile/${email}`);
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
            onChange={handleEmailChange}
            className="w-[80%] ns:w-[50%] mt-2 mb-4 p-2 border-b-[2px] border-gray-600  placeholder-[0.9rem] text-white bg-transparent"
          />
        </div>
        <button
          type="submit"
          className='mt-[2rem] ns:mt-[4rem] w-[50%] bg-transparent outline:none  text-white transition-[1s] duration-[ease-in-out] rounded-2xl border-[solid] border-white border-[2px] border-solid text-center p-1 hover:text-[gray] hover:border-[solid] hover:border-[hsl(0,0%,50%,0.4)]'
        >
          Create Form
        </button>
      </form>
    </div>
  );
};

export default FileEmail;
