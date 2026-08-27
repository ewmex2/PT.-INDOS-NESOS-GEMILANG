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

const SYSTEM_KNOWLEDGE_BASE = `Anda adalah "Asisten AI Konsultasi PT. INDOS NESOS GEMILANG (ING)", sebuah perusahaan konsultan manajemen aset, studi kelayakan, dan jasa non-konstruksi terpercaya yang berdiri sejak 27 Agustus 1997 di Jakarta (Akta No. 175 Notaris H. Asmawel Amin, S.H.).

RUANG LINGKUP 7 LAYANAN UTAMA PERUSAHAAN:
1. Studi Kelayakan (Feasibility Study): Analisis kelayakan finansial, ekonomi, teknis, dan pasar untuk proyek infrastruktur, gedung bertingkat, hotel/resort, industri perkapalan, agrobisnis, dan fasilitas umum (Contoh proyek: UIB, Harmoni Hotel, Bintan Beach Resort, Gedung Vokasi Batam, Botania Garden, dll).
2. Sistem Informasi Manajemen Aset (SIMA/SIMBADA) & GIS Spasial: Inventarisasi, sensus, penatausahaan aset BMN/BMD berbasis web & GIS sesuai Kepmendagri 49/2001 & Permendagri terkait, serta Verifikasi Lahan Rempang Eco-City Tahap 1 - 5.
3. Dokumen Perencanaan Pengadaan Tanah (DPPT): Penyusunan dokumen DPPT strategis berlandaskan UU No. 2/2012, UU Cipta Kerja No. 11/2020, PP No. 19/2021, dan Permen ATR/BPN No. 19/2021 (Contoh proyek: Flyover Simpang Ramayana, Jembatan Batam-Bintan, Bandara Raja Haji Abdullah Karimun, TPA Ganet, dll).
4. Standarisasi Satuan Harga (SSH, HSPK, ASB): Berdasarkan Permendagri 13/2006 Pasal 93 dan SNI untuk penyusunan RKA/DPA pemerintah daerah (Pemprov Kepri, Batam, Tg. Pinang, Karimun, Bintan, Anambas, Natuna).
5. Pembuatan Buku Profil Daerah: Kajian potensi wilayah, demografi, potensi investasi, dan profil kabupaten/kota.
6. Analisa Standar Belanja (ASB): Penentuan kewajaran biaya belanja konstruksi dan non-konstruksi program kerja pemerintah.
7. Personal Investigation Report (PIR) & Due Diligence: Investigasi aset debitur perbankan, mitigasi risiko kredit, dan verifikasi jaminan perbankan (Bekerjasama dengan Bank Muamalat, Bumiputera, Panin, UOB, BTN, BII, Lippo, Danamon).

KANTOR RESMI:
- Kantor Utama Batam: Komplek Orchid Park Blok C No. 49, Batam Kota, Kota Batam, Kepulauan Riau (Telp: 0812-7000-840 / 0812-7023-456).
- Kantor Jakarta: Gedung ASCOM Lt. 3, Jl. Matraman Raya No. 67, Tebet, Jakarta Selatan.
- Email: indosnesosgemilang@gmail.com / info@indosnesos.co.

PANDUAN MENJAWAB:
- Berikan penjelasan yang ramah, profesional, bernilai teknis tinggi, dan mudah dipahami.
- Sebutkan dasar hukum/regulasi jika ditanya perihal DPPT, SIMA, atau Standar Harga Pemerintah.
- Jika pengguna ingin berkonsultasi lebih lanjut atau meminta penawaran proposal, arahkan untuk menghubungi kontak resmi atau mengisi formulir kontak.`;

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "PT. INDOS NESOS GEMILANG API" });
  });

  // AI Consultation Endpoint powered by modern Gemini 3.7 Flash
  app.post("/api/gemini/consultation", async (req, res) => {
    try {
      const { message, conversationHistory } = req.body;
      if (!message || typeof message !== "string" || !message.trim()) {
        return res.status(400).json({ error: "Pesan pertanyaan tidak boleh kosong" });
      }

      if (!process.env.GEMINI_API_KEY) {
        // Smart fallback when no GEMINI_API_KEY is configured
        const lower = message.toLowerCase();
        let fallbackReply = "Terima kasih telah menghubungi PT. INDOS NESOS GEMILANG (ING). Kami adalah konsultan terpercaya untuk Studi Kelayakan (FS), Penataan Aset (SIMA/GIS), DPPT, dan Standarisasi Biaya (SSH/ASB). Untuk konsultasi lebih lanjut, silakan hubungi kami di 0812-7000-840 / 0812-7023-456 atau email indosnesosgemilang@gmail.com.";
        
        if (lower.includes("layanan") || lower.includes("jasa") || lower.includes("produk")) {
          fallbackReply = "PT. INDOS NESOS GEMILANG menyediakan 7 layanan utama: 1. Studi Kelayakan (Feasibility Study), 2. SIMA/SIMBADA & GIS Spasial, 3. Dokumen Perencanaan Pengadaan Tanah (DPPT), 4. Standarisasi Satuan Harga (SSH/HSPK/ASB), 5. Buku Profil Daerah, 6. Analisa Standar Belanja (ASB), 7. Personal Investigation Report (PIR).";
        } else if (lower.includes("lokasi") || lower.includes("alamat") || lower.includes("kantor") || lower.includes("kontak")) {
          fallbackReply = "Kantor Utama kami berlokasi di Komplek Orchid Park Blok C No. 49, Batam Kota, Kota Batam, Kepulauan Riau (Telp: 0812-7000-840 / 0812-7023-456). Kantor Jakarta berada di Gedung ASCOM Lt. 3, Jl. Matraman Raya No. 67, Tebet, Jakarta Selatan.";
        } else if (lower.includes("dppt") || lower.includes("tanah") || lower.includes("lahan")) {
          fallbackReply = "Penyusunan Dokumen Perencanaan Pengadaan Tanah (DPPT) oleh PT. ING berlandaskan UU No. 2/2012, UU Cipta Kerja No. 11/2020, PP No. 19/2021, dan Permen ATR/BPN No. 19/2021. Pengalaman kami mencakup Flyover Ramayana, Jembatan Batam-Bintan, hingga Bandara RHA Karimun.";
        }

        return res.json({
          reply: fallbackReply,
          model: 'ing-knowledge-base'
        });
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

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: promptText,
        config: {
          systemInstruction: SYSTEM_KNOWLEDGE_BASE,
          temperature: 0.7,
        }
      });

      return res.json({
        reply: response.text || "Terima kasih atas pertanyaan Anda. Silakan hubungi tim ahli kami untuk analisis lebih rinci.",
        model: 'gemini-3.7-flash'
      });
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
