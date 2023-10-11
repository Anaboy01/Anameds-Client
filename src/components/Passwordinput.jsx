import React, { useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

const PasswordInput = ({ placeholder, value, onChange, name, onPaste }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-[80%] ns:w-[50%] flex items-center justify-center border-b-[solid] border-b-[2px] border-gray-600 mb-4">
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        required
        name={name}
        value={value}
        onChange={onChange}
        onPaste={onPaste}
        className=" w-full text-left pl-2 bg-transparent text-white"
      />
      <div className="cursor-pointer mt-1" onClick={togglePassword} onPaste={onPaste}>
        {showPassword ? (
          <AiOutlineEyeInvisible size={20} />
        ) : (
          <AiOutlineEye size={20} />
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
