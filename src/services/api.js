import axios from 'axios';

const envUrl = import.meta.env.VITE_API_URL;
// Força URL relativa em desenvolvimento para garantir que o Vite dev server
// faça o proxy e evite problemas de CORS (útil em Codespaces / GitHub.dev).
// Em produção (`import.meta.env.PROD`) usamos `VITE_API_URL` quando definido.
const baseURL = (import.meta.env.DEV ? '' : (envUrl ?? ''));

console.log('[API] baseURL =', baseURL || '[relative]');

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