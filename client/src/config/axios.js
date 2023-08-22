import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://localhost:8000", // Your backend API's base URL
});
