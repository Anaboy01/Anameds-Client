import React from 'react';
import { useLocation } from 'react-router-dom';
import PatientFileTable from '../../components/patientfile/PatientFileTable';

const CreatedFiles = () => {
  const location = useLocation();
  const data = location.state && location.state.data;
  console.log(data.patientFiles);

  return (
    <div className='font-epilogue text-white flex flex-col gap-3'>
      
      {/* Pass the patient_files array as a prop to PatientFileTable with the correct prop name */}
      <PatientFileTable patientFiles={data.patientFiles} />
      
    </div>
  );
};

export default CreatedFiles;
