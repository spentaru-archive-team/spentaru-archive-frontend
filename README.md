# Spentaru Archive Frontend

Frontend untuk **Spentaru Archive**, sistem arsip digital dan fisik sekolah untuk **SMP Negeri 1 Waru**. Aplikasi ini membantu admin dan guru mengelola, mencari, melihat, dan menata arsip sekolah secara terpusat dengan UI yang formal, rapi, dan konsisten dengan identitas Spentaru.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.x-5A29E4?logo=axios&logoColor=white)

## Daftar Isi

- [Gambaran Umum](#gambaran-umum)
- [Tujuan Proyek](#tujuan-proyek)
- [Fitur Utama](#fitur-utama)
- [Role dan Hak Akses](#role-dan-hak-akses)
- [Teknologi](#teknologi)
- [Prasyarat](#prasyarat)
- [Instalasi](#instalasi)
- [Konfigurasi Environment](#konfigurasi-environment)
- [Menjalankan Proyek](#menjalankan-proyek)
- [Dockerfile Frontend](#dockerfile-frontend)
- [Struktur Folder](#struktur-folder)
- [Arsitektur Singkat](#arsitektur-singkat)
- [Routing Halaman](#routing-halaman)
- [Integrasi API](#integrasi-api)
- [Integrasi AI Assistant](#integrasi-ai-assistant)
- [Dark Mode](#dark-mode)
- [CI/CD Pipeline](#cicd-pipeline)
- [Standar Pengembangan](#standar-pengembangan)
- [Panduan Menambah Fitur](#panduan-menambah-fitur)
- [Troubleshooting](#troubleshooting)
- [Checklist Handover](#checklist-handover)
- [Kontak](#kontak)

## Gambaran Umum

Spentaru Archive adalah aplikasi frontend berbasis React untuk mendukung pengarsipan sekolah. Sistem ini menangani arsip digital, data lokasi arsip fisik, kategori, lemari, aturan penyimpanan, event sekolah, user, dashboard monitoring, dan bantuan AI Assistant.

Frontend ini tidak berdiri sendiri. Aplikasi membutuhkan backend API yang kompatibel dengan endpoint pada folder `src/services/`, serta service AI terpisah jika fitur AI Assistant ingin digunakan tanpa gateway Laravel.

## Tujuan Proyek

- Membantu sekolah menyimpan data arsip secara rapi dan mudah ditelusuri.
- Mengurangi ketergantungan pada pencatatan manual.
- Menyediakan antarmuka formal yang cocok untuk administrasi sekolah.
- Memisahkan UI, state, routing, dan komunikasi API agar mudah dilanjutkan developer lain.
- Mendukung pencarian dan preview arsip digital, termasuk dokumen yang diproses melalui OCR di sisi service/backend.

## Fitur Utama

### Autentikasi

- Login berbasis sesi.
- Integrasi CSRF cookie untuk backend Laravel Sanctum.
- Auto refresh CSRF ketika server mengembalikan status `419`.
- Redirect otomatis ke `/login` ketika sesi tidak valid atau API mengembalikan `401`.

### Dashboard

- Ringkasan data arsip dan indikator sistem.
- Informasi arsip tanpa lokasi fisik.
- Informasi event yang masih membutuhkan upload arsip.

### Manajemen Arsip

- Melihat daftar arsip dengan pagination, pencarian, sorting, dan filter kategori.
- Tambah, ubah, dan hapus arsip.
- Upload file arsip menggunakan `multipart/form-data`.
- Preview arsip melalui endpoint blob.
- Download arsip melalui endpoint backend.
- Validasi pesan error preview agar UI dapat menampilkan pesan yang lebih jelas.

### Manajemen Master Data

- Kategori dan subkategori arsip.
- Lokasi fisik arsip.
- Lemari penyimpanan.
- Storage rules atau aturan penyimpanan arsip.
- Event sekolah.
- User admin dan guru, termasuk reset password default dengan notifikasi sukses/gagal.

### AI Assistant

- Widget chat tersedia di layout utama, dengan tombol FAB di kanan bawah.
- Mendukung mode gateway Laravel atau service AI langsung.
- Mendukung request chat, OCR, ekstraksi PDF native, dan unggah file (gambar, PDF, DOCX).
- Panel chat dapat diatur lebarnya (3 preset: 320/400/500px + drag handle).
- **File cards**: AI dapat menampilkan kartu arsip dengan metadata lengkap, link preview, dan link download.
- **Trace ID**: Setiap request menyertakan `X-Trace-Id` untuk memudahkan debugging.
- **Tooltips**: Semua tombol aksi memiliki tooltip.
- Input teks auto-resize, kirim dengan Enter (Shift+Enter untuk baris baru).

### Dark Mode

- Toggle dark mode via `ThemeContext` yang menyimpan preferensi di `localStorage`.
- Menggunakan class-based Tailwind (`dark` class pada `<html>`).
- Seluruh komponen UI telah diadaptasi untuk dark mode.

### Pengaturan

- Pengaturan profil atau data pengguna melalui endpoint `/users/me`.
- Tersedia halaman **About** (tentang website dan tim pengembang) yang bisa diakses dari menu Settings.

### Pencarian Kategori

- Halaman kategori mendukung pencarian real-time untuk menemukan kategori dengan cepat.

## Role dan Hak Akses

Aplikasi mengenali dua role utama dari data user backend: `admin` dan `guru`.

| Role | Akses |
| --- | --- |
| `admin` | Dapat mengakses seluruh halaman yang tersedia di aplikasi. |
| `guru` | Dapat mengakses Dashboard, Arsip, Lokasi Arsip, Lemari, dan Pengaturan. |

Pembatasan akses diterapkan di `src/utils/ProtectedRoute.jsx`. Menu sidebar juga disesuaikan berdasarkan role di `src/components/AppSidebar.jsx`.

## Teknologi

### Runtime dan Build

- React 19
- Vite 8
- Tailwind CSS 4
- npm

### UI dan Styling

- shadcn/ui
- Radix UI
- Lucide React
- Tailwind Merge
- Class Variance Authority
- Geist Variable font
- Inter Variable font

### Data dan API

- Axios
- TanStack Query
- React Router 7

### Dokumen dan File

- docx-preview
- JSZip
- xlsx

### Tooling

- ESLint 9
- Vitest 4
- Testing Library
- Vite React plugin

## Prasyarat

Gunakan versi berikut agar perilaku development lebih konsisten:

- Node.js 20 LTS atau lebih baru disarankan.
- npm 10 atau lebih baru disarankan.
- Backend API Spentaru Archive sudah berjalan.
- Jika memakai AI Assistant tanpa gateway Laravel, AI service juga harus berjalan.

Cek versi lokal:

```bash
node -v
npm -v
```

## Instalasi

Clone repository lalu masuk ke folder frontend:

```bash
git clone https://github.com/spentaru-archive-team/spentaru-archive-frontend.git
cd spentaru-archive/frontend
npm install
```

Jika repository sudah tersedia secara lokal:

```bash
cd frontend
npm install
```

## Konfigurasi Environment

Salin file contoh environment:

```bash
cp .env.example .env
```

Untuk PowerShell Windows:

```powershell
Copy-Item .env.example .env
```

Isi default yang tersedia:

```env
VITE_BASE_API_URL=http://localhost:8000/api/v1
VITE_APP_NAME=spentaru-archive-frontend
```

| Variabel | Wajib | Deskripsi |
| --- | --- | --- |
| `VITE_BASE_API_URL` | Ya | Base URL backend API. Digunakan oleh Axios utama di `src/services/axios.js` serta endpoint preview/download file arsip. |
| `VITE_APP_NAME` | Opsional | Nama aplikasi untuk kebutuhan identifikasi environment. |

Catatan penting:

- Semua variable yang dipakai client harus diawali `VITE_`.
- Jangan commit file `.env` karena bisa berisi konfigurasi lokal atau sensitif.
- Setelah mengubah `.env`, restart dev server Vite.

## Menjalankan Proyek

### Development

```bash
npm run dev
```

Dev server berjalan di:

```text
http://localhost:3000
```

Script `dev` memakai `vite --port=3000 --host`, sehingga aplikasi dapat diakses dari network lokal jika firewall mengizinkan.

### Build Produksi

```bash
npm run build
```

Output build akan dibuat di folder `dist/`.

### Preview Build

```bash
npm run preview
```

Gunakan setelah `npm run build` untuk mengecek hasil build secara lokal.

### Lint

```bash
npm run lint
```

Lint memakai konfigurasi di `eslint.config.js`.

### Test

```bash
npm run test
```

Untuk laporan coverage:

```bash
npm run test:coverage
```

Test memakai Vitest dengan Testing Library.

### Export Konteks AI

```bash
npm run context:ai
```

Script ini menjalankan `scripts/export-ai-context.mjs` untuk mengekspor konteks proyek yang dapat membantu debugging, dokumentasi, atau kebutuhan asistensi AI.

## Dockerfile Frontend

File: `Dockerfile`

Dockerfile frontend memakai pola **multi-stage build**:

1. Stage `builder` (`node:20-alpine`) untuk install dependency dan build Vite ke `dist/`.
2. Stage runtime (`nginx:alpine`) untuk serve static file hasil build.

Kenapa pola ini dipakai:

- Image runtime lebih kecil karena Node tidak ikut dibawa ke production.
- Lebih aman dan stabil untuk serve SPA dibanding `vite preview`.

### Struktur Inti Dockerfile

- `FROM node:20-alpine AS builder`
- `WORKDIR /app`
- `COPY package.json package-lock.json ./`
- `RUN npm ci` (disarankan, konsisten dengan lockfile)
- `COPY . .`
- `RUN npm run build`
- `FROM nginx:alpine`
- `COPY --from=builder /app/dist /usr/share/nginx/html`
- `COPY nginx.conf /etc/nginx/conf.d/default.conf`

### Build-time Environment (Vite)

Variabel `VITE_*` dibaca saat proses build image, bukan saat container runtime.
Gunakan `--build-arg` agar nilai API sesuai environment server.

Variabel yang umum dipakai:

- `VITE_BASE_API_URL`
- `VITE_APP_NAME`

Contoh build image:

```bash
docker build -t spentaru/frontend:prod \
  --build-arg VITE_BASE_API_URL=https://domain-kamu/api/v1 \
  --build-arg VITE_APP_NAME=spentaru-archive-frontend \
  .
```

Contoh jalankan container:

```bash
docker run -d --name spentaru-frontend -p 8080:80 spentaru/frontend:prod
```

Lalu akses:

```text
http://localhost:8080
```

### Catatan Tim (Legacy & Kolaborasi)

- Hindari `COPY .env.example .env` di Dockerfile production agar config tidak terkunci ke nilai contoh.
- Jika ada perubahan endpoint API/AI, rebuild image frontend karena nilai `VITE_*` tertanam saat build.
- Pastikan `nginx.conf` sudah punya fallback SPA `try_files ... /index.html` agar routing React tidak 404 saat refresh halaman.

## Struktur Folder

```text
frontend/
|-- .dockerignore                   # File ignore untuk Docker build context
|-- .github/workflows/              # GitHub Actions CI/CD
|   `-- react-ci.yml                # Frontend CI (lint, build, deploy Pages)
|-- public/                         # Aset publik seperti favicon, logo, dan icons
|-- scripts/                        # Script utilitas proyek
|   `-- export-ai-context.mjs       # Export konteks proyek untuk AI/debugging
|-- src/
|   |-- assets/                     # Aset internal React
|   |-- components/                 # Komponen reusable aplikasi
|   |   |-- ui/                     # UI primitives shadcn/Radix
|   |   |-- AiChatWidget.jsx        # Widget chat AI (file cards, OCR, PDF, tooltips, trace ID)
|   |   |-- AppSidebar.jsx          # Sidebar dan menu berbasis role
|   |   |-- Confirm.jsx             # Dialog konfirmasi
|   |   |-- Header.jsx              # Header section halaman
|   |   |-- Modal.jsx               # Komponen modal umum
|   |   |-- Pagination.jsx          # Komponen pagination
|   |   `-- PopUp.jsx              # Feedback popup
|   |-- config/                     # Konfigurasi aplikasi
|   |   `-- api.js                 # Base API dan timeout (30 detik)
|   |-- context/                    # React context global
|   |   |-- AuthContext.jsx        # State auth dan session user
|   |   `-- ThemeContext.jsx       # State tema (light/dark) dengan localStorage
|   |-- hooks/                      # Custom hooks
|   |   |-- use-auth.js             # Hook akses AuthContext
|   |   `-- use-mobile.js           # Helper responsif
|   |-- layouts/                    # Layout halaman
|   |   `-- BaseLayout.jsx          # Sidebar, popup, outlet, AI widget
|   |-- lib/                        # Utility umum
|   |   `-- utils.js                # Helper className/cn
|   |-- pages/                      # Halaman fitur
|   |   |-- archive/                # Manajemen arsip
|   |   |-- archiveLocation/        # Manajemen lokasi fisik arsip
|   |   |-- cabinet/                # Manajemen lemari
|   |   |-- category/               # Manajemen kategori (dengan pencarian)
|   |   |-- event/                  # Manajemen event
|   |   |-- storageRule/            # Manajemen storage rules
|   |   |-- user/                   # Manajemen user
|   |   |-- About.jsx               # Halaman tentang website dan tim
|   |   |-- Dashboard.jsx           # Dashboard utama
|   |   |-- Login.jsx               # Login
|   |   |-- Settings.jsx            # Pengaturan
|   |   `-- NotFoundPage.jsx        # Halaman tidak ditemukan
|   |-- services/                   # Layer request API
|   |   |-- axios.js                # Axios instance, CSRF, interceptor auth
|   |   |-- ai.service.js           # Request AI service/gateway (dengan trace ID)
|   |   |-- archive.service.js      # Endpoint arsip
|   |   |-- auth.service.js         # Endpoint auth
|   |   |-- dashboard.service.js    # Endpoint dashboard
|   |   `-- *.service.js           # Service fitur lain
|   |-- utils/                      # Utility routing/proteksi
|   |   `-- ProtectedRoute.jsx      # Guard login dan role
|   |-- App.jsx                     # Definisi routing utama (termasuk ScrollToTop, ThemeProvider)
|   |-- index.css                   # Tailwind, theme token, warna brand, dark mode variables
|   `-- main.jsx                   # Entry point React dan QueryClient
|-- .env.example                    # Contoh konfigurasi environment
|-- components.json                 # Konfigurasi shadcn/ui
|-- Dockerfile                      # Multi-stage build (node -> nginx)
|-- eslint.config.js                # Konfigurasi ESLint
|-- jsconfig.json                   # Alias import `@/*`
|-- nginx.conf                      # Konfigurasi Nginx SPA fallback
|-- package.json                    # Script dan dependency
|-- vite.config.js                  # Konfigurasi Vite
`-- README.md                       # Dokumentasi proyek
```

## Arsitektur Singkat

### Entry Point

`src/main.jsx` membuat root React, membungkus aplikasi dengan `QueryClientProvider`, lalu merender `App`.

### Routing

`src/App.jsx` berisi daftar route. Route utama setelah login dibungkus oleh `BaseLayout` dan `ProtectedRoute`.

### Layout

`src/layouts/BaseLayout.jsx` mengatur sidebar, popup global, area konten, tombol sidebar mobile, dan AI chat widget.

### Auth State

`src/context/AuthContext.jsx` menyimpan state user, loading auth, status login, fungsi login, logout, dan refresh user. AuthContext juga memanggil endpoint `/auth/me` saat aplikasi dimuat.

### API Layer

Semua request API utama melewati `src/services/axios.js`. File service per fitur hanya berisi fungsi request agar halaman tidak langsung menulis endpoint.

### Styling

`src/index.css` menyimpan import Tailwind, font, token warna, radius, dan theme variable. Warna utama brand adalah:

```css
--primary: rgb(36 54 115);
```

Saat menambah atau memperbaiki UI, gunakan token warna dari file ini agar tampilan tetap konsisten.

## Routing Halaman

| Path | Halaman | Catatan |
| --- | --- | --- |
| `/` | Redirect | Mengarah ke `/login`. |
| `/login` | Login | Halaman autentikasi. |
| `/dashboard` | Dashboard | Tersedia untuk admin dan guru. |
| `/events` | Event | Hanya admin. |
| `/archives` | Arsip | Tersedia untuk admin dan guru. |
| `/archives/:archiveId/preview` | Preview Arsip | Tersedia untuk admin dan guru. |
| `/categories` | Kategori | Hanya admin. |
| `/archive-locations` | Lokasi Arsip | Tersedia untuk admin dan guru. |
| `/users` | User | Hanya admin. |
| `/storage-rules` | Storage Rules | Hanya admin. |
| `/cabinets` | Lemari | Tersedia untuk admin dan guru. |
| `/settings` | Pengaturan | Tersedia untuk admin dan guru. |
| `/about` | About | Tersedia untuk admin dan guru (tentang website dan tim). |
| `*` | Not Found | Ditampilkan untuk route tidak dikenal dalam layout. |

## Integrasi API

### Axios Utama

File utama: `src/services/axios.js`.

Perilaku penting:

- `baseURL` diambil dari `VITE_BASE_API_URL`.
- `timeout` diset **30 detik** (dinaikkan dari 10 detik untuk menangani request berat).
- Request memakai `withCredentials: true` untuk session/cookie.
- CSRF cookie diambil dari origin API melalui `/sanctum/csrf-cookie`.
- Jika response `419`, request akan refresh CSRF lalu retry sekali.
- Jika response `401`, aplikasi membersihkan state user dan redirect ke `/login`.

### Endpoint Service

| Service | Endpoint utama |
| --- | --- |
| `auth.service.js` | `/auth/login`, `/auth/me`, `/auth/logout`, `/users/me` |
| `archive.service.js` | `/archives`, `/archives/:id`, `/archives/:id/preview`, `/archives/:id/download` |
| `archiveLocation.service.js` | `/archives/physical-locations`, `/archives/:id/physical-locations` |
| `cabinet.service.js` | `/cabinets` |
| `category.service.js` | `/categories` |
| `subcategory.service.js` | `/subcategories` |
| `dashboard.service.js` | `/dashboard`, `/archives/without-location`, `/events/pending-uploads` |
| `event.service.js` | `/events` |
| `storageRule.service.js` | `/archive-storage-rules` |
| `user.service.js` | `/users` untuk CRUD user dan reset password via update user |
| `ai.service.js` | Endpoint AI melalui backend Laravel. |

### Pola Data Fetching

- Halaman fitur menggunakan TanStack Query untuk mengambil dan menyegarkan data.
- Fungsi service mengembalikan Promise dari Axios.
- Untuk form upload, gunakan `FormData` dan `multipart/form-data` seperti pola di `archive.service.js`.

## Integrasi AI Assistant

AI Assistant berada di `src/components/AiChatWidget.jsx` dan dipasang di `src/layouts/BaseLayout.jsx`.

Konfigurasi API mengikuti `VITE_BASE_API_URL` dan instance Axios utama di `src/services/axios.js`.

### Fitur Chat Widget

- **Trigger**: Tombol FAB di kanan bawah dengan label "Asisten AI".
- **Panel samping**: Panel geser dari kanan, lebar dapat diatur (3 preset: 320/400/500px) plus drag handle.
- **Input chat**: Textarea auto-resize; Enter untuk kirim, Shift+Enter untuk baris baru.
- **Unggah file**: Tombol paperclip untuk upload gambar, PDF, DOCX. File diproses di client-side sebelum dikirim.
- **File cards**: Response AI dapat menampilkan kartu arsip dengan metadata (judul, file, kategori, lokasi fisik, link preview/download).
- **Trace ID**: Setiap request `askAi()` menyertakan header `X-Trace-Id` (UUID) untuk debugging.
- **Tooltips**: Setiap tombol aksi memiliki tooltip.
- **Dark mode**: Widget telah diadaptasi untuk tema gelap.

### Endpoint Laravel

Gunakan konfigurasi berikut:

```env
VITE_BASE_API_URL=http://localhost:8000/api/v1
```

Endpoint yang dipakai:

```text
/chat/ask
/ai/ocr/extract
/ai/ocr/extract-base64
/ai/pdf/extract-native
```

Request AI ikut memakai credential, CSRF, refresh 401/419, dan timeout dari Axios utama.

### Fungsi Service

| Fungsi | Deskripsi |
| --- | --- |
| `askAi(message, useSearch, traceId)` | Kirim pesan chat, dukung `use_search` flag dan `X-Trace-Id`. |
| `extractOcr(file, traceId)` | Upload file untuk ekstraksi OCR (multipart). |
| `extractOcrBase64(imageBase64, traceId)` | OCR dari base64 gambar melalui Laravel. |
| `extractPdfNative(file)` | Ekstraksi teks dari PDF (multipart). |

## Dark Mode

Dark mode diimplementasikan menggunakan **class-based strategy** (Tailwind class `dark` pada `<html>`).

### ThemeContext

`src/context/ThemeContext.jsx` menyediakan state tema global:

- Membaca preferensi dari `localStorage.getItem("theme")` dengan fallback `"light"`.
- Toggle class `dark` pada `document.documentElement` saat tema berubah.
- State dan setter diekspos via React Context (`useTheme()` hook).

### CSS Variables

`src/index.css` mendefinisikan variable CSS untuk kedua tema. Komponen menggunakan variable seperti `--primary`, `bg-background`, `text-foreground`, dan `bg-muted` agar otomatis menyesuaikan tema.

### Cakupan

Seluruh komponen UI (termasuk AiChatWidget, sidebar, tabel, form, modal) telah diadaptasi untuk dark mode.

## CI/CD Pipeline

Proyek ini menggunakan **GitHub Actions** untuk otomatisasi CI/CD.

### Frontend CI (`react-ci.yml`)

| Aspek | Detail |
| --- | --- |
| Pemicu | PR ke `main`/`dev`, push ke `main`/`dev`, manual `workflow_dispatch` |
| Jobs | `ci-staging` (dev: lint + build), `ci-production` (main: lint + build + upload artifact), `deploy` (main: deploy ke GitHub Pages) |
| Node | 20 |

### Docker CI (`docker.yml`)

Belum ada workflow Docker terpisah di folder `.github/workflows/`. Build Docker saat ini dilakukan manual melalui `Dockerfile`, sedangkan validasi otomatis frontend berjalan lewat `react-ci.yml`.

## Standar Pengembangan

Ikuti standar ini agar proyek mudah diwariskan:

- Gunakan functional component React.
- Gunakan hooks untuk state dan lifecycle.
- Gunakan service di `src/services/` untuk request API, jangan menulis endpoint langsung di komponen halaman.
- Gunakan alias import `@/` untuk file di dalam `src`.
- Gunakan TanStack Query untuk data server yang perlu cache, loading, refetch, atau invalidation.
- Pertahankan pola halaman yang sudah ada: `Header`, `Table/Card`, `Row`, `ModalForm`, `Skeleton`.
- Gunakan komponen `src/components/ui/` jika style dasar berasal dari komponen UI turunan.
- Gunakan `src/components/PopUp.jsx` untuk feedback sukses/gagal setelah aksi mutasi penting seperti hapus data atau reset password.
- Jaga desain tetap formal, bersih, dan sesuai web arsip sekolah.
- Gunakan warna utama `rgb(36 54 115)` atau token `primary` dari `src/index.css`.
- Pastikan komponen mendukung **dark mode** dengan menggunakan CSS variable (`--primary`, `bg-background`, `text-foreground`, dll) dari `src/index.css`.
- Hindari gradient, blur berat, shadow besar, radius besar, dan dekorasi berlebihan jika tidak diperlukan.
- Jalankan `npm run lint` sebelum menyerahkan perubahan.

## Panduan Menambah Fitur

Gunakan alur berikut ketika menambah modul baru:

1. Tambahkan fungsi API di `src/services/<nama-fitur>.service.js`.
2. Buat folder halaman di `src/pages/<nama-fitur>/` jika fiturnya cukup besar.
3. Ikuti pola komponen yang sudah ada: page, header, table/card, row, modal form, dan skeleton.
4. Tambahkan route di `src/App.jsx`.
5. Tambahkan menu di `src/components/AppSidebar.jsx` jika fitur perlu tampil di sidebar.
6. Jika akses dibatasi role, update `src/utils/ProtectedRoute.jsx`.
7. Gunakan token warna dan komponen UI yang sudah tersedia.
8. Jalankan lint dan build jika memungkinkan.

## Troubleshooting

### Halaman langsung kembali ke login

Kemungkinan penyebab:

- Backend belum berjalan.
- `VITE_BASE_API_URL` salah.
- Cookie session tidak terkirim.
- Konfigurasi CORS/Sanctum backend belum mengizinkan origin frontend.
- Endpoint `/auth/me` mengembalikan `401`.

### Error CSRF atau status 419

Kemungkinan penyebab:

- Endpoint `/sanctum/csrf-cookie` tidak dapat diakses dari origin API.
- Domain, port, atau konfigurasi cookie backend belum sesuai.
- Dev server perlu direstart setelah `.env` berubah.

### AI Assistant tidak merespons

Kemungkinan penyebab:

- `VITE_BASE_API_URL` salah atau backend Laravel belum berjalan.
- Endpoint AI Laravel belum tersedia.
- Timeout Axios utama terlalu kecil untuk proses OCR/PDF.

### Preview arsip gagal

Kemungkinan penyebab:

- File tidak tersedia di storage backend.
- Endpoint `/archives/:id/preview` mengembalikan JSON error, bukan blob dokumen.
- Backend tidak dapat membaca format file.

### Style tidak berubah setelah edit CSS

Kemungkinan penyebab:

- Dev server belum restart setelah perubahan konfigurasi besar.
- Class Tailwind berada di komponen sumber lain.
- Styling dasar berasal dari `src/components/ui/`, bukan dari file pemakai.

## Checklist Handover

Sebelum menyerahkan proyek ke developer lain, pastikan:

- `.env.example` sudah sesuai kebutuhan environment terbaru.
- README ini diperbarui jika ada route, service, dependency, atau flow baru.
- `npm install` berhasil di environment target.
- `npm run lint` sudah dijalankan.
- `npm run build` sudah diuji jika memungkinkan.
- Backend API dan AI service yang dibutuhkan sudah terdokumentasi.
- Role dan akses halaman sudah sesuai kebutuhan sekolah.
- UI tetap konsisten dengan branding Spentaru.

## Kontak

Dikembangkan oleh **Muhammad Naufal Rafa Al As'ad**.

- GitHub: [@Falrafa4](https://github.com/Falrafa4)
