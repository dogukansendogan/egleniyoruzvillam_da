// services/villa.service.ts
import { Villa } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

/**
 * Ana sayfadaki kategorilere göre veya tüm villaları getirmek için kullanılır.
 */
export async function getAllVillas(categoryId?: string): Promise<Villa[]> {
  try {
    const url = new URL(`${API_BASE_URL}/villas`);
    
    if (categoryId && categoryId !== 'all') {
      url.searchParams.append('categoryId', categoryId);
    }

    const response = await fetch(url.toString(), { 
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (!response.ok) {
      throw new Error(`Villalar getirilirken hata oluştu. Durum: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("getAllVillas API Hatası:", error);
    return [];
  }
}

/**
 * Arama çubuğundan gelen (Konum, Tarih, Misafir) kriterlerine göre filtreleme yapar.
 * Müşterinin rezervasyon usulü kiralama mantığının kalbi burasıdır.
 */
export async function getFilteredVillas(params: {
  location?: string;
  start?: string;
  end?: string;
  guests?: string | number;
}): Promise<Villa[]> {
  try {
    // Backend'de bu filtreleri karşılayacak özel bir endpoint (/search) olduğunu varsayıyoruz
    const url = new URL(`${API_BASE_URL}/villas/search`);
    
    if (params.location) url.searchParams.append('location', params.location);
    if (params.start) url.searchParams.append('startDate', params.start);
    if (params.end) url.searchParams.append('endDate', params.end);
    if (params.guests) url.searchParams.append('capacity', params.guests.toString());

    const response = await fetch(url.toString(), { 
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (!response.ok) {
      throw new Error(`Filtreleme hatası. Durum: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("getFilteredVillas API Hatası:", error);
    return [];
  }
}