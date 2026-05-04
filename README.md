# Spentaru Archive Frontend

Aplikasi frontend untuk **Spentaru Archive**, sistem arsip digital sekolah di **SMP Negeri 1 Waru** untuk membantu pengelolaan dokumen agar lebih terstruktur, mudah dicari, dan aman diakses sesuai peran pengguna.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Build](https://img.shields.io/badge/Build-Not%20Configured-lightgrey)
![License](https://img.shields.io/badge/License-Not%20Specified-lightgrey)

## Daftar Isi

- [Tentang Proyek](#tentang-proyek)
- [Fitur](#fitur)
- [Teknologi yang Digunakan](#teknologi-yang-digunakan)
- [Panduan Instalasi & Pengaturan](#panduan-instalasi--pengaturan)
- [Contoh Penggunaan](#contoh-penggunaan)
- [Struktur Folder/Repositori](#struktur-folderrepositori)
- [Kontribusi](#kontribusi)
- [Lisensi](#lisensi)
- [Kontak/Author](#kontakauthor)

## Tentang Proyek

Spentaru Archive Frontend adalah antarmuka web untuk operasional arsip sekolah, meliputi pencatatan, klasifikasi, pelacakan lokasi simpan, aturan retensi, hingga monitoring status arsip. Proyek ini dirancang untuk kebutuhan administrasi sekolah dengan pendekatan UI yang rapi, formal, dan mudah digunakan oleh staf.

Masalah yang dipecahkan:
- Arsip tersebar dan sulit ditemukan saat dibutuhkan.
- Pencatatan arsip manual berisiko inkonsisten.
- Monitoring retensi/pemusnahan arsip sulit ditelusuri tanpa sistem terpusat.

## Fitur

- Autentikasi pengguna dan proteksi halaman berbasis sesi/login.
- Dashboard ringkasan data arsip.
- Manajemen arsip (tambah, ubah, detail, hapus, filter, pencarian, sorting, pagination).
- Manajemen master data (kategori, lokasi arsip, lemari, aturan penyimpanan, pengguna, event).
- Preview arsip dan integrasi endpoint AI service (sesuai konfigurasi environment).

## Teknologi yang Digunakan

Teknologi utama:
- React 19
- Vite 8
- React Router 7
- Tailwind CSS 4
- shadcn/ui + Radix UI
- TanStack Query
- Axios

Tooling pendukung:
- ESLint
- npm

## Panduan Instalasi & Pengaturan

Prasyarat:
- Node.js 18+ (disarankan versi LTS terbaru)
- npm 9+

Langkah instalasi:

```bash
git clone <url-repository>
cd spentaru-archive/frontend
npm install
```

Pengaturan environment:

1. Salin file contoh environment:

```bash
cp .env.example .env
```

2. Sesuaikan nilai variabel pada `.env`:

```env
VITE_BASE_API_URL=http://localhost:8000/api/v1
VITE_STORAGE_URL=http://localhost:8000
VITE_AI_SERVICE_URL=http://localhost:5000
VITE_USE_LARAVEL_AI_GATEWAY=false
VITE_AI_TIMEOUT_MS=30000
VITE_APP_NAME=spentaru-archive-frontend
```

## Contoh Penggunaan

Menjalankan mode development:

```bash
npm run dev
```

Aplikasi akan berjalan di:

```text
http://localhost:3000
```

Build produksi:

```bash
npm run build
```

Menjalankan preview hasil build:

```bash
npm run preview
```

Menjalankan lint:

```bash
npm run lint
```

## Struktur Folder/Repositori

```text
frontend/
+- public/                  # Aset publik
+- scripts/                 # Script utilitas (mis. export context AI)
+- src/
¦  +- assets/               # Gambar/logo
¦  +- components/           # Komponen reusable + UI primitives
¦  +- config/               # Konfigurasi (API, dll)
¦  +- context/              # Global context (auth)
¦  +- hooks/                # Custom hooks
¦  +- layouts/              # Layout aplikasi
¦  +- lib/                  # Utility helper
¦  +- pages/                # Halaman fitur (dashboard, archive, user, dst)
¦  +- services/             # Layer request API per domain
¦  +- utils/                # Helper utilitas (mis. ProtectedRoute)
¦  +- App.jsx               # Definisi routing utama
¦  +- main.jsx              # Entry point React
+- .env.example
+- package.json
+- README.md
```

## Kontribusi

Kontribusi sangat terbuka untuk perbaikan fitur, bug, maupun dokumentasi.

Alur kontribusi yang disarankan:

1. Fork repository.
2. Buat branch fitur/perbaikan baru.
3. Lakukan perubahan dan pastikan lint/build lolos.
4. Commit dengan pesan yang jelas.
5. Ajukan Pull Request dengan deskripsi perubahan.

Contoh alur singkat:

```bash
git checkout -b feat/nama-fitur
npm run lint
npm run build
git add .
git commit -m "feat: tambah fitur ..."
git push origin feat/nama-fitur
```

## Lisensi

Lisensi proyek **belum ditentukan** pada repository ini.

Jika proyek akan dipublikasikan secara luas, disarankan menambahkan file `LICENSE` (misalnya MIT/Apache-2.0) agar aturan penggunaan lebih jelas.

## Kontak/Author

Dikembangkan oleh **Naufal Rafa**.

- GitHub: [@Falrafa4](https://github.com/Falrafa4)
