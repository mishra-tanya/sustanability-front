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

export default api;
