import React from 'react';
import { Link } from 'react-router-dom';

const PatientIconCard = ({ icon, content, to, patientData }) => {

      const encodedPatientData = encodeURIComponent(JSON.stringify(patientData));
  return (
    <div className='bg-[#2c2f32] p-4 rounded-md'>
      <Link to={`${to}?patientData=${encodedPatientData}`} className="bg-[#2c2f32] flex flex-col items-center justify-center  shadow-lg rounded-lg p-3 gap-3">
        <div className='flex items-center flex-col gap-2 p-2'>
          <div className="text-3xl ns: text-white ">{icon}</div>
          <div className="text-gray-600 whitespace-pre-wrap">{content}</div>
        </div>
      </Link>
      {/* Use patientData as needed in this component */}
    </div>
  );
};

export default PatientIconCard;
