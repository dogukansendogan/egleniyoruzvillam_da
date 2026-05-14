import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // NestJS backend adresi
});

// Token yönetimi
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Ahmet'in token'ını ekliyoruz
    }
  }
  return config;
});

export default api; // Hatanın çözümü tam olarak bu satır!