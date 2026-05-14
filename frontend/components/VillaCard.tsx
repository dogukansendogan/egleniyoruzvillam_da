// components/VillaCard.tsx
import Image from 'next/image';
// src/components/VillaCard.tsx
import { Villa } from '@/types/index';
interface VillaCardProps {
  villa: Villa; 
}

export default function VillaCard({ villa }: VillaCardProps) {
  return (
    <div className="group relative flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      
      {/* Görsel Alanı */}
      <div className="relative w-full h-64 overflow-hidden">
        {/* Görsel URL'si yoksa patlamaması için fallback ekledik */}
        <Image
          src={villa.imageUrl || villa.coverImage || '/placeholder-villa.jpg'} 
          alt={villa.name || 'Villa'}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Öne Çıkan Özellik Rozeti (Runtime Error Çözümü) */}
        {/* villa.features dizisi undefined olsa bile ?. sayesinde uygulama çökmez */}
        {villa.features && villa.features.length > 0 && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
            {villa.features[0]}
          </div>
        )}

        {/* Müsaitlik Durumu Badge'i */}
        {villa.isAvailable === false && (
          <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            Dolu
          </div>
        )}
      </div>

      {/* İçerik ve İşlevsellik Alanı */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">{villa.name}</h3>
          <div className="flex items-center text-gray-600 bg-gray-50 px-2 py-1 rounded-md">
             <span className="text-sm font-medium">⭐ 4.9</span>
          </div>
        </div>
        
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{villa.location}</p>

        {/* Özellikler */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
          <div className="flex items-center gap-1">
            <span>👥</span> {villa.capacity} Kişi
          </div>
          <div className="flex items-center gap-1">
            <span>🛏️</span> {villa.bedrooms} Yatak Odası
          </div>
        </div>

        {/* Fiyat ve Buton (Kartın en altına itilir) */}
        <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
          <div>
            <span className="text-2xl font-bold text-gray-900">₺{villa.pricePerNight}</span>
            <span className="text-gray-500 text-sm"> / gece</span>
          </div>
          <button className="bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl font-medium transition-colors duration-200">
            İncele
          </button>
        </div>
      </div>
    </div>
  );
}