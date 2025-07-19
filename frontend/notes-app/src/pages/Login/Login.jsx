import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import { useDispatch } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/users/userSlice";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    //Login API call

    try {
      dispatch(signInStart());

      const res = await axiosInstance.post("/api/auth/signin", {
        email,
        password,
      });

      if (res.data.success === false) {
        toast.error(res.data.message);
        dispatch(signInFailure(res.data.message));
        return;
      }

      toast.success(res.data.message);
      dispatch(signInSuccess(res.data));
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center flex justify-center items-center"
        style={{ backgroundImage: "url('/pexels.jpg')" }}
      >
        <div className="flex items-center justify-center  bg-gradient-to-br from-gray-50 to-white px-4 mt-12">
          <div className="bg-white border border-gray-200 rounded-xl shadow-lg px-6 py-6 w-[320px] h-[290px] flex flex-col justify-center">
            <form onSubmit={handleLogin} className="relative z-10 space-y-4">
              <h4 className="text-xl font-bold text-gray-800 text-center mb-2">
                Login
              </h4>

              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-[12px]"
              />

              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-[12px]"
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
                Login
              </button>

              <p className="text-xs text-center mt-2 text-gray-600">
                Not registered yet?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-blue-600 hover:text-blue-800 "
                >
                  Create an account
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
