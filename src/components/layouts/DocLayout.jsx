import React from 'react'
import DocSidebar from '../sideBars/DocSidebar'
import DocNavbar from '../navBars/DocNavBar'


const DocLayout = ({children}) => {
  return (
    <div className='relative sm:-8 bg-[#13131a] min-h-screen flex flex-row'>
      <div className='sm:flex hidden mr-10 relative'>
        <DocSidebar/>
      </div>
        
      <div className='px-[10px] pt-[10px] flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5'>
        <DocNavbar/>
        {children}
      </div>
    </div>
  )
}

export default DocLayout