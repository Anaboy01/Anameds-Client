import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import CustomButton from '../CustomButton'
import { logo, menu, search, thirdweb } from '../../assets'
import { doctorNavlinks } from '../../constants'
import { useStateContext } from '../../context'






const DocNavbar = () => {
      const navigate = useNavigate();
      const [isActive, setIsActive] = useState('dashboard')
      const [toggleDrawer, setToggleDrawer] = useState(false)

      
      const {connect, address} = useStateContext()


  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
            <div  className=" flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#13131a] rounded-[100px]">
            <nav className=' text-white items-center justify-center gap-8 hidden md:flex '>
                  <NavLink>
                        Home
                  </NavLink>
                  <NavLink>
                        Home
                  </NavLink>
                  <NavLink>
                        Home
                  </NavLink>
            </nav>
           

            </div> 
           
            
      <div className='sm:flex hidden flex-row justify-end gap-4'>
      {/* <CustomButton 
            btnType='button'
            title={address ? 'Create a Campaign' : 'Connect'}
            styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
            handleClick={() => {
                  if(address) navigate('create-campaign')
                  else connect()
            }}

      /> */}

                  <CustomButton
                        btnType='button'
                        title={address ? 'Connected' : 'Connect MetaMask'}
                        styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
                        handleClick={() => {
                        connect()
                        }}
                  />


      <Link to='/profile'>
            <div className='w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer '>
                  <img src={logo} alt='user' className='w-[100%] h-[100%] object-contain  rounded-full ' />
            </div>
      </Link>

      </div>

      {/* Small screen Nav */}

      <div className='sm:hidden flex justify-between items-center relative'>
            <div className='w-[40px] h-[40px] rounded-[10px] bg-[#13131a] flex justify-center items-center cursor-pointer '>
                        <img src={thirdweb} alt='user' className='w-[60%] h-[60%] object-contain ' />
            </div>

            <img 
                  src={menu}
                  alt='menu'
                  className='w-[34px] h-[34px] object-contain cursor-pointer'
                  onClick={() => setToggleDrawer((prev) => !prev)}
            />

            <div className={`absolute top-[60px] right-0 left-0 bg-[#13131a] z-10 shadow-secondary py-4 ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'} transition-all duration-700`}>
                  <ul className='mb-4'>
                        {doctorNavlinks.map((link) => (
                              <li key={link.name}
                              className={` flex p-4 ${isActive === link.name && 'bg-[#3a3a43]' }`}
                              onClick={() => {
                                    setIsActive(link.name);
                                    setToggleDrawer(false)
                                    navigate(link.link)
                              }}>
                              <img 
                              src={link.imgUrl}
                              alt={link.name}
                              className={`w-[24px] h-[24px] object-contain ${isActive === link.name ? 'grayscale-0' : 'grayscale' } `}

                              />
                              <p className={`ml-[20px] font-epilogue font-semibold text-[14px] ${isActive === link.name ? 'text-[#1dc071]' : 'text-[#808191]' } `}>{link.name}</p>
                              </li>
                        ))}
                  </ul>

                  <div className='flex mx-4'>
                  <CustomButton 
                        btnType='button'
                        title={address ? 'Create a Campaign' : 'Connect'}
                        styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
                        handleClick={() => {
                              if(address) navigate('create-campaign')
                              else connect()
                        }}

                  />
                  </div>
            </div>


      </div>
    </div>
  )
}

export default DocNavbar