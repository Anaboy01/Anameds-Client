import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

function TestField({ onInputChange }) {
  const [fields, setFields] = useState([{ test: '', testResults: '' }]);

  const addField = () => {
    setFields([...fields, { test: '', testResults: '' }]);
  };

  const handleFieldChange = (index, field, value) => {
    const newFields = [...fields]; // Create a shallow copy of the fields array
    newFields[index][field] = value; // Update the specified field in the copied object
    setFields(newFields);
  
    // Pass the updated fields to the parent component
    onInputChange(newFields);
  };
  

  const removeField = (index) => {
    const newFields = [...fields]; // Create a shallow copy of the fields array
    newFields.splice(index, 1); // Remove the specified index from the copied array
    setFields(newFields);

    // Pass the updated fields to the parent component
    onInputChange(newFields);
  };

  return (
    <div className='flex flex-col items-center'>
      {fields.map((field, index) => (
        <div key={index} className="flex items-center  first-line:  rounded w-[80%] ">
          <input
            type="text"
            placeholder="Test"
            className=" border-2 bg-transparent rounded-l-md  outline-none p-1 w-1/2"
            value={field.test}
            onChange={(e) => handleFieldChange(index, 'test', e.target.value)}
          />
          <input
            type="text"
            placeholder="Test Result"
            className="border-2 outline-none bg-transparent p-1 rounded-r-md w-1/2"
            value={field.testResults}
            onChange={(e) => handleFieldChange(index, 'testResults', e.target.value)}
          />
          <button
            onClick={() => removeField(index)}
            className="mt-2 bg-transparent text-white px-2 py-1 rounded hover:text-red-700"
          >
            <FaTrash />
          </button>
        </div>
      ))}

      <div
        onClick={addField}
        className="bg-transparent  text-white px-4 py-2  transition-[1s] duration-[ease-in-out] rounded-2xl border-[solid] border-white border-[2px] border-solid text-center p-1 hover:text-[gray] hover:border-[solid] hover:border-[hsl(0,0%,50%,0.4)] mt-4 cursor-pointer"
      >
        Add Field
      </div>
    </div>
  );
}

export default TestField;
