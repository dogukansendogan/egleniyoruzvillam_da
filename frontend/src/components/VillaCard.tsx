import Image from 'next/image';
import Link from 'next/link';
import { Villa } from '@/types';

interface VillaCardProps {
  villa: Villa;
}

export default function VillaCard({ villa }: VillaCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-lg hover:ring-slate-300">
      
      {/* Görsel Alanı */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img 
          src={villa.imageUrl || '/placeholder-villa.jpg'} 
          alt={villa.name} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Öne Çıkan Özellik Rozeti - Güvenli Kontrol */}
        {villa.features && villa.features.length > 0 && (
          <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-blue-600 backdrop-blur-sm shadow-sm uppercase tracking-wider">
            {villa.features[0]}
          </div>
        )}

        {/* Fiyat Rozeti (Görsel Üstünde Daha Şık Durur) */}
        <div className="absolute bottom-3 right-3 rounded-xl bg-slate-900/80 px-3 py-1.5 text-white backdrop-blur-md shadow-lg">
          <span className="text-sm font-bold">₺{villa.pricePerNight.toLocaleString('tr-TR')}</span>
          <span className="text-[10px] opacity-80"> / gece</span>
        </div>
      </div>

      {/* İçerik Alanı */}
      <div className="flex flex-1 flex-col p-5">
        
        {/* Lokasyon */}
        <div className="mb-2 flex items-center gap-1.5 text-xs font-bold text-blue-500 uppercase tracking-widest">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          {villa.location}
        </div>

        {/* Başlık - Tıklanabilir Yapıldı */}
        <Link href={`/villas/${villa.id}`}>
          <h3 className="text-lg font-extrabold text-slate-900 line-clamp-1 hover:text-blue-600 transition-colors cursor-pointer">
            {villa.name}
          </h3>
        </Link>

        {/* Özellik İkonları */}
        <div className="mt-4 flex items-center justify-between text-slate-500 border-t border-slate-50 pt-4">
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs font-bold text-slate-900">{villa.capacity}</span>
            <span className="text-[10px] uppercase tracking-tighter">Kapasite</span>
          </div>
          <div className="h-8 w-[1px] bg-slate-100" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs font-bold text-slate-900">{villa.bedrooms}</span>
            <span className="text-[10px] uppercase tracking-tighter">Yatak Odası</span>
          </div>
          <div className="h-8 w-[1px] bg-slate-100" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs font-bold text-slate-900">{villa.bathrooms}</span>
            <span className="text-[10px] uppercase tracking-tighter">Banyo</span>
          </div>
        </div>

        {/* İncele Butonu - Yeni Route Yapısına Uygun */}
        <div className="mt-5">
          <Link 
            href={`/villas/${villa.id}`}
            className="flex w-full items-center justify-center rounded-xl bg-blue-600 py-3 text-sm font-bold text-white shadow-lg shadow-blue-100 transition-all hover:bg-blue-700 active:scale-[0.98]"
          >
            Detayları İncele
          </Link>
        </div>

      </div>
    </div>
  );
}