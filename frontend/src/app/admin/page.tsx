'use client';

import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { createVilla } from '../../services/villa.service';
import { getAdminReservations, updateReservationStatus } from '../../services/reservation.service';
import { 
  LayoutDashboard, 
  CalendarDays, 
  PlusCircle, 
  MapPin, 
  Users, 
  BedDouble, 
  Bath, 
  CheckCircle2, 
  XCircle,
  Clock
} from 'lucide-react'; // Modern ikonlar için

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'villas' | 'reservations'>('villas');
  const [showAddForm, setShowAddForm] = useState(false);
  const [reservations, setReservations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  // Verileri çekme
  useEffect(() => {
    if (activeTab === 'reservations') {
      fetchReservations();
    }
  }, [activeTab]);

  const fetchReservations = async () => {
    setIsLoading(true);
    try {
      const data = await getAdminReservations();
      setReservations(data);
    } catch (error) {
      console.error("Yükleme hatası:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await updateReservationStatus(id, status);
      fetchReservations(); // Listeyi tazele
    } catch (error) {
      alert("Durum güncellenirken hata oluştu.");
    }
  };

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
    try {
      await createVilla(formData);
      alert("Villa başarıyla kaydedildi! 🚀");
      setShowAddForm(false);
      window.location.reload();
    } catch (error) {
      alert("Villa kaydedilirken bir hata oluştu.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]"> {/* En temiz arka plan rengi */}
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 py-32">
        <header className="mb-10">
          <h1 className="text-4xl font-[900] text-slate-900 tracking-tight">Yönetim Paneli</h1>
          <p className="text-slate-500 mt-2 font-medium">Villalarınızı ve rezervasyon taleplerinizi buradan yönetin.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sol Menü - Desktop Sidebar */}
          <aside className="lg:col-span-3 space-y-3">
            <button 
              onClick={() => { setActiveTab('villas'); setShowAddForm(false); }}
              className={`w-full flex items-center space-x-3 px-5 py-4 rounded-2xl font-bold transition-all duration-200 ${activeTab === 'villas' ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100'}`}
            >
              <LayoutDashboard size={20} />
              <span>Villaları Yönet</span>
            </button>
            <button 
              onClick={() => { setActiveTab('reservations'); setShowAddForm(false); }}
              className={`w-full flex items-center space-x-3 px-5 py-4 rounded-2xl font-bold transition-all duration-200 ${activeTab === 'reservations' ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100'}`}
            >
              <CalendarDays size={20} />
              <span>Rezervasyonlar</span>
            </button>
          </aside>

          {/* Ana İçerik */}
          <section className="lg:col-span-9">
            {showAddForm ? (
              <div className="bg-white rounded-[2rem] p-10 shadow-xl shadow-slate-100 border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-black text-slate-900">Yeni Villa Kaydı</h2>
                  <button onClick={() => setShowAddForm(false)} className="bg-slate-50 text-slate-500 px-4 py-2 rounded-xl font-bold hover:bg-slate-100 transition-all">Vazgeç</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-black text-slate-400 ml-1">Villa İsmi</label>
                      <input type="text" required className="w-full rounded-2xl bg-slate-50 border-2 border-transparent p-4 focus:border-slate-900 focus:bg-white transition-all outline-none font-semibold text-slate-800" placeholder="Örn: Blue Horizon Villa" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-black text-slate-400 ml-1">Lokasyon</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-4 text-slate-400" size={20} />
                        <input type="text" required className="w-full rounded-2xl bg-slate-50 border-2 border-transparent p-4 pl-12 focus:border-slate-900 focus:bg-white transition-all outline-none font-semibold text-slate-800" placeholder="Fethiye, Muğla" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-black text-slate-400 ml-1">Gecelik Fiyat</label>
                      <input type="number" required className="w-full rounded-2xl bg-slate-50 border-2 border-transparent p-4 focus:border-slate-900 focus:bg-white transition-all outline-none font-bold text-slate-800" value={formData.pricePerNight} onChange={(e) => setFormData({...formData, pricePerNight: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-black text-slate-400 ml-1">Kapasite</label>
                      <div className="relative">
                        <Users className="absolute left-4 top-4 text-slate-400" size={20} />
                        <input type="number" className="w-full rounded-2xl bg-slate-50 border-2 border-transparent p-4 pl-12 focus:border-slate-900 focus:bg-white transition-all outline-none font-bold text-slate-800" value={formData.capacity || ''} onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value)})} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-black text-slate-400 ml-1">Yatak Odası</label>
                      <div className="relative">
                        <BedDouble className="absolute left-4 top-4 text-slate-400" size={20} />
                        <input type="number" className="w-full rounded-2xl bg-slate-50 border-2 border-transparent p-4 pl-12 focus:border-slate-900 focus:bg-white transition-all outline-none font-bold text-slate-800" value={formData.bedrooms} onChange={(e) => setFormData({...formData, bedrooms: parseInt(e.target.value)})} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-xs uppercase tracking-widest font-black text-slate-400 ml-1">Villa Özellikleri</label>
                    <div className="flex flex-wrap gap-2">
                      {availableFeatures.map(feature => (
                        <button key={feature} type="button" onClick={() => handleFeatureToggle(feature)} className={`px-5 py-3 rounded-2xl text-xs font-black transition-all border-2 ${formData.features.includes(feature) ? 'bg-slate-900 border-slate-900 text-white shadow-lg' : 'bg-white border-slate-100 text-slate-500 hover:border-slate-300'}`}>
                          {feature}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-blue-600 text-white py-6 rounded-3xl font-black text-xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200">
                    Sisteme Kaydet
                  </button>
                </form>
              </div>
            ) : activeTab === 'reservations' ? (
              <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-100 border border-slate-100 overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                   <h2 className="text-2xl font-black text-slate-900">Talep Listesi</h2>
                   <button onClick={fetchReservations} className="text-blue-600 font-bold text-sm hover:underline">Yenile</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Villa / Müşteri</th>
                        <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Tarih</th>
                        <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Tutar</th>
                        <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Durum</th>
                        <th className="px-6 py-4 text-center text-xs font-black text-slate-400 uppercase tracking-widest">Aksiyon</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {reservations.length === 0 ? (
                        <tr><td colSpan={5} className="py-20 text-center text-slate-400 font-bold">Talep bulunmuyor.</td></tr>
                      ) : reservations.map((res) => (
                        <tr key={res.id} className="hover:bg-slate-50/50 transition-all">
                          <td className="px-6 py-5">
                            <div className="font-black text-slate-800">{res.villa?.name}</div>
                            <div className="text-xs text-slate-400 font-bold uppercase mt-1">ID: {res.userId.slice(0,8)}</div>
                          </td>
                          <td className="px-6 py-5">
                             <div className="flex items-center text-sm font-bold text-slate-600">
                               <Clock size={14} className="mr-2" />
                               {new Date(res.startDate).toLocaleDateString()} - {new Date(res.endDate).toLocaleDateString()}
                             </div>
                          </td>
                          <td className="px-6 py-5">
                            <span className="text-lg font-black text-slate-900">{res.totalPrice}₺</span>
                          </td>
                          <td className="px-6 py-5">
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                              res.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-700' :
                              res.status === 'CANCELLED' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                            }`}>
                              {res.status === 'REQUESTED' ? 'BEKLEYEN' : res.status}
                            </span>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex justify-center space-x-2">
                              {res.status === 'REQUESTED' && (
                                <>
                                  <button onClick={() => handleUpdateStatus(res.id, 'CONFIRMED')} className="p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all"><CheckCircle2 size={20}/></button>
                                  <button onClick={() => handleUpdateStatus(res.id, 'CANCELLED')} className="p-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all"><XCircle size={20}/></button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-[2rem] p-12 text-center shadow-xl shadow-slate-100 border border-slate-100">
                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <PlusCircle className="text-slate-200" size={40} />
                </div>
                <h3 className="text-xl font-black text-slate-900">Henüz villa eklemediniz</h3>
                <p className="text-slate-400 font-medium mt-2 mb-8">Hemen ilk villanızı sisteme kaydedin ve kiralamaya başlayın.</p>
                <button 
                  onClick={() => setShowAddForm(true)}
                  className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black hover:bg-blue-600 transition-all shadow-xl shadow-slate-200"
                >
                  + Yeni Villa Ekle
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}