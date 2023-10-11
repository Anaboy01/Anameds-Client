import React from 'react';
import { useLocation } from 'react-router-dom';
import PatientFileTable from '../../components/patientfile/PatientFileTable';

const AllPatientFiles = () => {
  const location = useLocation();
  const data = location.state && location.state.data;
  console.log(data.patient_files);

  return (
    <div className='font-epilogue text-white flex flex-col gap-3'>
      <div className='bg-[#1c1c24] flex justify-left gap-4  flex-col rounded-[10px] sm-p-10 p-6 text-white font-epilogue'>
        <h1 className='ns:text-lg'><b>Patient Records</b></h1>
        <p>First Name: <span className='text-sm'>{data.name.firstName}</span></p>
        <p>Last Name: <span>{data.name.lastName}</span></p>
      </div>
      {/* Pass the patient_files array as a prop to PatientFileTable with the correct prop name */}
      <PatientFileTable patientFiles={data.patient_files} />
      
    </div>
  );
};

export default AllPatientFiles;
