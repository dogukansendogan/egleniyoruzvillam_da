// frontend/src/services/reservation.service.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

/**
 * Yeni bir rezervasyon talebi oluşturur.
 * Backend'deki JwtAuthGuard nedeniyle Authorization header'ı zorunludur.
 */
export async function createReservation(reservationData: any) {
  // Token'ı localStorage'dan alıyoruz (Giriş yapıldığında oraya kaydettiğini varsayıyorum)
  const token = localStorage.getItem('token'); 

  const response = await fetch(`${API_BASE_URL}/reservations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` //
    },
    body: JSON.stringify(reservationData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    // Backend'den gelen (tarih çakışması, geçmiş tarih vb.) hata mesajını fırlatır
    throw new Error(errorData.message || 'Rezervasyon oluşturulamadı');
  }

  return response.json();
}

/**
 * Tüm rezervasyonları admin için çeker.
 */
export async function getAdminReservations() {
  const response = await fetch(`${API_BASE_URL}/reservations/admin/all`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Rezervasyonlar yüklenemedi');
  }

  return response.json();
}

/**
 * Rezervasyon durumunu günceller (Onayla/İptal).
 */
export async function updateReservationStatus(id: string, status: string) {
  const response = await fetch(`${API_BASE_URL}/reservations/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error('Durum güncellenirken bir hata oluştu');
  }

  return response.json();
}