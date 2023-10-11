import React from 'react'
import { Link } from 'react-router-dom'

const Signin = () => {
  return (
    <div className='flex justify-center items-center w-[100vw] h-[100vh] gap-20 bg-[#13131a] font-epilogue'>
      <div className=' bg-[#2c2f32] text-white p-4 rounded-lg w-[100%] shadow-md md:w-[50%] h-auto pb-4 text-center flex flex-col gap-3 items-center '>

            <div className='flex flex-col w-[100%] items-center  gap-6'>
                  <Link to='patient' className='w-[100%]'>
                        <button className='w-[50%]  bg-transparent outline:none  text-white transition-[1s] duration-[ease-in-out] rounded-2xl border-[solid] border-white border-[2px] border-solid text-center p-1 hover:text-[gray] hover:border-[solid] hover:border-[hsl(0,0%,50%,0.4)]'>Patient</button>
                  </Link>

                  <Link to='hospital' className='w-[100%]'>
                        <button className=' w-[50%] bg-transparent outline:none  text-white transition-[1s] duration-[ease-in-out] rounded-2xl border-[solid] border-white border-[2px] border-solid text-center p-1 hover:text-[gray] hover:border-[solid] hover:border-[hsl(0,0%,50%,0.4)]'>Hospital</button>
                  </Link>
            </div>
            <div className='mt-9'>
                  <p>Already have an account? Please <Link to='/signin'><span className='text-green-700'>Sign in</span></Link></p>
            </div>
            <div className='w-[100%] flex items-left justify-end '>
                  <Link to='/'>
                        <span className='text-[royalblue]'>Home</span>
                  </Link>
            </div>
      </div>
    </div>
  )
}

export default Signin