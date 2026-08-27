import React, { useState } from 'react';
import { Menu, X, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'Beranda', href: '#home' },
    { name: 'Tentang & Legalitas', href: '#about' },
    { name: 'Layanan', href: '#services' },
    { name: 'Portofolio & Peta', href: '#portfolio' },
    { name: 'Dokumentasi', href: '#documentation' },
    { name: 'Tim', href: '#team' },
    { name: 'Bank Rekanan', href: '#clients' },
    { name: 'Kontak', href: '#contact' },
  ];

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-md z-50 shadow-sm border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Brand Logo */}
          <a href="#home" className="flex items-center flex-shrink-0 group">
            <div className="w-11 h-11 bg-neutral-900 border-2 border-red-600 rounded-xl flex items-center justify-center text-white font-extrabold mr-3 shadow-md group-hover:bg-red-600 transition-colors">
              <span className="text-white text-sm font-black tracking-tighter">in</span>
              <span className="text-red-500 group-hover:text-white font-black text-lg ml-0.5">G</span>
            </div>
            <div>
              <h1 className="font-bold text-neutral-950 text-sm sm:text-base leading-tight tracking-tight">
                PT. INDOS NESOS GEMILANG
              </h1>
              <p className="text-[11px] text-red-600 font-bold tracking-wider uppercase">
                ASSET MANAGEMENT CONSULTANT
              </p>
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden xl:flex items-center space-x-6">
            {links.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-xs font-semibold text-neutral-700 hover:text-red-600 tracking-wide transition uppercase"
              >
                {link.name}
              </a>
            ))}
            <Link 
              to="/login"
              className="inline-flex items-center bg-neutral-900 text-white text-xs font-bold px-4 py-2.5 rounded-lg hover:bg-red-600 transition shadow-sm"
            >
              <ShieldCheck className="h-4 w-4 mr-1.5" />
              Admin Panel
            </Link>
          </div>

          {/* Mobile / Tablet Hamburger Button */}
          <div className="xl:hidden flex items-center">
            <Link 
              to="/login"
              className="mr-2 inline-flex items-center bg-neutral-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-red-600 transition"
            >
              Admin
            </Link>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-neutral-700 hover:text-red-600 focus:outline-none p-2 rounded-lg hover:bg-neutral-100 transition"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Hamburger Dropdown Menu */}
      {isOpen && (
        <div className="xl:hidden bg-white border-b border-neutral-200 px-4 pt-3 pb-6 space-y-1 shadow-2xl max-h-[85vh] overflow-y-auto">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-neutral-800 hover:text-red-600 hover:bg-red-50 transition"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2">
            <Link 
              to="/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center w-full px-4 py-3 rounded-lg text-sm font-bold bg-red-600 text-white text-center hover:bg-red-700 transition shadow"
            >
              <ShieldCheck className="h-4 w-4 mr-2" />
              Masuk Panel Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
