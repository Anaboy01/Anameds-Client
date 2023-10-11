import React from 'react';
import ImageCard from '../../components/patientFolder/ImageCard';
import VideoCard from '../../components/patientFolder/VideoCard';

const PatientFile = ({ fileData }) => {
  return (
    <div className='bg-[#1c1c24] flex justify-left gap-4  flex-col rounded-[10px] sm-p-10 p-6 text-white font-epilogue'>

      <div className='bg-[#2c2f32] p-4 rounded-md gap-4 flex flex-col ns:flex-row justify-around ns:items-center'>
       
        
          <div>
            <p>{fileData.hospitalName}</p>
            <span className='text-sm opacity-50'>{fileData.hospitalId}</span>
          </div>
          <div>
            <p>{fileData.doctorName}</p>
            <span className='text-sm opacity-50'>{fileData.doctorId}</span>
          </div>
        
      </div>

      <div className='bg-[#2c2f32] p-4 rounded-md '>
        <p>File Name</p>
        <small>{fileData.fileName}</small>
      </div>

      <div className='bg-[#2c2f32] p-2 rounded-md'>
        <h4 className='mb-3'>Tests Made</h4>
        <table className="border-collapse">
          <tr>
            <th className="border px-4 py-2">
              Tests
            </th>
            <th className="border px-4 py-2">
              Results
            </th>
          </tr>
          {fileData.tests.map((testData, index) => (
            <tr key={index}>
              <td className='border px-4 py-2'>
                {testData.test}
              </td>
              <td className='border px-4 py-2'>
                {testData.testResults}
              </td>
            </tr>
          ))}
        </table>
      </div>

      <div className='bg-[#2c2f32] p-2 rounded-md'>
        <h4 className='mb-3'>Prescription:</h4>
        <ul>
          {fileData.prescriptions.map((prescription, index) => (
            <li key={index}>{prescription}</li>
          ))}
        </ul>
      </div>

      <div className='bg-[#2c2f32] p-4 rounded-md'>
        <h4 className='mb-3'>Diagnosis:</h4>
        <p>{fileData.diagnosis}</p>
      </div>

      <div className='bg-[#2c2f32] p-4 rounded-md'>
        <h4 className='mb-3'>Note:</h4>
        <p className='break-all'>{fileData.note}</p>
      </div>

      <div className='bg-[#2c2f32] p-4 rounded-md'>
        <ImageCard imageUrls={fileData.images} />
      </div>

      <div className='bg-[#2c2f32] p-4 rounded-md'>
        <VideoCard videoUrls={fileData.videos} />
      </div>
    </div>
  );
}

export default PatientFile;
