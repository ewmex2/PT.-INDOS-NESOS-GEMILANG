import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AIConsultantWidget from '../components/AIConsultantWidget';
import { useAdminStore } from '../store/adminStore';
import { DEFAULT_CONTENT } from '../lib/firebase';
import { 
  ChevronRight, 
  ChevronDown, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  FileText, 
  Award, 
  Layers, 
  Users, 
  Building, 
  Compass, 
  CheckCircle2,
  Calendar,
  Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Home() {
  const { content, loading } = useAdminStore();
  const [activeServiceId, setActiveServiceId] = useState<string | null>("1");
  const [selectedPortfolioCategory, setSelectedPortfolioCategory] = useState<string>('Semua');

  const data = content || DEFAULT_CONTENT;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-white">
        <div className="text-center">
          <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold mx-auto mb-4 animate-pulse">
            ING
          </div>
          <p className="text-neutral-400 font-medium text-sm">Memuat Profil Perusahaan...</p>
        </div>
      </div>
    );
  }

  const portfolioItems = data.portfolio?.items || DEFAULT_CONTENT.portfolio.items;
  const portfolioCategories = ['Semua', 'Studi Kelayakan', 'DPPT', 'SSH & ASB', 'Produk Pemetaan'];

  const filteredPortfolio = selectedPortfolioCategory === 'Semua' 
    ? portfolioItems 
    : portfolioItems.filter((item: any) => item.category?.toLowerCase().includes(selectedPortfolioCategory.toLowerCase()));

  return (
    <div className="bg-neutral-50 min-h-screen font-sans text-neutral-900 selection:bg-red-600 selection:text-white">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section 
        id="home" 
        className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 overflow-hidden bg-neutral-950 text-white"
      >
        <div className="absolute inset-0 z-0">
          <img 
            src={data.hero?.backgroundImageUrl || DEFAULT_CONTENT.hero.backgroundImageUrl} 
            alt="Hero Background" 
            className="w-full h-full object-cover object-center opacity-30 filter grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/90 to-neutral-900/75"></div>
          {/* Subtle red accent gradient */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-bold uppercase tracking-wider mb-6">
                <Award className="h-3.5 w-3.5 mr-2" />
                {data.hero?.badge || "COMPANY PROFILE 2026"}
              </div>
              
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-4 leading-none">
                {data.hero?.title || "PT. INDOS NESOS GEMILANG"}
              </h1>
              
              <p className="text-xl sm:text-2xl text-red-500 font-extrabold tracking-widest uppercase mb-6">
                {data.hero?.subtitle || "ASSET MANAGEMENT CONSULTANT"}
              </p>
              
              <p className="text-base sm:text-lg text-neutral-300 mb-10 leading-relaxed max-w-2xl font-light">
                {data.hero?.description || DEFAULT_CONTENT.hero.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#services" 
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold transition flex items-center justify-center shadow-lg shadow-red-600/30 group text-sm"
                >
                  {data.hero?.ctaText || "Jelajahi Layanan"}
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="#about" 
                  className="bg-neutral-900/80 hover:bg-neutral-800 text-white px-8 py-4 rounded-xl font-semibold transition border border-neutral-700 flex items-center justify-center text-sm backdrop-blur"
                >
                  Tentang Kami & Legalitas
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. TENTANG KAMI & LEGALITAS */}
      <section id="about" className="py-24 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center px-3.5 py-1.5 rounded-lg bg-red-50 text-red-700 text-xs font-bold uppercase tracking-wider">
                Profil Perusahaan
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight leading-tight">
                {data.about?.title || "TENTANG PERUSAHAAN & LEGALITAS"}
              </h2>
              <p className="text-lg font-bold text-red-600">
                {data.about?.subtitle || "Berdiri Sejak 27 Agustus 1997 di Jakarta"}
              </p>
              <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
                {data.about?.description || DEFAULT_CONTENT.about.description}
              </p>

              <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-4">
                <div className="flex items-center text-neutral-900 font-bold text-sm">
                  <Briefcase className="h-5 w-5 text-red-600 mr-2.5 flex-shrink-0" />
                  <span>Jasa Konsultansi Non-Konstruksi Terpercaya</span>
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Menangani studi kelayakan investasi, sistem informasi manajemen aset daerah (SIMA/SIMBADA), penyusunan DPPT pengadaan tanah strategis nasional dan daerah, hingga standarisasi harga belanja pemerintah.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-neutral-950 text-white rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-800">
                  <div>
                    <h3 className="text-xl font-bold text-white">Riwayat Akta & Legalitas Notaris</h3>
                    <p className="text-xs text-neutral-400 mt-1">Dasar hukum dan akta pendirian resmi perusahaan</p>
                  </div>
                  <FileText className="h-8 w-8 text-red-500 flex-shrink-0" />
                </div>

                <div className="space-y-6 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-neutral-800">
                  {(data.about?.legalHistory || DEFAULT_CONTENT.about.legalHistory).map((item: any, idx: number) => (
                    <div key={idx} className="relative flex items-start pl-8 group">
                      <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-red-600 border-2 border-neutral-950 group-hover:scale-125 transition-transform"></div>
                      <div className="bg-neutral-900/90 p-4 rounded-xl border border-neutral-800/80 w-full hover:border-neutral-700 transition">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-bold text-white">{item.title}</span>
                          <span className="text-[11px] font-extrabold text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-800/40">
                            {item.year}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-300 leading-relaxed">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. PRODUK LAYANAN BISNIS (7 Layanan Lengkap & Pengalaman Proyek) */}
      <section id="services" className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center px-3.5 py-1.5 rounded-lg bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider mb-3">
              Layanan Unggulan
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
              {data.services?.sectionTitle || "PRODUK LAYANAN BISNIS"}
            </h2>
            <p className="text-neutral-600 mt-3 text-sm sm:text-base">
              {data.services?.sectionSubtitle || "Solusi Konsultansi Komprehensif & Berbasis Regulasi"}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Service selector tabs (List 1-7) */}
            <div className="lg:col-span-5 space-y-3">
              {(data.services?.items || DEFAULT_CONTENT.services.items).map((service: any) => {
                const isActive = activeServiceId === service.id;
                return (
                  <button
                    key={service.id}
                    onClick={() => setActiveServiceId(service.id)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition duration-200 flex items-start justify-between ${
                      isActive 
                        ? 'bg-neutral-950 text-white border-neutral-900 shadow-xl' 
                        : 'bg-white text-neutral-800 border-neutral-200 hover:border-red-300 hover:bg-red-50/40'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm mr-4 flex-shrink-0 ${
                        isActive ? 'bg-red-600 text-white' : 'bg-neutral-100 text-neutral-800'
                      }`}>
                        {service.id}
                      </div>
                      <div>
                        <h3 className={`font-bold text-sm sm:text-base leading-snug ${isActive ? 'text-white' : 'text-neutral-900'}`}>
                          {service.title}
                        </h3>
                        <p className={`text-xs mt-1 line-clamp-1 ${isActive ? 'text-neutral-400' : 'text-neutral-500'}`}>
                          {service.shortDesc || service.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className={`h-5 w-5 ml-2 flex-shrink-0 mt-2 transition-transform ${isActive ? 'text-red-500 translate-x-1' : 'text-neutral-400'}`} />
                  </button>
                );
              })}
            </div>

            {/* Active Service Detail Panel */}
            <div className="lg:col-span-7">
              {(() => {
                const current = (data.services?.items || DEFAULT_CONTENT.services.items).find((s: any) => s.id === activeServiceId) || (data.services?.items || DEFAULT_CONTENT.services.items)[0];
                return (
                  <motion.div 
                    key={current.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35 }}
                    className="bg-white rounded-3xl p-8 sm:p-10 border border-neutral-200 shadow-xl space-y-8"
                  >
                    <div className="flex items-center space-x-4 border-b border-neutral-100 pb-6">
                      <span className="w-12 h-12 bg-red-600 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-md">
                        {current.id}
                      </span>
                      <div>
                        <span className="text-xs font-bold text-red-600 uppercase tracking-widest">Detail Layanan</span>
                        <h3 className="text-xl sm:text-2xl font-black text-neutral-900 leading-tight">
                          {current.title}
                        </h3>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Deskripsi & Ruang Lingkup</h4>
                      <p className="text-neutral-700 text-sm sm:text-base leading-relaxed bg-neutral-50 p-5 rounded-2xl border border-neutral-100">
                        {current.description}
                      </p>
                    </div>

                    {current.projects && current.projects.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center">
                            <Layers className="h-4 w-4 text-red-600 mr-2" />
                            Pengalaman Proyek Terkait ({current.projects.length})
                          </h4>
                        </div>
                        <div className="max-h-80 overflow-y-auto pr-2 space-y-2.5">
                          {current.projects.map((proj: string, pIdx: number) => (
                            <div 
                              key={pIdx}
                              className="flex items-start p-3 bg-white rounded-xl border border-neutral-200 text-xs sm:text-sm text-neutral-800 hover:border-red-300 hover:bg-neutral-50 transition"
                            >
                              <div className="w-2 h-2 rounded-full bg-red-600 mt-1.5 mr-3 flex-shrink-0"></div>
                              <span className="leading-snug">{proj}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })()}
            </div>

          </div>

        </div>
      </section>

      {/* 4. PRODUK PORTOFOLIO & PEMETAAN */}
      <section id="portfolio" className="py-24 bg-white border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center px-3.5 py-1.5 rounded-lg bg-neutral-100 text-neutral-800 text-xs font-bold uppercase tracking-wider mb-3">
              Portofolio Karya
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
              {data.portfolio?.sectionTitle || "PRODUK PORTOFOLIO & PEMETAAN"}
            </h2>
            <p className="text-neutral-600 mt-2 text-sm sm:text-base">
              {data.portfolio?.sectionSubtitle || "Katalog Laporan Studi, DPPT, SSH, dan Produk Pemetaan Digital"}
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {portfolioCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedPortfolioCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition whitespace-nowrap ${
                    selectedPortfolioCategory === cat
                      ? 'bg-red-600 text-white shadow-md'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPortfolio.map((item: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-neutral-50 p-6 rounded-2xl border border-neutral-200 hover:border-red-300 hover:shadow-lg transition group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-extrabold text-red-700 bg-red-100/80 px-2.5 py-1 rounded-md">
                      {item.category}
                    </span>
                    {item.year && (
                      <span className="text-xs text-neutral-500 font-semibold flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        {item.year}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-neutral-900 text-base mb-2 group-hover:text-red-600 transition leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-neutral-200/70 flex items-center text-xs font-semibold text-neutral-500 group-hover:text-red-600 transition">
                  <Compass className="h-3.5 w-3.5 mr-1.5 text-red-500" />
                  <span>Kajian & Dokumen Resmi PT. ING</span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. DOKUMENTASI PROYEK & KEGIATAN LAPANGAN */}
      <section id="documentation" className="py-24 bg-neutral-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center px-3.5 py-1.5 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-bold uppercase tracking-wider mb-3">
              Galeri Kegiatan
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {data.documentation?.sectionTitle || "DOKUMENTASI KEGIATAN & PROYEK"}
            </h2>
            <p className="text-neutral-400 mt-2 text-sm sm:text-base">
              {data.documentation?.sectionSubtitle || "Dokumentasi Focus Group Discussion (FGD), Rapat Koordinasi, dan Survei Lapangan"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(data.documentation?.activities || DEFAULT_CONTENT.documentation.activities).map((act: any, idx: number) => (
              <div 
                key={idx}
                className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 hover:border-neutral-700 transition"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-xs text-red-400 font-bold">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    <span>{act.location}</span>
                  </div>
                  {act.year && (
                    <span className="text-[11px] bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded font-mono">
                      {act.year}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 leading-snug">{act.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {act.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. TIM KAMI 2025 (Semua Divisi) */}
      <section id="team" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center px-3.5 py-1.5 rounded-lg bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider mb-3">
              Struktur Organisasi
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
              {data.team?.sectionTitle || "TIM KAMI 2025"}
            </h2>
            <p className="text-neutral-600 mt-2 text-sm sm:text-base">
              {data.team?.description || "Didukung oleh tenaga ahli profesional, bersertifikat, dan berpengalaman di berbagai bidang."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {(data.team?.members || DEFAULT_CONTENT.team.members).map((member: any, idx: number) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 hover:border-red-300 hover:shadow-md transition flex items-start"
              >
                <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center mr-3.5 flex-shrink-0 font-bold text-sm">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[11px] font-extrabold text-red-600 uppercase tracking-wider block">
                    {member.role}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-neutral-900 mt-0.5 leading-snug">
                    {member.name}
                  </h4>
                  {member.category && (
                    <span className="inline-block mt-2 text-[10px] bg-neutral-200 text-neutral-700 px-2 py-0.5 rounded font-medium">
                      {member.category}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. DAFTAR BANK REKANAN */}
      <section id="clients" className="py-20 bg-neutral-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase mb-2">
            {data.clients?.sectionTitle || "DAFTAR BANK REKANAN"}
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm max-w-2xl mx-auto mb-12">
            {data.clients?.sectionSubtitle || "Kepercayaan Lembaga Keuangan Terhadap Kredibilitas Investigasi Aset Kami"}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {(data.clients?.banks || DEFAULT_CONTENT.clients.banks).map((bank: any, idx: number) => {
              const name = typeof bank === 'string' ? bank : bank.name;
              return (
                <div 
                  key={idx} 
                  className="bg-neutral-900/90 border border-neutral-800 p-4 rounded-xl flex items-center justify-center text-center hover:border-red-500/50 hover:bg-neutral-800 transition group"
                >
                  <span className="text-xs sm:text-sm font-bold text-neutral-300 group-hover:text-white transition">
                    {name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. FOOTER WITH DYNAMIC CONTACTS */}
      <Footer contacts={data.contacts} clients={data.clients} />

      {/* 9. FLOATING AI CONSULTANT WIDGET (Gemini 3.7 Flash) */}
      <AIConsultantWidget />
    </div>
  );
}
