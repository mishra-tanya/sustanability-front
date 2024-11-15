import axios from 'axios';
import { API_BASE_URL } from './config';

const api = axios.create({
  baseURL: API_BASE_URL, 
  withCredentials: true, 
});

export const getCsrfToken = async () => {
  await api.get('/sanctum/csrf-cookie');
  console.log(api.get('/sanctum/csrf-cookie'));
};

api.interceptors.request.use(
  (config) => {
      const token = localStorage.getItem("authToken");
      if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
          // console.log("hi");
      }
      return config;
  },
  (error) => {
      return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
      if(!response.data.success && response.data.message === 'Authentication Failed'){
          localStorage.removeItem('token');
      }
      return response;
  }
  
);

export default api;
