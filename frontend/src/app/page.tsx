'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import VillaCard from '../components/VillaCard';
import Footer from '../components/Footer';
import { Villa } from '../types/index';
import { getAllVillas } from '../../services/villa.service';

// --- Sabit Veriler (Tasarım ve İçerik Zenginliği İçin) ---

const categories = [
  { id: 'all', name: 'Tüm Villalar', icon: '🏠' },
  { id: 'pool', name: 'Özel Havuzlu', icon: '🏊‍♂️' },
  { id: 'sea', name: 'Deniz Manzaralı', icon: '🌊' },
  { id: 'luxury', name: 'Ultra Lüks', icon: '💎' },
  { id: 'nature', name: 'Doğa İçinde', icon: '🌲' },
  { id: 'family', name: 'Geniş Aile', icon: '👨‍👩‍👧‍ boy' },
];

const destinations = [
  { id: 1, name: 'Kalkan', villas: 145, img: 'https://images.unsplash.com/photo-1542051812871-75750592742b?auto=format&fit=crop&w=800', span: 'md:col-span-2 md:row-span-2' },
  { id: 2, name: 'Kaş', villas: 89, img: 'https://images.unsplash.com/photo-1598506899451-8d2ba8b4a2d7?auto=format&fit=crop&w=800', span: 'md:col-span-1' },
  { id: 3, name: 'Fethiye', villas: 210, img: 'https://images.unsplash.com/photo-1588631432432-8415c89fb458?auto=format&fit=crop&w=800', span: 'md:col-span-1' },
  { id: 4, name: 'Bodrum', villas: 320, img: 'https://images.unsplash.com/photo-1608408891486-f5cafe92518e?auto=format&fit=crop&w=800', span: 'md:col-span-2' },
];

const testimonials = [
  { id: 1, user: 'Ahmet T.', text: 'Rezervasyon süreci çok hızlıydı. Villa fotoğraflarla birebir aynı çıktı.', stars: 5 },
  { id: 2, user: 'Elif Y.', text: 'Fethiye tatilimizde tercih ettik, çocuklu aileler için harika seçenekler var.', stars: 5 },
  { id: 3, user: 'Can D.', text: 'Güvenilir bir platform. Depozito iadesinde hiç sorun yaşamadık.', stars: 4 },
];

const faqs = [
  { q: 'Rezervasyonumu nasıl iptal edebilirim?', a: 'Giriş tarihine 30 gün kalana kadar yapılan iptallerde kesintisiz iade yapılmaktadır.' },
  { q: 'Depozito ücreti ne zaman iade edilir?', a: 'Çıkış kontrollerinin ardından sorun yoksa aynı gün iade süreciniz başlatılır.' },
  { q: 'Villalarda temizlik nasıl yapılıyor?', a: 'Her giriş öncesi profesyonel ekiplerimizce detaylı dezenfeksiyon ve temizlik yapılır.' },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [villas, setVillas] = useState<Villa[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const loadVillas = async () => {
      setIsLoading(true);
      try {
        const data = await getAllVillas(activeCategory);
        setVillas(data);
      } catch (err) {
        console.error("Villa yükleme hatası:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadVillas();
  }, [activeCategory]);

  return (
    <main className="min-h-screen bg-slate-50 selection:bg-blue-100">
      <Navbar />
      <Hero />

      {/* --- Kategori Navigasyonu --- */}
      <section className="sticky top-20 z-40 w-full border-b border-slate-200 bg-white/90 py-6 backdrop-blur-md">
        <div className="container mx-auto px-4 flex gap-4 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl whitespace-nowrap transition-all ${
                activeCategory === cat.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span className="text-xl">{cat.icon}</span>
              <span className="font-bold text-sm">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* --- Villa Listeleme Alanı --- */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              {activeCategory === 'all' ? 'Öne Çıkan Villalarımız' : `${categories.find(c=>c.id===activeCategory)?.name}`}
            </h2>
            <p className="text-slate-500 mt-4 text-lg">
              Müşterilerimiz için özenle seçilmiş, her biri konfor ve lüks standartlarımızı karşılayan villalarımızı keşfedin.
            </p>
          </div>
          <div className="text-sm font-semibold text-blue-600 bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
            Toplam {villas.length} Villa Listeleniyor
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-20">
            {[1,2,3].map(n => <div key={n} className="h-80 bg-slate-200 animate-pulse rounded-3xl" />)}
          </div>
        ) : villas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {villas.map((villa) => (
              <VillaCard key={villa.id} villa={villa} />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center bg-white rounded-[3rem] shadow-sm border-2 border-dashed border-slate-200">
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-slate-800">Henüz Bu Kategoride Villa Yok</h3>
            <p className="text-slate-500 mt-2">Müşterimiz yeni villalar eklemek üzere çalışıyor. Diğer kategorilere göz atabilirsiniz.</p>
          </div>
        )}
      </section>

      {/* --- Popüler Lokasyonlar (Bento Grid) --- */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">En Çok Tercih Edilen Bölgeler</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[600px]">
            {destinations.map(dest => (
              <div key={dest.id} className={`relative rounded-3xl overflow-hidden group ${dest.span}`}>
                <img src={dest.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={dest.name}/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="text-3xl font-bold">{dest.name}</h3>
                  <p className="text-white/80 mt-2">{dest.villas} Müsait Villa</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Yorumlar --- */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-16 text-center">Misafir Deneyimleri</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(t => (
              <div key={t.id} className="bg-slate-800 p-10 rounded-[2.5rem] relative hover:-translate-y-2 transition-transform">
                <div className="text-blue-400 text-4xl mb-6">“</div>
                <p className="text-slate-300 italic mb-8 leading-relaxed">“{t.text}”</p>
                <div className="flex items-center justify-between border-t border-slate-700 pt-6">
                  <span className="font-bold">{t.user}</span>
                  <div className="text-yellow-500">{'★'.repeat(t.stars)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Sık Sorulan Sorular --- */}
      <section className="py-24 container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-bold mb-16 text-center">Sıkça Sorulan Sorular</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-2 border-slate-100 rounded-3xl overflow-hidden bg-white">
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-8 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="text-lg font-bold text-slate-800">{faq.q}</span>
                <span className={`text-2xl transition-transform ${openFaq === idx ? 'rotate-180' : ''}`}>↓</span>
              </button>
              {openFaq === idx && (
                <div className="px-8 pb-8 text-slate-600 leading-relaxed animate-in slide-in-from-top-2">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* --- Footer Öncesi CTA --- */}
      <section className="container mx-auto px-4 mb-24">
        <div className="bg-blue-600 rounded-[3.5rem] p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-200">
          <div className="relative z-10">
            <h2 className="text-5xl font-extrabold mb-6">Tatilinizi Hemen Planlayın</h2>
            <p className="text-blue-100 text-xl mb-10 max-w-2xl mx-auto">Müşterimizin en seçkin villalarında yerinizi ayırtın, erken rezervasyon fırsatlarını kaçırmayın.</p>
            <button className="bg-white text-blue-600 px-12 py-5 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg">
              Tüm Villaları Keşfet
            </button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-50 -mr-32 -mt-32"></div>
        </div>
      </section>

      <Footer />
    </main>
  );
}