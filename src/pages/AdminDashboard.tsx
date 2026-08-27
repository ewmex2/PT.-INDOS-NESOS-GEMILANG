import React, { useState } from 'react';
import { useAdminStore } from '../store/adminStore';
import { 
  Settings, 
  LogOut, 
  LayoutTemplate, 
  Type, 
  Image as ImageIcon, 
  Save, 
  CheckCircle, 
  Plus, 
  Trash2, 
  Building2, 
  Layers, 
  Users, 
  Compass, 
  Camera, 
  Landmark, 
  Mail, 
  Phone, 
  Clock, 
  MapPin,
  FileCheck,
  AlertCircle,
  ExternalLink,
  Menu,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_CONTENT } from '../lib/firebase';

type AdminTab = 'hero' | 'about' | 'services' | 'portfolio' | 'documentation' | 'team' | 'clients' | 'contacts';

export default function AdminDashboard() {
  const { content, updateContent, logout } = useAdminStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<AdminTab>('hero');
  const [formData, setFormData] = useState<any>(content || DEFAULT_CONTENT);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Keep local state in sync if content updates
  React.useEffect(() => {
    if (content) {
      setFormData(content);
    }
  }, [content]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');
    try {
      await updateContent(formData);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3500);
    } catch (err) {
      console.error(err);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  // Helper updater for top-level sections
  const updateSectionField = (section: string, field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // --- CONTACTS HANDLERS (Add, Edit, Delete Offices, Emails, Phones) ---
  const handleAddOffice = () => {
    const newOffice = {
      id: `office-${Date.now()}`,
      title: "Kantor Baru",
      address: "Alamat kantor baru...",
      phone: "0812-XXXX-XXXX",
      email: "info@indosnesos.co",
      isPrimary: false
    };
    setFormData((prev: any) => ({
      ...prev,
      contacts: {
        ...prev.contacts,
        offices: [...(prev.contacts?.offices || []), newOffice]
      }
    }));
  };

  const handleUpdateOffice = (index: number, field: string, value: any) => {
    const updated = [...(formData.contacts?.offices || [])];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev: any) => ({
      ...prev,
      contacts: {
        ...prev.contacts,
        offices: updated
      }
    }));
  };

  const handleDeleteOffice = (index: number) => {
    const updated = [...(formData.contacts?.offices || [])];
    updated.splice(index, 1);
    setFormData((prev: any) => ({
      ...prev,
      contacts: {
        ...prev.contacts,
        offices: updated
      }
    }));
  };

  // Email handlers
  const handleAddEmail = () => {
    const emails = [...(formData.contacts?.emails || [])];
    emails.push("email.baru@indosnesos.co");
    setFormData((prev: any) => ({
      ...prev,
      contacts: { ...prev.contacts, emails }
    }));
  };

  const handleUpdateEmail = (index: number, value: string) => {
    const emails = [...(formData.contacts?.emails || [])];
    emails[index] = value;
    setFormData((prev: any) => ({
      ...prev,
      contacts: { ...prev.contacts, emails }
    }));
  };

  const handleDeleteEmail = (index: number) => {
    const emails = [...(formData.contacts?.emails || [])];
    emails.splice(index, 1);
    setFormData((prev: any) => ({
      ...prev,
      contacts: { ...prev.contacts, emails }
    }));
  };

  // Phone handlers
  const handleAddPhone = () => {
    const phones = [...(formData.contacts?.phones || [])];
    phones.push("0812-XXXX-XXXX");
    setFormData((prev: any) => ({
      ...prev,
      contacts: { ...prev.contacts, phones }
    }));
  };

  const handleUpdatePhone = (index: number, value: string) => {
    const phones = [...(formData.contacts?.phones || [])];
    phones[index] = value;
    setFormData((prev: any) => ({
      ...prev,
      contacts: { ...prev.contacts, phones }
    }));
  };

  const handleDeletePhone = (index: number) => {
    const phones = [...(formData.contacts?.phones || [])];
    phones.splice(index, 1);
    setFormData((prev: any) => ({
      ...prev,
      contacts: { ...prev.contacts, phones }
    }));
  };

  // --- SERVICES HANDLERS ---
  const handleAddService = () => {
    const nextId = String((formData.services?.items?.length || 0) + 1);
    const newService = {
      id: nextId,
      title: "Layanan Baru",
      shortDesc: "Deskripsi singkat layanan...",
      description: "Deskripsi lengkap ruang lingkup dan dasar hukum...",
      projects: ["Contoh Pengalaman Proyek 1"]
    };
    setFormData((prev: any) => ({
      ...prev,
      services: {
        ...prev.services,
        items: [...(prev.services?.items || []), newService]
      }
    }));
  };

  const handleUpdateService = (index: number, field: string, value: any) => {
    const items = [...(formData.services?.items || [])];
    items[index] = { ...items[index], [field]: value };
    setFormData((prev: any) => ({
      ...prev,
      services: { ...prev.services, items }
    }));
  };

  const handleDeleteService = (index: number) => {
    const items = [...(formData.services?.items || [])];
    items.splice(index, 1);
    setFormData((prev: any) => ({
      ...prev,
      services: { ...prev.services, items }
    }));
  };

  const handleAddProjectToService = (serviceIndex: number) => {
    const items = [...(formData.services?.items || [])];
    const projects = [...(items[serviceIndex].projects || [])];
    projects.push("Pengalaman Proyek Baru...");
    items[serviceIndex].projects = projects;
    setFormData((prev: any) => ({
      ...prev,
      services: { ...prev.services, items }
    }));
  };

  const handleUpdateServiceProject = (serviceIndex: number, projectIndex: number, value: string) => {
    const items = [...(formData.services?.items || [])];
    const projects = [...(items[serviceIndex].projects || [])];
    projects[projectIndex] = value;
    items[serviceIndex].projects = projects;
    setFormData((prev: any) => ({
      ...prev,
      services: { ...prev.services, items }
    }));
  };

  const handleDeleteServiceProject = (serviceIndex: number, projectIndex: number) => {
    const items = [...(formData.services?.items || [])];
    const projects = [...(items[serviceIndex].projects || [])];
    projects.splice(projectIndex, 1);
    items[serviceIndex].projects = projects;
    setFormData((prev: any) => ({
      ...prev,
      services: { ...prev.services, items }
    }));
  };

  // --- PORTFOLIO HANDLERS ---
  const handleAddPortfolio = () => {
    const newItem = {
      title: "Judul Portofolio / Kajian Baru",
      category: "Studi Kelayakan",
      year: new Date().getFullYear().toString(),
      description: "Deskripsi singkat hasil dokumen laporan atau pemetaan..."
    };
    setFormData((prev: any) => ({
      ...prev,
      portfolio: {
        ...prev.portfolio,
        items: [...(prev.portfolio?.items || []), newItem]
      }
    }));
  };

  const handleUpdatePortfolio = (index: number, field: string, value: string) => {
    const items = [...(formData.portfolio?.items || [])];
    items[index] = { ...items[index], [field]: value };
    setFormData((prev: any) => ({
      ...prev,
      portfolio: { ...prev.portfolio, items }
    }));
  };

  const handleDeletePortfolio = (index: number) => {
    const items = [...(formData.portfolio?.items || [])];
    items.splice(index, 1);
    setFormData((prev: any) => ({
      ...prev,
      portfolio: { ...prev.portfolio, items }
    }));
  };

  // --- TEAM HANDLERS ---
  const handleAddTeamMember = () => {
    const newMember = {
      role: "Tenaga Ahli Baru",
      name: "Nama Lengkap & Gelar",
      category: "Tenaga Ahli"
    };
    setFormData((prev: any) => ({
      ...prev,
      team: {
        ...prev.team,
        members: [...(prev.team?.members || []), newMember]
      }
    }));
  };

  const handleUpdateTeamMember = (index: number, field: string, value: string) => {
    const members = [...(formData.team?.members || [])];
    members[index] = { ...members[index], [field]: value };
    setFormData((prev: any) => ({
      ...prev,
      team: { ...prev.team, members }
    }));
  };

  const handleDeleteTeamMember = (index: number) => {
    const members = [...(formData.team?.members || [])];
    members.splice(index, 1);
    setFormData((prev: any) => ({
      ...prev,
      team: { ...prev.team, members }
    }));
  };

  // --- CLIENTS / BANKS HANDLERS ---
  const handleAddBank = () => {
    const newBank = { name: "Bank Baru", location: "Batam" };
    setFormData((prev: any) => ({
      ...prev,
      clients: {
        ...prev.clients,
        banks: [...(prev.clients?.banks || []), newBank]
      }
    }));
  };

  const handleUpdateBank = (index: number, value: string) => {
    const banks = [...(formData.clients?.banks || [])];
    if (typeof banks[index] === 'string') {
      banks[index] = value;
    } else {
      banks[index] = { ...banks[index], name: value };
    }
    setFormData((prev: any) => ({
      ...prev,
      clients: { ...prev.clients, banks }
    }));
  };

  const handleDeleteBank = (index: number) => {
    const banks = [...(formData.clients?.banks || [])];
    banks.splice(index, 1);
    setFormData((prev: any) => ({
      ...prev,
      clients: { ...prev.clients, banks }
    }));
  };

  // --- DOCUMENTATION HANDLERS ---
  const handleAddDocActivity = () => {
    const newAct = {
      title: "Kegiatan Baru",
      location: "Lokasi Kegiatan",
      year: new Date().getFullYear().toString(),
      description: "Deskripsi kegiatan..."
    };
    setFormData((prev: any) => ({
      ...prev,
      documentation: {
        ...prev.documentation,
        activities: [...(prev.documentation?.activities || []), newAct]
      }
    }));
  };

  const handleUpdateDocActivity = (index: number, field: string, value: string) => {
    const activities = [...(formData.documentation?.activities || [])];
    activities[index] = { ...activities[index], [field]: value };
    setFormData((prev: any) => ({
      ...prev,
      documentation: { ...prev.documentation, activities }
    }));
  };

  const handleDeleteDocActivity = (index: number) => {
    const activities = [...(formData.documentation?.activities || [])];
    activities.splice(index, 1);
    setFormData((prev: any) => ({
      ...prev,
      documentation: { ...prev.documentation, activities }
    }));
  };

  return (
    <div className="flex h-screen bg-neutral-100 font-sans antialiased text-neutral-900 overflow-hidden relative">
      
      {/* Mobile Backdrop Overlay */}
      {isMobileNavOpen && (
        <div 
          onClick={() => setIsMobileNavOpen(false)} 
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-30 lg:hidden"
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-72 sm:w-80 bg-neutral-950 text-white flex flex-col shadow-2xl border-r border-neutral-800 transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Brand Header */}
        <div className="p-5 sm:p-6 flex items-center justify-between border-b border-neutral-800/80">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-neutral-900 border-2 border-red-600 rounded-xl flex items-center justify-center font-black mr-3 shadow-md">
              <span className="text-white text-xs">in</span>
              <span className="text-red-500 text-sm ml-0.5">G</span>
            </div>
            <div>
              <h1 className="font-extrabold text-sm text-white leading-tight">Admin Control Panel</h1>
              <p className="text-[11px] text-neutral-400">PT. INDOS NESOS GEMILANG</p>
            </div>
          </div>
          <button 
            onClick={() => setIsMobileNavOpen(false)}
            className="lg:hidden text-neutral-400 hover:text-white p-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Sidebar Nav items */}
        <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
          
          <button 
            onClick={() => { setActiveTab('hero'); setIsMobileNavOpen(false); }}
            className={`w-full flex items-center p-3 rounded-xl transition text-xs font-bold ${
              activeTab === 'hero' ? 'bg-red-600 text-white shadow-md' : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
            }`}
          >
            <LayoutTemplate className="h-4 w-4 mr-3 text-red-400" />
            1. Hero Section & Header
          </button>

          <button 
            onClick={() => { setActiveTab('about'); setIsMobileNavOpen(false); }}
            className={`w-full flex items-center p-3 rounded-xl transition text-xs font-bold ${
              activeTab === 'about' ? 'bg-red-600 text-white shadow-md' : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
            }`}
          >
            <Building2 className="h-4 w-4 mr-3 text-red-400" />
            2. Tentang & Legalitas Notaris
          </button>

          <button 
            onClick={() => { setActiveTab('services'); setIsMobileNavOpen(false); }}
            className={`w-full flex items-center p-3 rounded-xl transition text-xs font-bold ${
              activeTab === 'services' ? 'bg-red-600 text-white shadow-md' : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
            }`}
          >
            <Layers className="h-4 w-4 mr-3 text-red-400" />
            3. Layanan & Proyek (Pages)
          </button>

          <button 
            onClick={() => { setActiveTab('portfolio'); setIsMobileNavOpen(false); }}
            className={`w-full flex items-center p-3 rounded-xl transition text-xs font-bold ${
              activeTab === 'portfolio' ? 'bg-red-600 text-white shadow-md' : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
            }`}
          >
            <Compass className="h-4 w-4 mr-3 text-red-400" />
            4. Portofolio & Pemetaan
          </button>

          <button 
            onClick={() => { setActiveTab('documentation'); setIsMobileNavOpen(false); }}
            className={`w-full flex items-center p-3 rounded-xl transition text-xs font-bold ${
              activeTab === 'documentation' ? 'bg-red-600 text-white shadow-md' : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
            }`}
          >
            <Camera className="h-4 w-4 mr-3 text-red-400" />
            5. Dokumentasi Kegiatan (FGD)
          </button>

          <button 
            onClick={() => { setActiveTab('team'); setIsMobileNavOpen(false); }}
            className={`w-full flex items-center p-3 rounded-xl transition text-xs font-bold ${
              activeTab === 'team' ? 'bg-red-600 text-white shadow-md' : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
            }`}
          >
            <Users className="h-4 w-4 mr-3 text-red-400" />
            6. Tim Tenaga Ahli (2025)
          </button>

          <button 
            onClick={() => { setActiveTab('clients'); setIsMobileNavOpen(false); }}
            className={`w-full flex items-center p-3 rounded-xl transition text-xs font-bold ${
              activeTab === 'clients' ? 'bg-red-600 text-white shadow-md' : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
            }`}
          >
            <Landmark className="h-4 w-4 mr-3 text-red-400" />
            7. Bank Rekanan
          </button>

          <button 
            onClick={() => { setActiveTab('contacts'); setIsMobileNavOpen(false); }}
            className={`w-full flex items-center p-3 rounded-xl transition text-xs font-bold ${
              activeTab === 'contacts' ? 'bg-red-600 text-white shadow-md' : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
            }`}
          >
            <Phone className="h-4 w-4 mr-3 text-red-400" />
            8. Pengaturan Kontak Kami
          </button>

        </nav>

        {/* Sidebar Footer Controls */}
        <div className="p-4 border-t border-neutral-800 space-y-2">
          <button 
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-center p-2.5 text-xs text-neutral-300 hover:text-white hover:bg-neutral-900 rounded-lg transition font-semibold border border-neutral-800"
          >
            <ExternalLink className="h-3.5 w-3.5 mr-2" />
            Lihat Website Utama
          </button>
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center p-2.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-lg transition font-semibold"
          >
            <LogOut className="h-3.5 w-3.5 mr-2" />
            Keluar (Logout)
          </button>
        </div>
      </aside>

      {/* Main Panel Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden w-full">
        
        {/* Top bar with save actions */}
        <header className="bg-white shadow-sm border-b border-neutral-200 px-4 sm:px-8 py-3.5 sm:py-4 flex justify-between items-center z-20">
          <div className="flex items-center">
            <button
              onClick={() => setIsMobileNavOpen(true)}
              className="lg:hidden p-2 -ml-2 mr-2 text-neutral-700 hover:text-neutral-950 rounded-lg hover:bg-neutral-100"
              aria-label="Buka menu navigasi admin"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div>
              <span className="text-[10px] sm:text-xs font-extrabold text-red-600 uppercase tracking-widest block">
                Live Editor • Firestore
              </span>
              <h2 className="text-base sm:text-xl font-black text-neutral-900 leading-tight">
                {activeTab === 'hero' && 'Hero Section'}
                {activeTab === 'about' && 'Tentang & Legalitas'}
                {activeTab === 'services' && 'Layanan & Proyek'}
                {activeTab === 'portfolio' && 'Portofolio & Peta'}
                {activeTab === 'documentation' && 'Dokumentasi Kegiatan'}
                {activeTab === 'team' && 'Tim Tenaga Ahli'}
                {activeTab === 'clients' && 'Bank Rekanan'}
                {activeTab === 'contacts' && 'Kontak & Kantor'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {saveStatus === 'success' && (
              <span className="hidden sm:flex items-center text-green-700 font-bold text-xs bg-green-50 px-3 py-1.5 rounded-xl border border-green-200 shadow-sm animate-fade-in">
                <CheckCircle className="h-3.5 w-3.5 mr-1.5 text-green-600" /> Tersimpan
              </span>
            )}
            {saveStatus === 'error' && (
              <span className="hidden sm:flex items-center text-red-700 font-bold text-xs bg-red-50 px-3 py-1.5 rounded-xl border border-red-200 shadow-sm">
                <AlertCircle className="h-3.5 w-3.5 mr-1.5 text-red-600" /> Gagal
              </span>
            )}

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl font-bold transition disabled:opacity-50 shadow-md shadow-red-600/20 text-xs uppercase tracking-wider"
            >
              <Save className="h-4 w-4 mr-1.5 sm:mr-2" />
              {isSaving ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </header>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto p-8 bg-neutral-100/70">
          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-sm border border-neutral-200 p-8 space-y-8">
            
            {/* 1. HERO SECTION */}
            {activeTab === 'hero' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase mb-2">Badge Tahun</label>
                    <input 
                      type="text" 
                      value={formData.hero?.badge || ''}
                      onChange={(e) => updateSectionField('hero', 'badge', e.target.value)}
                      className="w-full p-3 border border-neutral-300 rounded-xl text-sm focus:ring-2 focus:ring-red-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase mb-2">Tahun Profil</label>
                    <input 
                      type="text" 
                      value={formData.hero?.year || ''}
                      onChange={(e) => updateSectionField('hero', 'year', e.target.value)}
                      className="w-full p-3 border border-neutral-300 rounded-xl text-sm focus:ring-2 focus:ring-red-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-2">Nama Perusahaan (Title)</label>
                  <input 
                    type="text" 
                    value={formData.hero?.title || ''}
                    onChange={(e) => updateSectionField('hero', 'title', e.target.value)}
                    className="w-full p-3 border border-neutral-300 rounded-xl text-sm font-bold focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-2">Sub-Title Perusahaan</label>
                  <input 
                    type="text" 
                    value={formData.hero?.subtitle || ''}
                    onChange={(e) => updateSectionField('hero', 'subtitle', e.target.value)}
                    className="w-full p-3 border border-neutral-300 rounded-xl text-sm focus:ring-2 focus:ring-red-500 outline-none font-semibold text-red-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-2">Deskripsi Hero</label>
                  <textarea 
                    rows={4}
                    value={formData.hero?.description || ''}
                    onChange={(e) => updateSectionField('hero', 'description', e.target.value)}
                    className="w-full p-3 border border-neutral-300 rounded-xl text-sm focus:ring-2 focus:ring-red-500 outline-none resize-y leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase mb-2">Teks Tombol CTA Utama</label>
                    <input 
                      type="text" 
                      value={formData.hero?.ctaText || ''}
                      onChange={(e) => updateSectionField('hero', 'ctaText', e.target.value)}
                      className="w-full p-3 border border-neutral-300 rounded-xl text-sm focus:ring-2 focus:ring-red-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase mb-2">Teks Tombol Sekunder</label>
                    <input 
                      type="text" 
                      value={formData.hero?.ctaSecondaryText || ''}
                      onChange={(e) => updateSectionField('hero', 'ctaSecondaryText', e.target.value)}
                      className="w-full p-3 border border-neutral-300 rounded-xl text-sm focus:ring-2 focus:ring-red-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-2">URL Gambar Latar Belakang</label>
                  <input 
                    type="text" 
                    value={formData.hero?.backgroundImageUrl || ''}
                    onChange={(e) => updateSectionField('hero', 'backgroundImageUrl', e.target.value)}
                    className="w-full p-3 border border-neutral-300 rounded-xl text-sm focus:ring-2 focus:ring-red-500 outline-none"
                  />
                  {formData.hero?.backgroundImageUrl && (
                    <div className="mt-3 h-48 rounded-xl overflow-hidden border border-neutral-200 relative bg-neutral-900">
                      <img 
                        src={formData.hero.backgroundImageUrl} 
                        alt="Hero preview" 
                        className="w-full h-full object-cover opacity-60 grayscale"
                      />
                      <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[11px] px-2 py-1 rounded">
                        Pratinjau Hero Background
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 2. TENTANG & LEGALITAS */}
            {activeTab === 'about' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-2">Judul Bagian</label>
                  <input 
                    type="text" 
                    value={formData.about?.title || ''}
                    onChange={(e) => updateSectionField('about', 'title', e.target.value)}
                    className="w-full p-3 border border-neutral-300 rounded-xl text-sm font-bold focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-2">Sub-Judul / Sejarah Pendirian</label>
                  <input 
                    type="text" 
                    value={formData.about?.subtitle || ''}
                    onChange={(e) => updateSectionField('about', 'subtitle', e.target.value)}
                    className="w-full p-3 border border-neutral-300 rounded-xl text-sm focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-2">Deskripsi Lengkap Profil</label>
                  <textarea 
                    rows={4}
                    value={formData.about?.description || ''}
                    onChange={(e) => updateSectionField('about', 'description', e.target.value)}
                    className="w-full p-3 border border-neutral-300 rounded-xl text-sm focus:ring-2 focus:ring-red-500 outline-none resize-y leading-relaxed"
                  />
                </div>

                <div className="pt-4 border-t border-neutral-200">
                  <h4 className="text-sm font-bold text-neutral-900 mb-4 flex items-center">
                    <FileCheck className="h-4 w-4 mr-2 text-red-600" />
                    Riwayat Akta & Legalitas Notaris
                  </h4>
                  <div className="space-y-4">
                    {(formData.about?.legalHistory || []).map((legal: any, lIdx: number) => (
                      <div key={lIdx} className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                        <div className="md:col-span-2">
                          <label className="block text-[10px] font-bold text-neutral-400 uppercase">Tahun</label>
                          <input 
                            type="text" 
                            value={legal.year}
                            onChange={(e) => {
                              const list = [...formData.about.legalHistory];
                              list[lIdx].year = e.target.value;
                              updateSectionField('about', 'legalHistory', list);
                            }}
                            className="w-full p-2 border border-neutral-300 rounded-lg text-xs font-bold"
                          />
                        </div>
                        <div className="md:col-span-4">
                          <label className="block text-[10px] font-bold text-neutral-400 uppercase">Judul Peristiwa</label>
                          <input 
                            type="text" 
                            value={legal.title}
                            onChange={(e) => {
                              const list = [...formData.about.legalHistory];
                              list[lIdx].title = e.target.value;
                              updateSectionField('about', 'legalHistory', list);
                            }}
                            className="w-full p-2 border border-neutral-300 rounded-lg text-xs font-bold"
                          />
                        </div>
                        <div className="md:col-span-6">
                          <label className="block text-[10px] font-bold text-neutral-400 uppercase">Detail Akta & Notaris</label>
                          <input 
                            type="text" 
                            value={legal.detail}
                            onChange={(e) => {
                              const list = [...formData.about.legalHistory];
                              list[lIdx].detail = e.target.value;
                              updateSectionField('about', 'legalHistory', list);
                            }}
                            className="w-full p-2 border border-neutral-300 rounded-lg text-xs"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 3. LAYANAN & PENGALAMAN PROYEK (Pages) */}
            {activeTab === 'services' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-bold text-neutral-900 text-lg">Kelola 7 Layanan Bisnis & Proyek</h3>
                    <p className="text-xs text-neutral-500">Anda dapat mengubah judul, deskripsi, dan menambah/menghapus daftar pengalaman proyek</p>
                  </div>
                  <button 
                    onClick={handleAddService}
                    className="inline-flex items-center bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition"
                  >
                    <Plus className="h-3.5 w-3.5 mr-1.5" /> Tambah Layanan Baru
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">Judul Bagian</label>
                    <input 
                      type="text" 
                      value={formData.services?.sectionTitle || ''}
                      onChange={(e) => updateSectionField('services', 'sectionTitle', e.target.value)}
                      className="w-full p-2.5 border border-neutral-300 rounded-xl text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">Sub-Judul Bagian</label>
                    <input 
                      type="text" 
                      value={formData.services?.sectionSubtitle || ''}
                      onChange={(e) => updateSectionField('services', 'sectionSubtitle', e.target.value)}
                      className="w-full p-2.5 border border-neutral-300 rounded-xl text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-8">
                  {(formData.services?.items || []).map((service: any, sIdx: number) => (
                    <div key={service.id || sIdx} className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-4">
                      
                      <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                        <div className="flex items-center">
                          <span className="w-8 h-8 bg-red-600 text-white font-black rounded-lg flex items-center justify-center text-sm mr-3">
                            {service.id}
                          </span>
                          <span className="font-bold text-neutral-900 text-base">{service.title}</span>
                        </div>
                        <button 
                          onClick={() => handleDeleteService(sIdx)}
                          className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition"
                          title="Hapus Layanan"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold text-neutral-500 uppercase mb-1">Nomor/ID Layanan</label>
                          <input 
                            type="text" 
                            value={service.id}
                            onChange={(e) => handleUpdateService(sIdx, 'id', e.target.value)}
                            className="w-full p-2 border border-neutral-300 rounded-lg text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-neutral-500 uppercase mb-1">Nama Layanan</label>
                          <input 
                            type="text" 
                            value={service.title}
                            onChange={(e) => handleUpdateService(sIdx, 'title', e.target.value)}
                            className="w-full p-2 border border-neutral-300 rounded-lg text-xs font-bold"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-neutral-500 uppercase mb-1">Deskripsi Ringkas</label>
                        <input 
                          type="text" 
                          value={service.shortDesc || ''}
                          onChange={(e) => handleUpdateService(sIdx, 'shortDesc', e.target.value)}
                          className="w-full p-2 border border-neutral-300 rounded-lg text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-neutral-500 uppercase mb-1">Deskripsi Lengkap & Dasar Regulasi</label>
                        <textarea 
                          rows={3}
                          value={service.description}
                          onChange={(e) => handleUpdateService(sIdx, 'description', e.target.value)}
                          className="w-full p-2.5 border border-neutral-300 rounded-lg text-xs resize-y leading-relaxed"
                        />
                      </div>

                      {/* Sub-projects list */}
                      <div className="pt-2">
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-[11px] font-bold text-neutral-700 uppercase">
                            Pengalaman Proyek ({service.projects?.length || 0})
                          </label>
                          <button
                            onClick={() => handleAddProjectToService(sIdx)}
                            className="text-xs text-red-600 hover:text-red-700 font-bold flex items-center"
                          >
                            <Plus className="h-3 w-3 mr-1" /> Tambah Proyek
                          </button>
                        </div>
                        <div className="space-y-2">
                          {(service.projects || []).map((proj: string, pIdx: number) => (
                            <div key={pIdx} className="flex items-center gap-2">
                              <input 
                                type="text"
                                value={proj}
                                onChange={(e) => handleUpdateServiceProject(sIdx, pIdx, e.target.value)}
                                className="flex-1 p-2 bg-white border border-neutral-300 rounded-lg text-xs"
                              />
                              <button
                                onClick={() => handleDeleteServiceProject(sIdx, pIdx)}
                                className="text-neutral-400 hover:text-red-600 p-2"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. PORTOFOLIO & PEMETAAN */}
            {activeTab === 'portfolio' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-neutral-900 text-lg">Katalog Portofolio & Produk Pemetaan</h3>
                    <p className="text-xs text-neutral-500">Kelola buku laporan, hasil DPPT, SSH, dan peta GIS</p>
                  </div>
                  <button 
                    onClick={handleAddPortfolio}
                    className="inline-flex items-center bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition"
                  >
                    <Plus className="h-3.5 w-3.5 mr-1.5" /> Tambah Item Portofolio
                  </button>
                </div>

                <div className="space-y-4">
                  {(formData.portfolio?.items || []).map((item: any, pIdx: number) => (
                    <div key={pIdx} className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-red-600 uppercase">Item #{pIdx + 1}</span>
                        <button 
                          onClick={() => handleDeletePortfolio(pIdx)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                        <div className="sm:col-span-6">
                          <label className="block text-[10px] font-bold text-neutral-400 uppercase">Judul Dokumen / Peta</label>
                          <input 
                            type="text" 
                            value={item.title}
                            onChange={(e) => handleUpdatePortfolio(pIdx, 'title', e.target.value)}
                            className="w-full p-2 border border-neutral-300 rounded-lg text-xs font-bold"
                          />
                        </div>
                        <div className="sm:col-span-4">
                          <label className="block text-[10px] font-bold text-neutral-400 uppercase">Kategori</label>
                          <select 
                            value={item.category}
                            onChange={(e) => handleUpdatePortfolio(pIdx, 'category', e.target.value)}
                            className="w-full p-2 border border-neutral-300 rounded-lg text-xs"
                          >
                            <option value="Studi Kelayakan">Studi Kelayakan</option>
                            <option value="DPPT">DPPT</option>
                            <option value="SSH & ASB">SSH & ASB</option>
                            <option value="Produk Pemetaan">Produk Pemetaan</option>
                            <option value="Studi Kelayakan & Aset">Studi Kelayakan & Aset</option>
                          </select>
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-[10px] font-bold text-neutral-400 uppercase">Tahun</label>
                          <input 
                            type="text" 
                            value={item.year || ''}
                            onChange={(e) => handleUpdatePortfolio(pIdx, 'year', e.target.value)}
                            className="w-full p-2 border border-neutral-300 rounded-lg text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-neutral-400 uppercase">Keterangan / Instansi Terkait</label>
                        <input 
                          type="text" 
                          value={item.description || ''}
                          onChange={(e) => handleUpdatePortfolio(pIdx, 'description', e.target.value)}
                          className="w-full p-2 border border-neutral-300 rounded-lg text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. DOKUMENTASI KEGIATAN */}
            {activeTab === 'documentation' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-neutral-900 text-lg">Dokumentasi Kegiatan & FGD</h3>
                    <p className="text-xs text-neutral-500">Kelola dokumentasi foto dan ringkasan kegiatan lapangan</p>
                  </div>
                  <button 
                    onClick={handleAddDocActivity}
                    className="inline-flex items-center bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition"
                  >
                    <Plus className="h-3.5 w-3.5 mr-1.5" /> Tambah Kegiatan Baru
                  </button>
                </div>

                <div className="space-y-4">
                  {(formData.documentation?.activities || []).map((act: any, aIdx: number) => (
                    <div key={aIdx} className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-neutral-700">Kegiatan #{aIdx + 1}</span>
                        <button 
                          onClick={() => handleDeleteDocActivity(aIdx)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                        <div className="sm:col-span-6">
                          <label className="block text-[10px] font-bold text-neutral-400 uppercase">Nama Kegiatan</label>
                          <input 
                            type="text" 
                            value={act.title}
                            onChange={(e) => handleUpdateDocActivity(aIdx, 'title', e.target.value)}
                            className="w-full p-2 border border-neutral-300 rounded-lg text-xs font-bold"
                          />
                        </div>
                        <div className="sm:col-span-4">
                          <label className="block text-[10px] font-bold text-neutral-400 uppercase">Lokasi</label>
                          <input 
                            type="text" 
                            value={act.location}
                            onChange={(e) => handleUpdateDocActivity(aIdx, 'location', e.target.value)}
                            className="w-full p-2 border border-neutral-300 rounded-lg text-xs"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-[10px] font-bold text-neutral-400 uppercase">Tahun</label>
                          <input 
                            type="text" 
                            value={act.year || ''}
                            onChange={(e) => handleUpdateDocActivity(aIdx, 'year', e.target.value)}
                            className="w-full p-2 border border-neutral-300 rounded-lg text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-neutral-400 uppercase">Deskripsi Kegiatan</label>
                        <textarea 
                          rows={2}
                          value={act.description}
                          onChange={(e) => handleUpdateDocActivity(aIdx, 'description', e.target.value)}
                          className="w-full p-2 border border-neutral-300 rounded-lg text-xs resize-y"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. TIM TENAGA AHLI */}
            {activeTab === 'team' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-neutral-900 text-lg">Struktur Tim & Tenaga Ahli (2025)</h3>
                    <p className="text-xs text-neutral-500">Kelola komisaris, direktur, dan spesialis tenaga ahli</p>
                  </div>
                  <button 
                    onClick={handleAddTeamMember}
                    className="inline-flex items-center bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition"
                  >
                    <Plus className="h-3.5 w-3.5 mr-1.5" /> Tambah Tenaga Ahli
                  </button>
                </div>

                <div className="space-y-3">
                  {(formData.team?.members || []).map((m: any, mIdx: number) => (
                    <div key={mIdx} className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                      <div className="sm:col-span-3">
                        <label className="block text-[10px] font-bold text-neutral-400 uppercase">Jabatan / Keahlian</label>
                        <input 
                          type="text" 
                          value={m.role}
                          onChange={(e) => handleUpdateTeamMember(mIdx, 'role', e.target.value)}
                          className="w-full p-2 border border-neutral-300 rounded-lg text-xs font-bold text-red-600"
                        />
                      </div>
                      <div className="sm:col-span-5">
                        <label className="block text-[10px] font-bold text-neutral-400 uppercase">Nama Lengkap & Gelar</label>
                        <input 
                          type="text" 
                          value={m.name}
                          onChange={(e) => handleUpdateTeamMember(mIdx, 'name', e.target.value)}
                          className="w-full p-2 border border-neutral-300 rounded-lg text-xs font-semibold"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <label className="block text-[10px] font-bold text-neutral-400 uppercase">Kategori</label>
                        <input 
                          type="text" 
                          value={m.category || ''}
                          onChange={(e) => handleUpdateTeamMember(mIdx, 'category', e.target.value)}
                          className="w-full p-2 border border-neutral-300 rounded-lg text-xs"
                          placeholder="Tenaga Ahli / Manajemen"
                        />
                      </div>
                      <div className="sm:col-span-1 flex justify-end">
                        <button 
                          onClick={() => handleDeleteTeamMember(mIdx)}
                          className="text-red-500 hover:text-red-700 p-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. BANK REKANAN */}
            {activeTab === 'clients' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-neutral-900 text-lg">Daftar Bank Rekanan</h3>
                    <p className="text-xs text-neutral-500">Kelola daftar bank mitra yang bekerjasama dengan PT. ING</p>
                  </div>
                  <button 
                    onClick={handleAddBank}
                    className="inline-flex items-center bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition"
                  >
                    <Plus className="h-3.5 w-3.5 mr-1.5" /> Tambah Bank
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(formData.clients?.banks || []).map((bank: any, bIdx: number) => {
                    const bankName = typeof bank === 'string' ? bank : bank.name;
                    return (
                      <div key={bIdx} className="flex items-center gap-2 p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                        <input 
                          type="text"
                          value={bankName}
                          onChange={(e) => handleUpdateBank(bIdx, e.target.value)}
                          className="flex-1 p-2 bg-white border border-neutral-300 rounded-lg text-xs font-semibold"
                        />
                        <button 
                          onClick={() => handleDeleteBank(bIdx)}
                          className="text-neutral-400 hover:text-red-600 p-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 8. PENGATURAN KONTAK KAMI (FITUR ADD, EDIT, DELETE KANTOR & KONTAK) */}
            {activeTab === 'contacts' && (
              <div className="space-y-8">
                
                {/* Header & Add Button */}
                <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                  <div>
                    <h3 className="font-bold text-neutral-900 text-lg flex items-center">
                      <Building2 className="h-5 w-5 text-red-600 mr-2" />
                      Kelola Kantor & Kontak Kami
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Fitur lengkap untuk menambahkan, mengedit, dan menghapus alamat kantor serta kontak resmi
                    </p>
                  </div>
                  <button 
                    onClick={handleAddOffice}
                    className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-sm"
                  >
                    <Plus className="h-4 w-4 mr-1.5" /> Tambah Lokasi Kantor
                  </button>
                </div>

                {/* General working hours */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase mb-2 flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1.5 text-red-600" /> Jam Operasional Kantor
                    </label>
                    <input 
                      type="text" 
                      value={formData.contacts?.workingHours || ''}
                      onChange={(e) => updateSectionField('contacts', 'workingHours', e.target.value)}
                      placeholder="Senin - Jumat: 08:30 - 17:00 WIB"
                      className="w-full p-3 border border-neutral-300 rounded-xl text-sm focus:ring-2 focus:ring-red-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase mb-2">Judul Bagian Kontak</label>
                    <input 
                      type="text" 
                      value={formData.contacts?.sectionTitle || ''}
                      onChange={(e) => updateSectionField('contacts', 'sectionTitle', e.target.value)}
                      className="w-full p-3 border border-neutral-300 rounded-xl text-sm focus:ring-2 focus:ring-red-500 outline-none font-bold"
                    />
                  </div>
                </div>

                {/* Offices List with Full Edit / Delete */}
                <div className="space-y-6">
                  <h4 className="text-sm font-bold text-neutral-900 flex items-center">
                    <MapPin className="h-4 w-4 text-red-600 mr-2" />
                    Daftar Lokasi Kantor ({formData.contacts?.offices?.length || 0})
                  </h4>

                  {(formData.contacts?.offices || []).map((office: any, oIdx: number) => (
                    <div key={office.id || oIdx} className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-4">
                      
                      <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                        <div className="flex items-center">
                          <span className="w-7 h-7 bg-neutral-900 text-white rounded-lg flex items-center justify-center font-bold text-xs mr-2.5">
                            {oIdx + 1}
                          </span>
                          <span className="font-bold text-neutral-900 text-sm">{office.title}</span>
                          {office.isPrimary && (
                            <span className="ml-3 text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full">
                              Kantor Utama
                            </span>
                          )}
                        </div>
                        <button 
                          onClick={() => handleDeleteOffice(oIdx)}
                          className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition"
                          title="Hapus Kantor"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold text-neutral-500 uppercase mb-1">Nama / Label Kantor</label>
                          <input 
                            type="text" 
                            value={office.title}
                            onChange={(e) => handleUpdateOffice(oIdx, 'title', e.target.value)}
                            placeholder="Contoh: Kantor Operasional Batam"
                            className="w-full p-2.5 border border-neutral-300 rounded-lg text-xs font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-neutral-500 uppercase mb-1">Status Kantor</label>
                          <select
                            value={office.isPrimary ? "true" : "false"}
                            onChange={(e) => handleUpdateOffice(oIdx, 'isPrimary', e.target.value === 'true')}
                            className="w-full p-2.5 border border-neutral-300 rounded-lg text-xs"
                          >
                            <option value="true">Kantor Utama</option>
                            <option value="false">Kantor Cabang / Perwakilan</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-neutral-500 uppercase mb-1">Alamat Lengkap Kantor</label>
                        <textarea 
                          rows={2}
                          value={office.address}
                          onChange={(e) => handleUpdateOffice(oIdx, 'address', e.target.value)}
                          placeholder="Alamat lengkap, nomor ruko/gedung, kota, kode pos..."
                          className="w-full p-2.5 border border-neutral-300 rounded-lg text-xs resize-y"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold text-neutral-500 uppercase mb-1">Nomor Telepon / HP</label>
                          <input 
                            type="text" 
                            value={office.phone || ''}
                            onChange={(e) => handleUpdateOffice(oIdx, 'phone', e.target.value)}
                            className="w-full p-2.5 border border-neutral-300 rounded-lg text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-neutral-500 uppercase mb-1">Email Kantor</label>
                          <input 
                            type="email" 
                            value={office.email || ''}
                            onChange={(e) => handleUpdateOffice(oIdx, 'email', e.target.value)}
                            className="w-full p-2.5 border border-neutral-300 rounded-lg text-xs"
                          />
                        </div>
                      </div>

                    </div>
                  ))}
                </div>

                {/* Direct Email & Direct Phone Management */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-neutral-200">
                  
                  {/* Email List */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-neutral-700 uppercase flex items-center">
                        <Mail className="h-3.5 w-3.5 mr-1.5 text-red-600" />
                        Daftar Email Resmi ({formData.contacts?.emails?.length || 0})
                      </label>
                      <button 
                        onClick={handleAddEmail}
                        className="text-xs text-red-600 hover:text-red-700 font-bold flex items-center"
                      >
                        <Plus className="h-3 w-3 mr-1" /> Tambah Email
                      </button>
                    </div>

                    <div className="space-y-2">
                      {(formData.contacts?.emails || []).map((em: string, eIdx: number) => (
                        <div key={eIdx} className="flex items-center gap-2">
                          <input 
                            type="email"
                            value={em}
                            onChange={(e) => handleUpdateEmail(eIdx, e.target.value)}
                            className="flex-1 p-2 bg-neutral-50 border border-neutral-300 rounded-lg text-xs"
                          />
                          <button 
                            onClick={() => handleDeleteEmail(eIdx)}
                            className="text-neutral-400 hover:text-red-600 p-2"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Phone List */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-neutral-700 uppercase flex items-center">
                        <Phone className="h-3.5 w-3.5 mr-1.5 text-red-600" />
                        Daftar Nomor Telepon / WA ({formData.contacts?.phones?.length || 0})
                      </label>
                      <button 
                        onClick={handleAddPhone}
                        className="text-xs text-red-600 hover:text-red-700 font-bold flex items-center"
                      >
                        <Plus className="h-3 w-3 mr-1" /> Tambah Telepon
                      </button>
                    </div>

                    <div className="space-y-2">
                      {(formData.contacts?.phones || []).map((ph: string, pIdx: number) => (
                        <div key={pIdx} className="flex items-center gap-2">
                          <input 
                            type="text"
                            value={ph}
                            onChange={(e) => handleUpdatePhone(pIdx, e.target.value)}
                            className="flex-1 p-2 bg-neutral-50 border border-neutral-300 rounded-lg text-xs"
                          />
                          <button 
                            onClick={() => handleDeletePhone(pIdx)}
                            className="text-neutral-400 hover:text-red-600 p-2"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
