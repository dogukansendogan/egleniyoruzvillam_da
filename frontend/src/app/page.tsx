'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import VillaCard from '../components/VillaCard';
import Footer from '../components/Footer';
import { Villa } from '../types/index';
import { getAllVillas } from '../services/villa.service';

export default function Home() {
  const [villas, setVillas] = useState<Villa[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVillas = async () => {
      try {
        const data = await getAllVillas();
        setVillas(data);
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVillas();
  }, []);

  return (
    <main className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <Hero />

      <section className="container mx-auto px-4 py-16">
        <div className="mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900">Sizin İçin Seçilen Villalar</h2>
          <p className="mt-2 text-slate-600">En popüler ve konforlu seçeneklerimize göz atın.</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {villas.map((villa) => (
              <VillaCard key={villa.id} villa={villa} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}