import axios from "axios";
import { BASE_URL } from "./constants";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true, // This is REQUIRED to send/receive cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// No need for interceptors to add token from localStorage
export default axiosInstance;
