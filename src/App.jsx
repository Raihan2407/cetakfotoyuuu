import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Instagram, MapPin, Phone, Check, Sparkles, Camera, Heart, ArrowRight, Star, Users, Award, Calculator, Clock, Package, Truck, Flame, Zap, BookOpen, Calendar, Shield, RotateCcw, Play, ChevronLeft, ChevronRight } from 'lucide-react';

const siteData = {
  brand: "cetakfotoyuu",
  slogan: "Hasil Bersih dan Glossy",
  whatsapp: "6281277666982",
  instagram: "https://www.instagram.com/cetakfotoyuuu?igsh=YnE4MHNqdmZ0dzA=",
  location: { lat: -0.548778, lng: 104.529882 },
  
  pricing: [
    { size: "2R", price: 1000, priceStr: "1.000", desc: "6 x 9 cm", finish: "Glossy/Matte" },
    { size: "3R", price: 1800, priceStr: "1.800", desc: "9 x 13 cm", finish: "Glossy/Matte" },
    { size: "4R", price: 2000, priceStr: "2.000", desc: "10 x 15 cm", finish: "Glossy/Matte" },
    { size: "5R", price: 4000, priceStr: "4.000", desc: "13 x 18 cm", popular: true, finish: "Glossy/Matte" },
    { size: "6R", price: 6000, priceStr: "6.000", desc: "15 x 20 cm", finish: "Glossy/Matte" },
    { size: "8R", price: 15000, priceStr: "15.000", desc: "20 x 25 cm", finish: "Glossy Premium" },
    { size: "10R", price: 18000, priceStr: "18.000", desc: "25 x 30 cm", finish: "Glossy Premium" },
    { size: "12R", price: 23000, priceStr: "23.000", desc: "30 x 40 cm", finish: "Glossy Premium" },
    { size: "Poster", price: 25000, priceStr: "25.000", desc: "32 x 48 cm", finish: "Glossy Premium" }
  ],
  
  otherProducts: [
    { name: "Cetak Foto Kayu", desc: "Foto dengan frame kayu natural", priceInfo: "Mulai Rp 20.000", icon: Flame },
    { name: "Kalender Custom", desc: "Kalender dengan foto pribadi", priceInfo: "Mulai Rp 15.000", icon: Calendar },
    { name: "Yasin Tahlil", desc: "Cetak yasin dengan desain elegan", priceInfo: "Mulai Rp 9.000", icon: BookOpen }
  ],
  
  gallery: [
      "/gallery/galery1.jpg",
      "/gallery/galery2.jpg",
      "/gallery/galery3.jpg",
      "/gallery/galery4.jpg",
      "/gallery/galery5.jpg",
      "/gallery/galery6.jpg"
  ],
  
  // Video showcase
  mainVideo: "/videos/showcase.mp4", // Upload file .mp4 ke public/videos/
  
  // Instagram Reels - Ganti dengan URL Reels Anda
  // Format: https://www.instagram.com/p/KODE_REEL/embed (bukan /reel/)
  instagramReels: [
  "https://www.instagram.com/reel/DSxAHS8E6NY/",
  "https://www.instagram.com/reel/DSw_zMwk_zS/",
  "https://www.instagram.com/reel/DSOnUkKE6Ay/",
  "https://www.instagram.com/reel/DRS9lj7Exld/",
  "https://www.instagram.com/reel/DOk-oz-EXcU/"
],
  
  deliveryInfo: [
    { icon: Clock, title: "Pengerjaan Cepat", desc: "1-2 hari kerja untuk hasil terbaik" },
    { icon: Package, title: "Pickup & Delivery", desc: "Ambil di tempat atau kirim ke alamat" },
    { icon: Truck, title: "Area Coverage", desc: "Dabo Singkep dan sekitarnya" }
  ]
};

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showFloatingWA, setShowFloatingWA] = useState(false);
  
  const [selectedSize, setSelectedSize] = useState(siteData.pricing[3]);
  const [quantity, setQuantity] = useState(10);
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [finishing, setFinishing] = useState('Glossy');
  const [total, setTotal] = useState(40000);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  const whatsappLink = `https://wa.me/${siteData.whatsapp}`;

  const scrollReels = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = container.offsetWidth;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowFloatingWA(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.fade-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setTotal(selectedSize.price * quantity);
  }, [selectedSize, quantity]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const hero = document.getElementById('beranda');
      if (hero) {
        const rect = hero.getBoundingClientRect();
        setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    };
    const heroElement = document.getElementById('beranda');
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (heroElement) {
        heroElement.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
  };

  const getWhatsAppMessage = (type = 'general') => {
    if (type === 'calculator') {
      const name = customerName.trim() || '[Isi Nama Anda]';
      const address = customerAddress.trim() || '[Isi Alamat Anda]';
      return `https://wa.me/${siteData.whatsapp}?text=Halo%20CetakFotoYuu!%20%F0%9F%93%B8%0A%0ASaya%20ingin%20memesan:%0A%0ANama%20:%20${encodeURIComponent(name)}%0AAlamat%20:%20${encodeURIComponent(address)}%0AUkuran%20Order%20:%20${selectedSize.size}%20(${selectedSize.desc})%0AFinishing%20:%20${finishing}%0AJumlah%20:%20${quantity}%20lembar%0ATotal%20Estimasi%20:%20${formatRupiah(total)}%0A%0ACatatan:%0A-%20Foto%20akan%20saya%20kirim%20setelah%20ini%0A-%20Mohon%20info%20ketersediaan%20dan%20waktu%20pengerjaan%0A%0ATerima%20kasih!%20%F0%9F%99%8F`;
    } else if (type === 'price') {
      return `https://wa.me/${siteData.whatsapp}?text=Halo%20CetakFotoYuu!%20%F0%9F%93%B8%0A%0ASaya%20ingin%20tanya%20harga%20cetak%20foto.%0A%0AMohon%20info%20lengkapnya.%20Terima%20kasih!`;
    } else if (type === 'order') {
      return `https://wa.me/${siteData.whatsapp}?text=Halo%20CetakFotoYuu!%20%F0%9F%93%B8%0A%0ASaya%20ingin%20memesan%20cetak%20foto.%0A%0AMohon%20info%20lebih%20lanjut.%20Terima%20kasih!`;
    } else if (type === 'other') {
      return `https://wa.me/${siteData.whatsapp}?text=Halo%20CetakFotoYuu!%20%F0%9F%93%B8%0A%0ASaya%20ingin%20tanya%20tentang%20produk:%0A-%20Cetak%20Foto%20Kayu%0A-%20Kalender%20Custom%0A-%20Yasin%20Tahlil%0A%0AMohon%20info%20harga%20dan%20detailnya.%20Terima%20kasih!`;
    }
    return whatsappLink;
  };

  return (
    <div className="bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        .animate-fade-in {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        
        .pulse-ring {
          animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
        }
        
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.25);
        }
        
        .hero-gradient {
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.85) 0%, rgba(29, 78, 216, 0.7) 100%);
        }
      `}</style>

      {/* Floating WhatsApp Button */}
      <a
        href={getWhatsAppMessage('order')}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-8 right-8 z-50 transition-all duration-500 ${showFloatingWA ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'}`}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-green-500 rounded-full pulse-ring"></div>
          <div className="relative bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-5 rounded-full shadow-2xl hover:shadow-green-500/50 transition-all transform hover:scale-110">
            <Phone size={28} />
          </div>
        </div>
      </a>

      {/* Navigation */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${scrolled ? 'glass-effect shadow-xl' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-24">
            <div className="flex-shrink-0">
              <h1 className={`text-3xl lg:text-4xl font-black tracking-tight transition-all duration-300 ${scrolled ? 'gradient-text' : 'text-white drop-shadow-lg'}`}>
                {siteData.brand}
              </h1>
            </div>
            
            <div className="hidden lg:flex items-center space-x-2">
              {['Beranda', 'Layanan', 'Galeri', 'Cara Order', 'Kontak'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    scrolled 
                      ? 'text-gray-700 hover:bg-blue-50 hover:text-blue-600' 
                      : 'text-white hover:bg-white/20 backdrop-blur-sm'
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>

            <a
              href={getWhatsAppMessage('order')}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3.5 rounded-full font-bold shadow-2xl shadow-blue-500/40 transition-all duration-300 transform hover:scale-105"
            >
              <Phone size={20} />
              Hubungi Kami
            </a>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className={`lg:hidden p-2 rounded-lg ${scrolled ? 'text-gray-800' : 'text-white'}`}
            >
              {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden glass-effect border-t border-gray-200">
            <div className="px-6 py-8 space-y-4">
              {['Beranda', 'Layanan', 'Galeri', 'Cara Order', 'Kontak'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-6 py-4 text-gray-800 hover:bg-blue-50 hover:text-blue-600 rounded-2xl font-semibold transition-all"
                >
                  {item}
                </a>
              ))}
              <a
                href={getWhatsAppMessage('order')}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-2xl font-bold shadow-xl"
              >
                Hubungi Kami
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="beranda" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/gallery/hero.jpg')" }}
        >
          <div className="absolute inset-0 hero-gradient"></div>
          <div 
            className="absolute inset-0 pointer-events-none opacity-0 md:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle 500px at ${mousePosition.x}px ${mousePosition.y}px, rgba(96, 165, 250, 0.25), transparent 70%)`,
            }}
          ></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <div className="animate-fade-in">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                <Users className="text-blue-400" size={20} />
                <span className="text-white font-semibold text-sm">1000+ Pelanggan Puas</span>
              </div>
              
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                <Star className="text-yellow-400 fill-yellow-400" size={20} />
                <span className="text-white font-semibold text-sm">Rating 5.0</span>
              </div>
              
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                <Shield className="text-green-400" size={20} />
                <span className="text-white font-semibold text-sm">Garansi Kepuasan</span>
              </div>
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-black text-white mb-8 leading-tight tracking-tight drop-shadow-2xl">
              {siteData.brand}
            </h1>
            
            <p className="text-3xl lg:text-4xl font-bold text-white mb-6 drop-shadow-lg">
              {siteData.slogan}
            </p>
            
            <p className="text-xl lg:text-2xl text-white/90 mb-4 font-light max-w-3xl mx-auto drop-shadow-md">
              Cetak kenangan berharga Anda dengan hasil glossy premium yang tahan lama
            </p>
            
            <p className="text-lg text-white/80 mb-12 font-medium max-w-2xl mx-auto">
              ✨ Tanpa Minimal Order • Bayar Setelah Jadi • Cetak Ulang Gratis Jika Tidak Puas
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href={getWhatsAppMessage('order')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-4 rounded-full text-lg font-bold shadow-2xl shadow-blue-500/50 transition-all duration-300 transform hover:scale-105"
              >
                🔥 Order Sekarang
                <ArrowRight size={24} />
              </a>
              
              <a
                href="#layanan"
                className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-10 py-4 rounded-full text-lg font-bold border-2 border-white/30 transition-all duration-300"
              >
                Lihat Harga
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tentang Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20 fade-on-scroll">
            <div className="inline-block bg-blue-100 text-blue-600 px-6 py-2 rounded-full font-bold text-sm mb-6">
              MENGAPA KAMI?
            </div>
            <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6">
              Cetak Foto <span className="gradient-text">Berkualitas Premium</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Kami menggunakan teknologi cetak terkini untuk menghasilkan foto dengan warna tajam, detail sempurna, dan hasil glossy yang tahan lama
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 fade-on-scroll mb-16">
            {[
              { icon: Sparkles, title: "Glossy Premium", desc: "Ukuran 8R keatas dengan hasil glossy maksimal yang memukau" },
              { icon: Camera, title: "Glossy & Matte", desc: "Ukuran 2R-6R tersedia dalam pilihan glossy atau matte sesuai selera" },
              { icon: Heart, title: "Tanpa Minimal Order", desc: "Pesan 1 foto atau 1000 foto, kami siap melayani dengan kualitas terbaik" }
            ].map((item, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl shadow-xl hover-lift border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                  <item.icon className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{item.desc}</p>
              </div>
            ))}
          </div>
          
          {/* Info Glossy/Matte Box */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 rounded-3xl shadow-2xl fade-on-scroll">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="text-white" size={24} />
                </div>
                <div className="text-white">
                  <p className="font-bold text-lg">2R - 6R: Glossy/Matte 😍</p>
                  <p className="text-blue-100 text-sm">Pilih sesuai preferensi Anda</p>
                </div>
              </div>
              
              <div className="w-px h-12 bg-white/20 hidden md:block"></div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Zap className="text-yellow-400" size={24} />
                </div>
                <div className="text-white">
                  <p className="font-bold text-lg">8R keatas: Glossy Banget 😍</p>
                  <p className="text-blue-100 text-sm">Hasil kilap maksimal premium</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Price Calculator Section */}
      <section className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 fade-on-scroll">
            <div className="inline-block bg-blue-100 text-blue-600 px-6 py-2 rounded-full font-bold text-sm mb-6">
              <Calculator className="inline mr-2" size={16} />
              HITUNG HARGA
            </div>
            <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6">
              Kalkulator <span className="gradient-text">Harga</span>
            </h2>
            <p className="text-xl text-gray-600">
              Hitung estimasi harga cetak foto Anda
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-white p-10 lg:p-12 rounded-3xl shadow-2xl border-2 border-blue-100 fade-on-scroll">
            <div className="grid lg:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-bold mb-4 text-lg">Pilih Ukuran Foto</label>
                  <div className="grid grid-cols-3 gap-3">
                    {siteData.pricing.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedSize(item)}
                        className={`p-4 rounded-xl font-bold transition-all transform hover:scale-105 relative ${
                          selectedSize.size === item.size
                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl shadow-blue-500/30'
                            : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        {item.popular && (
                          <div className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-xs font-black px-2 py-1 rounded-full">
                            TOP
                          </div>
                        )}
                        <div className="text-xl mb-1">{item.size}</div>
                        <div className={`text-xs ${selectedSize.size === item.size ? 'text-blue-100' : 'text-gray-500'}`}>
                          Rp {item.priceStr}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-4 text-lg">Jumlah Foto</label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 bg-white border-2 border-gray-300 rounded-xl font-bold text-xl hover:bg-gray-50 transition"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="flex-1 text-center text-2xl font-bold bg-white border-2 border-gray-300 rounded-xl py-2 focus:border-blue-500 focus:outline-none"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 bg-white border-2 border-gray-300 rounded-xl font-bold text-xl hover:bg-gray-50 transition"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex gap-2 mt-3">
                    {[10, 25, 50, 100].map((num) => (
                      <button
                        key={num}
                        onClick={() => setQuantity(num)}
                        className="flex-1 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold hover:bg-blue-50 hover:border-blue-300 transition"
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                                {selectedSize.finish.includes('Matte') && (
                  <div>
                    <label className="block text-gray-700 font-bold mb-4 text-lg">Pilih Finishing</label>
                    <div className="grid grid-cols-2 gap-4">
                      {['Glossy', 'Matte'].map((type) => (
                        <button
                          key={type}
                          onClick={() => setFinishing(type)}
                          className={`p-4 rounded-xl font-bold transition-all ${
                            finishing === type
                              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                              : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-300'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {!selectedSize.finish.includes('Matte') && (
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                    <p className="text-blue-700 font-semibold flex items-center gap-2">
                      <Sparkles size={20} />
                      Ukuran {selectedSize.size} otomatis menggunakan <strong>Glossy Premium</strong>
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-gray-700 font-bold mb-4 text-lg">Data Pemesan</label>
                  <input
                    type="text"
                    placeholder="Nama Lengkap"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none mb-3"
                  />
                  <textarea
                    placeholder="Alamat Lengkap (Jl, No, Kelurahan, Kecamatan)"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    rows="2"
                    className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 rounded-2xl text-white flex flex-col justify-between">
                <div>
                  <div className="text-blue-100 mb-2 text-sm font-semibold">Total Estimasi Harga</div>
                  <div className="text-5xl font-black mb-6">{formatRupiah(total)}</div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-blue-100">
                      <span>Ukuran:</span>
                      <span className="font-bold text-white">{selectedSize.size} ({selectedSize.desc})</span>
                    </div>
                    <div className="flex justify-between text-blue-100">
                      <span>Finishing:</span>
                      <span className="font-bold text-white">{selectedSize.finish.includes('Matte') ? finishing : 'Glossy Premium'}</span>
                    </div>
                    <div className="flex justify-between text-blue-100">
                      <span>Harga/lembar:</span>
                      <span className="font-bold text-white">Rp {selectedSize.priceStr}</span>
                    </div>
                    <div className="flex justify-between text-blue-100">
                      <span>Jumlah:</span>
                      <span className="font-bold text-white">{quantity} lembar</span>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl mb-4">
                    <p className="text-sm text-blue-100 mb-2">📝 Yang perlu disiapkan:</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>✓ File foto berkualitas tinggi</li>
                      <li>✓ Data lengkap (nama & alamat)</li>
                      <li>✓ Foto akan dikirim via WhatsApp</li>
                    </ul>
                  </div>
                </div>

                <a
                  href={getWhatsAppMessage('calculator')}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (!customerName.trim() || !customerAddress.trim()) {
                      e.preventDefault();
                      alert('⚠️ Mohon lengkapi Nama dan Alamat terlebih dahulu!');
                    }
                  }}
                  className="block text-center bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl"
                >
                  💬 Order via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Table Section */}
      <section id="layanan" className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20 fade-on-scroll">
            <div className="inline-block bg-blue-100 text-blue-600 px-6 py-2 rounded-full font-bold text-sm mb-6">
              DAFTAR HARGA
            </div>
            <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6">
              Harga <span className="gradient-text">Terjangkau</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
              Tanpa minimal order • Kualitas terjamin • Harga transparan
            </p>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block bg-white rounded-3xl shadow-2xl overflow-hidden fade-on-scroll mb-16">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <tr>
                    <th className="px-6 py-5 text-left text-sm font-bold uppercase">Ukuran</th>
                    <th className="px-6 py-5 text-left text-sm font-bold uppercase">Dimensi</th>
                    <th className="px-6 py-5 text-left text-sm font-bold uppercase">Finishing</th>
                    <th className="px-6 py-5 text-right text-sm font-bold uppercase">Harga</th>
                    <th className="px-6 py-5 text-center text-sm font-bold uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {siteData.pricing.map((item, i) => (
                    <tr key={i} className={`hover:bg-blue-50 transition ${item.popular ? 'bg-blue-50/50' : ''}`}>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-black gradient-text">{item.size}</span>
                          {item.popular && (
                            <span className="bg-yellow-400 text-gray-900 text-xs font-black px-3 py-1 rounded-full">
                              POPULER
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-gray-600 font-medium">{item.desc}</td>
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                          <Sparkles size={14} />
                          {item.finish}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <span className="text-2xl font-black text-gray-900">Rp {item.priceStr}</span>
                        <span className="text-sm text-gray-500 block">per lembar</span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <a
                          href={getWhatsAppMessage('order')}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-full font-bold text-sm transition-all transform hover:scale-105"
                        >
                          Order
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden grid gap-4 fade-on-scroll mb-16">
            {siteData.pricing.map((item, i) => (
              <div key={i} className={`bg-white p-6 rounded-2xl shadow-lg border-2 relative ${item.popular ? 'border-yellow-400 bg-yellow-50/30' : 'border-gray-200'}`}>
                {item.popular && (
                  <div className="absolute -top-3 -right-3 bg-yellow-400 text-gray-900 text-xs font-black px-4 py-2 rounded-full shadow-lg animate-pulse">
                    ⭐ POPULER
                  </div>
                )}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-3xl font-black gradient-text mb-1">{item.size}</div>
                    <div className="text-sm text-gray-600">{item.desc}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-gray-900">Rp {item.priceStr}</div>
                    <div className="text-xs text-gray-500">per lembar</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                    <Sparkles size={14} />
                    {item.finish}
                  </span>
                  <a
                    href={getWhatsAppMessage('order')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full font-bold text-sm"
                  >
                    Order
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Other Products Section */}
          <div className="fade-on-scroll">
            <h3 className="text-3xl font-black text-gray-900 mb-8 text-center">Produk Lainnya</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {siteData.otherProducts.map((product, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl shadow-xl hover-lift border border-gray-100">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30">
                    <product.icon className="text-white" size={32} />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h4>
                  <p className="text-gray-600 mb-4">{product.desc}</p>
                  <p className="text-blue-600 font-bold text-lg mb-6">{product.priceInfo}</p>
                  <a
                    href={getWhatsAppMessage('other')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold transition"
                  >
                    💬 Tanya Detail
                    <ArrowRight size={18} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Info Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20 fade-on-scroll">
            <div className="inline-block bg-blue-100 text-blue-600 px-6 py-2 rounded-full font-bold text-sm mb-6">
              INFORMASI PENGIRIMAN
            </div>
            <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6">
              Layanan <span className="gradient-text">Pengiriman</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Kami memberikan berbagai pilihan untuk kenyamanan Anda
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 fade-on-scroll">
            {siteData.deliveryInfo.map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-blue-50 to-white p-10 rounded-3xl shadow-xl hover-lift border border-blue-100">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30 mx-auto">
                  <item.icon className="text-white" size={36} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg text-center">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center fade-on-scroll">
            <a
              href={getWhatsAppMessage('order')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-4 rounded-full font-bold text-lg shadow-2xl shadow-blue-500/40 transition-all duration-300 transform hover:scale-105"
            >
              <Phone size={24} />
              Tanya Detail Pengiriman
            </a>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="galeri" className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20 fade-on-scroll">
            <div className="inline-block bg-blue-100 text-blue-600 px-6 py-2 rounded-full font-bold text-sm mb-6">
              PORTOFOLIO
            </div>
            <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6">
              Hasil Cetak <span className="gradient-text">Kami</span>
            </h2>
            <p className="text-xl text-gray-600 mb-4">
              Lihat kualitas hasil cetak foto kami
            </p>
            <a
              href={siteData.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-lg transition"
            >
              <Instagram size={24} />
              Lihat lebih banyak di Instagram
            </a>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 fade-on-scroll">
            {siteData.gallery.map((img, i) => (
              <div key={i} className="relative overflow-hidden rounded-3xl shadow-2xl hover-lift group h-80">
                <img 
                  src={img} 
                  alt={`Gallery ${i + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <span className="text-white font-bold text-lg">Hasil Glossy Premium</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20 fade-on-scroll">
            <div className="inline-block bg-blue-100 text-blue-600 px-6 py-2 rounded-full font-bold text-sm mb-6">
              📹 VIDEO SHOWCASE
            </div>
            <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6">
              Lihat <span className="gradient-text">Proses Kami</span>
            </h2>
            <p className="text-xl text-gray-600">
              Video proses cetak dan hasil kerja kami
            </p>
          </div>

          {/* Main Video .mp4 */}
          <div className="mb-16 fade-on-scroll">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl max-w-4xl mx-auto" style={{ backgroundColor: '#000' }}>
              <video 
                controls 
                className="w-full"
                style={{ maxHeight: '500px', objectFit: 'contain' }}
                poster="/gallery/video.png"
                preload="metadata"
                playsInline
              >
                <source src="/videos/showcase.mp4" type="video/mp4" />
                Browser Anda tidak support video.
              </video>
            </div>
            <p className="text-center text-gray-600 mt-4 font-medium">🎥 Video Proses Cetak Premium</p>
          </div>


          {/* Instagram Reels - Click to Instagram */}
          <div className="fade-on-scroll">
            <h3 className="text-3xl font-black text-gray-900 mb-8 text-center flex items-center justify-center gap-3">
              <Instagram className="text-pink-600" size={32} />
              Instagram Reels
            </h3>
            
            <div className="relative">
              <div 
                ref={scrollContainerRef}
                className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
              >
                {siteData.instagramReels.map((reelUrl, i) => {
                  const titles = [
                    "Proses Cetak Premium",
                    "Hasil Glossy Maksimal", 
                    "Kualitas Warna Tajam",
                    "Testimoni Pelanggan",
                    "Behind The Scene"
                  ];
                  
                  const gradients = [
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
                    "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
                    "linear-gradient(135deg, #475569 0%, #334155 100%)",
                    "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
                  ];
                  
                  return (
                    <a
                      key={i}
                      href={reelUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 w-72 snap-start relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group"
                      style={{ 
                        height: '500px',
                        background: gradients[i]
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-2xl">
                          <Play className="text-pink-600 fill-pink-600 ml-1" size={36} />
                        </div>
                      </div>
                      
                      <div className="absolute top-4 right-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                          <Instagram className="text-white" size={24} />
                        </div>
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                        <h4 className="text-white font-bold text-lg mb-2">{titles[i]}</h4>
                        <div className="flex items-center gap-2 text-white/80 text-sm">
                          <Play size={14} />
                          <span>Tap untuk tonton di Instagram</span>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
              
              <button
                onClick={() => scrollReels('left')}
                className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white hover:bg-gray-50 rounded-full items-center justify-center shadow-xl transition-all z-10"
              >
                <ChevronLeft className="text-gray-800" size={24} />
              </button>
              
              <button
                onClick={() => scrollReels('right')}
                className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white hover:bg-gray-50 rounded-full items-center justify-center shadow-xl transition-all z-10"
              >
                <ChevronRight className="text-gray-800" size={24} />
              </button>
            </div>

            <p className="text-center text-gray-500 mt-8">
              👈 Geser dan tap untuk tonton reels di Instagram
            </p>
          </div>

          <div className="mt-12 text-center fade-on-scroll">
            <a
              href={siteData.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-10 py-4 rounded-full font-bold text-lg shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <Instagram size={24} />
              Follow di Instagram
            </a>
          </div>
        </div>
      </section>

      <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
          
          .animate-fade-in {
            animation: fadeInUp 0.8s ease-out forwards;
          }
          
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes pulse-ring {
            0% { transform: scale(1); opacity: 1; }
            100% { transform: scale(1.5); opacity: 0; }
          }
          
          .pulse-ring {
            animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          
          .gradient-text {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .glass-effect {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
          }
          
          .hover-lift {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .hover-lift:hover {
            transform: translateY(-8px);
            box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.25);
          }
          
          .hero-gradient {
            background: linear-gradient(135deg, rgba(0, 0, 0, 0.85) 0%, rgba(29, 78, 216, 0.7) 100%);
          }
          
          .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        `}</style>

      {/* How to Order Section */}
      <section id="cara-order" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20 fade-on-scroll">
            <div className="inline-block bg-blue-100 text-blue-600 px-6 py-2 rounded-full font-bold text-sm mb-6">
              MUDAH & CEPAT
            </div>
            <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6">
              Cara <span className="gradient-text">Memesan</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 fade-on-scroll">
            {[
              { num: "01", title: "Pilih Ukuran", desc: "Gunakan kalkulator atau lihat daftar harga lengkap", icon: Calculator },
              { num: "02", title: "Isi Data", desc: "Lengkapi nama, alamat, dan pilih finishing", icon: Check },
              { num: "03", title: "Kirim Foto", desc: "Upload foto berkualitas terbaik via WhatsApp", icon: Phone },
              { num: "04", title: "Bayar & Terima", desc: "Bayar setelah jadi atau di awal, lalu terima hasil glossy premium", icon: Sparkles }
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-3xl shadow-xl hover-lift border border-blue-100">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-6xl font-black gradient-text">{step.num}</div>
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <step.icon className="text-white" size={24} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="text-blue-300" size={32} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 text-center fade-on-scroll">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-12 rounded-3xl shadow-2xl shadow-blue-500/30">
              <p className="text-white text-2xl font-bold mb-4">
                💰 Bayar Setelah Barang Jadi atau Di Awal
              </p>
              <p className="text-blue-100 text-lg mb-6">
                Pilih metode pembayaran sesuai kenyamanan Anda!
              </p>
              <a
                href={getWhatsAppMessage('order')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-blue-600 hover:bg-gray-100 px-10 py-5 rounded-full font-bold text-lg shadow-xl transition-all transform hover:scale-105"
              >
                <Phone size={24} />
                🔥 Mulai Order Sekarang
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontak" className="py-32 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20 fade-on-scroll">
            <h2 className="text-5xl lg:text-6xl font-black mb-6">
              Hubungi <span className="text-blue-400">Kami</span>
            </h2>
            <p className="text-xl text-gray-400 font-light">
              Kami siap membantu mewujudkan kenangan terbaik Anda
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 fade-on-scroll">
            <div className="space-y-8">
              <div className="bg-gray-800 p-8 rounded-3xl hover-lift">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Phone size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">WhatsApp</h3>
                    <a href={getWhatsAppMessage('order')} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-lg">
                      +62 812-7766-6982
                    </a>
                    <p className="text-gray-400 text-sm mt-2">💬 Chat langsung - Respons cepat!</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-8 rounded-3xl hover-lift">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Instagram size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Instagram</h3>
                    <a href={siteData.instagram} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-lg">
                      @cetakfotoyuuu
                    </a>
                    <p className="text-gray-400 text-sm mt-2">Follow untuk update & testimoni</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-8 rounded-3xl hover-lift">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Lokasi</h3>
                    <p className="text-gray-400">Dabo Singkep, Kebun Nyiur</p>
                    <p className="text-gray-400 text-sm mt-2">Lihat lokasi lengkap di peta</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 rounded-3xl">
                <h3 className="text-xl font-bold mb-4">Jam Operasional</h3>
                <div className="space-y-2 text-blue-100">
                  <p>Senin - Sabtu: 09:00 - 21:00</p>
                  <p>Minggu: 10:00 - 18:00</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-2xl h-96 lg:h-auto">
              <iframe
                src={`https://maps.google.com/maps?q=${siteData.location.lat},${siteData.location.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                className="w-full h-full"
                style={{ border: 0, minHeight: '500px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-3xl font-black gradient-text mb-4">{siteData.brand}</h3>
              <p className="text-gray-400 leading-relaxed mb-4">{siteData.slogan}</p>
              <p className="text-gray-500 text-sm">
                Cetak kenangan berharga Anda dengan hasil glossy premium yang tahan lama. Dipercaya sejak 2020 oleh 1000+ pelanggan.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Layanan</h4>
              <div className="space-y-3 text-gray-400">
                <p>Cetak Foto (2R-17R)</p>
                <p>Cetak Foto Kayu</p>
                <p>Kalender Custom</p>
                <p>Yasin Tahlil</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Hubungi Kami</h4>
              <div className="space-y-3 text-gray-400">
                <p>WhatsApp: +62 812-7766-6982</p>
                <a href={siteData.instagram} target="_blank" rel="noopener noreferrer" className="block hover:text-white transition">
                  Instagram: @cetakfotoyuuu
                </a>
                <p>Dabo Singkep, Kebun Nyiur</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-center md:text-left">&copy; 2026 {siteData.brand}. Semua hak dilindungi.</p>
            <div className="flex gap-6">
              <a href={getWhatsAppMessage('order')} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition">
                <Phone size={24} />
              </a>
              <a href={siteData.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;