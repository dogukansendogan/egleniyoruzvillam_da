'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../../services/auth.service';
import Navbar from '../../components/Navbar';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login({ email, password });
      // Giriş başarılıysa ana sayfaya uçuruyoruz
      router.push('/');
      router.refresh(); 
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      
      <main className="flex items-center justify-center pt-32 px-6">
        <div className="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-100 border border-slate-100">
          <header className="text-center mb-10">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Tekrar Hoş Geldin</h1>
            <p className="text-slate-400 font-bold mt-2">Hemen giriş yap ve tatilini planla.</p>
          </header>

          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 text-sm font-bold rounded-2xl text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-black text-slate-400 ml-1">E-Posta Adresi</label>
              <input 
                type="email" 
                required 
                className="w-full rounded-2xl bg-slate-50 border-2 border-transparent p-4 focus:border-slate-900 focus:bg-white transition-all outline-none font-semibold text-slate-800"
                placeholder="ahmet@test.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-black text-slate-400 ml-1">Şifre</label>
              <input 
                type="password" 
                required 
                className="w-full rounded-2xl bg-slate-50 border-2 border-transparent p-4 focus:border-slate-900 focus:bg-white transition-all outline-none font-semibold text-slate-800"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full py-5 rounded-3xl font-black text-lg transition-all shadow-xl ${
                isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-slate-900 hover:bg-blue-600 text-white shadow-slate-200'
              }`}
            >
              {isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>

          <footer className="mt-8 text-center">
            <p className="text-slate-400 font-medium">Hesabın yok mu? <span className="text-blue-600 font-black cursor-pointer hover:underline">Kayıt Ol</span></p>
          </footer>
        </div>
      </main>
    </div>
  );
}