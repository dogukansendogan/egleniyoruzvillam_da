// frontend/src/services/auth.service.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function login(credentials: any) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Giriş yapılamadı');
  }

  const data = await response.json();
  
  // Backend'den gelen token'ı tarayıcı hafızasına alıyoruz
  if (data.access_token) {
    localStorage.setItem('token', data.access_token);
  }
  
  return data;
}