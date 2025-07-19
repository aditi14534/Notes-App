import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const PasswordInput = ({
  value,
  onChange,
  placeholder = "Password",
  className = "",
}) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <div
      className={`w-full flex items-center px-2 py-2 bg-gray-50 border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-blue-500/30 focus-within:border-blue-500 transition duration-200 hover:border-gray-300 hover:bg-white ${className}`}
    >
      <input
        type={isShowPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent text-[12px] text-gray-800 placeholder-gray-500 outline-none"
      />
      <button
        type="button"
        onClick={() => setIsShowPassword(!isShowPassword)}
        className="text-gray-400 hover:text-blue-500 transition duration-200"
      >
        {isShowPassword ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
      </button>
    </div>
  );
};

export default PasswordInput;
