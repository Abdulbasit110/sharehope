import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://sharehopebackend-five.vercel.app/api",
    // baseURL: "http://localhost:4000/api",
    withCredentials: true,
})
