import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://sharehopebackend-five.vercel.app",
    withCredentials: true,
})
