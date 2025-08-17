import axios from "axios";
import { BASE_URL } from "./constants";

const axiosInstance = axios.create({
  baseURL: BASE_URL, // https://notes-app-1t42.onrender.com
  withCredentials: true, // cookie bhejne/receive karne ke liye REQUIRED
  timeout: 60000, // Render cold start handle
  headers: { "Content-Type": "application/json" },
});

// No need for interceptors to add token from localStorage
export default axiosInstance;
