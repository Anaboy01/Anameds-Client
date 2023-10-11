import { useSelector } from "react-redux"
import { selectIsLoggedIn, selectPatient } from "../../redux/features/patientapi/patientSlice"
import { selectHospital, selectIsHospitalLoggedIn } from "../../redux/features/hospital/hospitalSlice"
import { selectADoctor, selectIsDoctorLoggedIn } from "../../redux/features/doctors/doctorsSlice"




export const ShowOnLogin = ({children}) => {
      const isLoggedIn = useSelector(selectIsLoggedIn)
      const isDoctorLoggedIn = useSelector(selectIsDoctorLoggedIn)
      const isHospitalLoggedIn = useSelector(selectIsHospitalLoggedIn)

      if(isLoggedIn || isDoctorLoggedIn || isHospitalLoggedIn){
            return <>{children}</>
      }
      return null
}



export const ShowOnLogout = ({children}) => {
      const isLoggedIn = useSelector(selectIsLoggedIn)

      if(!isLoggedIn){
            return <>{children}</>
      }
      return null
}
export const AdminAuthorLink = ({children}) => {
      const isLoggedIn = useSelector(selectIsLoggedIn)

      const patientRole = useSelector(selectPatient)

      if(isLoggedIn && (patientRole?.role === "admin" || patientRole?.role === 'author')){
            return <>{children}</>
      }
      return null
}

export const Patient = ({children}) => {
      const isLoggedIn = useSelector(selectIsLoggedIn)
      const patientRole = useSelector(selectPatient)

      if(isLoggedIn && patientRole?.role === 'patient') {
            return <>{children}</>
      }
      return null;
}
export const Doctor = ({children}) => {
      const isLoggedIn = useSelector(selectIsDoctorLoggedIn)
      const patientRole = useSelector(selectADoctor)

      if(isLoggedIn && patientRole?.role === 'doctor') {
            return <>{children}</>
      }
      return null;
}
export const Hospital = ({children}) => {
      const isLoggedIn = useSelector(selectIsHospitalLoggedIn)
      const patientRole = useSelector(selectHospital)

      if(isLoggedIn && patientRole?.role === 'hospital') {
            return <>{children}</>
      }
      return null;
}