import React from 'react';
import { Mail, Phone, MapPin, Clock, Building2 } from 'lucide-react';
import { DEFAULT_CONTENT } from '../lib/firebase';

interface FooterProps {
  contacts?: typeof DEFAULT_CONTENT.contacts;
  clients?: typeof DEFAULT_CONTENT.clients;
}

export default function Footer({ contacts, clients }: FooterProps) {
  const contactData = contacts || DEFAULT_CONTENT.contacts;
  const clientData = clients || DEFAULT_CONTENT.clients;

  return (
    <footer id="contact" className="bg-neutral-950 text-neutral-300 pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Company Brief */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-neutral-900 border-2 border-red-600 rounded-xl flex items-center justify-center text-white font-extrabold mr-3 shadow">
                <span className="text-white text-xs font-black">in</span>
                <span className="text-red-500 font-black text-base ml-0.5">G</span>
              </div>
              <div>
                <h2 className="font-bold text-white text-sm leading-tight">PT. INDOS NESOS GEMILANG</h2>
                <p className="text-[11px] text-red-500 font-semibold tracking-wider">ASSET MANAGEMENT CONSULTANT</p>
              </div>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Jasa Konsultansi Non-Konstruksi berdiri sejak 27 Agustus 1997. Berpengalaman dalam penyusunan DPPT, Sistem Manajemen Aset (SIMA), SSH, HSPK, ASB, dan Studi Kelayakan.
            </p>
            {contactData.workingHours && (
              <div className="flex items-center text-xs text-neutral-400 bg-neutral-900/80 p-3 rounded-lg border border-neutral-800">
                <Clock className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />
                <span>{contactData.workingHours}</span>
              </div>
            )}
          </div>

          {/* Dynamic Offices / Addresses */}
          <div className="space-y-4 lg:col-span-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center">
              <Building2 className="h-4 w-4 mr-2 text-red-500" />
              Lokasi Kantor Kami
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactData.offices?.map((office) => (
                <div 
                  key={office.id} 
                  className="bg-neutral-900/90 p-4 rounded-xl border border-neutral-800 hover:border-red-900/50 transition"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-white">{office.title}</span>
                    {office.isPrimary && (
                      <span className="text-[10px] bg-red-600/20 text-red-400 font-bold px-2 py-0.5 rounded-full border border-red-500/30">
                        Utama
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed mb-3 flex items-start">
                    <MapPin className="h-4 w-4 text-red-500 mr-1.5 flex-shrink-0 mt-0.5" />
                    <span>{office.address}</span>
                  </p>
                  {office.phone && (
                    <p className="text-xs text-neutral-400 flex items-center mb-1">
                      <Phone className="h-3.5 w-3.5 text-neutral-500 mr-1.5" />
                      <span>{office.phone}</span>
                    </p>
                  )}
                  {office.email && (
                    <p className="text-xs text-neutral-400 flex items-center">
                      <Mail className="h-3.5 w-3.5 text-neutral-500 mr-1.5" />
                      <span>{office.email}</span>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Contacts & Bank Highlights */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Hubungi Langsung</h3>
            <ul className="space-y-2.5 text-xs text-neutral-300">
              {contactData.emails?.map((email, idx) => (
                <li key={idx} className="flex items-center">
                  <Mail className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />
                  <a href={`mailto:${email}`} className="hover:text-red-400 transition">{email}</a>
                </li>
              ))}
              {contactData.phones?.map((phone, idx) => (
                <li key={idx} className="flex items-center">
                  <Phone className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />
                  <a href={`tel:${phone}`} className="hover:text-red-400 transition font-medium">{phone}</a>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Sebagian Mitra Perbankan</h4>
              <div className="flex flex-wrap gap-1.5">
                {(clientData.banks || []).slice(0, 6).map((bank: any, i: number) => {
                  const name = typeof bank === 'string' ? bank : bank.name;
                  return (
                    <span key={i} className="text-[11px] bg-neutral-900 px-2 py-1 rounded text-neutral-400 border border-neutral-800">
                      {name}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-neutral-900 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-neutral-500 gap-4">
          <p>&copy; {new Date().getFullYear()} PT. INDOS NESOS GEMILANG. Seluruh Hak Cipta Dilindungi.</p>
          <p className="text-neutral-600">Company Profile System • Non-Konstruksi & Asset Management</p>
        </div>
      </div>
    </footer>
  );
}
