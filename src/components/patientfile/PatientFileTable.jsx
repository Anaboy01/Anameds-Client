// PatientFileTable.js
import React, { useState } from 'react';
import PatientFile from '../../pages/doctor/PatientFile';

const PatientFileTable = ({ patientFiles }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const openFileDetails = (file) => {
    setSelectedFile(file);
  };

  const closeFileDetails = () => {
    setSelectedFile(null);
  };

  const filterFilesByDate = () => {
    const filteredFiles = patientFiles.filter((file) => {
      const fileDate = new Date(file.createdAt);
  
      if (startDate && endDate) {
        return fileDate >= new Date(startDate) && fileDate <= new Date(endDate);
      } else if (startDate) {
        return fileDate >= new Date(startDate);
      } else if (endDate) {
        return fileDate <= new Date(endDate);
      }
  
      // If no date filter is applied, include the file
      return true;
    });
  
    return filteredFiles;
  };
  

  

  const filteredFiles = filterFilesByDate();
  console.log(filteredFiles)

  return (
    <div className='bg-[#1c1c24] flex justify-left gap-4  flex-col rounded-[10px] sm-p-10 p-6 text-white font-epilogue'>
      <h1>Patient Files:</h1>
      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center justify-center flex-wrap'>
          <label>Start Date: </label>
          <input
            type="date"
            className='border bg-transparent p-1 rounded-md'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className='flex items-center justify-center flex-wrap'>
          <label>End Date: </label>
          <input
            type="date"
            className='border bg-transparent p-1 rounded-md'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button className='border p-1 rounded-md' onClick={() => setStartDate('')}>Clear Dates</button>
      </div>
      <table className="border-collapse bg-[#2c2f32]" border="1">
        <thead>
          <tr className='text-left border-collapse'>
            <th className="border px-4 py-2">File Name</th>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredFiles.map((file) => (
            <tr className='hover:bg-[#1c1c24]' key={file._id} onClick={() => openFileDetails(file)} style={{ cursor: 'pointer' }}>
              <td className='border px-4 py-2'>{file.fileName}</td>
              <td className='border px-4 py-2'>{file._id}</td>
              <td className='border px-4 py-2'>{new Date(file.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedFile ? (
        <div>
          {/* Render the PatientFile component with the selected file data */}
          <PatientFile fileData={selectedFile} />
          <button onClick={closeFileDetails}>Close</button>
        </div>
      ) : null}
    </div>
  );
};

export default PatientFileTable;
