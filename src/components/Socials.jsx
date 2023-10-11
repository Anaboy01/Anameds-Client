import React from 'react';

import {FaDiscord, FaInstagram, FaTwitter, FaGithub} from 'react-icons/fa'
import { Link } from 'react-router-dom';


function Socials() {
  return (
    <div className='flex flex-col gap-[0.5em]'>
      <div className='flex flex-row gap-[0.5em]'>
        <button className='w-[90px] h-[90px] shadow-[rgba(50,50,93,0.25)_0px_2px_5px_-1px,rgba(0,0,0,0.3)_0px_1px_3px_-1px] transition-[0.4s] duration-[ease-in-out] rounded-[90px_5px_5px_5px] border-[none] hover:cursor-pointer hover:bg-[#cc39a4] outline-none  bg-white hover:scale-[1.1] group'>
          <FaInstagram  fillRule="nonzero" className=' fill-[#cc39a4] text-[2rem] ml-[1.2em] mt-[1.5em] group-hover:fill-white'/>
        </button>
        <button className='w-[90px] h-[90px] shadow-[rgba(50,50,93,0.25)_0px_2px_5px_-1px,rgba(0,0,0,0.3)_0px_1px_3px_-1px] transition-[0.4s] duration-[ease-in-out] rounded-[5px_90px_5px_5px] border-[none] hover:cursor-pointer hover:bg-[#03A9F4] outline-none bg-white hover:scale-[1.1] group'>
          <FaTwitter  className='ml-[0.5em] fill-[#03A9F4] text-[2rem] mt-[1.5em] group-hover:fill-white'/>
        </button>
      </div>
      <div className=' flex flex-row gap-[0.5em]'>
        <Link to='https://github.com/Anaboy01' target='_blank'>
        <button className='  @apply w-[90px] h-[90px] shadow-[rgba(50,50,93,0.25)_0px_2px_5px_-1px,rgba(0,0,0,0.3)_0px_1px_3px_-1px] transition-[0.4s] duration-[ease-in-out] rounded-[5px_5px_5px_90px] border-[none] hover:cursor-pointer hover:bg-[black] outline-none bg-white hover:scale-[1.1] group '>
          <FaGithub   className=' mt-[-2.5rem] text-[2rem] ml-[1.2em] group-hover:fill-white '/>
        </button>
        </Link>
        <button className=' w-[90px] h-[90px] shadow-[rgba(50,50,93,0.25)_0px_2px_5px_-1px,rgba(0,0,0,0.3)_0px_1px_3px_-1px] transition-[0.4s] duration-[ease-in-out] rounded-[5px_5px_90px_5px] border-[none] hover:cursor-pointer hover:bg-[#8c9eff] outline-none bg-white hover:scale-[1.1] group'>
          <FaDiscord className='mt-[-2.5rem] ml-[0.5em] fill-[#8c9eff] text-[2rem]  group-hover:fill-white ' />
        </button>
      </div>
    </div>
  );
}

export default Socials;
