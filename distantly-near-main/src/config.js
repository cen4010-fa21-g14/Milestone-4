import axios from "axios"

export const axiosInstance = axios.create({
    baseURL : "https://distantdemo.herokuapp.com/api/",
});