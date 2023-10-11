import React from 'react';
import { useLocation } from 'react-router-dom';
import PatientFileTable from '../../components/patientfile/PatientFileTable';

const YourRecords = () => {
      const location = useLocation();
      const queryParams = new URLSearchParams(location.search);
      const encodedPatientData = queryParams.get('patientData');
       // Decode the patient data
  const data = JSON.parse(decodeURIComponent(encodedPatientData));
//   console.log(encodedPatientData)

  return (
    <div className='font-epilogue text-white flex flex-col gap-3'>
      
      {/* Pass the patient_files array as a prop to PatientFileTable with the correct prop name */}
      <PatientFileTable patientFiles={data.patient_files} />
      
    </div>
  );
};

export default YourRecords;
