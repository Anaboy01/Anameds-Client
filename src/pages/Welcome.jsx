import React from 'react';
import { nurse } from '../assets';
import { Link } from 'react-router-dom';


function Welcome() {
  return (
    
         <div className='flex justify-between items-center w-full  h-[80vh] gap-10 bg-[#13131a] font-epilogue'>
            <img src={nurse} alt="" className='h-[40%] lg:h-[100%] hidden sm:block' />
            <div className='flex flex-col justify-around h-[100%] px-[1rem] sm:pr-[5rem]'>
                 <div className='flex flex-col gap-[4rem]'>
                        <h1 className='text-[#1dc071] font-openSan text-5xl'>ANA<span className='text-yellow-600'>Meds</span></h1>
                       <div> 
                              <p className='text-white tracking-[1px] mb-[1rem]'>
                                    Effortlessly manage your records, ensure accessibility. Create an account and get started now!</p>
                              <button className='w-[100%] sm:w-[50%] h-8 bg-transparent outline:none text-white transition-[1s] duration-[ease-in-out] rounded-2xl border-[solid] border-white border-[2px] border-solid text-center p-[2px] hover:text-[gray] hover:border-[solid] hover:border-[hsl(0,0%,50%,0.4)]'>Create an account</button>
                        </div>
                        <div>
                              <p className=' tracking-[1px] text-white font-epilogue'>Join us in making a difference today!. Click <Link to='/'><span className='text-[#12e17d]'>Patient-funding</span></Link> to Help fund patients in need without the hassle of creating an account. Your generosity can change lives today</p>
                        </div>
                  </div>

                  <div className='w-full flex flex-col justify-around'>
                        <p className=' tracking-[1px] text-white mb-[1rem]'>already have an account?</p>
                       <Link to='/signin'>
                       <button className='w-[50%] sm:w-[30%] h-8 bg-transparent outline:none text-white transition-[1s] duration-[ease-in-out] rounded-2xl border-[solid] border-white border-[2px] border-solid hover:text-[gray] hover:border-[solid] hover:border-[hsl(0,0%,50%,0.4)]'>Sign in</button>
                       </Link>
                        
                  </div>

                  
            </div>

            
            </div>
    
  );
}

export default Welcome;
