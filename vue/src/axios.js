import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api",
})
axiosClient.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${sessionStorage.getItem('TOKEN')}`;
  return config;
});
export default axiosClient;
