// frontend/src/app/admin/page.tsx (Güncellenmiş İçerik)
'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('villas');
  const [showAddForm, setShowAddForm] = useState(false);

  // Form State'i
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    pricePerNight: '',
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    description: '',
    imageUrl: '',
    features: [] as string[]
  });

  const availableFeatures = ['Havuz', 'Jakuzi', 'Deniz Manzarası', 'WiFi', 'Klima', 'Otopark', 'Sauna'];

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Gönderilecek Veri:", formData);
    // Burada backend/villas POST isteği atılacak
    alert("Villa başarıyla kaydedildi! (Backend bağlantısı sıradaki adım)");
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-32">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Yan Menü */}
          <aside className="w-full md:w-64 space-y-2">
            <button 
              onClick={() => { setActiveTab('villas'); setShowAddForm(false); }}
              className={`w-full text-left px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'villas' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-600'}`}
            >
              🏠 Villaları Yönet
            </button>
            <button 
              onClick={() => { setActiveTab('reservations'); setShowAddForm(false); }}
              className={`w-full text-left px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'reservations' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-600'}`}
            >
              📅 Rezervasyon Talepleri
            </button>
          </aside>

          {/* Ana İçerik Bölümü */}
          <section className="flex-1">
            {showAddForm ? (
              <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm ring-1 ring-slate-100">
                <div className="flex items-center justify-between mb-10">
                  <h2 className="text-3xl font-extrabold text-slate-900">Yeni Villa Kaydı</h2>
                  <button onClick={() => setShowAddForm(false)} className="text-slate-400 font-bold hover:text-slate-600">İptal Et</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Villa Adı</label>
                      <input 
                        type="text" 
                        required
                        className="w-full rounded-2xl bg-slate-50 border-none p-4 focus:ring-2 focus:ring-blue-500 font-medium"
                        placeholder="Örn: Villa Manzara"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Lokasyon</label>
                      <input 
                        type="text" 
                        required
                        className="w-full rounded-2xl bg-slate-50 border-none p-4 focus:ring-2 focus:ring-blue-500 font-medium"
                        placeholder="Örn: Fethiye, Ölüdeniz"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Gecelik Fiyat (₺)</label>
                      <input 
                        type="number" 
                        required
                        className="w-full rounded-2xl bg-slate-50 border-none p-4 focus:ring-2 focus:ring-blue-500 font-medium"
                        value={formData.pricePerNight}
                        onChange={(e) => setFormData({...formData, pricePerNight: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Kapasite</label>
                      <input 
                        type="number" 
                        className="w-full rounded-2xl bg-slate-50 border-none p-4 focus:ring-2 focus:ring-blue-500 font-medium"
                        value={formData.capacity}
                        onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value)})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Yatak Odası</label>
                      <input 
                        type="number" 
                        className="w-full rounded-2xl bg-slate-50 border-none p-4 focus:ring-2 focus:ring-blue-500 font-medium"
                        value={formData.bedrooms}
                        onChange={(e) => setFormData({...formData, bedrooms: parseInt(e.target.value)})}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-700 ml-1">Özellikler</label>
                    <div className="flex flex-wrap gap-3">
                      {availableFeatures.map(feature => (
                        <button
                          key={feature}
                          type="button"
                          onClick={() => handleFeatureToggle(feature)}
                          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${formData.features.includes(feature) ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                        >
                          {feature}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-slate-900 text-white py-5 rounded-2xl font-extrabold text-lg hover:bg-blue-600 transition-all shadow-xl shadow-slate-100">
                    Villayı Sisteme Kaydet
                  </button>
                </form>
              </div>
            ) : (
              // Mevcut Villa Listesi (Önceki kodun devamı)
              <div className="bg-white rounded-[2.5rem] p-8 shadow-sm ring-1 ring-slate-100">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-slate-900">Mevcut Villalar</h2>
                  <button 
                    onClick={() => setShowAddForm(true)}
                    className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg"
                  >
                    + Yeni Villa Ekle
                  </button>
                </div>
                {/* Liste Tablosu Buraya Gelecek */}
                <p className="text-slate-400 text-center py-10 font-medium tracking-tight">Henüz bir villa eklenmemiş veya liste yükleniyor...</p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}