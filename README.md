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
- User admin dan guru.

### AI Assistant

- Widget chat tersedia di layout utama.
- Mendukung mode gateway Laravel atau service AI langsung.
- Mendukung request chat, OCR, dan ekstraksi PDF native sesuai konfigurasi environment.

### Pengaturan

- Pengaturan profil atau data pengguna melalui endpoint `/users/me`.

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
git clone <url-repository>
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
VITE_STORAGE_URL=http://localhost:8000
VITE_AI_SERVICE_URL=http://localhost:5000
VITE_USE_LARAVEL_AI_GATEWAY=false
VITE_AI_TIMEOUT_MS=30000
VITE_APP_NAME=spentaru-archive-frontend
```

| Variabel | Wajib | Deskripsi |
| --- | --- | --- |
| `VITE_BASE_API_URL` | Ya | Base URL backend API. Digunakan oleh Axios utama di `src/services/axios.js`. |
| `VITE_STORAGE_URL` | Ya | Base URL storage/file backend. Digunakan saat aplikasi perlu menampilkan atau mengambil file dari server. |
| `VITE_AI_SERVICE_URL` | Opsional | Base URL service AI langsung, default `http://localhost:5000`. |
| `VITE_USE_LARAVEL_AI_GATEWAY` | Opsional | Jika `true`, request AI diarahkan ke backend Laravel melalui `VITE_BASE_API_URL`. |
| `VITE_AI_TIMEOUT_MS` | Opsional | Timeout request AI dalam milidetik. |
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
Gunakan `--build-arg` agar nilai API/AI sesuai environment server.

Variabel yang umum dipakai:

- `VITE_BASE_API_URL`
- `VITE_STORAGE_URL`
- `VITE_AI_SERVICE_URL`
- `VITE_USE_LARAVEL_AI_GATEWAY` (production disarankan `true`)
- `VITE_AI_TIMEOUT_MS`
- `VITE_APP_NAME`

Contoh build image:

```bash
docker build -t spentaru/frontend:prod \
  --build-arg VITE_BASE_API_URL=https://domain-kamu/api/v1 \
  --build-arg VITE_STORAGE_URL=https://domain-kamu \
  --build-arg VITE_AI_SERVICE_URL=https://domain-kamu/api/v1/ai \
  --build-arg VITE_USE_LARAVEL_AI_GATEWAY=true \
  --build-arg VITE_AI_TIMEOUT_MS=30000 \
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
|-- public/                         # Aset publik seperti favicon, logo, dan icons
|-- scripts/                        # Script utilitas proyek
|   `-- export-ai-context.mjs       # Export konteks proyek untuk AI/debugging
|-- src/
|   |-- assets/                     # Aset internal React
|   |-- components/                 # Komponen reusable aplikasi
|   |   |-- ui/                     # UI primitives shadcn/Radix
|   |   |-- AiChatWidget.jsx        # Widget chat AI
|   |   |-- AppSidebar.jsx          # Sidebar dan menu berbasis role
|   |   |-- Confirm.jsx             # Dialog konfirmasi
|   |   |-- Header.jsx              # Header section halaman
|   |   |-- Modal.jsx               # Komponen modal umum
|   |   |-- Pagination.jsx          # Komponen pagination
|   |   `-- PopUp.jsx              # Feedback popup
|   |-- config/                     # Konfigurasi aplikasi
|   |   `-- api.js                 # Base API dan timeout
|   |-- context/                    # React context global
|   |   `-- AuthContext.jsx        # State auth dan session user
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
|   |   |-- category/               # Manajemen kategori
|   |   |-- event/                  # Manajemen event
|   |   |-- storageRule/            # Manajemen storage rules
|   |   |-- user/                   # Manajemen user
|   |   |-- Dashboard.jsx           # Dashboard utama
|   |   |-- Login.jsx               # Login
|   |   |-- Settings.jsx            # Pengaturan
|   |   `-- NotFoundPage.jsx        # Halaman tidak ditemukan
|   |-- services/                   # Layer request API
|   |   |-- axios.js                # Axios instance, CSRF, interceptor auth
|   |   |-- ai.service.js           # Request AI service/gateway
|   |   |-- archive.service.js      # Endpoint arsip
|   |   |-- auth.service.js         # Endpoint auth
|   |   |-- dashboard.service.js    # Endpoint dashboard
|   |   `-- *.service.js           # Service fitur lain
|   |-- utils/                      # Utility routing/proteksi
|   |   `-- ProtectedRoute.jsx      # Guard login dan role
|   |-- App.jsx                     # Definisi routing utama
|   |-- index.css                   # Tailwind, theme token, warna brand
|   `-- main.jsx                   # Entry point React dan QueryClient
|-- .env.example                    # Contoh konfigurasi environment
|-- components.json                 # Konfigurasi shadcn/ui
|-- eslint.config.js                # Konfigurasi ESLint
|-- jsconfig.json                   # Alias import `@/*`
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
| `*` | Not Found | Ditampilkan untuk route tidak dikenal dalam layout. |

## Integrasi API

### Axios Utama

File utama: `src/services/axios.js`.

Perilaku penting:

- `baseURL` diambil dari `VITE_BASE_API_URL`.
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
| `user.service.js` | `/users` |
| `ai.service.js` | Gateway Laravel atau service AI langsung, tergantung `.env`. |

### Pola Data Fetching

- Halaman fitur menggunakan TanStack Query untuk mengambil dan menyegarkan data.
- Fungsi service mengembalikan Promise dari Axios.
- Untuk form upload, gunakan `FormData` dan `multipart/form-data` seperti pola di `archive.service.js`.

## Integrasi AI Assistant

AI Assistant berada di `src/components/AiChatWidget.jsx` dan dipasang di `src/layouts/BaseLayout.jsx`.

Konfigurasi ada di `src/services/ai.service.js`:

### Mode Service AI Langsung

Gunakan konfigurasi berikut:

```env
VITE_USE_LARAVEL_AI_GATEWAY=false
VITE_AI_SERVICE_URL=http://localhost:5000
```

Endpoint yang dipakai:

```text
/api/chat/ask
/api/ocr/extract
/api/pdf/extract-native
```

### Mode Gateway Laravel

Gunakan konfigurasi berikut:

```env
VITE_USE_LARAVEL_AI_GATEWAY=true
VITE_BASE_API_URL=http://localhost:8000/api/v1
```

Endpoint yang dipakai:

```text
/ai/chat/ask
/ai/ocr/extract
/ai/pdf/extract-native
```

Pada mode gateway Laravel, request AI ikut memakai credential dan CSRF.

## Standar Pengembangan

Ikuti standar ini agar proyek mudah diwariskan:

- Gunakan functional component React.
- Gunakan hooks untuk state dan lifecycle.
- Gunakan service di `src/services/` untuk request API, jangan menulis endpoint langsung di komponen halaman.
- Gunakan alias import `@/` untuk file di dalam `src`.
- Gunakan TanStack Query untuk data server yang perlu cache, loading, refetch, atau invalidation.
- Pertahankan pola halaman yang sudah ada: `Header`, `Table/Card`, `Row`, `ModalForm`, `Skeleton`.
- Gunakan komponen `src/components/ui/` jika style dasar berasal dari komponen UI turunan.
- Jaga desain tetap formal, bersih, dan sesuai web arsip sekolah.
- Gunakan warna utama `rgb(36 54 115)` atau token `primary` dari `src/index.css`.
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

- `VITE_AI_SERVICE_URL` salah atau service AI belum berjalan.
- `VITE_USE_LARAVEL_AI_GATEWAY` tidak sesuai mode backend.
- Timeout terlalu kecil untuk proses OCR/PDF.
- Endpoint gateway Laravel belum tersedia.

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

Dikembangkan oleh **Naufal Rafa**.

- GitHub: [@Falrafa4](https://github.com/Falrafa4)
