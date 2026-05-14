'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { tr } from 'date-fns/locale';

// Müşterinin villalarının bulunduğu gerçek bölgeler
const popularLocations = ['Kalkan', 'Kaş', 'Fethiye', 'Bodrum', 'Marmaris'];

export default function Hero() {
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);

  const handleSearch = () => {
    // 1. ADIM Kontrolü: Gerekli alanlar boşsa uyarı ver
    if (!startDate || !endDate || !location) {
      alert("Lütfen bölge ve tarih aralığı seçiniz.");
      return;
    }

    // 2. ADIM: Gerçek rezervasyon usulü için sorgu parametreleri oluşturma
    // Bu yapı seçilen tarihleri ve misafir sayısını /villas sayfasına taşır
    const query = `?location=${encodeURIComponent(location)}&start=${startDate.toISOString()}&end=${endDate.toISOString()}&guests=${guests}`;
    
    console.log("Arama başlatılıyor:", { location, startDate, endDate, guests });
    
    // Yönlendirme (Bu sayfa ileride filtreleme mantığını işleyecek)
    window.location.href = `/villas${query}`; 
  };

  return (
    <div className="relative h-[650px] flex items-center justify-center overflow-hidden">
      {/* Arka Plan Görseli */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero-bg.jpg" 
          className="w-full h-full object-cover brightness-[0.55]" 
          alt="Luxury Villa Background" 
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-xl leading-tight">
          Hayalinizdeki Villayı <span className="text-blue-400 italic">Hemen Bulun</span>
        </h1>
        <p className="text-gray-100 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light drop-shadow-md">
          Size özel seçilmiş lüks villalarda, tamamen güvenilir bir rezervasyon deneyimi yaşayın.
        </p>

        {/* Profesyonel Arama Çubuğu */}
        <div className="bg-white rounded-[2rem] shadow-2xl p-2 md:p-3 flex flex-col md:flex-row items-stretch gap-2 border border-white/20">
          
          {/* Konum Seçimi */}
          <div className="flex-[1.2] flex flex-col items-start px-6 py-4 hover:bg-slate-50 rounded-[1.5rem] transition-all cursor-pointer group relative">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-1">Bölge Seçin</label>
            <div className="w-full flex items-center">
              <input 
                type="text"
                placeholder="Nereye gitmek istersiniz?"
                className="w-full bg-transparent border-none focus:ring-0 text-slate-800 placeholder-slate-400 font-semibold p-0 text-base md:text-lg"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                list="locations-list"
              />
              <span className="text-slate-300 group-hover:text-blue-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
            
            <datalist id="locations-list">
              {popularLocations.map(loc => (
                <option key={loc} value={loc} />
              ))}
            </datalist>
          </div>

          <div className="hidden md:block w-[1px] bg-slate-100 my-4" />

          {/* Tarih Seçimi */}
          <div className="flex-[1.2] flex flex-col items-start px-6 py-4 hover:bg-slate-50 rounded-[1.5rem] transition-all cursor-pointer relative group">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-1">Tarih Aralığı</label>
            <div className="flex w-full items-center">
              <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                  const [start, end] = update;
                  setStartDate(start);
                  setEndDate(end);
                }}
                locale={tr}
                minDate={new Date()}
                dateFormat="dd MMM"
                placeholderText="Giriş - Çıkış Tarihi"
                className="w-full bg-transparent border-none focus:ring-0 text-slate-800 font-semibold p-0 cursor-pointer text-base md:text-lg"
              />
              <span className="text-slate-300 group-hover:text-blue-500 transition-colors ml-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
          </div>

          <div className="hidden md:block w-[1px] bg-slate-100 my-4" />

          {/* Misafir Sayısı */}
          <div className="flex-1 flex flex-col items-start px-6 py-4 hover:bg-slate-50 rounded-[1.5rem] transition-all cursor-pointer group">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-1">Misafir</label>
            <div className="w-full relative">
              <select 
                className="w-full bg-transparent border-none focus:ring-0 text-slate-800 font-semibold p-0 cursor-pointer appearance-none text-base md:text-lg"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
              >
                {[1,2,3,4,5,6,7,8,9,10,12,14,16].map(n => (
                  <option key={n} value={n}>{n} Misafir</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-slate-300 group-hover:text-blue-500 transition-colors">
                 <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </div>
            </div>
          </div>

          {/* Ara Butonu */}
          <button 
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-[1.5rem] font-bold transition-all transform active:scale-95 flex items-center justify-center gap-3 shadow-xl shadow-blue-200/50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-lg">Ara</span>
          </button>
        </div>
      </div>
    </div>
  );
}