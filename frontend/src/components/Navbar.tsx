import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        
        {/* Logo Kısmı */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-extrabold tracking-tight text-slate-900">
            egleniyoruz<span className="text-blue-600">villa</span>_da
          </span>
        </Link>
        
        {/* Masaüstü Menü */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Anasayfa
          </Link>
          <Link href="/villalar" className="hover:text-blue-600 transition-colors">
            Tüm Villalar
          </Link>
          <Link href="/hakkimizda" className="hover:text-blue-600 transition-colors">
            Hakkımızda
          </Link>
          <Link href="/iletisim" className="hover:text-blue-600 transition-colors">
            İletişim
          </Link>
        </nav>

        {/* Aksiyon Butonu ve Mobil Menü İkonu */}
        <div className="flex items-center gap-4">
          <Link 
            href="/villalar" 
            className="hidden md:inline-flex h-11 items-center justify-center rounded-lg bg-blue-600 px-8 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            Hemen Keşfet
          </Link>
          
          {/* Mobil Hamburger Menü (Şimdilik sadece UI) */}
          <button className="md:hidden rounded-md p-2 text-slate-600 hover:bg-slate-100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12"/>
              <line x1="4" x2="20" y1="6" y2="6"/>
              <line x1="4" x2="20" y1="18" y2="18"/>
            </svg>
          </button>
        </div>

      </div>
    </header>
  );
}