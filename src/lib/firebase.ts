import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || "ai-studio-7537d829-4b09-4340-8397-206f983cd90c");

// Complete initial default content matching company profile PDF
export const DEFAULT_CONTENT = {
  hero: {
    year: "2026",
    badge: "COMPANY PROFILE 2026",
    title: "PT. INDOS NESOS GEMILANG",
    subtitle: "ASSET MANAGEMENT CONSULTANT",
    description: "Perusahaan yang bergerak dalam bidang Jasa Konsultansi Non-Konstruksi, berdiri sejak 27 Agustus 1997 di Jakarta dengan pengalaman luas dalam manajemen aset, perencanaan tata ruang, dan studi kelayakan.",
    backgroundImageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    ctaText: "Jelajahi Layanan",
    ctaSecondaryText: "Hubungi Kami"
  },
  about: {
    title: "TENTANG PERUSAHAAN & LEGALITAS",
    subtitle: "Berdiri Sejak 27 Agustus 1997 di Jakarta",
    description: "PT. Indos Nesos Gemilang adalah perusahaan terkemuka yang bergerak dalam bidang Jasa Konsultansi Non-Konstruksi. Kami berdedikasi mendampingi instansi pemerintah maupun swasta dalam pengelolaan aset daerah, standarisasi harga, serta perencanaan pengadaan tanah yang akurat, terukur, dan akuntabel.",
    legalHistory: [
      {
        year: "1997",
        title: "Pendirian Perusahaan",
        detail: "Dihadapan Notaris H. Asmawel Amin, S.H. dengan Akte No. 175 Tahun 1997 di Jakarta."
      },
      {
        year: "1999",
        title: "Perubahan Akta Pertama",
        detail: "Diubah dengan Akte No. 69 Tanggal 17 Desember 1999 oleh Notaris H. Asmawel Amin, S.H."
      },
      {
        year: "2022",
        title: "Perubahan Akta Terakhir",
        detail: "Terakhir Perubahan Akte No. 01 Tanggal 14 Desember 2022 oleh Notaris Belinda Elvia Edison, S.H. M.Kn."
      },
      {
        year: "2022",
        title: "Berita Acara RUPS",
        detail: "Berita Acara Rapat Umum Pemegang Saham dengan Akte No. 1 Tanggal 14 Desember 2022 di Tanjungpinang Dihadapan Notaris Belinda Elvia Edison, S.H. M.Kn."
      }
    ]
  },
  services: {
    sectionTitle: "PRODUK LAYANAN BISNIS",
    sectionSubtitle: "Solusi Konsultansi Komprehensif & Berbasis Regulasi",
    items: [
      {
        id: "1",
        title: "Studi Kelayakan (Feasibility Study)",
        shortDesc: "Kajian komprehensif kelayakan usaha dan investasi untuk meminimalkan risiko.",
        description: "Sebelum melakukan suatu investasi, suatu individu maupun organisasi tentu perlu terlebih dahulu melakukan studi kelayakan (feasibility study) terhadap investasi yang akan dilakukannya. Dalam Studi Kelayakan akan dibahas berbagai aspek dari usaha yang menyangkut aspek kebutuhan, pemasaran, teknologi dan produksi, manajemen, keuangan dan pendanaan serta hal-hal yang berhubungan dengan investasi usaha atau proyek seperti aspek sosial, ekonomi, dan dampak lingkungan. Dengan demikian akan diketahui proses dan tingkat kelayakan usaha tersebut secara jelas dan dapat dipertanggungjawabkan.",
        projects: [
          "Gedung Universitas Internasional Batam",
          "Apartment Harmoni Batam",
          "Pengembangan Usaha Industri Agrobisnis",
          "Pembangunan Perumahan Botania Garden",
          "Sijori Resort Batam",
          "Bintan Beach Ressort",
          "Perumahan Marina View Batam",
          "Konstruksi Tongkang dan Tug Boat",
          "Renovasi Hotel Novotel Batam",
          "Perencanaan dan Pengembangan Program Vokasi di Kota Batam",
          "Kajian Pengembangan Kawasan Taman Rusa Sekupang",
          "Kajian Studi Kelayakan Lahan Gedung Kantor Bupati Kepulauan Meranti"
        ]
      },
      {
        id: "2",
        title: "Sistem Informasi Manajemen Aset (SIMA & GIS)",
        shortDesc: "Monitoring dan manajemen barang daerah berbasis sistem informasi geografis.",
        description: "Jasa ini sangat membantu bagi organisasi/perusahaan yang memiliki aset yang besar dan tersebar. Khusus bagi pemerintahan Kabupaten/Kota maupun Provinsi, jasa ini memberikan kemudahan untuk mengontrol sekaligus memonitor keberadaan Aset yang dimiliki secara efektif dan efisien (Kepmendagri No 49 Tahun 2001 & Kepmendagri No 152 Tahun 2004). Dilengkapi dengan nilai wajar aset serta sistem GIS pemetaan lokasi digital.",
        projects: [
          "Sistem Informasi Manajemen Aset Pemerintah Kota Batam",
          "Sistem Informasi Geografis Manajemen Barang Daerah Pemerintah Kota Batam",
          "Sistem Informasi Profil Kelurahan Kota Batam",
          "Sistem Informasi Manajemen Barang Daerah Pemerintah Kabupaten Karimun",
          "Sistem Informasi Pendataan Aset Daerah Provinsi Kepulauan Riau",
          "Sistem Informasi Manajemen Barang Daerah Pemerintah Kabupaten Bintan",
          "Kegiatan Penyempurnaan Sistem dan Prosedur Pengelolaan Keuangan Daerah Tahun Anggaran 2004 Kota Batam",
          "Standarisasi Kebutuhan Barang Milik Daerah Provinsi Kepulauan Riau Tahun 2022",
          "Keterlibatan Tenaga Ahli Dalam Pekerjaan Inventarisasi Barang dan Aset Daerah Provinsi Kepulauan Riau Tahun 2023",
          "Verifikasi dan Identifikasi Lahan APL dan HPK Dalam Proyek Rempang Eco-City Tahap 1 (2023) hingga Tahap 5 (2025)"
        ]
      },
      {
        id: "3",
        title: "Dokumen Perencanaan Pengadaan Tanah (DPPT)",
        shortDesc: "Penyusunan dokumen wajib pengadaan tanah untuk kepentingan umum.",
        description: "Dokumen Perencanaan Pengadaan Tanah (DPPT) adalah salah satu dokumen wajib dalam kegiatan Pengadaan Tanah berdasarkan UU No 2 Tahun 2012, UU Cipta Kerja No 11 Tahun 2020, PP No 19 Tahun 2021, serta Permen ATR/BPN No 19 Tahun 2021. DPPT disusun berdasarkan studi kelayakan, RTRW, dan prioritas RPJMD / Renstra.",
        projects: [
          "DPPT Bangunan Pengendali Banjir Kampung Kolam - Sulaiman Abdullah Kota Tanjungpinang",
          "DPPT Bundaran Adipura Batu Enam dan Bundaran Pamedan Tanjungpinang",
          "DPPT Pelabuhan Teluk Durian Kabupaten Kepulauan Anambas",
          "DPPT Pembangunan Jembatan Batam - Bintan",
          "DPPT Pengembangan Bandar Udara Raja Haji Abdullah Kabupaten Karimun",
          "DPPT Jembatan Layang (Flyover) Simpang Ramayana Kota Tanjungpinang",
          "DPPT Jembatan Penghubung Kampung Baru - Air Asuk Palmatak Siantan Tengah",
          "DPPT Perkantoran Bupati Kepulauan Meranti",
          "DPPT Jalan Senggarang Menuju Kelenteng Senggarang Tanjungpinang",
          "DPPT Perubahan Embung Hulu Bintan Tahun 2023",
          "DPPT APRON dan BASEOPS LANUD Raja Ali Haji Fisabillah Kepri 2023",
          "DPPT Pembebasan Jalan Lintas Barat Kepri 2023",
          "DPPT Fashum Kantor Bupati Karimun Tahun 2024",
          "DPPT Asrama Mahasiswa KEPRI di Jakarta Tahun 2024",
          "DPPT Kolam Retensi Sudi Mampir Anambas Tahun 2024",
          "Revisi DPPT Bandar Udara Raja Haji Abdullah Karimun Tahun 2025",
          "DPPT Pengembangan TPA Ganet Kota Tanjungpinang 2025"
        ]
      },
      {
        id: "4",
        title: "Standarisasi Harga Satuan Barang/Jasa (SSH, HSPK, ASB)",
        shortDesc: "Keseragaman acuan harga penyusunan RKA dan APBD sesuai Permendagri.",
        description: "Standar Satuan Harga (SSH) diperlukan dalam penyusunan RKA Perangkat Daerah sesuai Permendagri No 13 Tahun 2006 Pasal 93. HSPK disusun berdasarkan SNI untuk estimasi harga bangunan per m2 dan Engineer Estimate yang terukur dan akuntabel sebelum disetujuinya APBD.",
        projects: [
          "Penyusunan SSH, HSPK, dan ASB Kota Batam (2012, 2013, 2014, 2015, 2016, 2017, 2018, 2020, 2021, 2022, 2023, 2024, 2025)",
          "Penyusunan SSH, HSPK, dan ASB Kota Tanjungpinang (2013, 2016, 2021, 2022, 2023)",
          "Penyusunan SSH, HSPK, dan ASB Provinsi Kepulauan Riau (2021, 2022, 2023, 2024, 2025)",
          "Penyusunan SSH dan ASB Kabupaten Kepulauan Anambas (2020, 2021, 2022)",
          "Penyusunan SSH dan ASB Kabupaten Natuna (2022, 2023)",
          "Penyusunan SSH, HSPK, dan ASB Kabupaten Karimun (2022, 2023, 2024, 2025)",
          "Penyusunan SSH, HSPK, dan ASB Kabupaten Bintan (2024, 2025)"
        ]
      },
      {
        id: "5",
        title: "Pembuatan Buku Profil Kabupaten / Kota",
        shortDesc: "Publikasi resmi potensi daerah, sosial ekonomi, dan peluang investasi.",
        description: "Layanan penyusunan dokumen informatif yang menggambarkan potensi, karakteristik, serta kondisi sosial, ekonomi, dan geografis suatu daerah secara menyeluruh melalui pendekatan penulisan sistematis dan visualisasi profesional sebagai alat promosi investasi dan kebijakan strategis.",
        projects: [
          "Buku Profil Potensi Investasi Kota Batam",
          "Buku Profil Daerah & Tata Ruang Provinsi Kepulauan Riau",
          "Buku Panduan Potensi Sumber Daya Kabupaten Karimun"
        ]
      },
      {
        id: "6",
        title: "Analisa Standar Belanja (ASB)",
        shortDesc: "Pengkajian objektif kebutuhan belanja konstruksi dan non-konstruksi.",
        description: "Pengkajian kebutuhan anggaran secara objektif dan terukur berdasarkan jenis kegiatan konstruksi (volume fisik, spesifikasi teknis) maupun non-konstruksi (operasional, pengadaan) untuk efisiensi anggaran dana publik yang tepat sasaran.",
        projects: [
          "Analisa Standar Belanja Konstruksi Gedung & Infrastruktur Kepri",
          "Analisa Standar Belanja Non-Konstruksi Kegiatan Bimtek & Diklat Pemda",
          "Kajian Batas Belanja Operasional Perangkat Daerah"
        ]
      },
      {
        id: "7",
        title: "Personal Investigasi Report (PIR)",
        shortDesc: "Mitigasi risiko kredit perbankan dan investigasi aset nasabah.",
        description: "Dalam konteks perbankan, PIR digunakan untuk verifikasi identitas nasabah, evaluasi kelayakan pinjaman/kredit, investigasi pencegahan fraud, serta penelusuran histori kredit dan kepemilikan aset properti secara kredibel.",
        projects: [
          "Investigasi Portofolio Aset & Agunan Debitur Perbankan Batam & Kepri",
          "Verifikasi Latar Belakang & Kelayakan Kredit Komersial",
          "Analisa Risiko Hukum Kepemilikan Jaminan Aset"
        ]
      }
    ]
  },
  portfolio: {
    sectionTitle: "PRODUK PORTOFOLIO & PEMETAAN",
    sectionSubtitle: "Katalog Laporan Studi, DPPT, SSH, dan Produk Pemetaan Digital",
    items: [
      {
        title: "Kajian Pengembangan Kawasan Taman Rusa Sekupang",
        category: "Studi Kelayakan",
        year: "2020",
        description: "Laporan akhir kajian potensi dan kelayakan teknis pengembangan Taman Rusa Sekupang, Batam."
      },
      {
        title: "Studi Kelayakan Lahan Gedung Kantor Bupati Kepulauan Meranti",
        category: "Studi Kelayakan",
        year: "2022",
        description: "Dinas Pekerjaan Umum dan Penataan Ruang Kabupaten Kepulauan Meranti."
      },
      {
        title: "Penyusunan Program Vokasi Kota Batam",
        category: "Studi Kelayakan",
        year: "2024",
        description: "Kajian perencanaan strategi vokasi tenaga kerja industri terpadu."
      },
      {
        title: "Laporan Verifikasi & Identifikasi Lahan APL & HPK Rempang Eco-City",
        category: "Studi Kelayakan & Aset",
        year: "2024",
        description: "Laporan survei verifikasi spasial dan batas kepemilikan lahan proyek strategis."
      },
      {
        title: "Standar Satuan Harga (SSH) & ASB Pemerintah Kota Batam",
        category: "SSH & ASB",
        year: "2013 - 2025",
        description: "Laporan buku pedoman SSH & HSPK Badan Pengelolaan Keuangan dan Aset Daerah."
      },
      {
        title: "Dokumen Perencanaan Pengadaan Tanah (DPPT) Flyover Simpang Ramayana",
        category: "DPPT",
        year: "2021",
        description: "Pembangunan Jalan Layang Simpang Ramayana Kota Tanjungpinang - Dinas PUPP Kepri."
      },
      {
        title: "DPPT Kantor Samsat Tanjung Uban",
        category: "DPPT",
        year: "2021",
        description: "Pengadaan gedung Kantor Samsat Tanjung Uban Kabupaten Bintan."
      },
      {
        title: "DPPT Pembangunan Jembatan Batam - Bintan",
        category: "DPPT",
        year: "2021",
        description: "Laporan perencanaan pengadaan tanah trase jalan dan tapak jembatan Batam-Bintan."
      },
      {
        title: "DPPT Bandara Raja Haji Abdullah Kabupaten Karimun",
        category: "DPPT",
        year: "2021 & 2025",
        description: "Perencanaan pengadaan tanah perpanjangan runway dan fasilitas bandara."
      },
      {
        title: "Peta Bidang Tanah Terdampak Bandara Raja Haji Abdullah",
        category: "Produk Pemetaan",
        year: "2021",
        description: "Peta kadastral & zonasi koordinat pembebasan lahan bandara."
      },
      {
        title: "Peta Wilayah Trase Flyover Simpang Ramayana Tanjungpinang",
        category: "Produk Pemetaan",
        year: "2021",
        description: "Peta tematik skala 1:10.000 koridor jalur flyover."
      },
      {
        title: "Peta Hasil Inventarisasi Tanah Bintan & Pulau Buau",
        category: "Produk Pemetaan",
        year: "2022",
        description: "Peta inventarisasi batas sempadan dan status kepemilikan tanah kepulauan."
      }
    ]
  },
  documentation: {
    sectionTitle: "DOKUMENTASI KEGIATAN & PROYEK",
    sectionSubtitle: "Dokumentasi Focus Group Discussion (FGD), Rapat Koordinasi, dan Survei Lapangan",
    activities: [
      {
        title: "Focus Group Discussion (FGD) Standar Barang Milik Daerah",
        location: "Aula Kantor Pemerintahan Provinsi Kepulauan Riau",
        year: "2022",
        description: "Penyusunan standar harga satuan dan analisis standar belanja bersama pemangku kepentingan."
      },
      {
        title: "Survei & Pengukuran Patok Batas Lahan DPPT",
        location: "Kepulauan Riau & Riau",
        year: "2023 - 2024",
        description: "Tim surveyor lapangan melakukan verifikasi koordinat patok batas dan identifikasi tutupan lahan."
      },
      {
        title: "Rapat Pembahasan Laporan Antara & Akhir Studi Kelayakan",
        location: "Kantor Dinas PUPR & BPKAD",
        year: "2024",
        description: "Presentasi hasil telaah kelayakan teknis dan ekonomi di hadapan tim penilai daerah."
      },
      {
        title: "Koordinasi Lapangan Verifikasi Lahan Proyek Strategis",
        location: "Kawasan Rempang & Sekupang",
        year: "2023 - 2025",
        description: "Pengecekan fisik di lapangan bersama tim penilai, planologi, dan perwakilan masyarakat."
      }
    ]
  },
  team: {
    sectionTitle: "TIM KAMI 2025",
    description: "Didukung oleh tenaga ahli profesional, bersertifikat, dan berpengalaman di berbagai disiplin ilmu.",
    members: [
      { role: "Komisaris", name: "Endang Larasati", category: "Manajemen" },
      { role: "Direktur", name: "Arief Setiawan, S.Sos", category: "Manajemen" },
      { role: "Ahli Penilai", name: "Elfan Wahyu Mulyana, S.E., M.Ec.Dev", category: "Tenaga Ahli" },
      { role: "Ahli Konstruksi", name: "Ir. Imam Bachroni, M.T", category: "Tenaga Ahli" },
      { role: "Ahli Sosial", name: "Kasim Dahlan, S.Sos., M.M.", category: "Tenaga Ahli" },
      { role: "Ahli Planologi", name: "Reiny Eka Putri, S.T.", category: "Tenaga Ahli" },
      { role: "Ahli Planologi", name: "Ovi Letare Monalisa Sinaga, S.P.W.K", category: "Tenaga Ahli" },
      { role: "Ahli Perikanan", name: "Arifin Toda, S.Pi", category: "Tenaga Ahli" },
      { role: "Ahli Pertanian", name: "Bima Nur Aditia, S.P", category: "Tenaga Ahli" },
      { role: "Ahli Industri", name: "Ir. Endang Larasati", category: "Tenaga Ahli" },
      { role: "Ahli Industri", name: "Radiatul Fitri, S.T", category: "Tenaga Ahli" },
      { role: "Ahli Data Analyst", name: "Ir. Widya Wardhana", category: "Tenaga Ahli" },
      { role: "Ahli Data Analyst", name: "Teguh Arrijal, S.Pd", category: "Tenaga Ahli" },
      { role: "Ahli Kesehatan Masyarakat", name: "Dara Ikhlas, S.K.M", category: "Tenaga Ahli" },
      { role: "Network Technician", name: "Irham Robi Aguslim, S.Kom", category: "Teknis" },
      { role: "Network Technician", name: "Salafudin Zaenul Ardy, S.Kom", category: "Teknis" },
      { role: "Admin & Finance", name: "Tiyas Marcella Nuranissa, S.M", category: "Administrasi" },
      { role: "Tim Surveyor", name: "Rifai Haykal, S.Pd / M. Rafi, S.Sos / Noer Iskandar, S.Pd / Fitri Rahmadini, S.M / Nova Rahmadani, S.H / Prakash Yudha W. / Rio Anwar I. / Sarilda Hamid / Md Nabil A. / M Ghoji Alghifari", category: "Surveyor" }
    ]
  },
  clients: {
    sectionTitle: "DAFTAR BANK REKANAN",
    sectionSubtitle: "Kepercayaan Lembaga Keuangan Terhadap Kredibilitas Investigasi Aset Kami",
    banks: [
      { name: "Bank Muamalat Batam", location: "Batam" },
      { name: "Bank Bumiputera Batam", location: "Batam" },
      { name: "Bank Panin Batam", location: "Batam" },
      { name: "Bank Panin Tanjungpinang", location: "Tanjungpinang" },
      { name: "Bank UOB Batam", location: "Batam" },
      { name: "Bank UOB Tanjungpinang", location: "Tanjungpinang" },
      { name: "Bank BTN Batam", location: "Batam" },
      { name: "Bank BII Batam", location: "Batam" },
      { name: "Bank Lippo Batam", location: "Batam" },
      { name: "Bank Lippo Tanjungpinang", location: "Tanjungpinang" },
      { name: "Bank Danamon Tanjungpinang", location: "Tanjungpinang" }
    ]
  },
  contacts: {
    sectionTitle: "KONTAK KAMI",
    sectionSubtitle: "Hubungi Kantor Kami di Batam atau Jakarta",
    emails: ["indosnesosgemilang@sir.co.id", "info@indosnesos.co"],
    phones: ["0812-7023-3616"],
    workingHours: "Senin - Jumat: 08:30 - 17:00 WIB",
    offices: [
      {
        id: "batam-office",
        title: "Kantor Operasional Batam",
        address: "Orchid Park Blok D No. 175, Taman Baloi, Batam Kota, Batam, Kepulauan Riau, Indonesia 29432",
        phone: "0812-7023-3616",
        email: "indosnesosgemilang@sir.co.id",
        isPrimary: true
      },
      {
        id: "jakarta-office",
        title: "Kantor Jakarta",
        address: "Gedung ASCOM Lt.2, Jl. Dr. Saharjo No 216 Tebet, DKI Jakarta 12870",
        phone: "0812-7023-3616",
        email: "info@indosnesos.co",
        isPrimary: false
      }
    ]
  }
};

export const fetchContent = async () => {
  try {
    const docRef = doc(db, 'settings', 'website-content');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // Merge with default to make sure all new sections exist seamlessly
      const remoteData = docSnap.data();
      return {
        ...DEFAULT_CONTENT,
        ...remoteData,
        hero: { ...DEFAULT_CONTENT.hero, ...remoteData.hero },
        about: { ...DEFAULT_CONTENT.about, ...remoteData.about },
        services: { ...DEFAULT_CONTENT.services, ...remoteData.services },
        portfolio: { ...DEFAULT_CONTENT.portfolio, ...remoteData.portfolio },
        documentation: { ...DEFAULT_CONTENT.documentation, ...remoteData.documentation },
        team: { ...DEFAULT_CONTENT.team, ...remoteData.team },
        clients: { ...DEFAULT_CONTENT.clients, ...remoteData.clients },
        contacts: { ...DEFAULT_CONTENT.contacts, ...remoteData.contacts }
      };
    } else {
      await setDoc(docRef, DEFAULT_CONTENT);
      return DEFAULT_CONTENT;
    }
  } catch (error) {
    console.error("Error fetching content:", error);
    return DEFAULT_CONTENT;
  }
};

export const saveContent = async (newData: any) => {
  try {
    const docRef = doc(db, 'settings', 'website-content');
    await setDoc(docRef, newData, { merge: true });
    return true;
  } catch (error) {
    console.error("Error saving content:", error);
    return false;
  }
};
