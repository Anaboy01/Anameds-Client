import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const Layout = ({children}) => {
  return (
    <div className='relative sm:-8 bg-[#13131a] min-h-screen flex flex-row'>
      <div className='sm:flex hidden mr-10 relative'>
        <Sidebar/>
      </div>
        
      <div className='px-[10px] pt-[10px] flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5'>
        <Navbar/>
        {children}
      </div>
    </div>
  )
}

export default Layout