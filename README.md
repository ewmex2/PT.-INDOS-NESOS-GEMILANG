# PT. INDOS NESOS GEMILANG - Company Profile & AI Consultant Web Application

Website profil perusahaan resmi dan sistem konsultasi interaktif berbasis AI untuk **PT. INDOS NESOS GEMILANG**, konsultan manajemen aset, studi kelayakan, dan jasa non-konstruksi terpercaya sejak 1997.

---

## 🚀 Panduan Deployment ke Hostinger (GitHub Integration)

Aplikasi ini dibangun menggunakan arsitektur modern **Full-Stack (React 18 + Vite + Express + Google Gemini 3.7 Flash + Firebase Firestore)**.

### Opsi 1: Hostinger Web Application / Node.js Hosting / VPS (Direkomendasikan)

Jika Anda menggunakan **Hostinger Node.js Application / VPS**:

1. **Hubungkan GitHub**:
   - Di hPanel Hostinger, masuk ke menu **Node.js** atau **Web Applications**.
   - Hubungkan repositori GitHub hasil ekspor dari AI Studio.
   - Pilih branch `main` atau `master`.

2. **Pengaturan Konfigurasi Aplikasi di Hostinger**:
   - **Node.js Version**: `18.x` atau `20.x` (LTS)
   - **Application Root**: `/`
   - **Application Startup File**: `dist/server.cjs`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start` (atau `node dist/server.cjs`)

3. **Environment Variables (Environment di hPanel)**:
   Tambahkan variabel lingkungan berikut di menu *Environment Variables* Hostinger:
   - `NODE_ENV=production`
   - `GEMINI_API_KEY=your_gemini_api_key_here` (Dapatkan dari [Google AI Studio](https://aistudio.google.com/))
   - `PORT=3000` (atau biarkan Hostinger mengisi otomatis)

---

### Opsi 2: Hostinger Shared/Cloud Web Hosting (Static HTML/JS)

Jika paket hosting Anda adalah Shared Hosting statis (Apache/Nginx):

1. **Build Project**:
   ```bash
   npm install
   npm run build
   ```
2. Seluruh file static website akan terbuat di folder `dist/`.
3. Upload seluruh isi folder `dist/` ke folder `public_html/` di File Manager Hostinger.
4. Buat file `.htaccess` di `public_html/` untuk SPA Routing:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

---

## 🛠️ Perintah Lokal (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Salin .env.example menjadi .env dan masukkan API Key
cp .env.example .env

# 3. Jalankan development server
npm run dev

# 4. Build untuk production
npm run build

# 5. Jalankan production server
npm start
```

---

## 📂 Struktur Utama Proyek

- `/src/pages/Home.tsx` : Halaman profil perusahaan lengkap (1-33 halaman dokumen PDF).
- `/src/pages/AdminDashboard.tsx` : Panel Admin CMS dengan kontrol Live Editor ke Firebase Firestore.
- `/src/pages/Login.tsx` : Halaman autentikasi login pengelola/admin.
- `/src/components/AIConsultantWidget.tsx` : Widget percakapan asisten AI konsultasi (*Gemini 3.7 Flash*).
- `/server.ts` : Backend proxy Express yang aman untuk integrasi AI & static file delivery.
- `/firestore.rules` & `/firebase-blueprint.json` : Konfigurasi keamanan data Firestore.
