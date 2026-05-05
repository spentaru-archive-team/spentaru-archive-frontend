# Spentaru Archive Frontend

Aplikasi frontend untuk **Spentaru Archive**, sistem arsip digital sekolah di **SMP Negeri 1 Waru** untuk membantu pengelolaan dokumen agar lebih terstruktur, mudah dicari, dan aman diakses sesuai peran pengguna.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)

## Daftar Isi

- [Tentang Proyek](#tentang-proyek)
- [Fitur](#fitur)
- [Teknologi](#teknologi)
- [Prasyarat](#prasyarat)
- [Instalasi](#instalasi)
- [Konfigurasi](#konfigurasi)
- [Cara Development](#cara-development)
- [Struktur Folder](#struktur-folder)
- [Lisensi](#lisensi)
- [Kontak](#kontak)

## Tentang Proyek

Spentaru Archive adalah sistem informasi manajemen arsip sekolah yang dirancang khusus untuk kebutuhan administratif SMP Negeri 1 Waru. Aplikasi ini memungkinkan pencatatan, klasifikasi, pelacakan lokasi simpan, pemantauan aturan retensi, hingga monitoring status arsip secara terpusat.

Masalah yang dipecahkan:
- Arsip tersebar dan sulit ditemukan saat dibutuhkan
- Pencatatan manual berisiko inkonsisten dan tidak terstandar
- Monitoring retensi dan pemusnahan arsip sulit ditelusuri tanpa sistem terpusat

## Fitur

### Autentikasi & Otorisasi
- Login berbasis sesi dengan proteksi halaman
- Dua peran pengguna: Admin dan Guru
- Menu navigasi disesuaikan berdasarkan peran

### Dashboard
- Ringkasan data arsip secara real-time
- Statistik dan indikator penting

### Manajemen Arsip
- Tambah, ubah, hapus arsip
- Detail arsip dengan preview dokumen
- Filter, pencarian, sorting, pagination
- Klasifikasi berdasarkan kategori
- Pelacakan lokasi simpan

### Manajemen Master Data
- **Kategori** – Klasifikasi arsip
- **Lokasi Arsip** – Lokasi penyimpanan
- **Lemari** – Rak/lemari penyimpan
- **Aturan Penyimpanan (Storage Rules)** – Aturan retensi dan pemusnahan
- **Event** – kegiatan sekolah yang terdokumentasi
- **User** – Pengguna sistem

### AI Assistant
- Widget chat AI untuk bantuan pencarian dan informasi
- Integrasi dengan AI service (opsional, sesuai konfigurasi environment)

### Pengaturan
- Konfigurasi aplikasi tingkat pengguna

## Teknologi

- **React 19** – Library UI
- **Vite 8** – Build tool
- **React Router 7** – Routing
- **Tailwind CSS 4** – Styling
- **shadcn/ui + Radix UI** – Komponen UI
- **TanStack Query** – Data fetching
- **Axios** – HTTP client

### Tooling
- ESLint – Linting
- npm – Package manager

## Prasyarat

- Node.js 18+ (disarankan LTS)
- npm 9+

## Instalasi

```bash
git clone <url-repository>
cd spentaru-archive/frontend
npm install
```

## Konfigurasi

1. Salin file contoh environment:

```bash
cp .env.example .env
```

2. Edit variabel pada `.env`:

```env
VITE_BASE_API_URL=http://localhost:8000/api/v1
VITE_STORAGE_URL=http://localhost:8000
VITE_AI_SERVICE_URL=http://localhost:5000
VITE_USE_LARAVEL_AI_GATEWAY=false
VITE_AI_TIMEOUT_MS=30000
VITE_APP_NAME=spentaru-archive-frontend
```

| Variabel | Deskripsi |
|----------|-----------|
| `VITE_BASE_API_URL` | URL backend API |
| `VITE_STORAGE_URL` | URL server storage untuk akses file |
| `VITE_AI_SERVICE_URL` | URL service AI (jika diaktifkan) |
| `VITE_USE_LARAVEL_AI_GATEWAY` | Aktifkan gateway AI Laravel |
| `VITE_AI_TIMEOUT_MS` | Timeout request AI (ms) |

## Cara Development

### Mode Development

```bash
npm run dev
```

Aplikasi berjalan di `http://localhost:3000`

### Build Produksi

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

### Lint Code

```bash
npm run lint
```

### Export AI Context

```bash
npm run context:ai
```

Script ini mengeksport konteks AI untuk dokumentasi atau debugging.

## Struktur Folder

```
frontend/
├── public/                 # Aset publik (favicon, logo)
├── scripts/                # Script utilitas
│   └── export-ai-context.mjs
├── src/
│   ├── assets/             # Gambar/logo aplikasi
│   ├── components/         # Komponen reusable
│   │   ├── ui/             # UI primitives (shadcn)
│   │   ├── AppSidebar.jsx
│   │   ├── Header.jsx
│   │   ├── AiChatWidget.jsx
│   │   └── ...
│   ├── config/             # Konfigurasi API
│   ├── context/            # Global context (AuthContext)
│   ├── hooks/              # Custom hooks (use-auth, use-mobile)
│   ├── layouts/            # Layout aplikasi (BaseLayout)
│   ├── lib/                # Utility helper (utils.js)
│   ├── pages/              # Halaman fitur
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Settings.jsx
│   │   ├── archive/        # Manajemen arsip
│   │   ├── category/       # Manajemen kategori
│   │   ├── cabinet/        # Manajemen lemari
│   │   ├── archiveLocation/# Manajemen lokasi
│   │   ├── event/          # Manajemen event
│   │   ├── user/           # Manajemen user
│   │   ├── storageRule/    # Manajemen storage rules
│   │   └── NotFoundPage.jsx
│   ├── services/           # Layer API services
│   │   ├── axios.js
│   │   ├── auth.service.js
│   │   ├── archive.service.js
│   │   ├── ai.service.js
│   │   └── ...
│   ├── utils/              # Helper (ProtectedRoute)
│   ├── App.jsx             # Routing utama
│   ├── App.css
│   ├── index.css           # Global styles
│   └── main.jsx            # Entry point
├── .env.example
├── package.json
├── vite.config.js
└── README.md
```

## Lisensi

Proyek ini menggunakan lisensi **MIT**.

## Kontak

Dikembangkan oleh **Naufal Rafa**

- GitHub: [@Falrafa4](https://github.com/Falrafa4)