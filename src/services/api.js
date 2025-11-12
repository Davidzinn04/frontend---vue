import axios from 'axios';

const envUrl = import.meta.env.VITE_API_URL;
const fallbackUrl = 'http://localhost:3000'; // servidor mock que vamos subir
const baseURL = envUrl || fallbackUrl;

console.log('[API] baseURL =', baseURL);

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('API Error: No response received', error.request);
    } else {
      console.error('API Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;