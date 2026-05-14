import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0B1120] pb-8 pt-20 text-slate-400 sm:pt-24 lg:pt-32">
      
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
      <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-900/20 blur-[120px]"></div>
      <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-indigo-900/20 blur-[120px]"></div>

      <div className="container relative mx-auto px-4 md:px-6 lg:px-8">
        
        <div className="mb-16 flex flex-col items-center justify-between gap-8 rounded-3xl bg-slate-800/50 p-8 shadow-2xl ring-1 ring-white/10 backdrop-blur-sm lg:flex-row lg:p-12">
          <div className="max-w-xl text-center lg:text-left">
            <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Özel Fırsatları Kaçırmayın!</h3>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">
              Erken rezervasyon indirimleri, yeni eklenen villalar ve tatil rehberlerimizden ilk sizin haberiniz olsun.
            </p>
          </div>
          <form className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <input 
              type="email" 
              placeholder="E-posta adresinizi girin" 
              required 
              className="w-full min-w-0 flex-auto appearance-none rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-base text-white shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm" 
            />
            <button 
              type="submit" 
              className="flex-none rounded-xl bg-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:scale-95"
            >
              Abone Ol
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-12">
          
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-blue-500">
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.99 8.99a.75.75 0 01-1.06 1.06l-1.48-1.48v7.34a1.5 1.5 0 01-1.5 1.5h-3.75a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-1.5a.75.75 0 00-.75.75v4.5a.75.75 0 01-.75.75H5.48a1.5 1.5 0 01-1.5-1.5v-7.34L2.5 13.89a.75.75 0 01-1.06-1.06l8.99-8.99z" />
              </svg>
              <span className="text-3xl font-extrabold tracking-tighter text-white">
                egleniyoruz<span className="text-blue-500">villa</span>_da
              </span>
            </Link>
            <p className="mt-6 max-w-md text-base leading-relaxed text-slate-400">
              Türkiye'nin en seçkin lokasyonlarında, yüksek kalite standartlarında donatılmış kiralık lüks villalar. Unutulmaz bir tatil deneyimi için güvenilir rezervasyon altyapısı ve 7/24 müşteri memnuniyeti.
            </p>
            
            <ul className="mt-8 space-y-4 text-sm">
              <li className="flex items-center gap-3 transition-colors hover:text-white">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-800 text-blue-400 ring-1 ring-white/10">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.08-7.074-6.974l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">Müşteri Hizmetleri</span>
                  <a href="tel:+908501234567" className="text-base font-medium text-slate-200">+90 (850) 123 45 67</a>
                </div>
              </li>
              <li className="flex items-center gap-3 transition-colors hover:text-white">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-800 text-blue-400 ring-1 ring-white/10">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">E-Posta Desteği</span>
                  <a href="mailto:destek@egleniyoruzvillada.com" className="text-base font-medium text-slate-200">destek@egleniyoruzvillada.com</a>
                </div>
              </li>
              <li className="flex items-center gap-3 transition-colors hover:text-white">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-800 text-blue-400 ring-1 ring-white/10">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">Merkez Ofis</span>
                  <address className="text-base font-medium not-italic text-slate-200">Menteşe, Muğla, Türkiye</address>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Popüler Bölgeler</h3>
            <ul className="mt-6 flex flex-col space-y-4 text-sm">
              <li><Link href="/bolge/kalkan" className="group flex items-center transition-colors hover:text-blue-400"><span className="mr-2 h-1 w-1 rounded-full bg-slate-700 transition-colors group-hover:bg-blue-400"></span>Kalkan Villaları</Link></li>
              <li><Link href="/bolge/fethiye" className="group flex items-center transition-colors hover:text-blue-400"><span className="mr-2 h-1 w-1 rounded-full bg-slate-700 transition-colors group-hover:bg-blue-400"></span>Fethiye Villaları</Link></li>
              <li><Link href="/bolge/kas" className="group flex items-center transition-colors hover:text-blue-400"><span className="mr-2 h-1 w-1 rounded-full bg-slate-700 transition-colors group-hover:bg-blue-400"></span>Kaş Villaları</Link></li>
              <li><Link href="/bolge/bodrum" className="group flex items-center transition-colors hover:text-blue-400"><span className="mr-2 h-1 w-1 rounded-full bg-slate-700 transition-colors group-hover:bg-blue-400"></span>Bodrum Villaları</Link></li>
              <li><Link href="/bolge/marmaris" className="group flex items-center transition-colors hover:text-blue-400"><span className="mr-2 h-1 w-1 rounded-full bg-slate-700 transition-colors group-hover:bg-blue-400"></span>Marmaris Villaları</Link></li>
              <li><Link href="/bolge/gocek" className="group flex items-center transition-colors hover:text-blue-400"><span className="mr-2 h-1 w-1 rounded-full bg-slate-700 transition-colors group-hover:bg-blue-400"></span>Göcek Villaları</Link></li>
              <li><Link href="/bolge/antalya" className="group flex items-center transition-colors hover:text-blue-400"><span className="mr-2 h-1 w-1 rounded-full bg-slate-700 transition-colors group-hover:bg-blue-400"></span>Antalya Merkez</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Kategoriler</h3>
            <ul className="mt-6 flex flex-col space-y-4 text-sm">
              <li><Link href="/kategori/balayi" className="group flex items-center transition-colors hover:text-blue-400"><span className="mr-2 h-1 w-1 rounded-full bg-slate-700 transition-colors group-hover:bg-blue-400"></span>Balayı Villaları</Link></li>
              <li><Link href="/kategori/muhafazakar" className="group flex items-center transition-colors hover:text-blue-400"><span className="mr-2 h-1 w-1 rounded-full bg-slate-700 transition-colors group-hover:bg-blue-400"></span>Muhafazakar Villalar</Link></li>
              <li><Link href="/kategori/isitmahhavuzlu" className="group flex items-center transition-colors hover:text-blue-400"><span className="mr-2 h-1 w-1 rounded-full bg-slate-700 transition-colors group-hover:bg-blue-400"></span>Isıtmalı Havuzlu</Link></li>
              <li><Link href="/kategori/denizmanzarali" className="group flex items-center transition-colors hover:text-blue-400"><span className="mr-2 h-1 w-1 rounded-full bg-slate-700 transition-colors group-hover:bg-blue-400"></span>Deniz Manzaralı</Link></li>
              <li><Link href="/kategori/evcil-hayvan-izinli" className="group flex items-center transition-colors hover:text-blue-400"><span className="mr-2 h-1 w-1 rounded-full bg-slate-700 transition-colors group-hover:bg-blue-400"></span>Evcil Hayvan İzinli</Link></li>
              <li><Link href="/kategori/genis-aile" className="group flex items-center transition-colors hover:text-blue-400"><span className="mr-2 h-1 w-1 rounded-full bg-slate-700 transition-colors group-hover:bg-blue-400"></span>Geniş Aile Villaları</Link></li>
              <li><Link href="/kategori/luks" className="group flex items-center transition-colors hover:text-blue-400"><span className="mr-2 h-1 w-1 rounded-full bg-slate-700 transition-colors group-hover:bg-blue-400"></span>Ultra Lüks Villalar</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Kurumsal & Yardım</h3>
            <ul className="mt-6 flex flex-col space-y-4 text-sm">
              <li><Link href="/hakkimizda" className="group flex items-center transition-colors hover:text-blue-400"><span className="mr-2 h-1 w-1 rounded-full bg-slate-700 transition-colors group-hover:bg-blue-400"></span>Hakkımızda</Link></li>
              <li><Link href="/nasil-kiralarim" className="group flex items-center transition-colors hover:text-blue-400"><span className="mr-2 h-1 w-1 rounded-full bg-slate-700 transition-colors group-hover:bg-blue-400"></span>Nasıl Kiralarım?</Link></li>
              <li><Link href="/sss" className="group flex items-center transition-colors hover:text-blue-400"><span className="mr-2 h-1 w-1 rounded-full bg-slate-700 transition-colors group-hover:bg-blue-400"></span>Sıkça Sorulan Sorular</Link></li>
              <li><Link href="/blog" className="group flex items-center transition-colors hover:text-blue-400"><span className="mr-2 h-1 w-1 rounded-full bg-slate-700 transition-colors group-hover:bg-blue-400"></span>Tatil Blogu & Rehber</Link></li>
              <li><Link href="/iletisim" className="group flex items-center transition-colors hover:text-blue-400"><span className="mr-2 h-1 w-1 rounded-full bg-slate-700 transition-colors group-hover:bg-blue-400"></span>İletişim Formu</Link></li>
              <li><Link href="/kariyer" className="group flex items-center transition-colors hover:text-blue-400"><span className="mr-2 h-1 w-1 rounded-full bg-slate-700 transition-colors group-hover:bg-blue-400"></span>Kariyer Fırsatları</Link></li>
              <li><Link href="/kvkk" className="group flex items-center transition-colors hover:text-blue-400"><span className="mr-2 h-1 w-1 rounded-full bg-slate-700 transition-colors group-hover:bg-blue-400"></span>KVKK Aydınlatma Metni</Link></li>
            </ul>
          </div>

        </div>

        <div className="mt-16 flex flex-col items-center border-t border-white/10 pt-8 lg:flex-row lg:justify-between">
          
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 transition-all hover:-translate-y-1 hover:text-blue-500">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-slate-400 transition-all hover:-translate-y-1 hover:text-pink-500">
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-slate-400 transition-all hover:-translate-y-1 hover:text-black hover:bg-white hover:rounded-full">
              <span className="sr-only">X (Twitter)</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
              </svg>
            </a>
            <a href="#" className="text-slate-400 transition-all hover:-translate-y-1 hover:text-red-500">
              <span className="sr-only">YouTube</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
              </svg>
            </a>
          </div>

          <p className="mt-8 text-sm leading-5 text-slate-500 lg:mt-0">
            &copy; {new Date().getFullYear()} egleniyoruzvilla_da, Inc. Tüm hakları uluslararası kanunlarla korunmaktadır.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-500 lg:mt-0 lg:justify-end">
            <Link href="/kullanim-kosullari" className="transition-colors hover:text-slate-300">Kullanım Koşulları</Link>
            <span className="hidden text-slate-700 sm:inline">|</span>
            <Link href="/gizlilik-politikasi" className="transition-colors hover:text-slate-300">Gizlilik Politikası</Link>
            <span className="hidden text-slate-700 sm:inline">|</span>
            <Link href="/cerez-politikasi" className="transition-colors hover:text-slate-300">Çerez Politikası</Link>
            <span className="hidden text-slate-700 sm:inline">|</span>
            <Link href="/iptal-iade" className="transition-colors hover:text-slate-300">İptal ve İade Koşulları</Link>
          </div>
          
        </div>
      </div>
    </footer>
  );
}