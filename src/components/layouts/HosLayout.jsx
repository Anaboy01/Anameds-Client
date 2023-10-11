import React from 'react'
import HosSidebar from '../sideBars/HosSidebar'
import HosNavbar from '../navBars/HosNavbar'

const HosLayout = ({children}) => {
  return (
      <div className='relative sm:-8 bg-[#13131a] min-h-screen flex flex-row'>
      <div className='sm:flex hidden mr-10 relative'>
        <HosSidebar/>
      </div>
        
      <div className='px-[10px] pt-[10px] flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5'>
        <HosNavbar/>
        {children}
      </div>
    </div>
  )
}

export default HosLayout