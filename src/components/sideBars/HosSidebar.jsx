import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logo, sun, logoutLogo } from '../../assets'
import { hospitalNavlinks } from '../../constants'
import { useDispatch } from 'react-redux'
import { HOSPITALRESET, logoutHospital } from '../../redux/features/hospital/hospitalSlice'

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
      <div className={`w-[48px] h-[48px] rounded-[10px] ${isActive && isActive === name && 'bg-[#2c2f32]'} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`} onClick={handleClick}>
        {!isActive ? (
          <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
        ) : (
          <img src={imgUrl} alt="fund_logo" className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`} />
        )}
      </div>
    )


    
const HosSidebar = () => {

      const navigate = useNavigate()
      const [isActive, setIsActive] = useState('dashboard')
      const dispatch = useDispatch()

      const logoutHospitals = async () => {
            dispatch(HOSPITALRESET());
            await dispatch(logoutHospital());
            navigate('/signin/hospitalLogin');
          };
  return (
    <div className='flex justify-between items-center flex-col sticky top-5 h-[93vh]'>
      <Link to='/'>
            {/* <Icon styles='w-[52px] h-[52px] bg-[#2c2f32]' imgUrl={logo} /> */}
            <img src={logo} alt="" className='h-[70px] w' />
      </Link>
      <div className='flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12 ' >
            <div className='flex flex-col justify-center items-center gap-3'>
                  {hospitalNavlinks.map((link) =>(
                        <Icon key={link.name} {...link}
                        isActive={isActive}
                        handleClick={() => {
                              if(!link.disabled){
                                    setIsActive(link.name);
                                    navigate(link.link)
                              }
                        }} />
                  ))}

            <Icon
                        styles="bg-[#1c1c24] shadow-secondary"
                        imgUrl={logoutLogo}
                        handleClick={logoutHospitals}
            />
            </div>


            <Icon styles='bg-[#1c1c24] shadow-secondary' imgUrl={sun} />
      </div>
    </div>
  )
}

export default HosSidebar