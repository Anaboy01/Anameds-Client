import React, { useState } from 'react';
import { RiAddLine, RiDeleteBinLine } from 'react-icons/ri';

function MultiPrescriptionInput({ addPrescriptionsToFormData }) {
  const [prescriptions, setPrescriptions] = useState(['']);

  const addPrescription = () => {
    setPrescriptions([...prescriptions, '']);
    addPrescriptionsToFormData([...prescriptions, '']);
  };

  const handlePrescriptionChange = (index, value) => {
    const newPrescriptions = [...prescriptions];
    newPrescriptions[index] = value;
    setPrescriptions(newPrescriptions);
    addPrescriptionsToFormData(newPrescriptions);
  };

  const removePrescription = (index) => {
    const filteredPrescriptions = prescriptions.filter((_, i) => i !== index);
    setPrescriptions(filteredPrescriptions);
    addPrescriptionsToFormData(filteredPrescriptions);
  };

  return (
    <div className="container mx-auto p-4">
      <div className='flex flex-col gap-[0.4rem]'>
        {prescriptions.map((prescription, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              value={prescription}
              onChange={(e) => handlePrescriptionChange(index, e.target.value)}
              className="border rounded p-2 ns:w-[60%] bg-transparent border"
              placeholder="Enter prescription"
            />
            <button
              onClick={() => removePrescription(index)}
              className="mt-2 bg-transparent text-white px-2 py-1 rounded hover:text-red-700"
            >
              <RiDeleteBinLine /> {/* React Icon for Delete */}
            </button>
          </div>
        ))}
      </div>

      <div
        onClick={addPrescription}
        className="bg-transparent flex justify-center items-center w-7 border p-1 text-white hover:bg-[#1c1c24] rounded cursor-pointer"
      >
        <RiAddLine />
      </div>
    </div>
  );
}

export default MultiPrescriptionInput;
