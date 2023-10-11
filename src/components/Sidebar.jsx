import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logo, sun, logoutLogo } from '../assets'
import { doctorNavlinks, hospitalNavlinks, navlinks } from '../constants'
import { Doctor, Hospital, Patient, ShowOnLogin } from './protect/hiddenLink'
import { useDispatch, useSelector } from 'react-redux'
import { getPatient, logout } from '../redux/features/patientapi/patientSlice'
import { getDoctor, logoutDoctor } from '../redux/features/doctors/doctorsSlice'
import { HOSPITALRESET, logoutHospital } from '../redux/features/hospital/hospitalSlice'
import {RESET as DOCTOR_RESET } from '../redux/features/doctors/doctorsSlice'
import {RESET as PATIENT_RESET} from '../redux/features/patientapi/patientSlice'


const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
      <div className={`w-[48px] h-[48px] rounded-[10px] ${isActive && isActive === name && 'bg-[#2c2f32]'} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`} onClick={handleClick}>
        {!isActive ? (
          <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
        ) : (
          <img src={imgUrl} alt="fund_logo" className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`} />
        )}
      </div>
    )
    

    
    const Sidebar = () => {
      const userRole = useSelector((state) => state.doctor?.role);
      const dispatch = useDispatch()
      const navigate = useNavigate()
      // useEffect(() => {
      //       dispatch(getPatient())
      //       dispatch(getDoctor())
      //       dispatch(getHospital())
      // })
      const [isActive, setIsActive] = useState('dashboard')

      const logoutDoctors = async () => {
            dispatch(DOCTOR_RESET());
            await dispatch(logoutDoctor());
            navigate('/signin');
          };

          const logoutHospitals = async () => {
            dispatch(HOSPITALRESET());
            await dispatch(logoutHospital());
            navigate('/signin');
          };

          const logoutPatient = async () => {
            dispatch(PATIENT_RESET());
            await dispatch(logout());
            navigate('/signin');
          };

  return (
      <ShowOnLogin>
                  <div className='flex justify-between items-center flex-col sticky top-5 h-[93vh]'>
                        {/* <Link to='/'>
                              <Icon styles='w-[52px] h-[52px] bg-[#2c2f32]' imgUrl={logo} />
                              <img src={logo} alt="" className='h-[70px] w' />
                        </Link> */}
                        <div></div>
                        <div className='flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12 ' >
                                    <Patient>
                                          <div className="flex flex-col justify-center items-center gap-3">
                                                {navlinks.map((link) => (
                                                      <Icon
                                                      key={link.name}
                                                      {...link}
                                                      isActive={isActive}
                                                      handleClick={() => {
                                                      if (!link.disabled) {
                                                            setIsActive(link.name);
                                                            navigate(link.link);
                                                      }
                                                      }}
                                                      />
                                                ))}

                                                <Icon
                                                                  styles="bg-[#1c1c24] shadow-secondary"
                                                                  imgUrl={logoutLogo}
                                                                  handleClick={logoutPatient}
                                                />
                                          </div>
                                    </Patient>
                                    <Doctor>
                                          <div className='flex flex-col justify-center items-center gap-3'>
                                                {doctorNavlinks.map((link) =>(
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
                                                            handleClick={logoutDoctors}
                                                />
                                          </div>
                                    </Doctor>
                                    <Hospital>
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
                                    </Hospital>
                             

                              <Icon styles='bg-[#1c1c24] shadow-secondary' imgUrl={sun} />
                        </div>
                  </div>
      </ShowOnLogin>
  )
}

export default Sidebar