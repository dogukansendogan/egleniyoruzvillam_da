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
        {/* Next.js Image component kullanıyoruz, geçici olarak img etiketi de kullanılabilir */}
        <img 
          src={villa.imageUrl} 
          alt={villa.name} 
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Öne Çıkan Özellik Rozeti */}
         {villa.features && villa.features.length > 0 && (
            <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur-sm shadow-sm">
            {villa.features[0]}
          </div>
        )}
      </div>

      {/* İçerik Alanı */}
      <div className="flex flex-1 flex-col p-5">
        
        {/* Lokasyon ve Başlık */}
        <div className="mb-2 flex items-center gap-1 text-sm font-medium text-slate-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          {villa.location}
        </div>
        <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{villa.name}</h3>

        {/* Oda & Kapasite Bilgileri */}
        <div className="mt-3 flex items-center gap-4 text-sm text-slate-600 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-1">
            <span className="font-semibold">{villa.capacity}</span> Kişi
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold">{villa.bedrooms}</span> Yatak Odası
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold">{villa.bathrooms}</span> Banyo
          </div>
        </div>

        {/* Fiyat ve Buton */}
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-xl font-extrabold text-slate-900">₺{villa.pricePerNight.toLocaleString('tr-TR')}</span>
            <span className="text-sm font-medium text-slate-500"> / gece</span>
          </div>
          <Link 
            href={`/villalar/${villa.id}`}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            İncele
          </Link>
        </div>

      </div>
    </div>
  );
}