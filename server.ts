import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

const SYSTEM_KNOWLEDGE_BASE = `Anda adalah "Asisten Konsultan AI PT. INDOS NESOS GEMILANG (ING)", sebuah perusahaan konsultan manajemen aset, studi kelayakan, dan jasa konsultansi non-konstruksi terpercaya yang berdiri sejak 27 Agustus 1997 di Jakarta (Akte No. 175 Notaris H. Asmawel Amin, S.H. dan Akte Perubahan Terakhir No. 01 Tahun 2022 Notaris Belinda Elvia Edison, S.H. M.Kn.).

INFORMASI LENGKAP PERUSAHAAN & WEBSITE RESMI (PT. INDOS NESOS GEMILANG):

1. PROFIL & LEGALITAS PERUSAHAAN:
- Nama Perusahaan: PT. INDOS NESOS GEMILANG (disingkat PT. ING).
- Tagline: ASSET MANAGEMENT CONSULTANT.
- Tahun Berdiri: 27 Agustus 1997 di Jakarta.
- Keanggotaan Asosiasi: INKINDO (Ikatan Nasional Konsultan Indonesia).
- Rekam Jejak Legalitas: Akta Pendirian No. 175/1997 (Notaris H. Asmawel Amin, S.H. di Jakarta), Akte Perubahan No. 69/1999, Akte Perubahan No. 01/2022 & Berita Acara RUPS Akte No. 1/2022 (Notaris Belinda Elvia Edison, S.H., M.Kn.).

2. RUANG LINGKUP 7 LAYANAN UTAMA & METODOLOGI:
(1) Studi Kelayakan (Feasibility Study / FS):
    - Deskripsi: Kajian komprehensif kelayakan usaha, teknis, pasar, sosial-ekonomi, dan analisis finansial investasi (NPV, IRR, Payback Period, BCR) untuk meminimalkan risiko investasi.
    - Portofolio Proyek: Gedung Universitas Internasional Batam (UIB), Harmoni Hotel & Apartment Batam, Sijori Resort Batam, Bintan Beach Resort, Botania Garden Batam, Marina View Batam, Konstruksi Tongkang & Tug Boat, Renovasi Hotel Novotel Batam, Program Vokasi Kota Batam, Kajian Taman Rusa Sekupang, Studi Kelayakan Lahan Kantor Bupati Kepulauan Meranti.
(2) Sistem Informasi Manajemen Aset (SIMA / SIMBADA) & GIS Spasial:
    - Deskripsi: Inventarisasi, sensus digital, penatausahaan aset Barang Milik Daerah (BMD) / BMN berbasis Web & Sistem Informasi Geografis (GIS/SIG) sesuai Kepmendagri No. 49/2001 & Permendagri 152/2004 serta penentuan nilai wajar aset.
    - Portofolio Proyek: SIMA & GIS Manajemen BMD Pemko Batam, Profil Kelurahan Batam, SIMBADA Pemkab Karimun, Pendataan Aset Pemprov Kepri, SIMBADA Pemkab Bintan, Standarisasi Kebutuhan BMD Kepri 2022, Inventarisasi Aset Kepri 2023, serta Verifikasi & Identifikasi Lahan APL dan HPK Proyek Rempang Eco-City (Tahap 1 tahun 2023 hingga Tahap 5 tahun 2025).
(3) Dokumen Perencanaan Pengadaan Tanah (DPPT):
    - Deskripsi: Dokumen wajib kegiatan pengadaan tanah untuk kepentingan umum berlandaskan UU No. 2 Tahun 2012, UU Cipta Kerja No. 11 Tahun 2020, PP No. 19 Tahun 2021, dan Permen ATR/BPN No. 19 Tahun 2021.
    - Portofolio Proyek: Flyover Simpang Ramayana Tanjungpinang, Jembatan Batam - Bintan, Perpanjangan Runway Bandara Raja Haji Abdullah (RHA) Karimun (2021 & revisi 2025), Bundaran Adipura Batu Enam & Pamedan, Pelabuhan Teluk Durian Anambas, Jembatan Palmatak Siantan, Perkantoran Bupati Meranti, Embung Hulu Bintan, Apron/Baseops LANUD Raja Ali Haji Fisabilillah, Pembebasan Jalan Lintas Barat Kepri, Fashum Kantor Bupati Karimun, Asrama Mahasiswa Kepri di Jakarta, Kolam Retensi Sudi Mampir Anambas, TPA Ganet Tanjungpinang 2025.
(4) Standarisasi Satuan Harga (SSH, HSPK, ASB):
    - Deskripsi: Pedoman keseragaman harga acuan penyusunan RKA/DPA Perangkat Daerah dan APBD sesuai Permendagri No. 13 Tahun 2006 Pasal 93 dan SNI untuk Harga Satuan Pokok Kegiatan (HSPK) & Engineer Estimate.
    - Portofolio Proyek: Pemko Batam (2012 - 2025 rutin), Pemko Tanjungpinang, Pemprov Kepri (2021 - 2025), Pemkab Kepulauan Anambas, Pemkab Natuna, Pemkab Karimun (2022 - 2025), Pemkab Bintan (2024 - 2025).
(5) Pembuatan Buku Profil Daerah & Potensi Investasi:
    - Deskripsi: Publikasi kajian potensi wilayah, demografi, sosial-ekonomi, dan peluang investasi kabupaten/kota.
    - Portofolio Proyek: Profil Potensi Investasi Kota Batam, Profil Tata Ruang Kepri, Potensi Sumber Daya Kabupaten Karimun.
(6) Analisa Standar Belanja (ASB):
    - Deskripsi: Pengkajian kewajaran beban kerja dan biaya anggaran belanja fisik (konstruksi) maupun non-konstruksi (bimtek, diklat, operasional aparatur).
(7) Personal Investigation Report (PIR) & Due Diligence:
    - Deskripsi: Investigasi aset debitur perbankan, mitigasi risiko kredit komersial, due diligence legalitas jaminan/agunan properti, pencegahan fraud perbankan.

3. STRUKTUR MANAJEMEN & TENAGA AHLI:
- Manajemen: Endang Larasati (Komisaris), Arief Setiawan, S.Sos (Direktur).
- Tenaga Ahli Inti: 
  • Elfan Wahyu Mulyana, S.E., M.Ec.Dev (Ahli Penilai / Valuasi Aset)
  • Ir. Imam Bachroni, M.T (Ahli Konstruksi & Teknik Sipil)
  • Kasim Dahlan, S.Sos., M.M. (Ahli Sosial & Kemasyarakatan)
  • Reiny Eka Putri, S.T. & Ovi Letare Monalisa Sinaga, S.P.W.K (Ahli Planologi & Tata Ruang)
  • Arifin Toda, S.Pi (Ahli Perikanan & Kelautan)
  • Bima Nur Aditia, S.P (Ahli Pertanian & Agrobisnis)
  • Ir. Widya Wardhana & Teguh Arrijal, S.Pd (Ahli Data Analyst & Statistik)
  • Irham Robi Aguslim, S.Kom & Salafudin Zaenul Ardy, S.Kom (Network & GIS IT Technician)
  • Tiyas Marcella Nuranissa, S.M (Admin & Finance)
  • Tim Surveyor Lapangan Bersertifikat.

4. DAFTAR BANK REKANAN (KERJASAMA PERBANKAN):
- Bank Muamalat Batam, Bank Bumiputera Batam, Bank Panin (Batam & Tanjungpinang), Bank UOB (Batam & Tanjungpinang), Bank BTN Batam, Bank BII Batam, Bank Lippo (Batam & Tanjungpinang), Bank Danamon Tanjungpinang.

5. KANTOR OPERASIONAL & CABANG:
- Kantor Utama Batam: Komplek Orchid Park Blok C No. 49 / Blok D No. 175, Taman Baloi, Batam Kota, Kota Batam, Kepulauan Riau (Telp: 0812-7000-840 / 0812-7023-3616 / 0812-7023-456).
- Kantor Jakarta: Gedung ASCOM Lt. 2/3, Jl. Dr. Saharjo No. 216 / Jl. Matraman Raya No. 67, Tebet, Jakarta Selatan.
- Kantor Operasional Yogyakarta / Cabang Lain: Selalu sertakan alamat detail kantor Yogyakarta atau cabang lain sesuai data dinamis yang terdaftar di sistem admin.
- Email Resmi: indosnesosgemilang@gmail.com / indosnesosgemilang@sir.co.id / info@indosnesos.co.

PANDUAN MENJAWAB KONSULTASI:
1. Jawab dengan gaya bahasa profesional, sopan, bernilai teknis tinggi, dan mudah dipahami oleh instansi pemerintah maupun swasta/perbankan.
2. Selalu sertakan dasar hukum (UU No. 2/2012, UU Cipta Kerja No. 11/2020, PP No. 19/2021, Permen ATR/BPN 19/2021, Permendagri 13/2006, dll) apabila pertanyaan terkait pengadaan tanah, aset, atau standarisasi harga.
3. Anda terintegrasi dengan Google Search untuk menelusuri data hukum/peraturan pemerintah terkini, data wilayah daerah, statistik makro, atau informasi eksternal bila diperlukan.`;

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "PT. INDOS NESOS GEMILANG API" });
  });

  // AI Consultation Endpoint powered by modern Gemini 3.7 Flash with Live Sync
  app.post("/api/gemini/consultation", async (req, res) => {
    try {
      const { message, conversationHistory, liveContent } = req.body;
      if (!message || typeof message !== "string" || !message.trim()) {
        return res.status(400).json({ error: "Pesan pertanyaan tidak boleh kosong" });
      }

      // Compile live knowledge from database / admin edits if available
      let dynamicOfficesText = "";
      if (liveContent?.contacts?.offices && Array.isArray(liveContent.contacts.offices)) {
        dynamicOfficesText = "\n\nKANTOR OPERASIONAL & CABANG TERUPDATE (DATA LANGSUNG DARI SISTEM):\n" +
          liveContent.contacts.offices.map((off: any, idx: number) => 
            `${idx + 1}. ${off.title || 'Kantor'} (${off.isPrimary ? 'Kantor Utama' : 'Kantor Cabang'}):\n   Alamat: ${off.address || '-'}\n   Telepon: ${off.phone || '-'}\n   Email: ${off.email || '-'}`
          ).join("\n");
      }

      let dynamicServicesText = "";
      if (liveContent?.services?.items && Array.isArray(liveContent.services.items)) {
        dynamicServicesText = "\n\nDAFTAR LAYANAN & PENGALAMAN PROYEK TERUPDATE:\n" +
          liveContent.services.items.map((srv: any, idx: number) => 
            `- ${srv.title}: ${srv.shortDesc || ''} (Proyek terkait: ${Array.isArray(srv.projects) ? srv.projects.slice(0, 5).join(', ') : '-'})`
          ).join("\n");
      }

      const activeSystemPrompt = `${SYSTEM_KNOWLEDGE_BASE}${dynamicOfficesText}${dynamicServicesText}

INSTRUKSI KHUSUS:
- Selalu prioritaskan data kantor dan layanan terupdate di atas jika ditanya mengenai alamat kantor (seperti Kantor Yogyakarta/Jogja, Batam, Jakarta, atau cabang lain yang ditambahkan).
- Jika ada kantor di Yogyakarta/Jogja atau daerah lain yang terdaftar dalam data sistem, sebutkan detail alamat dan kontaknya secara tepat dan lengkap.`;

      // Helper function to resolve reply using comprehensive knowledge base
      const getLocalSmartReply = () => {
        const lower = message.toLowerCase();
        
        // 1. Kantor, Alamat, Kontak, & Lokasi (Yogyakarta/Jogja, Batam, Jakarta)
        if (lower.includes("lokasi") || lower.includes("alamat") || lower.includes("kantor") || lower.includes("kontak") || lower.includes("jogja") || lower.includes("yogyakarta") || lower.includes("batam") || lower.includes("jakarta") || lower.includes("telepon") || lower.includes("email") || lower.includes("nomor")) {
          if (liveContent?.contacts?.offices && Array.isArray(liveContent.contacts.offices) && liveContent.contacts.offices.length > 0) {
            const matchedOffices = liveContent.contacts.offices.map((off: any) => 
              `📍 **${off.title}** (${off.isPrimary ? 'Kantor Utama' : 'Kantor Operasional / Cabang'}):\n   • Alamat: ${off.address}\n   • Telepon: ${off.phone || '-'}\n   • Email: ${off.email || '-'}`
            ).join("\n\n");

            return {
              reply: `Berikut adalah rincian kantor & kontak resmi PT. INDOS NESOS GEMILANG terupdate:\n\n${matchedOffices}\n\n🕒 Jam Operasional: ${liveContent.contacts.workingHours || 'Senin - Jumat: 08:30 - 17:00 WIB'}\n\nAda yang dapat kami bantu terkait konsultasi atau penjadwalan survei lapangan?`,
              model: 'ing-live-knowledge-base'
            };
          }

          return {
            reply: `Berikut adalah alamat dan kontak resmi PT. INDOS NESOS GEMILANG:\n\n📍 **Kantor Operasional Batam (Utama)**:\nOrchid Park Blok D No. 175 / Blok C No. 49, Taman Baloi, Batam Kota, Batam, Kepri (Telp: 0812-7023-3616 / 0812-7000-840)\n\n📍 **Kantor Jakarta**:\nGedung ASCOM Lt. 2/3, Jl. Dr. Saharjo No. 216 / Jl. Matraman Raya No. 67, Tebet, Jakarta Selatan\n\n📍 **Kantor Operasional Yogyakarta**:\nSiap melayani pendampingan manajemen aset, studi kelayakan, dan perencanaan pengadaan tanah wilayah DIY dan sekitarnya.\n\n✉️ Email: indosnesosgemilang@gmail.com / indosnesosgemilang@sir.co.id`,
            model: 'ing-knowledge-base'
          };
        }

        // 2. Legalitas, Akta, Sejarah Pendirian & Asosiasi
        if (lower.includes("legal") || lower.includes("akta") || lower.includes("notaris") || lower.includes("sejarah") || lower.includes("berdiri") || lower.includes("inkindo") || lower.includes("siujk") || lower.includes("nib") || lower.includes("tahun")) {
          return {
            reply: `🏛️ **Profil & Legalitas PT. INDOS NESOS GEMILANG**:\n\n• **Tahun Berdiri**: 27 Agustus 1997 di Jakarta.\n• **Akta Pendirian**: Akte No. 175 Tanggal 27 Agustus 1997 oleh Notaris H. Asmawel Amin, S.H. di Jakarta.\n• **Perubahan Akta**: Akte No. 69 Tahun 1999 dan Akte No. 01 Tanggal 14 Desember 2022 oleh Notaris Belinda Elvia Edison, S.H., M.Kn. di Tanjungpinang.\n• **Keanggotaan**: Anggota Resmi INKINDO (Ikatan Nasional Konsultan Indonesia).\n• **Klasifikasi Usaha**: Jasa Konsultansi Non-Konstruksi (Manajemen Aset, Studi Kelayakan, DPPT, Standarisasi Harga).`,
            model: 'ing-knowledge-base'
          };
        }

        // 3. Tim Manajemen & Tenaga Ahli
        if (lower.includes("tim") || lower.includes("ahli") || lower.includes("direktur") || lower.includes("komisaris") || lower.includes("personil") || lower.includes("tenaga ahli") || lower.includes("elfan") || lower.includes("arief") || lower.includes("bachroni")) {
          return {
            reply: `👥 **Struktur Manajemen & Tenaga Ahli PT. INDOS NESOS GEMILANG**:\n\n• **Komisaris**: Endang Larasati\n• **Direktur**: Arief Setiawan, S.Sos\n• **Ahli Penilai & Valuasi Aset**: Elfan Wahyu Mulyana, S.E., M.Ec.Dev\n• **Ahli Konstruksi & Teknik Sipil**: Ir. Imam Bachroni, M.T\n• **Ahli Sosial & Kemasyarakatan**: Kasim Dahlan, S.Sos., M.M.\n• **Ahli Planologi & Tata Ruang**: Reiny Eka Putri, S.T. & Ovi Letare Monalisa Sinaga, S.P.W.K\n• **Ahli Pertanian & Perikanan**: Bima Nur Aditia, S.P & Arifin Toda, S.Pi\n• **Ahli Data Analyst & Statistik**: Ir. Widya Wardhana & Teguh Arrijal, S.Pd\n• **Network & GIS Technician**: Irham Robi Aguslim, S.Kom & Salafudin Zaenul Ardy, S.Kom\n• **Surveyor Lapangan**: Tim surveyor terverifikasi dan bersertifikat di seluruh Indonesia.`,
            model: 'ing-knowledge-base'
          };
        }

        // 4. Bank Rekanan & Investigasi PIR
        if (lower.includes("bank") || lower.includes("rekanan") || lower.includes("pir") || lower.includes("investigasi") || lower.includes("kredit") || lower.includes("debitur")) {
          return {
            reply: `🏦 **Daftar Bank Rekanan & Jasa Personal Investigation Report (PIR)**:\n\nPT. INDOS NESOS GEMILANG berpengalaman dalam investigasi aset debitur, due diligence legalitas jaminan, dan mitigasi risiko kredit komersial bersama mitra perbankan terkemuka:\n\n1. Bank Muamalat Batam\n2. Bank Bumiputera Batam\n3. Bank Panin (Batam & Tanjungpinang)\n4. Bank UOB (Batam & Tanjungpinang)\n5. Bank BTN Batam\n6. Bank BII Batam\n7. Bank Lippo (Batam & Tanjungpinang)\n8. Bank Danamon Tanjungpinang`,
            model: 'ing-knowledge-base'
          };
        }

        // 5. Dokumen Perencanaan Pengadaan Tanah (DPPT) & Portofolio
        if (lower.includes("dppt") || lower.includes("tanah") || lower.includes("lahan") || lower.includes("pembebasan") || lower.includes("pengadaan tanah") || lower.includes("ramayana") || lower.includes("karimun") || lower.includes("jembatan")) {
          return {
            reply: `📜 **Dokumen Perencanaan Pengadaan Tanah (DPPT) - PT. ING**:\n\n• **Dasar Regulasi**: UU No. 2 Tahun 2012, UU Cipta Kerja No. 11 Tahun 2020, PP No. 19 Tahun 2021, dan Permen ATR/BPN No. 19 Tahun 2021.\n• **Metodologi**: Keselarasan RTRW, Studi Kelayakan Teknis-Ekonomi, Estimasi Nilai Ganti Kerugian, Survei Sosial Ekonomi, dan Pemetaan Trase Kadastral.\n• **Portofolio Proyek Utama**:\n  - DPPT Jembatan Layang (Flyover) Simpang Ramayana Tanjungpinang\n  - DPPT Pembangunan Jembatan Batam - Bintan\n  - DPPT Perpanjangan Runway Bandara Raja Haji Abdullah (RHA) Karimun (2021 & 2025)\n  - DPPT TPA Ganet Kota Tanjungpinang 2025\n  - DPPT Pelabuhan Teluk Durian Anambas\n  - DPPT Perkantoran Bupati Kepulauan Meranti\n  - DPPT Asrama Mahasiswa Kepri di Jakarta.`,
            model: 'ing-knowledge-base'
          };
        }

        // 6. SIMA & GIS Spasial Aset / Rempang Eco-City
        if (lower.includes("sima") || lower.includes("aset") || lower.includes("gis") || lower.includes("rempang") || lower.includes("simbada") || lower.includes("inventarisasi")) {
          return {
            reply: `🗺️ **SIMA / SIMBADA & GIS Spasial Barang Milik Daerah**:\n\n• **Dasar Hukum**: Kepmendagri No. 49 Tahun 2001 & Permendagri No. 152 Tahun 2004.\n• **Cakupan**: Sensus & inventarisasi digital BMD/BMN, penentuan nilai wajar, pemetaan koordinat batas berbasis SIG, serta verifikasi lahan strategis.\n• **Pengalaman Unggulan**:\n  - Verifikasi & Identifikasi Lahan APL & HPK Proyek Strategis Rempang Eco-City (Tahap 1 s/d Tahap 5, 2023 - 2025)\n  - Sistem Informasi Manajemen Aset Pemko Batam & Pemkab Karimun\n  - Inventarisasi Aset Daerah Provinsi Kepulauan Riau\n  - SIMBADA Pemkab Bintan.`,
            model: 'ing-knowledge-base'
          };
        }

        // 7. Standarisasi Satuan Harga (SSH, HSPK, ASB)
        if (lower.includes("ssh") || lower.includes("hspk") || lower.includes("asb") || lower.includes("standar harga") || lower.includes("harga satuan") || lower.includes("belanja")) {
          return {
            reply: `📊 **Standarisasi Satuan Harga (SSH, HSPK, ASB)**:\n\n• **Dasar Regulasi**: Permendagri No. 13 Tahun 2006 Pasal 93 dan Standar Nasional Indonesia (SNI).\n• **Tujuan**: Memberikan pedoman keseragaman harga acuan riil pasar dalam penyusunan RKA/DPA Perangkat Daerah sebelum APBD disahkan.\n• **Klien Daerah**:\n  - Pemko Batam (Rutin 2012 s/d 2025)\n  - Pemprov Kepulauan Riau (2021 s/d 2025)\n  - Pemkab Karimun, Bintan, Natuna, Anambas, dan Kota Tanjungpinang.`,
            model: 'ing-knowledge-base'
          };
        }

        // 8. Seluruh 7 Layanan Umum
        if (lower.includes("layanan") || lower.includes("jasa") || lower.includes("produk") || lower.includes("bidang") || lower.includes("konsultan")) {
          return {
            reply: `PT. INDOS NESOS GEMILANG menyediakan 7 layanan konsultansi non-konstruksi komprehensif:\n\n1. **Studi Kelayakan (Feasibility Study)**: Analisis kelayakan finansial, teknis, pasar, dan lingkungan investasi.\n2. **SIMA/SIMBADA & GIS Spasial**: Manajemen & sensus digital aset daerah BMD/BMN serta pemetaan SIG.\n3. **Dokumen Perencanaan Pengadaan Tanah (DPPT)**: Dokumen wajib pembebasan lahan untuk kepentingan umum (UU 2/2012 & PP 19/2021).\n4. **Standarisasi Satuan Harga (SSH, HSPK, ASB)**: Standar harga acuan RKA dan APBD Pemda.\n5. **Pembuatan Buku Profil Daerah**: Promosi potensi investasi dan profil kabupaten/kota.\n6. **Analisa Standar Belanja (ASB)**: Efisiensi dan kewajaran belanja anggaran konstruksi/non-konstruksi.\n7. **Personal Investigation Report (PIR)**: Investigasi aset debitur & mitigasi risiko kredit perbankan.\n\nSilakan pilih layanan yang ingin Anda pelajari lebih detail!`,
            model: 'ing-knowledge-base'
          };
        }

        return {
          reply: `Terima kasih telah menghubungi PT. INDOS NESOS GEMILANG (ING). Kami adalah konsultan terpercaya untuk Studi Kelayakan (FS), Penataan Aset (SIMA/GIS), DPPT Pengadaan Tanah, dan Standarisasi Biaya (SSH/ASB). Untuk konsultasi lebih lanjut, silakan hubungi kantor kami di Batam, Jakarta, atau Yogyakarta via email indosnesosgemilang@gmail.com atau telepon 0812-7023-3616 / 0812-7000-840.`,
          model: 'ing-knowledge-base'
        };
      };

      if (!process.env.GEMINI_API_KEY) {
        const localResult = getLocalSmartReply();
        return res.json(localResult);
      }

      const ai = getGeminiClient();

      // Build context from history if available
      let promptText = message;
      if (Array.isArray(conversationHistory) && conversationHistory.length > 0) {
        const historyContext = conversationHistory
          .slice(-6)
          .map((item: { sender: string; text: string }) => `${item.sender === 'user' ? 'Klien' : 'Konsultan ING'}: ${item.text}`)
          .join("\n");
        promptText = `Riwayat percakapan sebelumnya:\n${historyContext}\n\nPertanyaan baru klien: ${message}`;
      }

      try {
        // Generate content with modern Gemini 3.7 Flash and Google Search Grounding
        const response = await ai.models.generateContent({
          model: 'gemini-3.7-flash',
          contents: promptText,
          config: {
            systemInstruction: activeSystemPrompt,
            tools: [{ googleSearch: {} }],
            temperature: 0.7,
          }
        });

        // Extract search grounding citations / sources if present
        const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
        let sources: { title: string; uri: string }[] = [];
        if (chunks && Array.isArray(chunks)) {
          sources = chunks
            .filter((c: any) => c.web?.uri)
            .map((c: any) => ({
              title: c.web.title || c.web.uri,
              uri: c.web.uri
            }));
        }

        return res.json({
          reply: response.text || "Terima kasih atas pertanyaan Anda. Silakan hubungi tim ahli kami untuk analisis lebih rinci.",
          sources: sources.length > 0 ? sources : undefined,
          model: 'gemini-3.7-flash'
        });
      } catch (_geminiCallErr: any) {
        // Seamless fallback so the user always gets a rich, accurate response even when rate limited / quota exhausted
        const localResult = getLocalSmartReply();
        return res.json(localResult);
      }
    } catch (err: any) {
      console.error("Gemini API Error:", err);
      return res.status(500).json({
        error: "Mohon maaf, layanan konsultasi AI sedang sibuk atau konfigurasi API Key sedang disiapkan.",
        details: err?.message || "Internal Server Error"
      });
    }
  });

  // Vite middleware for development vs static production serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
