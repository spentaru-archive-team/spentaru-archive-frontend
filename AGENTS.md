# AGENTS.md

## Peran
- Evaluasi UI, perbaiki langsung, gunakan bahasa Indonesia.

## Desain UI
- Warna utama brand: `rgb(36 54 115)` didefinisikan di `src/index.css` sebagai CSS variable `--primary`. Gunakan token ini untuk semua warna brand.
- Radius default: `rounded-sm`. Hindari radius lebih besar.
- Border tipis, hindari gradient, blur berat, shadow besar.
- Semua komponen UI dasar berada di `src/components/ui/`. Ubah styling di file sumber, bukan di komponen pemanggil.
- Pakai Tailwind utilities dan class‑variance‑authoriy; hindari CSS inline.

## Struktur proyek
- Alias import `@/` mengacu ke folder `src/`.
- Semua request API lewat `src/services/axios.js` (CSRF otomatis, refresh token pada 401/419).
- Service per fitur berada di `src/services/*.service.js`.
- Route utama didefinisikan di `src/App.jsx`; layout utama di `src/layouts/BaseLayout.jsx`.
- Sidebar menu di `src/components/AppSidebar.jsx` menyesuaikan role (`admin`/`guru`).
- Proteksi route di `src/utils/ProtectedRoute.jsx`.

## Lingkungan dan konfigurasi
- Semua variabel environment harus berawalan `VITE_` (lihat `.env.example`). Jangan commit file `.env`.
- Variabel penting: `VITE_BASE_API_URL`, `VITE_STORAGE_URL`, `VITE_APP_NAME`.
- NPM scripts penting:
  - `npm run dev` – jalankan dev server Vite (port 3000).
  - `npm run build` – build produksi ke `dist/`.
  - `npm run preview` – preview hasil build.
  - `npm run lint` – jalankan ESLint.
  - `npm run context:ai` – export konteks AI (`scripts/export-ai-context.mjs`).

## CI / Docker
- CI (`.github/workflows/react-ci.yml`) menjalankan urutan: `npm run lint` → `npm run build` dengan Node 20.
- Docker multi‑stage: builder (`node:20-alpine`) → runtime (`nginx:alpine`). `VITE_*` dibaca saat build; gunakan `--build-arg` untuk nilai custom.

## Menambah fitur baru
1. Tambah fungsi API di `src/services/<fitur>.service.js`.
2. Buat folder `src/pages/<fitur>/` dengan pola: `Header.jsx`, `Table.jsx`, `Row.jsx`, `ModalForm.jsx`, `Skeleton.jsx`, `Page.jsx`.
3. Tambah route di `src/App.jsx`.
4. Tambah item menu di `src/components/AppSidebar.jsx` bila diperlukan.
5. Update `src/utils/ProtectedRoute.jsx` bila akses role baru dibutuhkan.
6. Gunakan token warna `primary` & kelas `rounded-sm` untuk styling baru.
