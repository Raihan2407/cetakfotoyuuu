import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, MapPin, Phone, Check, Sparkles, Camera, Heart, ArrowRight, Star, Zap, Clock, Package, Truck, Calculator, Users, Award } from 'lucide-react';

const siteData = {
  brand: "cetakfotoyuuu",
  slogan: "Hasil Bersih dan Glossy",
  whatsapp: "6281277666982",
  instagram: "https://www.instagram.com/cetakfotoyuuu?igsh=YnE4MHNqdmZ0dzA=",
  location: { lat: -0.548778, lng: 104.529882 },
  pricing: [
    { size: "4R", price: 40000, priceStr: "40.000", desc: "10 x 15 cm" },
    { size: "5R", price: 50000, priceStr: "50.000", desc: "13 x 18 cm", popular: true },
    { size: "8R", price: 80000, priceStr: "80.000", desc: "20 x 25 cm" },
    { size: "10R", price: 100000, priceStr: "100.000", desc: "25 x 30 cm" }
  ],
  gallery: [
    "/gallery/galeri1.jpg",
    "/gallery/galeri2.jpg",
    "/gallery/galeri3.jpg",
    "/gallery/galeri4.jpg",
    "/gallery/galeri5.jpg",
    "/gallery/galeri6.jpg"
  ],
  deliveryInfo: [
    { icon: Clock, title: "Pengerjaan Cepat", desc: "1-2 hari kerja untuk hasil terbaik" },
    { icon: Package, title: "Pickup & Delivery", desc: "Ambil di tempat atau kirim ke alamat" },
    { icon: Truck, title: "Area Coverage", desc: "Tanjung Pinang dan sekitarnya" }
  ]
};

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showFloatingWA, setShowFloatingWA] = useState(false);
  
  // Calculator state
  const [selectedSize, setSelectedSize] = useState(siteData.pricing[1]);
  const [quantity, setQuantity] = useState(10);
  const [total, setTotal] = useState(500000);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const whatsappLink = `https://wa.me/${siteData.whatsapp}`;

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

  // ⬇️ TAMBAHKAN useEffect INI:
useEffect(() => {
  const handleMouseMove = (e) => {
    const hero = document.getElementById('beranda');
    if (hero) {
      const rect = hero.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
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
      return `https://wa.me/${siteData.whatsapp}?text=Halo%20CetakFotoYuu!%0A%0ASaya%20ingin%20memesan:%0AUkuran:%20${selectedSize.size}%20(${selectedSize.desc})%0AJumlah:%20${quantity}%20lembar%0ATotal:%20${formatRupiah(total)}%0A%0AMohon%20info%20lebih%20lanjut.%20Terima%20kasih!`;
    } else if (type === 'price') {
      return `https://wa.me/${siteData.whatsapp}?text=Halo%20CetakFotoYuu!%20Saya%20ingin%20tanya%20harga%20cetak%20foto.`;
    } else if (type === 'order') {
      return `https://wa.me/${siteData.whatsapp}?text=Halo%20CetakFotoYuu!%20Saya%20ingin%20memesan%20cetak%20foto.`;
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
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse-ring {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
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
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=1920&q=80')" }}        >
          <div className="absolute inset-0 hero-gradient"></div>
          
          {/* Cursor Spotlight Effect */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-0 md:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle 500px at ${mousePosition.x}px ${mousePosition.y}px, rgba(96, 165, 250, 0.25), transparent 70%)`,
            }}
          ></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <div className="animate-fade-in">
            {/* Social Proof Badges */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                  <Users className="text-blue-400" size={20} />
                  <span className="text-white font-semibold text-sm">1000+ Pelanggan Puas</span>
                </div>
                
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                  <Star className="text-yellow-400 fill-yellow-400" size={20} />
                  <span className="text-white font-semibold text-sm">Rating 5.0</span>
                </div>
              </div>
            
            <h1 className="text-6xl lg:text-8xl font-black text-white mb-8 leading-tight tracking-tight drop-shadow-2xl">
              {siteData.brand}
            </h1>
            
            <p className="text-3xl lg:text-4xl font-bold text-white mb-6 drop-shadow-lg">
              {siteData.slogan}
            </p>
            
            <p className="text-xl lg:text-2xl text-white/90 mb-12 font-light max-w-3xl mx-auto drop-shadow-md">
              Cetak kenangan berharga Anda dengan hasil glossy premium yang tahan lama
            </p>
            
            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href={getWhatsAppMessage('order')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-4 rounded-full text-lg font-bold shadow-2xl shadow-blue-500/50 transition-all duration-300 transform hover:scale-105"
              >
                Order Sekarang
                <ArrowRight size={24} />
              </a>
              
              <a
                href={getWhatsAppMessage('price')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-10 py-4 rounded-full text-lg font-bold border-2 border-white/30 transition-all duration-300"
              >
                Tanya Harga
              </a>
              
              <a
                href="#layanan"
                className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-10 py-4 rounded-full text-lg font-bold border-2 border-white/30 transition-all duration-300"
              >
                Lihat Katalog
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

          <div className="grid md:grid-cols-3 gap-10 fade-on-scroll">
            {[
              { icon: Sparkles, title: "Glossy Premium", desc: "Hasil cetak mengkilap dengan warna yang hidup dan tajam" },
              { icon: Camera, title: "Detail Sempurna", desc: "Teknologi cetak modern untuk reproduksi warna akurat" },
              { icon: Heart, title: "Tanpa Minimal Order", desc: "Pesan 1 foto atau 1000 foto, kami siap melayani" }
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
        </div>
      </section>

      {/* Price Calculator Section */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
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
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Section */}
              <div className="space-y-8">
                <div>
                  <label className="block text-gray-700 font-bold mb-4 text-lg">Pilih Ukuran Foto</label>
                  <div className="grid grid-cols-2 gap-4">
                    {siteData.pricing.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedSize(item)}
                        className={`p-5 rounded-2xl font-bold transition-all transform hover:scale-105 ${
                          selectedSize.size === item.size
                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl shadow-blue-500/30'
                            : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="text-2xl mb-1">{item.size}</div>
                        <div className={`text-sm ${selectedSize.size === item.size ? 'text-blue-100' : 'text-gray-500'}`}>
                          {item.desc}
                        </div>
                        <div className={`text-lg mt-2 ${selectedSize.size === item.size ? 'text-white' : 'text-gray-700'}`}>
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
                      className="w-14 h-14 bg-white border-2 border-gray-300 rounded-xl font-bold text-2xl hover:bg-gray-50 transition"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="flex-1 text-center text-3xl font-bold bg-white border-2 border-gray-300 rounded-xl py-3 focus:border-blue-500 focus:outline-none"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-14 h-14 bg-white border-2 border-gray-300 rounded-xl font-bold text-2xl hover:bg-gray-50 transition"
                    >
                      +
                    </button>
                  </div>
                  
                  {/* Quick Select */}
                  <div className="flex gap-2 mt-4">
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
              </div>

              {/* Result Section */}
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
                      <span>Harga per lembar:</span>
                      <span className="font-bold text-white">Rp {selectedSize.priceStr}</span>
                    </div>
                    <div className="flex justify-between text-blue-100">
                      <span>Jumlah:</span>
                      <span className="font-bold text-white">{quantity} lembar</span>
                    </div>
                  </div>
                </div>

                <a
                  href={getWhatsAppMessage('calculator')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl"
                >
                  Order via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="layanan" className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20 fade-on-scroll">
            <div className="inline-block bg-blue-100 text-blue-600 px-6 py-2 rounded-full font-bold text-sm mb-6">
              HARGA TRANSPARAN
            </div>
            <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6">
              Pilih Ukuran <span className="gradient-text">Favorit Anda</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
              Tanpa minimal order • Kualitas terjamin • Harga bersahabat
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 fade-on-scroll">
            {siteData.pricing.map((item, i) => (
              <div key={i} className={`relative bg-gradient-to-br ${item.popular ? 'from-blue-600 to-blue-700' : 'from-gray-50 to-white'} p-8 rounded-3xl shadow-2xl hover-lift border-2 ${item.popular ? 'border-blue-400 scale-105' : 'border-gray-200'}`}>
                {item.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-6 py-2 rounded-full font-bold text-sm shadow-lg">
                    POPULER
                  </div>
                )}
                
                <div className="text-center">
                  <div className={`text-5xl font-black mb-2 ${item.popular ? 'text-white' : 'gradient-text'}`}>
                    {item.size}
                  </div>
                  <p className={`text-sm mb-6 ${item.popular ? 'text-blue-100' : 'text-gray-500'}`}>
                    {item.desc}
                  </p>
                  
                  <div className={`text-4xl font-black mb-8 ${item.popular ? 'text-white' : 'text-gray-900'}`}>
                    Rp {item.priceStr}
                    <span className={`text-sm font-normal block mt-2 ${item.popular ? 'text-blue-100' : 'text-gray-500'}`}>
                      per lembar
                    </span>
                  </div>
                  
                  <a
                    href={getWhatsAppMessage('order')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full py-4 rounded-2xl font-bold transition-all transform hover:scale-105 ${
                      item.popular 
                        ? 'bg-white text-blue-600 shadow-xl' 
                        : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30'
                    }`}
                  >
                    Pesan Sekarang
                  </a>
                </div>
              </div>
            ))}
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
                <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <span className="text-white font-bold text-lg">Hasil Glossy Premium</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
              { num: "01", title: "Pilih Ukuran", desc: "Tentukan ukuran foto yang Anda inginkan dari pilihan kami", icon: Camera },
              { num: "02", title: "Kirim Foto", desc: "Upload foto terbaik Anda via WhatsApp dengan kualitas tinggi", icon: Phone },
              { num: "03", title: "Konfirmasi", desc: "Diskusikan detail pesanan dan metode pembayaran", icon: Check },
              { num: "04", title: "Selesai", desc: "Terima hasil cetak glossy premium Anda", icon: Sparkles }
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
              <p className="text-white text-xl font-semibold mb-6">
                Bayar setelah barang jadi atau di awal, sesuai kenyamanan Anda!
              </p>
              <a
                href={getWhatsAppMessage('order')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-blue-600 hover:bg-gray-100 px-10 py-5 rounded-full font-bold text-lg shadow-xl transition-all transform hover:scale-105"
              >
                <Phone size={24} />
                Mulai Order Sekarang
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
                    <p className="text-gray-400 text-sm mt-2">Chat langsung untuk order dan konsultasi</p>
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
                    <p className="text-gray-400 text-sm mt-2">Follow untuk update & testimoni pelanggan</p>
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
                <p>Cetak Foto 4R</p>
                <p>Cetak Foto 5R</p>
                <p>Cetak Foto 8R</p>
                <p>Cetak Foto 10R</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Hubungi Kami</h4>
              <div className="space-y-3 text-gray-400">
                <p>WhatsApp: +62 812-7766-6982</p>
                <a href={siteData.instagram} target="_blank" rel="noopener noreferrer" className="block hover:text-white transition">
                  Instagram: @cetakfotoyuuu
                </a>
                <p>Tanjung Pinang, Riau Islands</p>
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