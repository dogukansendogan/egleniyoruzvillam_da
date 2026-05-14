// src/app/villas/[id]/page.tsx
'use client';
import { createReservation } from '../../../services/reservation.service'; 
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { Villa } from '../../../types/index';
import { getVillaById } from '../../../services/villa.service';
import Image from 'next/image';

export default function VillaDetailPage() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isBooking, setIsBooking] = useState(false);
  const handleReservation = async () => {
    if (!startDate || !endDate) {
      alert("Lütfen giriş ve çıkış tarihlerini seçin.");
      return;
    }
  const token = localStorage.getItem('token');
    if (!token) {
      alert("Rezervasyon yapabilmek için giriş yapmalısınız.");
      return;
    }
    try {
      setIsBooking(true);
      await createReservation({
        villaId: id as string,
        startDate: startDate,
        endDate: endDate,
      });
      alert("Rezervasyon talebiniz başarıyla oluşturuldu! Müşterimiz en kısa sürede sizinle iletişime geçecektir.");
    } catch (error) {
      console.error("Rezervasyon yapılırken hata:", error);
      alert("Rezervasyon yapılırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
    } finally {
      setIsBooking(false);
    }
  }
  const { id } = useParams();
  const [villa, setVilla] = useState<Villa | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVilla = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await getVillaById(id as string);
        setVilla(data);
      } catch (error) {
        console.error("Villa yüklenirken hata:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVilla();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!villa) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
        <h1 className="text-2xl font-bold text-slate-800">Villa bulunamadı.</h1>
        <button onClick={() => window.location.href = '/'} className="mt-4 text-blue-600 font-semibold underline">Anasayfaya Dön</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Navbar />
      
      <main className="mx-auto max-w-7xl px-4 py-32 lg:px-8">
        {/* Başlık Bölümü */}
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">{villa.name}</h1>
            <div className="mt-4 flex items-center gap-4 text-slate-500">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="text-blue-500">📍</span> {villa.location}
              </span>
              <span className="h-1 w-1 rounded-full bg-slate-300"></span>
              <span className="flex items-center gap-1.5 font-medium">
                <span className="text-blue-500">⭐</span> 4.9 (12 Değerlendirme)
              </span>
            </div>
          </div>
          <div className="flex gap-3">
             <button className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50 active:scale-95">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0-10.628a2.25 2.25 0 100-2.186m0 2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l-9.566 5.314m9.566 7.5l-9.566-5.314m0 0a2.25 2.25 0 100 2.186c.18-.324.283-.696.283-1.093s-.103-.77-.283-1.093" /></svg>
               Paylaş
             </button>
             <button className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50 active:scale-95">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
               Kaydet
             </button>
          </div>
        </div>

        {/* Dinamik Bento Grid Görsel Galerisi */}
        <div className="grid h-[550px] grid-cols-1 gap-4 overflow-hidden rounded-[2.5rem] shadow-2xl md:grid-cols-4">
          <div className="relative h-full md:col-span-2">
            <Image 
              src={villa.imageUrl || '/placeholder-villa.jpg'} 
              alt={villa.name} 
              fill 
              className="object-cover transition-transform duration-700 hover:scale-105" 
            />
          </div>
          <div className="hidden grid-rows-2 gap-4 md:col-span-1 md:grid">
             <div className="relative h-full bg-slate-200">
                <Image src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600" alt="Detay 1" fill className="object-cover hover:opacity-90" />
             </div>
             <div className="relative h-full bg-slate-200">
                <Image src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600" alt="Detay 2" fill className="object-cover hover:opacity-90" />
             </div>
          </div>
          <div className="relative hidden h-full md:col-span-1 md:block">
            <Image src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600" alt="Detay 3" fill className="object-cover hover:opacity-90" />
            <button className="absolute bottom-6 right-6 rounded-xl bg-white/90 px-4 py-2 text-sm font-bold text-slate-900 backdrop-blur-md transition-colors hover:bg-white">
              Tüm Fotoğraflar
            </button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Sol Kolon: Açıklama ve Özellikler */}
          <div className="lg:col-span-2">
            <div className="rounded-[2.5rem] bg-white p-8 shadow-sm ring-1 ring-slate-100 md:p-12">
              <h2 className="text-2xl font-bold text-slate-900">Villa Hakkında</h2>
              <p className="mt-6 text-lg leading-relaxed text-slate-600">
                {villa.description || "Müşterimize ait bu özel villa, modern mimarisi ve eşsiz manzarasıyla size unutulmaz bir tatil sunuyor. Tüm detaylar konforunuz için en ince ayrıntısına kadar düşünülmüştür."}
              </p>

              <div className="mt-12 grid grid-cols-2 gap-8 border-y border-slate-50 py-10 md:grid-cols-4">
                 <div className="flex flex-col items-center gap-3">
                   <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl">👥</div>
                   <span className="text-sm font-extrabold text-slate-900">{villa.capacity} Misafir</span>
                 </div>
                 <div className="flex flex-col items-center gap-3">
                   <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-2xl">🛏️</div>
                   <span className="text-sm font-extrabold text-slate-900">{villa.bedrooms} Yatak Odası</span>
                 </div>
                 <div className="flex flex-col items-center gap-3">
                   <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-2xl">🚿</div>
                   <span className="text-sm font-extrabold text-slate-900">{villa.bathrooms} Banyo</span>
                 </div>
                 <div className="flex flex-col items-center gap-3">
                   <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-2xl">🏊‍♂️</div>
                   <span className="text-sm font-extrabold text-slate-900">Özel Havuz</span>
                 </div>
              </div>

              <div className="mt-12">
                <h3 className="text-xl font-bold text-slate-900">Sunulan İmkanlar</h3>
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {(villa.features && villa.features.length > 0 ? villa.features : ['WiFi', 'Klima', 'Ücretsiz Otopark', 'Jakuzi']).map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 font-medium text-slate-600">
                      <span className="text-emerald-500">✓</span> {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sağ Kolon: Rezervasyon Paneli (Sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 rounded-[2.5rem] bg-white p-8 shadow-2xl shadow-blue-100 ring-1 ring-slate-100">
              <div className="mb-8 flex items-end justify-between">
                <div>
                  <span className="text-4xl font-extrabold text-slate-900">₺{villa.pricePerNight.toLocaleString('tr-TR')}</span>
                  <span className="text-slate-500"> / gece</span>
                </div>
                <div className="rounded-lg bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">Müsait</div>
              </div>
              <div className="mb-8 space-y-4">
                 {/* Giriş ve Çıkış Tarihleri */}
                 <div className="grid grid-cols-2 gap-3">
                    <div className="group rounded-2xl border border-slate-100 bg-slate-50 p-4 transition-all focus-within:border-blue-200 focus-within:bg-white">
                       <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Giriş</label>
                       <input 
                         type="date"
                         required
                         className="mt-1 w-full bg-transparent p-0 font-bold text-slate-800 outline-none cursor-pointer"
                         value={startDate}
                         onChange={(e) => setStartDate(e.target.value)}
                       />
                    </div>
                    <div className="group rounded-2xl border border-slate-100 bg-slate-50 p-4 transition-all focus-within:border-blue-200 focus-within:bg-white">
                       <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Çıkış</label>
                       <input 
                         type="date"
                         required
                         className="mt-1 w-full bg-transparent p-0 font-bold text-slate-800 outline-none cursor-pointer"
                         value={endDate}
                         onChange={(e) => setEndDate(e.target.value)}
                       />
                    </div>
                 </div>

                 {/* Kişi Sayısı Seçimi */}
                 <div className="group rounded-2xl border border-slate-100 bg-slate-50 p-4 transition-all focus-within:border-blue-200 focus-within:bg-white">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Kişi Sayısı</label>
                    <select className="mt-1 w-full bg-transparent p-0 font-bold text-slate-800 focus:ring-0 border-none appearance-none cursor-pointer outline-none">
                       {villa?.capacity && [...Array(villa.capacity)].map((_, i) => (
                         <option key={i} value={i + 1}>{i + 1} Misafir</option>
                       ))}
                    </select>
                 </div>
              </div>

              {/* Rezervasyon Butonu */}
              <button 
                onClick={handleReservation}
                disabled={isBooking}
                className={`w-full rounded-2xl py-5 text-lg font-black shadow-xl transition-all active:scale-[0.98] ${
                  isBooking 
                    ? 'bg-slate-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-100'
                }`}
              >
                {isBooking ? 'Talebiniz İletiliyor...' : 'Rezervasyon Talebi Oluştur'}
              </button>
              
              {/* Fiyat Bilgisi ve Tahmini Toplam */}
              <div className="mt-6 space-y-3">
                 <div className="flex justify-between text-sm font-medium text-slate-500">
                    <span>Hizmet Bedeli</span>
                    <span>₺0</span>
                 </div>
                 <div className="flex justify-between border-t border-slate-50 pt-3 text-lg font-bold text-slate-900">
                    <span>Toplam (Tahmini)</span>
                    <span>₺{villa?.pricePerNight?.toLocaleString('tr-TR')}</span>
                 </div>
              </div>
              
              <p className="mt-6 text-center text-[11px] font-medium text-slate-400 leading-relaxed">
                Bu aşamada ödeme alınmaz. Müşterimiz (villa sahibi) talebinizi onayladıktan sonra dekont yükleme süreci başlayacaktır.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}