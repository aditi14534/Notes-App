import React, { useState } from "react";

import PasswordInput from "../../components/input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

import { toast } from "react-toastify";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");
    // Signup API call
    try {
      const res = await axiosInstance.post("/api/auth/signup", {
        username: name,
        email,
        password,
      });

      if (res.data.success === false) {
        setError(res.data.message);
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);

      setError("");

      navigate("/login");
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
      setError(error.message);
    }
  };

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center flex justify-center items-center"
        style={{ backgroundImage: "url('/pexels.jpg')" }}
      >
        <div className="flex items-center justify-center  bg-gradient-to-br from-gray-50 to-white px-4 mt-8">
          <div className="relative w-[320px] h-[340px] bg-white border border-gray-200 rounded-xl shadow-xl px-6 py-6">
            <form onSubmit={handleSignUp} className="relative z-10 space-y-4">
              <h4 className="text-xl font-bold text-gray-800 text-center mb-4">
                Sign Up
              </h4>

              <input
                type="text"
                placeholder="Name"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition hover:border-gray-300 hover:bg-white text-[12px]"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="text"
                placeholder="Email"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition hover:border-gray-300 hover:bg-white text-[12px]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && (
                <p className="text-red-500 text-[9px] font-normal -mt-1 ml-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium text-sm shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Create Account
              </button>

              <p className="text-xs text-center mt-2 text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-blue-600 hover:text-blue-800 transition hover:underline underline-offset-2"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
