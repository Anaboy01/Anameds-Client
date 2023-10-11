import React from 'react'
import { loader } from '../assets'



const Loader = () => {
  return (
    <div className='fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col'>
      <h1 className='text-yellow-600 font-openSan text-4xl'>ANA<span className='text-green-700'>Meds</span></h1>
      <img src={loader} alt="loader" className='w-[100px] h-[100px] object-contain ' />
    </div>
  )
}

export default Loader