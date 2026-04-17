# AI Workspace Context

Generated: 2026-04-17T02:29:55.224Z
Root: C:/xampp/htdocs/spentaru-archive/frontend

## File Structure

- .gitignore
- AGENTS.md
- components.json
- eslint.config.js
- index.html
- jsconfig.json
- package.json
- README.md
- scripts/export-ai-context.mjs
- src/App.css
- src/App.jsx
- src/components/AiChatWidget.jsx
- src/components/AppSidebar.jsx
- src/components/Confirm.jsx
- src/components/FullScreenLoader.jsx
- src/components/Header.jsx
- src/components/Modal.jsx
- src/components/Pagination.jsx
- src/components/PopUp.jsx
- src/components/ui/button.jsx
- src/components/ui/card.jsx
- src/components/ui/collapsible.jsx
- src/components/ui/input.jsx
- src/components/ui/label.jsx
- src/components/ui/native-select.jsx
- src/components/ui/separator.jsx
- src/components/ui/sheet.jsx
- src/components/ui/sidebar.jsx
- src/components/ui/skeleton.jsx
- src/components/ui/table.jsx
- src/components/ui/tooltip.jsx
- src/config/api.js
- src/context/AuthContext.jsx
- src/hooks/use-auth.js
- src/hooks/use-mobile.js
- src/index.css
- src/layouts/BaseLayout.jsx
- src/lib/utils.js
- src/main.jsx
- src/pages/archive/ArchiveHeader.jsx
- src/pages/archive/ArchiveModalDetail.jsx
- src/pages/archive/ArchiveModalForm.jsx
- src/pages/archive/ArchivePage.jsx
- src/pages/archive/ArchiveRow.jsx
- src/pages/archive/ArchiveTable.jsx
- src/pages/archive/ArchiveTableSkeleton.jsx
- src/pages/category/CategoryHeader.jsx
- src/pages/category/CategoryPage.jsx
- src/pages/category/CategoryRow.jsx
- src/pages/category/CategoryTable.jsx
- src/pages/Dashboard.jsx
- src/pages/event/EventHeader.jsx
- src/pages/event/EventPage.jsx
- src/pages/event/EventRow.jsx
- src/pages/event/EventTable.jsx
- src/pages/location/LocationHeader.jsx
- src/pages/location/LocationPage.jsx
- src/pages/location/LocationRow.jsx
- src/pages/location/LocationTable.jsx
- src/pages/Login.jsx
- src/pages/physicalLocation/PhysicalLocationCard.jsx
- src/pages/physicalLocation/PhysicalLocationHeader.jsx
- src/pages/physicalLocation/PhysicalLocationPage.jsx
- src/pages/storageRule/StorageRuleHeader.jsx
- src/pages/storageRule/StorageRulePage.jsx
- src/pages/storageRule/StorageRuleRow.jsx
- src/pages/storageRule/StorageRuleTable.jsx
- src/pages/user/UserHeader.jsx
- src/pages/user/UserPage.jsx
- src/pages/user/UserRow.jsx
- src/pages/user/UserTable.jsx
- src/pages/user/UserTableSkeleton.jsx
- src/services/archive.service.js
- src/services/auth.service.js
- src/services/axios.js
- src/services/event.service.js
- src/services/system.txt
- src/services/user.service.js
- src/utils/ProtectedRoute.jsx
- vite.config.js

## File Contents

### .gitignore

```text
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*
.env
.gemini/
.playwright-mcp/

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

```

### AGENTS.md

```markdown
# AGENTS.md

## Peran Agent
- Bertindak sebagai evaluator dan senior frontend developer.
- Fokus utama: review UI, rapikan tampilan, lalu implementasikan perbaikan secara langsung.
- Jangan hanya memberi saran; kerjakan perubahan jika konteksnya jelas.

## Gaya Komunikasi
- Gunakan bahasa Indonesia.
- Jawaban harus ringkas, jelas, dan langsung ke inti.
- Hindari penjelasan bertele-tele.
- Setelah mengedit, jelaskan perubahan dalam poin-poin beserta lokasi file dan rentang barisnya.

## Preferensi Desain Proyek
- Tema visual harus konsisten dengan branding Spentaru.
- Warna utama: `rgb(36 54 115)`.
- Warna lain boleh disesuaikan jika tidak konsisten dengan warna utama.
- Tampilan harus terasa rapi, formal, dan cocok untuk web arsip sekolah.
- Hindari desain yang terlalu generik seperti form default tanpa identitas visual.

## Arahan Visual
- Utamakan desain yang bersih, tenang, dan mudah dibaca.
- Hindari gradient jika tidak diminta secara eksplisit.
- Gunakan border tipis yang halus, tidak mencolok.
- Gunakan radius kecil; default yang disukai adalah `rounded-sm`.
- Hindari efek visual berlebihan seperti blur, shadow besar, atau card yang terlalu dekoratif jika tidak diperlukan.
- Active state tetap jelas, tetapi subtle.

## Aturan Saat Mengedit Komponen
- Jika yang diubah adalah styling komponen turunan, edit di file sumber komponennya.
- Contoh: jika `AppSidebar.jsx` memakai `SidebarHeader`, maka styling dasar `SidebarHeader` harus diubah di `src/components/ui/sidebar.jsx`, bukan diakali penuh dari file pemakai.
- Jangan merombak struktur komponen secara berlebihan.
- Pertahankan API dan perilaku komponen yang sudah ada jika tidak perlu diubah.

## Standar Review UI
- Cek konsistensi warna, jarak, radius, border, dan hirarki visual.
- Cek apakah tampilan sudah sesuai konteks aplikasi sekolah, bukan template admin generik.
- Cek apakah teks heading, deskripsi, dan CTA cukup jelas dan relevan.
- Cek apakah desktop dan mobile tetap masuk akal secara layout.

## Format Laporan Perubahan
- Tulis poin perubahan per file.
- Sertakan lokasi file.
- Sertakan rentang baris yang berubah.
- Jika ada keterbatasan verifikasi, jelaskan singkat dan faktual.

## Catatan Verifikasi
- Jika build atau preview gagal karena environment, dependency native, atau sandbox, laporkan apa adanya.
- Jangan menyimpulkan perubahan rusak hanya karena tool build bermasalah di environment.

## Do
- Gunakan bahasa Indonesia yang sederhana dan profesional.
- Langsung cek file terkait sebelum memberi saran atau mengubah kode.
- Jaga konsistensi dengan warna utama Spentaru dan style yang sudah ada. tips: lihat daftar kode warna yang sudah dipakai di file `src/index.css` untuk referensi.
- Buat tampilan yang cocok untuk sistem arsip sekolah: formal, rapi, dan mudah dipahami.
- Gunakan border tipis, spacing rapi, dan radius kecil sebagai default.
- Edit styling di sumber komponen jika style dasarnya memang berasal dari komponen turunan.
- Jelaskan hasil perubahan dalam poin-poin singkat dengan file dan rentang baris.
- Laporkan keterbatasan verifikasi secara jujur dan singkat.

## Don't
- Jangan membuat desain yang terlalu ramai, terlalu dekoratif, atau terasa seperti template promosi.
- Jangan memakai gradient, blur berat, shadow besar, atau radius besar kecuali diminta.
- Jangan merombak struktur komponen secara berlebihan jika cukup diperbaiki dari styling dan komposisi.
- Jangan mengubah API, flow, atau perilaku komponen tanpa alasan yang jelas.
- Jangan memberi jawaban panjang yang isinya berulang-ulang.
- Jangan hanya memberi opini umum tanpa implementasi jika konteks perubahan sudah jelas.
- Jangan memindahkan styling ke file pemakai jika seharusnya dibetulkan di file sumber komponennya.
- Jangan menyalahkan perubahan kode jika masalah yang muncul berasal dari environment build atau dependency lokal.

## Aturan Pemahaman Konteks
- Selalu baca file terkait sebelum melakukan perubahan.
- Pahami hubungan antar komponen sebelum mengedit.
- Jangan mengubah sesuatu yang belum dipahami konteksnya.

## Batasan Implementasi
- Jangan membuat file atau komponen baru jika sudah ada yang bisa digunakan.
- Jangan menduplikasi logic atau styling yang sudah tersedia.
- Gunakan kembali komponen yang ada sebisa mungkin.

## Prioritas Perubahan
Urutan prioritas saat melakukan perubahan:
1. Konsistensi desain
2. Keterbacaan UI
3. Reusability komponen
4. Perubahan minimal pada struktur

## Standar Implementasi
- Gunakan functional component React.
- Gunakan hooks (useState, useEffect, dll).
- Gunakan Axios untuk request API jika sudah digunakan di proyek.
- Ikuti struktur folder yang sudah ada.

## Jika Konteks Tidak Jelas
- Jika perubahan tidak memiliki konteks yang cukup, jangan langsung mengubah kode.
- Jelaskan kekurangan konteks secara singkat dan minta klarifikasi.
```

### components.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "radix-nova",
  "rsc": false,
  "tsx": false,
  "tailwind": {
    "config": "",
    "css": "src/index.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "rtl": false,
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "menuColor": "default",
  "menuAccent": "subtle",
  "registries": {}
}

```

### eslint.config.js

```jsx
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])

```

### index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Spentaru Archive</title>
    <link rel="shortcut icon" href="/logo.png" type="image/x-icon">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

```

### jsconfig.json

```json
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@/*": [
                "./src/*"
            ]
        }
    }
}
```

### package.json

```json
{
  "name": "spentaru-archive-frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --port=3000 --host",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "context:ai": "node scripts/export-ai-context.mjs"
  },
  "dependencies": {
    "@fontsource-variable/geist": "^5.2.8",
    "@tailwindcss/vite": "^4.2.2",
    "@tanstack/react-query": "^5.99.0",
    "axios": "^1.14.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^1.8.0",
    "path": "^0.12.7",
    "radix-ui": "^1.4.3",
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "react-router": "^7.14.0",
    "react-router-dom": "^7.14.0",
    "shadcn": "^4.2.0",
    "tailwind-merge": "^3.5.0",
    "tailwindcss": "^4.2.2",
    "tw-animate-css": "^1.4.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.4",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.1",
    "eslint": "^9.39.4",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.5.2",
    "globals": "^17.4.0",
    "vite": "^8.0.1"
  }
}

```

### README.md

```markdown
# Spentaru Archive Frontend
Frontend untuk Spentaru Archive, sebuah aplikasi berbasis web untuk mengelola arsip sekolah di SMP Negeri 1 Waru.

## Fitur Utama
*Coming Soon*

## Teknologi yang Digunakan
- React.js
- Tailwind CSS
- Shadcn UI
- Vite

Dibuat dengan ❤️ oleh [Naufal Rafa](https://github.com/Falrafa4)
```

### scripts/export-ai-context.mjs

```text
import { promises as fs } from "node:fs";
import path from "node:path";

const root = process.cwd();
const outputJson = path.join(root, "AI_CONTEXT_FULL.json");
const outputMd = path.join(root, "AI_CONTEXT_FULL.md");

const EXCLUDED_DIRS = new Set([
	".git",
	"node_modules",
	"dist",
	"build",
	".vscode",
]);

const EXCLUDED_FILES = new Set([
	"package-lock.json",
	".DS_Store",
]);

const EXCLUDED_EXT = new Set([
	".png",
	".jpg",
	".jpeg",
	".gif",
	".webp",
	".ico",
	".svg",
	".pdf",
	".zip",
	".woff",
	".woff2",
	".ttf",
	".eot",
	".mp4",
	".mp3",
]);

const MAX_FILE_SIZE = 512 * 1024;

function normalizeToPosix(p) {
	return p.split(path.sep).join("/");
}

function shouldSkipFile(fileName, absPath, stat) {
	const ext = path.extname(fileName).toLowerCase();
	if (EXCLUDED_FILES.has(fileName)) return true;
	if (EXCLUDED_EXT.has(ext)) return true;
	if (fileName === ".env") return true;
	if (fileName.startsWith(".env.")) return true;
	if (stat.size > MAX_FILE_SIZE) return true;
	if (absPath.includes(`${path.sep}.git${path.sep}`)) return true;
	if (absPath.includes(`${path.sep}node_modules${path.sep}`)) return true;
	return false;
}

async function readTextSafe(filePath) {
	try {
		return await fs.readFile(filePath, "utf8");
	} catch {
		return null;
	}
}

async function walk(dir, rel = "") {
	const entries = await fs.readdir(dir, { withFileTypes: true });
	entries.sort((a, b) => a.name.localeCompare(b.name));

	const files = [];
	for (const entry of entries) {
		const abs = path.join(dir, entry.name);
		const relPath = rel ? path.join(rel, entry.name) : entry.name;

		if (entry.isDirectory()) {
			if (EXCLUDED_DIRS.has(entry.name)) continue;
			const nested = await walk(abs, relPath);
			files.push(...nested);
			continue;
		}

		if (!entry.isFile()) continue;

		const stat = await fs.stat(abs);
		if (shouldSkipFile(entry.name, abs, stat)) continue;

		const content = await readTextSafe(abs);
		if (content === null) continue;

		files.push({
			path: normalizeToPosix(relPath),
			size: stat.size,
			content,
		});
	}

	return files;
}

function buildTreePaths(files) {
	return files.map((f) => f.path);
}

function buildMarkdown(files) {
	const lines = [];
	lines.push("# AI Workspace Context");
	lines.push("");
	lines.push(`Generated: ${new Date().toISOString()}`);
	lines.push(`Root: ${normalizeToPosix(root)}`);
	lines.push("");
	lines.push("## File Structure");
	lines.push("");
	for (const file of files) {
		lines.push(`- ${file.path}`);
	}

	lines.push("");
	lines.push("## File Contents");
	lines.push("");

	for (const file of files) {
		const ext = path.extname(file.path).toLowerCase();
		const lang =
			ext === ".js" || ext === ".jsx"
				? "jsx"
				: ext === ".ts" || ext === ".tsx"
					? "tsx"
					: ext === ".json"
						? "json"
						: ext === ".css"
							? "css"
							: ext === ".md"
								? "markdown"
								: ext === ".html"
									? "html"
									: "text";

		lines.push(`### ${file.path}`);
		lines.push("");
		lines.push(`\`\`\`${lang}`);
		lines.push(file.content);
		lines.push("\`\`\`");
		lines.push("");
	}

	return lines.join("\n");
}

async function main() {
	const files = await walk(root);
	const payload = {
		generatedAt: new Date().toISOString(),
		root: normalizeToPosix(root),
		fileCount: files.length,
		structure: buildTreePaths(files),
		files,
	};

	await fs.writeFile(outputJson, JSON.stringify(payload, null, 2), "utf8");
	await fs.writeFile(outputMd, buildMarkdown(files), "utf8");

	console.log(`Generated ${path.basename(outputJson)} with ${files.length} files.`);
	console.log(`Generated ${path.basename(outputMd)} with ${files.length} files.`);
}

main().catch((err) => {
	console.error("Failed to export AI context:", err);
	process.exit(1);
});

```

### src/App.css

```css

```

### src/App.jsx

```jsx
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Login from "./pages/Login";
import { TooltipProvider } from "./components/ui/tooltip";
import BaseLayout from "./layouts/BaseLayout";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./utils/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Archive from "./pages/archive/ArchivePage";
import Category from "./pages/category/CategoryPage";
import Location from "./pages/location/LocationPage";
import Event from "./pages/event/EventPage";
import User from "./pages/user/UserPage";
import StorageRule from "./pages/storageRule/StorageRulePage";
import PhysicalLocation from "./pages/physicalLocation/PhysicalLocationPage";

function App() {
  return (
    <AuthProvider>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />

            {/* Main App */}
            <Route element={<BaseLayout />}>
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/events" element={<Event />} />
                <Route path="/archives" element={<Archive />} />
                <Route path="/categories" element={<Category />} />
                <Route path="/archive-locations" element={<Location />} />
                <Route path="/users" element={<User />} />
                <Route path="/storage-rules" element={<StorageRule />} />
                <Route path="/physical-locations" element={<PhysicalLocation />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  );
}

export default App;

```

### src/components/AiChatWidget.jsx

```jsx
import React, { useMemo, useState, useRef, useEffect } from "react";
import {
  BotMessageSquare,
  SendHorizontal,
  Sparkles,
  X,
  Paperclip,
  FileText,
  Image as ImageIcon,
  File as FileIcon,
  Zap,
  FileCode,
  Wand2,
} from "lucide-react";
import axios from "axios";

// Import file system prompt lokalmu
import systemPromptText from "@/services/system.txt?raw";

// Import Komponen Shadcn UI
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

// =====================================================================
// KONFIGURASI API & PROMPT AI
// =====================================================================
// URL sudah dibersihkan dan dipastikan benar 100%
const AI_URL = "https://api.siputzx.my.id/api/ai/glm47flash";

// Gunakan prompt dari file txt, ATAU gunakan fallback prompt ketat ini
const SYSTEM_PROMPT =
  systemPromptText?.trim() ||
  `Kamu adalah "Spentaru AI", asisten virtual resmi untuk sistem pengarsipan di SMP Negeri 1 Waru.
    
    KONTEKS PENTING:
    Spentaru adalah Sistem Penyimpanan Terpadu Arsip (Integrated Archive System) untuk SMP Negeri 1 Waru. Sistem ini berfungsi untuk mengelola, mengarsipkan, dan menyimpan dokumen-dokumen sekolah secara digital. Spentaru ini berada di dalam website resmi SMP Negeri 1 Waru, khususnya di menu Web Arsip.
    
    ATURAN SANGAT KETAT:
    1. Kamu HANYA BOLEH menjawab pertanyaan yang berhubungan dengan: SMPN 1 Waru, pengarsipan dokumen, tata letak hardfile (lemari/rak), event sekolah, OCR, dan fitur website ini.
    2. Jika pengguna bertanya hal di LUAR TOPIK (seperti coding umum, resep makanan, cuaca, dll), TOLAK DENGAN SOPAN.
    3. Jawabanmu harus profesional, ramah, dan ringkas. Gunakan format tebal (dengan tanda **teks**) untuk menekankan kata-kata penting.`;

// Fungsi pemanggil API Teks (Siputzx)
async function askAi(prompt) {
  const response = await axios.get(AI_URL, {
    params: {
      prompt,
      system: SYSTEM_PROMPT,
      temperature: 0.3, // Suhu diturunkan agar AI lebih fokus dan formal
    },
  });

  const payload = response?.data;

  if (payload?.status === false) {
    throw new Error("Layanan AI sedang tidak tersedia.");
  }

  const text =
    payload?.data?.response ||
    payload?.data?.parts?.[0]?.text ||
    payload?.data?.text ||
    payload?.result ||
    payload?.message;

  if (!text || typeof text !== "string") {
    throw new Error("Respons AI tidak valid.");
  }

  return text.trim();
}

// =====================================================================
// KOMPONEN UTAMA WIDGET
// =====================================================================
export default function AiChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [processStatus, setProcessStatus] = useState("");

  const [messages, setMessages] = useState([]);

  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Load Library OCR & Extractor secara dinamis
  useEffect(() => {
    const loadScript = (src) => {
      if (!document.querySelector(`script[src="${src}"]`)) {
        const script = document.createElement("script");
        script.src = src;
        script.crossOrigin = "anonymous";
        document.body.appendChild(script);
      }
    };
    // URL Library dipastikan bersih tanpa tag markdown
    loadScript(
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",
    );
    loadScript("https://unpkg.com/mammoth@1.6.0/mammoth.browser.min.js");
  }, []);

  const isSendDisabled = useMemo(() => {
    return loading || (!input.trim() && !processStatus);
  }, [input, loading, processStatus]);

  // Fungsi untuk merender Markdown Bold (**teks**) menjadi <strong>
  const formatText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-bold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  // --- HANDLER CHAT TEKS BIASA ---
  const handleSend = async (event) => {
    if (event) event.preventDefault();

    const prompt = input.trim();
    if (!prompt || loading) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: prompt, type: "text" },
    ]);
    setInput("");
    setLoading(true);

    try {
      // Memanggil fungsi askAi yang sekarang menyatu di file ini
      const answer = await askAi(prompt);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: answer, type: "text" },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Maaf, terjadi kesalahan saat mengambil jawaban AI.",
          type: "text",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // --- API LOCAL EASYOCR (UNTUK FALLBACK OCR) ---
  const callLocalEasyOCR = async (base64Data, mimeType) => {
    const response = await fetch("http://localhost:5000/api/ocr/extract", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image: base64Data,
        mimeType: mimeType,
      }),
    });

    if (!response.ok) throw new Error("Gagal menghubungi EasyOCR Local Server");

    const result = await response.json();
    if (!result.status)
      throw new Error(result.error || "EasyOCR processing failed");

    return result.data;
  };

  // --- HANDLER UPLOAD FILE (HYBRID OCR ROUTER) ---
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileExt = file.name.split(".").pop().toLowerCase();
    const mimeType = file.type;
    const isImage = mimeType.startsWith("image/");
    const isPdf = fileExt === "pdf" || mimeType === "application/pdf";

    let previewUrl = null;
    if (isImage) previewUrl = URL.createObjectURL(file);

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        type: "file",
        content: "Tolong baca dan ekstrak file ini:",
        fileName: file.name,
        isImage,
        isPdf,
        imageUrl: previewUrl,
      },
    ]);

    setLoading(true);

    try {
      // 1. DOCX (Mammoth)
      if (fileExt === "docx" || fileExt === "doc") {
        setProcessStatus("Mengekstrak teks dokumen Word...");
        const arrayBuffer = await file.arrayBuffer();
        const result = await window.mammoth.extractRawText({ arrayBuffer });

        await new Promise((r) => setTimeout(r, 1000));
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            type: "ocr_result",
            content: result.value || "(Dokumen kosong)",
            engine: "Native Text Extractor (Mammoth)",
            score: "100% Akurat",
            isFallback: false,
          },
        ]);
        return;
      }

      // 2. PDF
      let dataUrlToProcess = "";
      if (isPdf) {
        setProcessStatus("Menganalisa isi PDF...");
        // URL ini juga sudah dibersihkan
        if (window.pdfjsLib)
          window.pdfjsLib.GlobalWorkerOptions.workerSrc =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await window.pdfjsLib.getDocument({
          data: new Uint8Array(arrayBuffer),
        }).promise;

        let fullPdfText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          fullPdfText +=
            textContent.items.map((item) => item.str).join(" ") + "\n";
        }

        if (fullPdfText.replace(/\s/g, "").length > 300) {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              type: "ocr_result",
              content: fullPdfText.trim(),
              engine: "Native PDF Extractor",
              score: "100% Akurat (Teks Asli)",
              isFallback: false,
            },
          ]);
          return;
        }

        setProcessStatus("Isi PDF berupa gambar. Merender ke Canvas...");
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 2.0 });
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        await page.render({ canvasContext: ctx, viewport }).promise;
        dataUrlToProcess = canvas.toDataURL("image/png");
      } else if (isImage) {
        dataUrlToProcess = await new Promise((res, rej) => {
          const reader = new FileReader();
          reader.onload = () => res(reader.result);
          reader.onerror = rej;
          reader.readAsDataURL(file);
        });
      } else {
        throw new Error("Format tidak didukung.");
      }

      // 3. EASYOCR UNTUK GAMBAR & PDF IMAGE
      setProcessStatus("Memproses gambar dengan EasyOCR...");
      const base64String = dataUrlToProcess.split(",")[1];
      const imgMimeType = dataUrlToProcess
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];

      try {
        const easyOCRResult = await callLocalEasyOCR(base64String, imgMimeType);

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            type: "ocr_result",
            content: easyOCRResult.text,
            engine: easyOCRResult.engine,
            score: `${easyOCRResult.confidence.toFixed(2)}%`,
            isFallback: false,
          },
        ]);
        return;
      } catch (error) {
        throw new Error(`EasyOCR processing failed: ${error.message}`);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Gagal memproses file: ${error.message}`,
          type: "text",
        },
      ]);
    } finally {
      setLoading(false);
      setProcessStatus("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="fixed right-6 bottom-6 z-40 h-11 w-auto rounded-full px-5 shadow-lg flex items-center gap-2 transition-all hover:scale-105"
      >
        <Sparkles className="size-5" />
        <span>Asisten AI</span>
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          showOverlay={false}
          className="z-[80] h-dvh p-0 flex flex-col bg-background data-[side=right]:left-0 data-[side=right]:w-screen data-[side=right]:max-w-none sm:data-[side=right]:max-w-none md:data-[side=right]:max-w-none lg:data-[side=right]:max-w-none xl:data-[side=right]:left-auto xl:data-[side=right]:w-full xl:data-[side=right]:max-w-md"
        >
          <SheetHeader className="border-b bg-background px-5 py-4 flex flex-row items-center justify-between z-10">
            <div className="flex flex-col space-y-1">
              <SheetTitle className="flex items-center gap-2 text-lg">
                <BotMessageSquare className="size-5 text-primary" />
                Spentaru AI
              </SheetTitle>
              <SheetDescription className="text-xs">
                Asisten Pengarsipan & OCR Terpadu
              </SheetDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              className="rounded-full w-10 h-5 hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="size-4" />
            </Button>
          </SheetHeader>

          <div className="flex min-h-0 flex-1 flex-col">
            <div className="flex-1 space-y-5 overflow-y-auto px-5 py-6">
              {messages.length === 0 && (
                <div className="bg-background text-muted-foreground rounded-xl border p-5 text-sm text-center shadow-sm flex flex-col items-center">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-3">
                    <Sparkles className="size-6" />
                  </div>
                  <p className="font-bold text-foreground mb-2">
                    Halo! Saya Spentaru AI.
                  </p>
                  <p className="leading-relaxed">
                    Tanyakan info seputar arsip sekolah, atau unggah dokumen
                    (📎) untuk diekstrak teksnya.
                  </p>
                </div>
              )}

              {messages.map((message, index) => {
                const isUser = message.role === "user";

                return (
                  <div
                    key={`${message.role}-${index}`}
                    className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                        isUser
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-background text-foreground border rounded-bl-sm"
                      }`}
                    >
                      {/* UI FILE */}
                      {message.type === "file" && (
                        <div className="mb-3 p-3 bg-white/20 rounded-xl flex items-center gap-3 border border-white/30 backdrop-blur-sm">
                          <div className="p-2 bg-white/20 rounded-lg">
                            {message.isPdf ? (
                              <FileText className="size-6 text-red-200" />
                            ) : message.isImage ? (
                              <ImageIcon className="size-6 text-blue-200" />
                            ) : (
                              <FileIcon className="size-6 text-blue-200" />
                            )}
                          </div>
                          <span
                            className="text-sm font-semibold truncate max-w-[150px] text-white"
                            title={message.fileName}
                          >
                            {message.fileName}
                          </span>
                        </div>
                      )}

                      {/* UI GAMBAR */}
                      {message.imageUrl && (
                        <div className="mb-2 rounded-xl overflow-hidden border border-white/20">
                          <img
                            src={message.imageUrl}
                            alt="Uploaded"
                            className="w-full h-auto object-cover max-h-48"
                          />
                        </div>
                      )}

                      {/* TEXT BOLD RENDERER */}
                      <div className="whitespace-pre-wrap break-words">
                        {formatText(message.content)}
                      </div>

                      {/* UI OCR METADATA */}
                      {message.type === "ocr_result" && message.engine && (
                        <div
                          className={`mt-4 p-3 rounded-xl border text-xs font-mono flex flex-col gap-1.5 ${
                            message.isFallback
                              ? "bg-purple-500/10 border-purple-500/20 text-purple-600"
                              : message.engine.includes("Native")
                                ? "bg-blue-500/10 border-blue-500/20 text-blue-600"
                                : "bg-green-500/10 border-green-500/20 text-green-600"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-bold flex items-center gap-1.5">
                              {message.isFallback ? (
                                <Wand2 className="size-3.5" />
                              ) : message.engine.includes("Native") ? (
                                <FileCode className="size-3.5" />
                              ) : (
                                <Zap className="size-3.5" />
                              )}
                              Engine:
                            </span>
                            <span>{message.engine}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-bold">Akurasi:</span>
                            <span>{message.score}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-background text-muted-foreground rounded-2xl rounded-bl-sm border px-4 py-3 text-sm flex items-center gap-3 shadow-sm">
                    <span className="flex gap-1.5">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></span>
                      <span
                        className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0.15s" }}
                      ></span>
                      <span
                        className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0.3s" }}
                      ></span>
                    </span>
                    <span className="italic">
                      {processStatus || "Sedang mengetik..."}
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* AREA INPUT CHAT */}
            <div className="bg-background border-t p-4 z-10">
              <form onSubmit={handleSend} className="flex items-center gap-2">
                <input
                  type="file"
                  accept="image/*,.pdf,.doc,.docx"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  onClick={() => fileInputRef.current.click()}
                  disabled={loading}
                  className="h-10 w-10 shrink-0 rounded-full"
                >
                  <Paperclip className="size-5" />
                </Button>

                <Input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ketik pesan atau upload file..."
                  className="h-10 py-2 rounded-full px-4 bg-muted/50 focus:bg-background transition-colors"
                  disabled={loading}
                />

                <Button
                  type="submit"
                  size="icon"
                  className="h-10 w-10 shrink-0 rounded-full"
                  disabled={isSendDisabled}
                >
                  <SendHorizontal className="size-5" />
                  <span className="sr-only">Kirim</span>
                </Button>
              </form>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

```

### src/components/AppSidebar.jsx

```jsx
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Confirm from "@/components/Confirm";
import { logout } from "@/services/auth.service";
import { useAuth } from "@/hooks/use-auth";
import Logo from "@/assets/logo.png";

import {
  Archive,
  ChevronDown,
  ChevronRight,
  Clipboard,
  Home,
  LogOut,
  Settings,
  Signpost,
  User,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";

export default function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout: clearAuthState } = useAuth();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const menus = [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    {
      name: "Manajemen",
      icon: Archive,
      items: [
        { name: "Event", path: "/events" },
        { name: "Arsip", path: "/archives" },
        { name: "Lokasi Arsip", path: "/archive-locations" },
        { name: "Kategori", path: "/categories" },
        { name: "User", path: "/users" },
      ],
    },
    { name: "Storage Rules", path: "/storage-rules", icon: Clipboard },
    { name: "Lokasi Fisik", path: "/physical-locations", icon: Signpost },
    { name: "Pengaturan", path: "/settings", icon: Settings },
  ];

  const handleLogout = async (e) => {
    e.preventDefault();
    setIsLoggingOut(true);

    try {
      await logout();
    } catch (err) {
      console.log(err.response);
    }

    clearAuthState();
    setConfirmOpen(false);

    setTimeout(() => {
      navigate("/login", {
        replace: true,
        state: {
          popup: {
            title: "Logout berhasil",
            description: "Sesi Anda telah diakhiri dengan aman.",
            type: "logout",
            duration: 3000,
          },
        },
      });
      setIsLoggingOut(false);
    }, 150);
  };

  return (
    <>
      <Confirm
        open={confirmOpen}
        title="Konfirmasi logout"
        description="Pastikan seluruh pekerjaan Anda sudah selesai sebelum keluar dari sistem."
        confirmLabel="Ya, Logout"
        cancelLabel="Batalkan"
        loading={isLoggingOut}
        onConfirm={handleLogout}
        onClose={() => {
          if (isLoggingOut) return;
          setConfirmOpen(false);
        }}
      />

      <Sidebar className="border-r-0">
        <SidebarTrigger className="hidden md:flex absolute top-4 -right-14 z-10 p-4 bg-background border border-input" />

        <SidebarHeader className="gap-4 px-4 py-4">
          <div className="px-4 pt-4">
            <div className="flex items-start gap-3">
              <div className="min-w-0 space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary/65">
                  Dashboard
                </p>
                <h1 className="text-xl flex gap-1 mb-3 items-center font-semibold tracking-tight text-foreground">
                  <img src={Logo} alt="Logo" className="h-8 w-8" />
                  <span>Spentaru Archive</span>
                </h1>
              </div>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="px-3 pb-3">
          <SidebarMenu className="gap-2">
            {menus.map((menu) => {
              const Icon = menu.icon;
              const hasSubMenu = Array.isArray(menu.items);
              const isActive = menu.path && location.pathname === menu.path;
              const isSubMenuActive =
                hasSubMenu &&
                menu.items.some(
                  (subMenu) => location.pathname === subMenu.path,
                );

              if (hasSubMenu) {
                return (
                  <SidebarMenuItem key={menu.name}>
                    <Collapsible defaultOpen={isSubMenuActive}>
                      <SidebarMenuButton
                        asChild
                        isActive={isSubMenuActive}
                        className="group"
                      >
                        <CollapsibleTrigger className="group/collapsible flex items-center justify-between gap-3 cursor-pointer">
                          <Icon size={18} />
                          <span className="flex min-w-0 flex-1 items-center justify-between gap-3">
                            <span className="truncate">{menu.name}</span>
                            <ChevronDown
                              size={16}
                              className="text-primary/40 transition-transform group-data-[state=open]/collapsible:rotate-180 group-data-[active=true]/menu-button:translate-x-0.5 group-data-[active=true]/menu-button:text-primary"
                            />
                          </span>
                        </CollapsibleTrigger>
                      </SidebarMenuButton>

                      <CollapsibleContent className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                        <SidebarMenuSub className="mt-1">
                          {menu.items.map((subMenu) => {
                            const isSubActive =
                              location.pathname === subMenu.path;

                            return (
                              <SidebarMenuSubItem key={subMenu.path}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={isSubActive}
                                >
                                  <Link to={subMenu.path}>{subMenu.name}</Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            );
                          })}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  </SidebarMenuItem>
                );
              }

              return (
                <SidebarMenuItem key={menu.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className="group"
                  >
                    <Link to={menu.path} className="flex items-center gap-3">
                      <Icon size={18} />
                      <span className="flex min-w-0 flex-1 items-center justify-between gap-3">
                        <span className="truncate">{menu.name}</span>
                        <ChevronRight
                          size={16}
                          className="text-primary/40 transition group-data-[active=true]/menu-button:translate-x-0.5 group-data-[active=true]/menu-button:text-primary"
                        />
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>

        <hr className="mx-4 opacity-70" />

        <SidebarFooter className="px-3 pb-4">
          <SidebarMenuButton asChild className="min-h-14">
            <button className="flex items-center justify-between gap-3 cursor-pointer">
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-sm border border-primary/10 bg-primary/10 text-primary">
                  <User size={18} />
                </span>
                <span className="text-left">
                  <span className="block text-sm font-semibold text-foreground">
                    {user?.name || <Skeleton className="h-3 w-40" />}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {user?.role ? (
                      <>
                        {String(user.role).charAt(0).toUpperCase() +
                          String(user.role).slice(1).toLowerCase()}
                      </>
                    ) : (
                      <Skeleton className="mt-1 h-3 w-12" />
                    )}
                  </span>
                </span>
              </span>
            </button>
          </SidebarMenuButton>
          <SidebarMenuButton asChild className="min-h-14">
            <button
              className="flex items-center justify-between gap-3 cursor-pointer"
              onClick={() => setConfirmOpen(true)}
            >
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-sm border border-primary/10 bg-primary/10 text-primary">
                  <LogOut size={18} />
                </span>
                <span className="text-left">
                  <span className="block text-sm font-semibold text-foreground">
                    Logout
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    Keluar dari dashboard
                  </span>
                </span>
              </span>
              <ChevronRight size={16} className="text-primary/45" />
            </button>
          </SidebarMenuButton>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}

```

### src/components/Confirm.jsx

```jsx
import { Button } from "@/components/ui/button";
import { AlertTriangle, LogOut, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Confirm({
  open,
  title,
  description,
  confirmLabel = "Ya, Logout",
  cancelLabel = "Batal",
  loading = false,
  onConfirm,
  onClose,
}) {
  const [isRendered, setIsRendered] = useState(open);
  const [isVisible, setIsVisible] = useState(open);

  useEffect(() => {
    if (open) {
      setIsRendered(true);
      const frame = window.requestAnimationFrame(() => {
        setIsVisible(true);
      });

      return () => window.cancelAnimationFrame(frame);
    }

    setIsVisible(false);
    const timer = window.setTimeout(() => {
      setIsRendered(false);
    }, 220);

    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  if (!isRendered) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 py-6 transition-all duration-200 ${
        isVisible ? "bg-primary/18 opacity-100" : "bg-primary/0 opacity-0"
      }`}
    >
      <div
        className={`w-full max-w-md rounded-sm border border-primary/15 bg-white text-foreground shadow-[0_18px_56px_-26px_rgba(36,54,115,0.42)] transition-all duration-200 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
      >
        <div className="flex items-start gap-3 border-b border-border/70 px-5 py-7">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-primary/12 bg-primary/6 text-primary">
            <AlertTriangle size={18} />
          </div>

          <div className="min-w-0 flex-1 space-y-1">
            <p
              id="confirm-title"
              className="text-xl font-semibold tracking-tight text-foreground"
            >
              {title}
            </p>
            <p className="text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-sm border border-transparent p-1 text-muted-foreground transition hover:border-border hover:bg-muted hover:text-foreground"
            aria-label="Tutup konfirmasi"
          >
            <X size={16} />
          </button>
        </div>

        {/* <div className="px-5 py-4">
          <div className="rounded-sm border border-border/80 bg-muted/25 px-4 py-3 text-sm leading-6 text-muted-foreground">
            Anda akan keluar dari dashboard dan perlu login kembali untuk
            mengakses data arsip sekolah.
          </div>
        </div> */}

        <div className="flex flex-col-reverse gap-2 px-5 py-4 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            className="h-10 w-full border-border/80 px-4 py-2 text-sm shadow-none sm:w-fit"
            onClick={onClose}
            disabled={loading}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            className="h-10 w-full px-4 py-2 text-sm shadow-none sm:w-fit"
            onClick={onConfirm}
            disabled={loading}
          >
            <LogOut />
            {loading ? "Memproses..." : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

```

### src/components/FullScreenLoader.jsx

```jsx
import { Skeleton } from "@/components/ui/skeleton";

export default function FullScreenLoader() {
  return (
    <div className="h-screen flex flex-col gap-4 items-center justify-center">
      <Skeleton className="h-10 w-40" />
      <Skeleton className="h-4 w-60" />
    </div>
  );
}

```

### src/components/Header.jsx

```jsx
import React from "react";

export default function Header({ title, desc, className, children }) {
  return (
    <header
      className={`rounded-sm border border-border/80 bg-white p-7! sm:px-6 ${className}`}
    >
      <div className="flex flex-col gap-5 w-full">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h1>
          {desc && (
            <p className="text-sm leading-6 text-muted-foreground sm:text-base">
              {desc}
            </p>
          )}
        </div>

        {children}
      </div>
    </header>
  );
}

```

### src/components/Modal.jsx

```jsx
import * as React from "react"
import { Dialog } from "radix-ui"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

const Modal = Dialog.Root
const ModalTrigger = Dialog.Trigger
const ModalPortal = Dialog.Portal
const ModalClose = Dialog.Close

const ModalOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <Dialog.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]",
      className
    )}
    {...props}
  />
))
ModalOverlay.displayName = Dialog.Overlay.displayName

const ModalContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <ModalPortal>
    <ModalOverlay />
    <Dialog.Content
      ref={ref}
      aria-describedby={props["aria-describedby"] || undefined}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-0 shadow-lg rounded-sm",
        className
      )}
      {...props}
    >
      {children}
      <Dialog.Close className="absolute right-4 top-5 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground cursor-pointer">
        <X className="h-5 w-5" />
        <span className="sr-only">Close</span>
      </Dialog.Close>
    </Dialog.Content>
  </ModalPortal>
))
ModalContent.displayName = Dialog.Content.displayName

const ModalHeader = ({ className, ...props }) => (
  <div
    className={cn("flex flex-col space-y-1.5 text-center sm:text-left p-6 border-b bg-muted/20", className)}
    {...props}
  />
)
ModalHeader.displayName = "ModalHeader"

const ModalFooter = ({ className, ...props }) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-6 border-t bg-muted/20", className)}
    {...props}
  />
)
ModalFooter.displayName = "ModalFooter"

const ModalTitle = React.forwardRef(({ className, ...props }, ref) => (
  <Dialog.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight text-primary", className)}
    {...props}
  />
))
ModalTitle.displayName = Dialog.Title.displayName

const ModalDescription = React.forwardRef(({ className, ...props }, ref) => (
  <Dialog.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
ModalDescription.displayName = Dialog.Description.displayName

export {
  Modal,
  ModalPortal,
  ModalOverlay,
  ModalTrigger,
  ModalClose,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
}

```

### src/components/Pagination.jsx

```jsx
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  totalData = 0,
  dataPerPage = 10,
}) {
  // Hitung range data (biar dinamis)
  const start = (currentPage - 1) * dataPerPage + 1;
  const end = Math.min(currentPage * dataPerPage, totalData);

  const pages = Array.from({ length: totalPages }, (_, i) =>
    (i + 1).toString(),
  );

  return (
    <div className="mt-4 flex flex-col gap-3 border-t border-border/70 pt-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Info */}
      <div className="text-sm text-muted-foreground">
        Menampilkan{" "}
        <span className="font-semibold text-foreground">
          {start}-{end}
        </span>{" "}
        dari <span className="font-semibold text-foreground">{totalData}</span>{" "}
        data.
      </div>

      {/* Pagination Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Prev */}
        <Button
          variant="outline"
          className="h-9 w-fit border-border/80 px-3 py-2 text-sm shadow-none"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft size={16} />
          Sebelumnya
        </Button>

        {/* Number */}
        {pages.map((page) => {
          const isActive = Number(page) === currentPage;

          return (
            <Button
              key={page}
              variant={isActive ? "default" : "outline"}
              className={`h-9 w-7 px-0 py-0 text-sm shadow-none ${
                !isActive ? "border-border/80" : ""
              }`}
              onClick={() => onPageChange(Number(page))}
            >
              {page}
            </Button>
          );
        })}

        {/* Next */}
        <Button
          variant="outline"
          className="h-9 w-fit border-border/80 px-3 py-2 text-sm shadow-none"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Berikutnya
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
}

```

### src/components/PopUp.jsx

```jsx
import { Button } from "@/components/ui/button";
import { CheckCircle2, LogIn, LogOut, X } from "lucide-react";
import { useEffect, useState } from "react";

const iconMap = {
  login: LogIn,
  logout: LogOut,
  success: CheckCircle2,
};

export default function PopUp({
  open,
  title,
  type = "success",
  duration = 3000,
  onClose,
}) {
  const [isRendered, setIsRendered] = useState(open);
  const [isVisible, setIsVisible] = useState(open);

  useEffect(() => {
    if (open) {
      setIsRendered(true);
      const frame = window.requestAnimationFrame(() => {
        setIsVisible(true);
      });

      return () => window.cancelAnimationFrame(frame);
    }

    setIsVisible(false);
    const timer = window.setTimeout(() => {
      setIsRendered(false);
    }, 240);

    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open || !duration) return undefined;

    const timer = window.setTimeout(() => {
      onClose?.();
    }, duration);

    return () => window.clearTimeout(timer);
  }, [duration, onClose, open]);

  if (!isRendered) return null;

  const Icon = iconMap[type] || CheckCircle2;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-start justify-center px-4 py-6 sm:items-start sm:justify-end">
      <div
        className={`pointer-events-auto w-full max-w-sm rounded-sm border border-primary/15 bg-white text-foreground shadow-[0_14px_40px_-24px_rgba(36,54,115,0.38)] transition-all duration-300 ease-out ${
          isVisible
            ? "translate-y-0 opacity-100 sm:translate-x-0"
            : "-translate-y-4 opacity-0 sm:translate-x-96"
        }`}
      >
        <div className="flex items-center gap-3 p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-primary/15 bg-primary/8 text-primary">
            <Icon size={18} />
          </div>

          <div className="min-w-0 flex-1 space-y-1">
            <p className="text-lg font-semibold text-foreground">{title}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-sm border border-transparent p-1 text-muted-foreground transition hover:border-border hover:bg-muted hover:text-foreground"
            aria-label="Tutup pop up"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

```

### src/components/ui/button.jsx

```jsx
import * as React from "react"
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "h-12 w-full text-base font-semibold shadow-lg transition group/button inline-flex shrink-0 items-center justify-center hover:cursor-pointer py-5 rounded-sm border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80 shadow-primary/20 hover:bg-primary/90",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} />
  );
}

export { Button, buttonVariants }

```

### src/components/ui/card.jsx

```jsx
import * as React from "react"

import { cn } from "@/lib/utils"

function Card({
  className,
  size = "default",
  ...props
}) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card flex flex-col gap-1 overflow-hidden rounded-sm bg-card py-10 text-sm text-card-foreground ring-1 ring-foreground/10 has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-sm *:[img:last-child]:rounded-b-sm",
        className
      )}
      {...props} />
  );
}

function CardHeader({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-sm px-7 group-data-[size=sm]/card:px-3 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3",
        className
      )}
      {...props} />
  );
}

function CardTitle({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm",
        className
      )}
      {...props} />
  );
}

function CardDescription({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props} />
  );
}

function CardAction({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props} />
  );
}

function CardContent({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-7 group-data-[size=sm]/card:px-3", className)}
      {...props} />
  );
}

function CardFooter({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-sm border-t bg-muted/50 py-5 px-7 group-data-[size=sm]/card:p-3",
        className
      )}
      {...props} />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}

```

### src/components/ui/collapsible.jsx

```jsx
import { Collapsible as CollapsiblePrimitive } from "radix-ui"

function Collapsible({
  ...props
}) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

function CollapsibleTrigger({
  ...props
}) {
  return (<CollapsiblePrimitive.CollapsibleTrigger data-slot="collapsible-trigger" {...props} />);
}

function CollapsibleContent({
  ...props
}) {
  return (<CollapsiblePrimitive.CollapsibleContent data-slot="collapsible-content" {...props} />);
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }

```

### src/components/ui/input.jsx

```jsx
import * as React from "react"

import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  ...props
}) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-12 border-border bg-white/80 shadow-sm transition focus-visible:ring-2 focus-visible:ring-primary/30 w-full min-w-0 rounded-sm border px-3 py-5 text-base outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props} />
  );
}

export { Input }

```

### src/components/ui/label.jsx

```jsx
import * as React from "react"
import { Label as LabelPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props} />
  );
}

export { Label }

```

### src/components/ui/native-select.jsx

```jsx
import * as React from "react"

import { cn } from "@/lib/utils"
import { ChevronDownIcon } from "lucide-react"

function NativeSelect({
  className,
  size = "default",
  ...props
}) {
  return (
    <div
      className={cn(
        "group/native-select relative w-fit has-[select:disabled]:opacity-50",
        className
      )}
      data-slot="native-select-wrapper"
      data-size={size}>
      <select
        data-slot="native-select"
        data-size={size}
        className="cursor-pointer h-10 border-border bg-white/80 transition w-full min-w-0 appearance-none rounded-sm border pr-8 pl-2.5 text-sm outline-none select-none selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] data-[size=sm]:py-0.5 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"
        {...props} />
      <ChevronDownIcon
        className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground select-none"
        aria-hidden="true"
        data-slot="native-select-icon" />
    </div>
  );
}

function NativeSelectOption({
  className,
  ...props
}) {
  return (
    <option
      data-slot="native-select-option"
      className={cn("bg-[Canvas] text-[CanvasText]", className)}
      {...props} />
  );
}

function NativeSelectOptGroup({
  className,
  ...props
}) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn("bg-[Canvas] text-[CanvasText]", className)}
      {...props} />
  );
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption }

```

### src/components/ui/separator.jsx

```jsx
import * as React from "react"
import { Separator as SeparatorPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className
      )}
      {...props} />
  );
}

export { Separator }

```

### src/components/ui/sheet.jsx

```jsx
import * as React from "react"
import { Dialog as SheetPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"

function Sheet({
  ...props
}) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({
  ...props
}) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({
  ...props
}) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({
  ...props
}) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({
  className,
  ...props
}) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props} />
  );
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  showOverlay = true,
  overlayClassName,
  ...props
}) {
  return (
    <SheetPortal>
      {showOverlay && <SheetOverlay className={overlayClassName} />}
      <SheetPrimitive.Content
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          "fixed z-50 flex flex-col gap-4 bg-popover bg-clip-padding text-sm text-popover-foreground shadow-lg transition duration-200 ease-in-out data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-[side=bottom]:data-open:slide-in-from-bottom-10 data-[side=left]:data-open:slide-in-from-left-10 data-[side=right]:data-open:slide-in-from-right-10 data-[side=top]:data-open:slide-in-from-top-10 data-closed:animate-out data-closed:fade-out-0 data-[side=bottom]:data-closed:slide-out-to-bottom-10 data-[side=left]:data-closed:slide-out-to-left-10 data-[side=right]:data-closed:slide-out-to-right-10 data-[side=top]:data-closed:slide-out-to-top-10",
          className
        )}
        {...props}>
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close data-slot="sheet-close" asChild>
            <Button variant="ghost" className="absolute top-3 right-3" size="icon-sm">
              <XIcon />
              <span className="sr-only">Close</span>
            </Button>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

function SheetHeader({
  className,
  ...props
}) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-0.5 p-4", className)}
      {...props} />
  );
}

function SheetFooter({
  className,
  ...props
}) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props} />
  );
}

function SheetTitle({
  className,
  ...props
}) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("font-heading text-base font-medium text-foreground", className)}
      {...props} />
  );
}

function SheetDescription({
  className,
  ...props
}) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props} />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
```

### src/components/ui/sidebar.jsx

```jsx
"use client";
import * as React from "react"
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { PanelLeftIcon } from "lucide-react"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "20rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

const SidebarContext = React.createContext(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open
  const setOpen = React.useCallback((value) => {
    const openState = typeof value === "function" ? value(open) : value
    if (setOpenProp) {
      setOpenProp(openState)
    } else {
      _setOpen(openState)
    }

    // This sets the cookie to keep the sidebar state.
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
  }, [setOpenProp, open])

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  }, [isMobile, setOpen, setOpenMobile])

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar])

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed"

  const contextValue = React.useMemo(() => ({
    state,
    open,
    setOpen,
    isMobile,
    openMobile,
    setOpenMobile,
    toggleSidebar,
  }), [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar])

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        data-slot="sidebar-wrapper"
        style={
          {
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
            ...style
          }
        }
        className={cn(
          "group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar",
          className
        )}
        {...props}>
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  dir,
  ...props
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          "flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground",
          className
        )}
        {...props}>
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          dir={dir}
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE
            }
          }
          side={side}>
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className="group peer hidden text-sidebar-foreground md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar">
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
        )} />
      <div
        data-slot="sidebar-container"
        data-side={side}
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) bg-sidebar p-4 transition-[left,right,width] duration-200 ease-linear data-[side=left]:left-0 data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] data-[side=right]:right-0 data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)] md:flex",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className
        )}
        {...props}>
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="flex size-full flex-col rounded-sm border border-border/80 bg-white group-data-[variant=floating]:rounded-sm group-data-[variant=floating]:ring-1 group-data-[variant=floating]:ring-border/80">
          {children}
        </div>
      </div>
    </div>
  );
}

function SidebarTrigger({
  className,
  onClick,
  ...props
}) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon-sm"
      className={cn(className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}>
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

function SidebarRail({
  className,
  ...props
}) {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "absolute inset-y-0 z-20 hidden w-4 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:start-1/2 after:w-[2px] hover:after:bg-sidebar-border sm:flex ltr:-translate-x-1/2 rtl:-translate-x-1/2",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full hover:group-data-[collapsible=offcanvas]:bg-sidebar",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      )}
      {...props} />
  );
}

function SidebarInset({
  className,
  ...props
}) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "relative flex w-full flex-1 flex-col bg-background md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className
      )}
      {...props} />
  );
}

function SidebarInput({
  className,
  ...props
}) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn("h-8 w-full bg-background shadow-none", className)}
      {...props} />
  );
}

function SidebarHeader({
  className,
  ...props
}) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-3", className)}
      {...props} />
  );
}

function SidebarFooter({
  className,
  ...props
}) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn("mt-auto flex flex-col gap-2 p-3", className)}
      {...props} />
  );
}

function SidebarSeparator({
  className,
  ...props
}) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn("w-full bg-sidebar-border", className)}
      {...props} />
  );
}

function SidebarContent({
  className,
  ...props
}) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        "no-scrollbar flex min-h-0 flex-1 flex-col gap-0 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      )}
      {...props} />
  );
}

function SidebarGroup({
  className,
  ...props
}) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props} />
  );
}

function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "div"

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        "flex h-8 shrink-0 items-center rounded-sm px-2 text-xs font-medium text-sidebar-foreground/70 ring-sidebar-ring outline-hidden transition-[margin,opacity] duration-200 ease-linear group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        className
      )}
      {...props} />
  );
}

function SidebarGroupAction({
  className,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        "absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-sm p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform group-data-[collapsible=icon]:hidden after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0",
        className
      )}
      {...props} />
  );
}

function SidebarGroupContent({
  className,
  ...props
}) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn("w-full text-sm", className)}
      {...props} />
  );
}

function SidebarMenu({
  className,
  ...props
}) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn("flex w-full min-w-0 flex-col gap-0", className)}
      {...props} />
  );
}

function SidebarMenuItem({
  className,
  ...props
}) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn("group/menu-item relative", className)}
      {...props} />
  );
}

const sidebarMenuButtonVariants = cva(
  "peer/menu-button group/menu-button flex w-full items-center gap-3 overflow-hidden rounded-sm border border-transparent px-3 py-5 text-left text-sm text-sidebar-foreground ring-sidebar-ring outline-hidden transition-[width,height,padding,background-color,border-color,color] duration-200 group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-11! group-data-[collapsible=icon]:p-2.5! hover:border-border/80 hover:bg-white hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-open:hover:bg-white data-open:hover:text-sidebar-accent-foreground data-active:border-primary/15 data-active:bg-primary/6 data-active:font-medium data-active:text-sidebar-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "button"
  const { isMobile, state } = useSidebar()

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props} />
  )

  if (!tooltip) {
    return button
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltip} />
    </Tooltip>
  );
}

function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={cn(
        "absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-sm p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0",
        showOnHover &&
          "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-active/menu-button:text-sidebar-accent-foreground aria-expanded:opacity-100 md:opacity-0",
        className
      )}
      {...props} />
  );
}

function SidebarMenuBadge({
  className,
  ...props
}) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        "pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-sm px-1 text-xs font-medium text-sidebar-foreground tabular-nums select-none group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 peer-data-active/menu-button:text-sidebar-accent-foreground",
        className
      )}
      {...props} />
  );
}

function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}) {
  // Random width between 50 to 90%.
  const [width] = React.useState(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  })

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn("flex h-8 items-center gap-2 rounded-sm px-2", className)}
      {...props}>
      {showIcon && (
        <Skeleton className="size-4 rounded-sm" data-sidebar="menu-skeleton-icon" />
      )}
      <Skeleton
        className="h-4 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width
          }
        } />
    </div>
  );
}

function SidebarMenuSub({
  className,
  ...props
}) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5 group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props} />
  );
}

function SidebarMenuSubItem({
  className,
  ...props
}) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn("group/menu-sub-item relative", className)}
      {...props} />
  );
}

function SidebarMenuSubButton({
  asChild = false,
  size = "md",
  isActive = false,
  className,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "a"

  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "flex h-8 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-sm px-3 text-sidebar-foreground ring-sidebar-ring outline-hidden group-data-[collapsible=icon]:hidden hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[size=md]:text-sm data-[size=sm]:text-xs data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        className
      )}
      {...props} />
  );
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}

```

### src/components/ui/skeleton.jsx

```jsx
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props} />
  );
}

export { Skeleton }

```

### src/components/ui/table.jsx

```jsx
import * as React from "react"

import { cn } from "@/lib/utils"

function Table({
  className,
  ...props
}) {
  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto">
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props} />
    </div>
  );
}

function TableHeader({
  className,
  ...props
}) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props} />
  );
}

function TableBody({
  className,
  ...props
}) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props} />
  );
}

function TableFooter({
  className,
  ...props
}) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)}
      {...props} />
  );
}

function TableRow({
  className,
  ...props
}) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted",
        className
      )}
      {...props} />
  );
}

function TableHead({
  className,
  ...props
}) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "px-4 py-3 text-sm font-semibold tracking-wider text-primary/75 h-10 text-left align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props} />
  );
}

function TableCell({
  className,
  ...props
}) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "px-4 py-4 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props} />
  );
}

function TableCaption({
  className,
  ...props
}) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props} />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}

```

### src/components/ui/tooltip.jsx

```jsx
"use client"

import * as React from "react"
import { Tooltip as TooltipPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function TooltipProvider({
  delayDuration = 0,
  ...props
}) {
  return (<TooltipPrimitive.Provider data-slot="tooltip-provider" delayDuration={delayDuration} {...props} />);
}

function Tooltip({
  ...props
}) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}

function TooltipTrigger({
  ...props
}) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "z-50 inline-flex w-fit max-w-xs origin-(--radix-tooltip-content-transform-origin) items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs text-background has-data-[slot=kbd]:pr-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}>
        {children}
        <TooltipPrimitive.Arrow
          className="z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }

```

### src/config/api.js

```jsx
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_BASE_API_URL,
  TIME_OUT: 10000,
};
export const STORAGE_URL = import.meta.env.VITE_STORAGE_URL;
```

### src/context/AuthContext.jsx

```jsx
/* eslint-disable react-refresh/only-export-components */
import { me } from "@/services/auth.service";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const extractUserFromPayload = (payload) => {
  if (!payload || typeof payload !== "object") return null;

  // Login response can be { token, user } or just an auth payload.
  if (payload.user && typeof payload.user === "object") {
    return payload.user;
  }

  return payload;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await me();
        if (res.data.status == 'success') {
          setUser(res.data.data);
        }
      } catch (err) {
        console.log(err);
        if (err?.response?.status === 401) {
          // Token is invalid or expired
          localStorage.removeItem("token");
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  const login = (data) => {
    if (data?.token) {
      localStorage.setItem("token", data.token);
    }

    const nextUser = extractUserFromPayload(data);
    setUser(nextUser);
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

```

### src/hooks/use-auth.js

```jsx
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export const useAuth = () => useContext(AuthContext);

```

### src/hooks/use-mobile.js

```jsx
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange);
  }, [])

  return !!isMobile
}

```

### src/index.css

```css
@import 'tailwindcss';
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "@fontsource-variable/geist";

@custom-variant dark (&:is(.dark *));

@theme inline {
    --font-heading: var(--font-sans);
    --font-sans: 'Geist Variable', sans-serif;
    --color-sidebar-ring: var(--sidebar-ring);
    --color-sidebar-border: var(--sidebar-border);
    --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
    --color-sidebar-accent: var(--sidebar-accent);
    --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
    --color-sidebar-primary: var(--sidebar-primary);
    --color-sidebar-foreground: var(--sidebar-foreground);
    --color-sidebar: var(--sidebar);
    --color-chart-5: var(--chart-5);
    --color-chart-4: var(--chart-4);
    --color-chart-3: var(--chart-3);
    --color-chart-2: var(--chart-2);
    --color-chart-1: var(--chart-1);
    --color-ring: var(--ring);
    --color-input: var(--input);
    --color-border: var(--border);
    --color-destructive: var(--destructive);
    --color-accent-foreground: var(--accent-foreground);
    --color-accent: var(--accent);
    --color-muted-foreground: var(--muted-foreground);
    --color-muted: var(--muted);
    --color-secondary-foreground: var(--secondary-foreground);
    --color-secondary: var(--secondary);
    --color-primary-foreground: var(--primary-foreground);
    --color-primary: var(--primary);
    --color-popover-foreground: var(--popover-foreground);
    --color-popover: var(--popover);
    --color-card-foreground: var(--card-foreground);
    --color-card: var(--card);
    --color-foreground: var(--foreground);
    --color-background: var(--background);
    --radius-sm: calc(var(--radius) * 0.6);
    --radius-md: calc(var(--radius) * 0.8);
    --radius-lg: var(--radius);
    --radius-xl: calc(var(--radius) * 1.4);
    --radius-2xl: calc(var(--radius) * 1.8);
    --radius-3xl: calc(var(--radius) * 2.2);
    --radius-4xl: calc(var(--radius) * 2.6);
}

:root {
  --background: rgb(247 249 255);
  --foreground: rgb(21 30 62);
  --card: rgb(255 255 255);
  --card-foreground: rgb(21 30 62);
  --popover: rgb(255 255 255);
  --popover-foreground: rgb(21 30 62);
  --primary: rgb(36 54 115);
  --primary-foreground: rgb(244 247 255);
  --secondary: rgb(227 234 250);
  --secondary-foreground: rgb(27 40 88);
  --muted: rgb(236 241 253);
  --muted-foreground: rgb(93 107 149);
  --accent: rgb(213 223 248);
  --accent-foreground: rgb(24 37 84);
  --destructive: rgb(190 48 63);
  --border: rgb(202 214 243);
  --input: rgb(202 214 243);
  --ring: rgb(93 117 195);
  --chart-1: rgb(62 84 160);
  --chart-2: rgb(95 118 193);
  --chart-3: rgb(129 150 220);
  --chart-4: rgb(162 179 237);
  --chart-5: rgb(191 205 246);
    --radius: 0.625rem;
    --sidebar: rgb(241 245 255);
    --sidebar-foreground: rgb(21 30 62);
    --sidebar-primary: rgb(36 54 115);
    --sidebar-primary-foreground: rgb(244 247 255);
    --sidebar-accent: rgb(229, 235, 253);
    --sidebar-accent-foreground: rgb(27 40 88);
    --sidebar-border: rgb(202 214 243);
    --sidebar-ring: rgb(93 117 195);
}

.dark {
    --background: rgb(10 16 36);
    --foreground: rgb(230 238 255);
    --card: rgb(16 24 52);
    --card-foreground: rgb(230 238 255);
    --popover: rgb(16 24 52);
    --popover-foreground: rgb(230 238 255);
    --primary: rgb(111 137 235);
    --primary-foreground: rgb(10 16 36);
    --secondary: rgb(30 41 78);
    --secondary-foreground: rgb(226 235 255);
    --muted: rgb(23 33 66);
    --muted-foreground: rgb(158 176 229);
    --accent: rgb(43 60 118);
    --accent-foreground: rgb(228 236 255);
    --destructive: rgb(244 114 128);
    --border: rgb(116 138 214 / 25%);
    --input: rgb(116 138 214 / 35%);
    --ring: rgb(123 146 236);
    --chart-1: rgb(134 157 241);
    --chart-2: rgb(110 135 228);
    --chart-3: rgb(88 112 207);
    --chart-4: rgb(67 89 180);
    --chart-5: rgb(52 72 151);
    --sidebar: rgb(14 21 46);
    --sidebar-foreground: rgb(230 238 255);
    --sidebar-primary: rgb(111 137 235);
    --sidebar-primary-foreground: rgb(10 16 36);
    --sidebar-accent: rgb(33 47 94);
    --sidebar-accent-foreground: rgb(228 236 255);
    --sidebar-border: rgb(116 138 214 / 25%);
    --sidebar-ring: rgb(123 146 236);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
    }
  body {
    @apply bg-background text-foreground;
    }
  html {
    @apply font-sans;
    }
}
```

### src/layouts/BaseLayout.jsx

```jsx
import AiChatWidget from "@/components/AiChatWidget";
import AppSidebar from "@/components/AppSidebar";
import PopUp from "@/components/PopUp";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

export default function BaseLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [popup, setPopup] = useState({
    open: false,
    title: "",
    description: "",
    type: "success",
    duration: 3000,
  });

  useEffect(() => {
    const popupState = location.state?.popup;
    if (!popupState) return;

    setPopup({
      open: true,
      title: popupState.title,
      description: popupState.description,
      type: popupState.type || "success",
      duration: popupState.duration || 3000,
    });

    navigate(location.pathname, { replace: true, state: null });
  }, [location.pathname, location.state, navigate]);

  return (
    <SidebarProvider>
      <PopUp
        open={popup.open}
        title={popup.title}
        description={popup.description}
        type={popup.type}
        duration={popup.duration}
        actionLabel="Tutup"
        onClose={() =>
          setPopup((prev) => ({
            ...prev,
            open: false,
          }))
        }
      />
      <AppSidebar />
      <main className="p-5 md:pt-15 md:pb-20 md:px-10 w-full overflow-x-hidden relative">
        <SidebarTrigger className="flex md:hidden fixed top-4 left-4 z-10 p-4 bg-background border border-input" />
        <Outlet />
        <AiChatWidget />
      </main>
    </SidebarProvider>
  );
}

```

### src/lib/utils.js

```jsx
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

```

### src/main.jsx

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)

```

### src/pages/archive/ArchiveHeader.jsx

```jsx
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Filter, Plus, Search } from "lucide-react";
import React from "react";

export default function ArchiveHeader({ onAddClick }) {
  return (
    <Header title="Manajemen Arsip">
      <div className="flex flex-col md:flex-row justify-between w-full">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative w-full sm:w-auto">
            <Search
              size={16}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Cari judul atau kategori arsip"
              className="h-10 border-border/80 bg-white pl-9 py-2 text-sm shadow-none"
            />
          </div>
          <NativeSelect className="w-full sm:w-auto" name="filter" id="filter">
            <NativeSelectOption value="">Filter Arsip</NativeSelectOption>
            <NativeSelectOption value="Akademik">Akademik</NativeSelectOption>
            <NativeSelectOption value="Kesiswaan">Kesiswaan</NativeSelectOption>
            <NativeSelectOption value="Administrasi">
              Administrasi
            </NativeSelectOption>
            <NativeSelectOption value="Kehumasan">Kehumasan</NativeSelectOption>
          </NativeSelect>
        </div>

        <Button onClick={onAddClick} className="h-10 w-full px-4 py-2 text-sm shadow-none sm:w-fit">
          <Plus />
          Tambah Arsip
        </Button>
      </div>
    </Header>
  );
}

```

### src/pages/archive/ArchiveModalDetail.jsx

```jsx
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalFooter,
} from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { STORAGE_URL } from "@/config/api";
import { FileText, Calendar, Tag, FolderTree, Info } from "lucide-react";

export default function ArchiveModalDetail({ isOpen, onClose, archive }) {
  if (!archive) return null;

  const statusLabel =
    archive.status === "pending_upload" ? "Menunggu Upload" : "Telah Upload";
  const statusColor =
    archive.status === "pending_upload"
      ? "bg-amber-100 text-amber-700 border-amber-200"
      : "bg-emerald-100 text-emerald-700 border-emerald-200";

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent className="max-w-2xl">
        <ModalHeader>
          <ModalTitle className="flex items-center gap-2">
            <Info size={20} className="text-primary" />
            Detail Arsip
          </ModalTitle>
        </ModalHeader>

        <div className="p-6 space-y-6">
          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Judul Arsip
            </h4>
            <p className="text-lg font-bold text-foreground leading-tight">
              {archive.title}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-sm bg-primary/10 text-primary">
                  <Calendar size={18} />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Tahun
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {archive.year}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-sm bg-primary/10 text-primary">
                  <Tag size={18} />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Kategori
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {archive.category?.name || "-"}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-sm bg-primary/10 text-primary">
                  <FolderTree size={18} />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Sub Kategori
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {archive.subcategory?.name || "-"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-sm bg-primary/10 text-primary">
                  <Info size={18} />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Status
                  </p>
                  <span
                    className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-sm border text-xs font-medium ${statusColor}`}
                  >
                    {statusLabel}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-sm bg-primary/10 text-primary">
                  <FolderTree size={18} />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Arsip dari Event
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {archive.event?.title || "-"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-sm bg-primary/10 text-primary">
                  <Info size={18} />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Status Event
                  </p>
                  <span
                    className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-sm border text-xs font-medium ${
                      archive.event?.status === "ongoing"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-slate-200 bg-slate-100 text-slate-700"
                    }`}
                  >
                    {archive.event?.status === "ongoing"
                      ? "Berlangsung"
                      : archive.event?.status === "done"
                        ? "Selesai"
                        : "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {archive.files && (
            <div className="pt-4 border-t">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Lampiran File
              </p>
              <a
                href={`${STORAGE_URL}${archive?.files?.file_url}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-4 rounded-sm border border-border bg-muted/10 hover:bg-muted/20 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-50 text-red-600 rounded-sm">
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {archive.files.file_name || "Lihat Dokumen"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Format: PDF / Image
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary w-fit"
                >
                  Buka
                </Button>
              </a>
            </div>
          )}
        </div>

        <ModalFooter>
          <Button
            onClick={onClose}
            variant="outline"
            className="rounded-sm border-border/80"
          >
            Tutup
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

```

### src/pages/archive/ArchiveModalForm.jsx

```jsx
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalFooter,
} from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { CloudUpload, PlusCircle, Save, X } from "lucide-react";

export default function ArchiveModalForm({ isOpen, onClose, archive = null }) {
  const isEdit = !!archive;
  const [formData, setFormData] = useState({
    title: "",
    year: new Date().getFullYear().toString(),
    category_id: "",
    subcategory_id: "",
    status: "pending_upload",
  });

  useEffect(() => {
    if (archive) {
      setFormData({
        title: archive.title || "",
        year: archive.year || new Date().getFullYear().toString(),
        category_id: archive.category_id || archive.category?.id || "",
        subcategory_id: archive.subcategory_id || archive.subcategory?.id || "",
        status: archive.status || "pending_upload",
      });
    } else {
      setFormData({
        title: "",
        year: new Date().getFullYear().toString(),
        category_id: "",
        subcategory_id: "",
        status: "pending_upload",
      });
    }
  }, [archive, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", formData);
    // Logic for API call would go here
    onClose();
  };

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent className="max-w-xl">
        <ModalHeader>
          <ModalTitle className="flex items-center gap-2">
            {isEdit ? <Save size={20} /> : <PlusCircle size={20} />}
            {isEdit ? "Edit Arsip" : "Tambah Arsip Baru"}
          </ModalTitle>
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          <div className="px-6 pb-6 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-semibold">
                Judul Arsip <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="Contoh: Laporan Keuangan 2023"
                value={formData.title}
                onChange={handleChange}
                required
                className="h-10 shadow-none py-0"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year" className="text-sm font-semibold">
                  Tahun <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="year"
                  name="year"
                  type="number"
                  placeholder="2024"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="h-10 shadow-none py-0"
                />
              </div>

              <div className="space-y-2">
                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-sm font-semibold">
                    Catatan
                  </Label>
                  <Input
                    id="notes"
                    name="notes"
                    placeholder="Tambahkan catatan (opsional)"
                    value={formData.notes}
                    onChange={handleChange}
                    required={false}
                    className="h-10 shadow-none py-0"
                  ></Input>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="event_id" className="text-sm font-semibold">
                Event (Opsional)
              </Label>
              <NativeSelect
                id="event_id"
                name="event_id"
                value={formData.event_id}
                onChange={handleChange}
                required={false}
                className="w-full"
                defaultValue=""
              >
                <NativeSelectOption value="" disabled>
                  Pilih Event
                </NativeSelectOption>
                <NativeSelectOption value="1">Event 1</NativeSelectOption>
                <NativeSelectOption value="2">Event 2</NativeSelectOption>
                <NativeSelectOption value="3">Event 3</NativeSelectOption>
                <NativeSelectOption value="4">Event 4</NativeSelectOption>
              </NativeSelect>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category_id" className="text-sm font-semibold">
                  Kategori <span className="text-red-500">*</span>
                </Label>
                <NativeSelect
                  id="category_id"
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  required
                  className="w-full"
                >
                  <NativeSelectOption value="">
                    Pilih Kategori
                  </NativeSelectOption>
                  <NativeSelectOption value="1">Akademik</NativeSelectOption>
                  <NativeSelectOption value="2">Kesiswaan</NativeSelectOption>
                  <NativeSelectOption value="3">
                    Administrasi
                  </NativeSelectOption>
                  <NativeSelectOption value="4">Kehumasan</NativeSelectOption>
                </NativeSelect>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="subcategory_id"
                  className="text-sm font-semibold"
                >
                  Sub Kategori <span className="text-red-500">*</span>
                </Label>
                <NativeSelect
                  id="subcategory_id"
                  name="subcategory_id"
                  value={formData.subcategory_id}
                  onChange={handleChange}
                  required
                  className="w-full"
                >
                  <NativeSelectOption value="">
                    Pilih Sub Kategori
                  </NativeSelectOption>
                  <NativeSelectOption value="1">Kurikulum</NativeSelectOption>
                  <NativeSelectOption value="2">
                    Kesiswaan Umum
                  </NativeSelectOption>
                  <NativeSelectOption value="3">Keuangan</NativeSelectOption>
                </NativeSelect>
              </div>
            </div>

            <div className="upload-archive space-y-2">
              <Label htmlFor="status" className="text-sm font-semibold">
                Upload Arsip <span className="text-red-500">*</span>
              </Label>
              <Input
                id="file"
                name="file"
                type="hidden"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    file: e.target.files[0],
                  }))
                }
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                maxLength={10485760} // 10MB
                required={!isEdit}
                className="h-10 leading-10 shadow-none py-0"
              />
              {/* drag and drop */}
              <Label
                htmlFor="file"
                className="flex flex-col gap-0 border-2 border-dashed border-border rounded-md p-4 justify-center items-center cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <CloudUpload
                  size={24}
                  className="mx-auto mb-2 text-muted-foreground"
                />
                <p className="text-sm text-muted-foreground">
                  {isEdit
                    ? "Ganti file arsip (opsional)"
                    : "Klik atau seret file ke sini untuk mengunggah"}
                </p>
              </Label>
            </div>
          </div>

          <ModalFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="w-1/2 rounded-sm border-border/80"
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="w-1/2 rounded-sm bg-primary hover:bg-primary/90"
            >
              {isEdit ? "Simpan Perubahan" : "Simpan Arsip"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

```

### src/pages/archive/ArchivePage.jsx

```jsx
import React, { useState } from "react";
import ArchiveHeader from "./ArchiveHeader";
import Pagination from "@/components/Pagination";
import ArchiveTable from "./ArchiveTable";
import { getArchives } from "@/services/archive.service";
import { useQuery } from "@tanstack/react-query";
import ArchiveTableSkeleton from "./ArchiveTableSkeleton";
import ArchiveModalDetail from "./ArchiveModalDetail";
import ArchiveModalForm from "./ArchiveModalForm";

const statusStyles = {
  pending_upload: "border-primary/15 bg-primary/6 text-primary",
  uploaded: "border-emerald-200 bg-emerald-50 text-emerald-700",
  "Perlu Tinjau": "border-amber-200 bg-amber-50 text-amber-700",
};

export default function ArchivePage() {
  const [selectedArchive, setSelectedArchive] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleDetailClick = (archive) => {
    setSelectedArchive(archive);
    setIsDetailOpen(true);
  };

  const handleAddClick = () => {
    setSelectedArchive(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (archive) => {
    setSelectedArchive(archive);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (archive) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus arsip "${archive.title}"?`)) {
      console.log("Deleting archive:", archive.id);
      // Logic for delete API call would go here
    }
  };

  const fetchArchives = async () => {
    try {
      const res = await getArchives(currentPage);
      return res.data.data; // Sesuaikan dengan struktur respons API Anda
    } catch (error) {
      console.error("Error fetching archives:", error);
      throw error;
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["archives", currentPage],
    queryFn: fetchArchives,
  });

  return (
    <section className="space-y-6">
      <ArchiveHeader onAddClick={handleAddClick} />
      {isLoading ? (
        <ArchiveTableSkeleton />
      ) : error ? (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          Terjadi kesalahan saat memuat data arsip.
        </div>
      ) : (
        <ArchiveTable
          archives={data}
          statusStyles={statusStyles}
          onDetailClick={handleDetailClick}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={data?.last_page}
        totalData={data?.total}
        dataPerPage={data?.per_page}
        onPageChange={(page) => setCurrentPage(page)}
      />

      <ArchiveModalDetail
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        archive={selectedArchive}
      />

      <ArchiveModalForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        archive={selectedArchive}
      />
    </section>
  );
}

```

### src/pages/archive/ArchiveRow.jsx

```jsx
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { STORAGE_URL } from "@/config/api";
import { Edit, Eye, FileText, Trash2 } from "lucide-react";
import React from "react";
import { Link } from "react-router";

export default function ArchiveRow({
  archive,
  statusStyles,
  onDetailClick,
  onEditClick,
  onDeleteClick,
}) {
  return (
    <>
      <TableRow className="hover:bg-muted/20">
        <TableCell className=" font-medium text-foreground">
          {archive.row_num}
        </TableCell>
        <TableCell>
          <p className="font-semibold text-foreground whitespace-normal">
            {archive.title}
          </p>
        </TableCell>
        <TableCell className=" text-foreground">{archive.year}</TableCell>
        <TableCell className=" text-foreground">
          {archive.category.name}
        </TableCell>
        <TableCell className=" text-foreground">
          {archive.subcategory?.name || "-"}
        </TableCell>
        <TableCell>
          <span
            className={`inline-flex rounded-sm border px-2.5 py-1 text-xs font-semibold ${
              statusStyles[archive.status]
            }`}
          >
            {archive.status === "pending_upload"
              ? "Menunggu Upload"
              : "Telah Upload"}
          </span>
        </TableCell>
        <TableCell>
          {archive.files?.file_url ? (
            <a
              href={`${STORAGE_URL}${archive?.files?.file_url}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:text-primary/80 hover:underline"
            >
              <FileText size={16} />
              Lihat File
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Link
                to={`/archive/${archive.event_id}/upload`}
                className="hover:underline flex items-center gap-1 text-sm font-medium text-muted-foreground transition hover:text-muted-foreground/80"
              >
                <FileText size={16} />
                Upload File
              </Link>
            </span>
          )}
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="h-9 w-fit border-border/80 px-3 py-2 text-sm shadow-none"
                  variant="outline"
                  onClick={() => onDetailClick(archive)}
                >
                  <Eye />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Lihat Detail</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="h-9 w-fit px-3 py-2 text-sm shadow-none"
                  variant="secondary"
                  onClick={() => onEditClick(archive)}
                >
                  <Edit />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit Arsip</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="h-9 w-fit px-3 py-2 text-sm shadow-none"
                  variant="destructive"
                  onClick={() => onDeleteClick(archive)}
                >
                  <Trash2 />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Hapus Arsip</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TableCell>
      </TableRow>
    </>
  );
}

```

### src/pages/archive/ArchiveTable.jsx

```jsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import ArchiveRow from "./ArchiveRow";

export default function ArchiveTable({
  archives,
  statusStyles,
  onDetailClick,
  onEditClick,
  onDeleteClick,
}) {
  return (
    <>
      <div className="overflow-hidden rounded-sm border border-border/80">
        <Table className="text-sm text-muted-foreground">
          <TableHeader className="bg-muted/35">
            <TableRow className="hover:bg-muted/35">
              <TableHead>No</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Tahun</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Subkategori</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>File Arsip</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="bg-white">
            {archives?.data?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  Tidak ada arsip yang ditemukan.
                </TableCell>
              </TableRow>
            ) : (
              archives?.data?.map((archive) => (
                <ArchiveRow
                  key={archive.id}
                  archive={archive}
                  statusStyles={statusStyles}
                  onDetailClick={onDetailClick}
                  onEditClick={onEditClick}
                  onDeleteClick={onDeleteClick}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

```

### src/pages/archive/ArchiveTableSkeleton.jsx

```jsx
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export default function ArchiveTableSkeleton({ rows = 10 }) {
  return (
    <div className="overflow-hidden rounded-sm border border-border/80">
      <Table className="text-sm text-muted-foreground">
        {/* Header tetap ditampilkan */}
        <TableHeader className="bg-muted/35">
          <TableRow className="hover:bg-muted/35">
            <TableHead>No</TableHead>
            <TableHead>Judul</TableHead>
            <TableHead>Tahun</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead>Subkategori</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>File Arsip</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="bg-white">
          {[...Array(rows)].map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="h-4 w-6" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-40" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-16" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-28" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-20 rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell className="flex gap-2">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

```

### src/pages/category/CategoryHeader.jsx

```jsx
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Filter, Plus, Search } from "lucide-react";
import React from "react";

export default function CategoryHeader() {
  return (
    <Header title="Manajemen Kategori">
      <div className="flex justify-between w-full">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative w-full sm:w-auto">
            <Search
              size={16}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Cari judul kategori"
              className="h-10 border-border/80 bg-white pl-9 py-2 text-sm shadow-none"
            />
          </div>
        </div>

        <Button className="h-10 w-full px-4 py-2 text-sm shadow-none sm:w-fit">
          <Plus />
          Tambah Kategori
        </Button>
      </div>
    </Header>
  );
}

```

### src/pages/category/CategoryPage.jsx

```jsx
import React, { useState } from "react";
import CategoryHeader from "./CategoryHeader";
import Pagination from "@/components/Pagination";
import CategoryTable from "./CategoryTable";

const categories = [
  {
    id: "1",
    name: "Data Siswa",
    description: "-",
  },
  {
    id: "2",
    name: "Data Guru dan Staf",
    description: "Data Presensi Guru dan Staf",
  },
  {
    id: "3",
    name: "Akademik/Kurikulum",
    description: "Berisi data terkait kurikulum, jadwal pelajaran, dan nilai siswa",
  },
  {
    id: "4",
    name: "Administrasi Sekolah dan Bendahara",
    description: "Laporan Rapat Komite Sekolah",
  },
];

export default function CategoryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <section className="space-y-6">
      <CategoryHeader />
      <CategoryTable categories={categories} />
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        totalData={124}
        dataPerPage={4}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </section>
  );
}

```

### src/pages/category/CategoryRow.jsx

```jsx
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Edit, FileSearch, FileText, Trash2 } from "lucide-react";
import React from "react";

export default function CategoryRow({ category }) {
  return (
    <>
      <TableRow key={category.id} className="hover:bg-muted/20">
        <TableCell className=" font-medium text-foreground">
          {category.id}
        </TableCell>
        <TableCell>
          <p className="font-semibold text-foreground whitespace-normal">
            {category.name}
          </p>
        </TableCell>
        <TableCell className="max-w-xs whitespace-pre-wrap text-foreground">
          {category.description}
        </TableCell>
        <TableCell className="whitespace-normal text-foreground">
          <ul className="grid grid-cols-2 w-fit gap-1">
            <li className="flex items-center gap-1 rounded-md border border-border/80 bg-muted/50 px-2 py-1 text-xs">
              <FileText className="h-3 w-3" />
              Subkategori 1
            </li>
            <li className="flex items-center gap-1 rounded-md border border-border/80 bg-muted/50 px-2 py-1 text-xs">
              <FileText className="h-3 w-3" />
              Subkategori 2
            </li>
            <li className="flex items-center gap-1 rounded-md border border-border/80 bg-muted/50 px-2 py-1 text-xs">
              <FileText className="h-3 w-3" />
              Subkategori 3
            </li>
            <li className="flex items-center gap-1 rounded-md border border-border/80 bg-muted/50 px-2 py-1 text-xs">
              <FileText className="h-3 w-3" />
              Subkategori 4
            </li>
          </ul>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <Button
              className="h-9 w-fit px-3 py-2 text-sm shadow-none"
              variant="secondary"
              size="sm"
            >
              <Edit />
            </Button>
            <Button
              className="h-9 w-fit px-3 py-2 text-sm shadow-none"
              variant="destructive"
              size="sm"
            >
              <Trash2 />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    </>
  );
}

```

### src/pages/category/CategoryTable.jsx

```jsx
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";
import CategoryRow from "./CategoryRow";

export default function CategoryTable({ categories }) {
  return (
    <>
      <div className="overflow-hidden rounded-sm border border-border/80">
        <Table className="text-sm text-muted-foreground">
          <TableHeader className="bg-muted/35">
            <TableRow className="hover:bg-muted/35">
              <TableHead>No</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Deskripsi</TableHead>
              <TableHead>Subkategori</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="bg-white">
            {categories.map((category) => (
              <CategoryRow category={category} />
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

```

### src/pages/Dashboard.jsx

```jsx
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Archive,
  ArrowUpRight,
  BookOpenText,
  Clock3,
  FolderKanban,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import React from "react";

const stats = [
  {
    title: "Total Arsip",
    value: "1.248",
    detail: "Dokumen aktif yang sudah terdigitalisasi",
    icon: Archive,
  },
  {
    title: "Kategori Arsip",
    value: "13",
    detail: "Pembagian map dan jenis dokumen sekolah",
    icon: FolderKanban,
  },
  {
    title: "Lemari Penyimpanan",
    value: "14",
    detail: "Lemari fisik yang terhubung dengan kode arsip",
    icon: BookOpenText,
  },
  {
    title: "Pengguna Aktif",
    value: "50",
    detail: "Guru dan admin yang memiliki akses sistem",
    icon: UserRound,
  },
];

const recentActivities = [
  {
    title: "Arsip surat masuk April diperbarui",
    meta: "Ruang Tata Usaha",
    time: "10 menit lalu",
  },
  {
    title: "Validasi kode lemari untuk dokumen kelulusan",
    meta: "Unit Kesiswaan",
    time: "32 menit lalu",
  },
  {
    title: "Penambahan arsip rapat komite semester genap",
    meta: "Bagian Humas",
    time: "1 jam lalu",
  },
  {
    title: "Pemeriksaan ulang metadata arsip siswa",
    meta: "Operator Arsip",
    time: "Hari ini",
  },
];

const recentNotifications = [
  {
    title: "Guru Naufal belum upload arsip ke event rapat komite",
    meta: "Ruang Tata Usaha",
    time: "10 menit lalu",
  },
  {
    title: "Lemari 1 hampir penuh, perlu penataan ulang untuk arsip baru",
    meta: "Lemari 1 - Standar Isi",
    time: "32 menit lalu",
  },
];

export default function Dashboard() {
  return (
    <section className="space-y-6">
      <Header title="Dashboard Pengelolaan Arsip" desc="Monitoring arsip dan aktivitas pengelolaan dalam satu tempat." />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <Card
              key={item.title}
              className="rounded-sm border border-border/80 bg-white py-0 ring-0"
            >
              <CardContent className="px-5 py-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        {item.title}
                      </p>
                      <p className="text-3xl font-semibold tracking-tight text-foreground">
                        {item.value}
                      </p>
                    </div>
                  </div>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-primary/12 bg-primary/6 text-primary">
                    <Icon size={18} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
        <Card className="rounded-sm border border-border/80 bg-white py-0 ring-0">
          <CardHeader className="gap-2 border-b border-border/70 px-5 py-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle className="text-lg font-semibold text-foreground">
                  Aktivitas Terbaru
                </CardTitle>
                <CardDescription className="mt-1 text-sm leading-6">
                  Riwayat singkat pembaruan arsip dan pengecekan dokumen.
                </CardDescription>
              </div>
              <span className="hidden items-center gap-2 text-sm text-primary sm:inline-flex">
                <Clock3 size={16} />
                Hari ini
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 px-5 py-5">
            {recentActivities.map((activity) => (
              <div
                key={activity.title}
                className="flex items-start justify-between gap-4 rounded-sm border border-border/80 bg-muted/20 px-4 py-3"
              >
                <div className="min-w-0 space-y-1">
                  <p className="text-sm font-semibold text-foreground">
                    {activity.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.meta}
                  </p>
                </div>
                <span className="shrink-0 text-xs font-medium text-primary/70">
                  {activity.time}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-sm border border-border/80 bg-white py-0 ring-0">
          <CardHeader className="gap-2 border-b border-border/70 px-5 py-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle className="text-lg font-semibold text-foreground">
                  Notifikasi
                </CardTitle>
                <CardDescription className="mt-1 text-sm leading-6">
                  Pemberitahuan penting terkait pengelolaan arsip sekolah.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 px-5 py-5">
            {recentNotifications.map((notification) => (
              <div
                key={notification.title}
                className="flex items-start justify-between gap-4 rounded-sm border border-yellow-100/80 bg-yellow-50 px-4 py-3"
              >
                <div className="min-w-0 space-y-1">
                  <p className="text-sm font-semibold text-foreground">
                    {notification.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {notification.meta}
                  </p>
                </div>
                <span className="shrink-0 text-xs font-medium text-primary/70">
                  {notification.time}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

```

### src/pages/event/EventHeader.jsx

```jsx
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { CalendarRange, Plus, Search } from "lucide-react";
import React from "react";

export default function EventHeader() {
  return (
    <Header
      title="Manajemen Event"
      desc="Kelola kegiatan sekolah dari perencanaan hingga pengarsipan."
    >
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative w-full sm:w-88">
            <Search
              size={16}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Cari nama event atau penanggung jawab"
              className="h-10 border-border/80 bg-white pl-9 py-2 text-sm shadow-none"
            />
          </div>

          <NativeSelect className="w-full sm:w-48" name="status" id="status">
            <NativeSelectOption value="">Semua Status</NativeSelectOption>
            <NativeSelectOption value="upcoming">Akan Datang</NativeSelectOption>
            <NativeSelectOption value="ongoing">Berlangsung</NativeSelectOption>
            <NativeSelectOption value="completed">Selesai</NativeSelectOption>
          </NativeSelect>

          <NativeSelect className="w-full sm:w-52" name="period" id="period">
            <NativeSelectOption value="">Semua Periode</NativeSelectOption>
            <NativeSelectOption value="semester-genap">
              Semester Genap
            </NativeSelectOption>
            <NativeSelectOption value="tahun-ajaran-baru">
              Tahun Ajaran Baru
            </NativeSelectOption>
            <NativeSelectOption value="kelulusan">Kelulusan</NativeSelectOption>
          </NativeSelect>
        </div>

        <Button className="h-10 w-full px-4 py-2 text-sm shadow-none sm:w-fit">
          <Plus />
          Tambah Event
        </Button>
      </div>
    </Header>
  );
}

```

### src/pages/event/EventPage.jsx

```jsx
import Pagination from "@/components/Pagination";
import React, { useState } from "react";
import EventHeader from "./EventHeader";
import EventTable from "./EventTable";
import { getEvents } from "@/services/event.service";
import { useQuery } from "@tanstack/react-query";

const events = [
  {
    id: "1",
    title: "Rapat Komite Semester Genap",
    user: "Ahmad Fauzi, S.Pd.",
    description: "Aula Sekolah",
    date: "22 Apr 2026",
    status: "ongoing",
    status_upload: "pending_upload",
  },
  {
    id: "2",
    title: "Simulasi Asesmen Sekolah",
    user: "Dita Permata Putra, S.Pd.",
    description: "Lab Komputer",
    date: "30 Apr 2026",
    status: "ongoing",
    status_upload: "uploaded",
  },
  {
    id: "3",
    title: "Wisuda Kelulusan",
    user: "Muhammad Rizky, S.Pd.",
    description: "Gedung Serbaguna",
    date: "12 Mei 2026",
    status: "ongoing",
    status_upload: "pending_upload",
  },
  {
    id: "4",
    title: "Workshop Digitalisasi Arsip",
    user: "Siti Aisyah, S.Kom.",
    description: "Ruang Multimedia",
    date: "14 Apr 2026",
    status: "completed",
    status_upload: "uploaded",
  },
];

const statusStyles = {
  ongoing: "border-emerald-200 bg-emerald-50 text-emerald-700",
  completed: "border-slate-200 bg-slate-100 text-slate-700",
  pending_upload: "border-yellow-200 bg-yellow-50 text-yellow-700",
  uploaded: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

export default function EventPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const fetchEvents = async () => {
    try {
      const res = await getEvents(currentPage);
      return res.data.data; // Sesuaikan dengan struktur respons API Anda
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["events", currentPage],
    queryFn: fetchEvents,
  });

  return (
    <section className="space-y-6">
      <EventHeader />
      <EventTable events={data} statusStyles={statusStyles} />
      <Pagination
        currentPage={currentPage}
        totalPages={data?.last_page}
        totalData={data?.total}
        dataPerPage={data?.per_page}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </section>
  );
}

```

### src/pages/event/EventRow.jsx

```jsx
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { CalendarDays, Edit, Eye, Trash2 } from "lucide-react";
import React from "react";
import { Link } from "react-router";

export default function EventRow({ event, statusStyles }) {
  const eventDate = new Date(event.date);
  const option = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = eventDate.toLocaleDateString("id-ID", option);
  
  return (
    <TableRow className="hover:bg-muted/20">
      <TableCell className="font-medium text-foreground">{event.id}</TableCell>
      <TableCell className='text-foreground font-semibold'>{event.title}</TableCell>
      <TableCell className="text-foreground max-w-24 whitespace-pre-wrap">
        {event.user.name}
      </TableCell>
      <TableCell className="text-foreground">{formattedDate}</TableCell>
      <TableCell>
        <span
          className={`inline-flex rounded-sm border px-2.5 py-1 text-xs font-semibold ${
            statusStyles[event.status]
          }`}
        >
          {event.status === "upcoming"
            ? "Akan Datang"
            : event.status === "ongoing"
              ? "Berlangsung"
              : "Selesai"}
        </span>
      </TableCell>
      <TableCell>
        <span
          className={`flex gap-1 flex-col w-fit rounded-sm border px-2.5 py-1 text-xs font-semibold ${
            statusStyles[event.status_upload]
          }`}
        >
          {event.status_upload === "pending_upload"
            ? "Belum Diunggah"
            : "Sudah Diunggah"}
        </span>
        {event.status_upload === "pending_upload" && (
          <Link
            to={`/event/${event.id}/upload`}
            className="text-xs! ml-2 hover:underline text-muted-foreground"
          >
            Upload Arsip
          </Link>
        )}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button
            className="h-9 w-fit border-border/80 px-3 py-2 text-sm shadow-none"
            variant="outline"
          >
            <Eye />
          </Button>
          <Button
            className="h-9 w-fit px-3 py-2 text-sm shadow-none"
            variant="secondary"
            size="sm"
          >
            <Edit />
          </Button>
          <Button
            className="h-9 w-fit px-3 py-2 text-sm shadow-none"
            variant="destructive"
            size="sm"
          >
            <Trash2 />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

```

### src/pages/event/EventTable.jsx

```jsx
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";
import EventRow from "./EventRow";

export default function EventTable({ events, statusStyles }) {
  return (
    <div className="overflow-hidden rounded-sm border border-border/80 bg-white">
      <Table className="lg:overflow-x-hidden text-sm text-muted-foreground">
        <TableHeader className="bg-muted/35">
          <TableRow className="hover:bg-muted/35">
            <TableHead>No</TableHead>
            <TableHead>Judul Event</TableHead>
            <TableHead>Penanggung Jawab</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Status Upload</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="bg-white">
          {events?.data?.map((event) => (
            <EventRow key={event.id} event={event} statusStyles={statusStyles} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

```

### src/pages/location/LocationHeader.jsx

```jsx
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Filter, Plus, Search } from "lucide-react";
import React from "react";

export default function LocationHeader() {
  return (
    <Header title="Manajemen Lokasi Arsip" desc='Kelola lokasi arsip untuk penempatan arsip sekolah di ruang data.'>
      <div className="flex justify-between w-full">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative w-full sm:w-auto">
            <Search
              size={16}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Cari judul lokasi arsip"
              className="h-10 border-border/80 bg-white pl-9 py-2 text-sm shadow-none"
            />
          </div>
        </div>

        <Button className="h-10 w-full px-4 py-2 text-sm shadow-none sm:w-fit">
          <Plus />
          Tambah Lokasi Arsip
        </Button>
      </div>
    </Header>
  );
}

```

### src/pages/location/LocationPage.jsx

```jsx
import React, { useState } from "react";
import LocationHeader from "./LocationHeader";
import Pagination from "@/components/Pagination";
import LocationTable from "./LocationTable";

const locations = [
  {
    id: "1",
    archive: "Surat Keputusan Kelulusan 2024",
    cabinet: "Lemari 1 - Standar Isi",
    rack: "Rak 1",
    slot_number: "01",
    label_code: "L1-R1-S01",
  },
  {
    id: "2",
    archive: "Data Presensi Siswa Semester Genap",
    cabinet: "Lemari 2 - Standar Kurikulum",
    rack: "Rak 2",
    slot_number: "25",
    label_code: "L1-R2-S25",
  },
  {
    id: "3",
    archive: "Surat Masuk Dinas Pendidikan",
    cabinet: "Lemari 1 - Standar Isi",
    rack: "Rak 1",
    slot_number: "02",
    label_code: "L1-R1-S02",
  },
  {
    id: "4",
    archive: "Laporan Rapat Komite Sekolah",
    cabinet: "Lemari 1 - Standar Isi",
    rack: "Rak 1",
    slot_number: "06",
    label_code: "L1-R1-S06",
  },
];

export default function LocationPage() {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <section className="space-y-6">
      <LocationHeader />
      <LocationTable locations={locations} />
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        totalData={124}
        dataPerPage={4}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </section>
  );
}

```

### src/pages/location/LocationRow.jsx

```jsx
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Edit, FileSearch, FileText, Trash2 } from "lucide-react";
import React from "react";

export default function LocationRow({ location }) {
  return (
    <>
      <TableRow key={location.id} className="hover:bg-muted/20">
        <TableCell className=" font-medium text-foreground">
          {location.id}
        </TableCell>
        <TableCell>
          <p className="font-semibold text-foreground whitespace-normal">
            {location.archive}
          </p>
        </TableCell>
        <TableCell className=" text-foreground">
          {location.cabinet}
        </TableCell>
        <TableCell className=" text-foreground">
          {location.rack}
        </TableCell>
        <TableCell className=" text-foreground">
          {location.slot_number}
        </TableCell>
        <TableCell className=" text-foreground">
          {location.label_code}
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <Button
              className="h-9 w-fit px-3 py-2 text-sm shadow-none"
              variant="secondary"
              size="sm"
            >
              <Edit />
            </Button>
            <Button
              className="h-9 w-fit px-3 py-2 text-sm shadow-none"
              variant="destructive"
              size="sm"
            >
              <Trash2 />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    </>
  );
}

```

### src/pages/location/LocationTable.jsx

```jsx
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";
import LocationRow from "./LocationRow";

export default function LocationTable({ locations }) {
  return (
    <>
      <div className="overflow-hidden rounded-sm border border-border/80">
        <Table className="text-sm text-muted-foreground">
          <TableHeader className="bg-muted/35">
            <TableRow className="hover:bg-muted/35">
              <TableHead>No</TableHead>
              <TableHead>Judul Arsip</TableHead>
              <TableHead>Lemari</TableHead>
              <TableHead>Rak</TableHead>
              <TableHead>Nomor Slot</TableHead>
              <TableHead>Kode Label</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="bg-white">
            {locations.map((location) => (
              <LocationRow location={location} />
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

```

### src/pages/Login.jsx

```jsx
import { Button } from "@/components/ui/button";
import PopUp from "@/components/PopUp";
import Logo from "@/assets/logo.png";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/services/auth.service";
import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login: syncLoginState } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [popup, setPopup] = useState({
    open: false,
    title: "",
    description: "",
    type: "success",
  });
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const popupState = location.state?.popup;
    if (!popupState) return;

    setPopup((prev) => ({
      ...prev,
      open: true,
      title: popupState.title,
      description: popupState.description,
      type: popupState.type || "success",
      duration: popupState.duration || 3000,
    }));

    navigate(location.pathname, { replace: true, state: null });
  }, [location.state, navigate, location.pathname]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await login(form);
      if (res.data.status == "success") {
        syncLoginState(res.data.data);
        navigate("/dashboard", {
          state: {
            popup: {
              title: "Login berhasil",
              description: "Selamat datang kembali di dashboard arsip sekolah.",
              type: "login",
              duration: 3000,
            },
          },
        });
      } else {
        setError(res.data.message || "Login gagal. Silakan coba lagi.");
      }
    } catch (error) {
      const message =
        error.response?.status === 401
          ? "Username atau password salah."
          : error.response?.data?.message || "Terjadi kesalahan.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleViewPassword = () => {
    setShowPassword((prev) => !prev);
  };

  if (user) {
    return (
      <Navigate to='/dashboard' />
    )
  }

  return (
    <main>
      <PopUp
        open={popup.open}
        title={popup.title}
        description={popup.description}
        type={popup.type}
        actionLabel="Tutup"
        onClose={() =>
          setPopup((prev) => ({
            ...prev,
            open: false,
          }))
        }
      />

      <div className="flex justify-center mx-5 mt-5 lg:hidden gap-2 items-center rounded-full border border-primary/15 bg-white/75 px-4 py-2 text-sm font-medium text-primary shadow-sm backdrop-blur">
        <img src={Logo} alt="Logo Spentaru Archive" className="w-10 h-10" />
        Arsip Digital SMP Negeri 1 Waru
      </div>

      <div className="relative mx-auto flex lg:min-h-dvh w-full max-w-6xl items-center px-5 py-5 md:px-8 lg:px-12">
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <section className="hidden lg:block">
            <div className="max-w-xl space-y-6">
              <div className="inline-flex gap-2 items-center rounded-full border border-primary/15 bg-white/75 px-4 py-2 text-sm font-medium text-primary shadow-sm backdrop-blur">
                <img
                  src={Logo}
                  alt="Logo Spentaru Archive"
                  className="w-10 h-10"
                />
                Arsip Digital SMP Negeri 1 Waru
              </div>
              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-primary/70">
                  Spentaru Archive
                </p>
                <h1 className="max-w-lg text-4xl font-semibold tracking-tight leading text-foreground lg:text-5xl">
                  Dokumen Sekolah dalam Satu Tempat
                </h1>
                <p className="max-w-xl text-base leading-7 text-muted-foreground">
                  Sistem arsip sekolah yang membantu pengelolaan dokumen
                  penting, surat, dan administrasi internal agar tetap tertata
                  dan mudah ditemukan.
                </p>
              </div>
            </div>
          </section>

          <form className="w-full" onSubmit={handleLogin}>
            <Card className="mx-auto w-full max-w-lg border-white/70 bg-white/90 shadow-[0_24px_80px_-32px_rgba(36,54,115,0.45)] backdrop-blur">
              <CardHeader className="space-y-4 pb-2">
                <div className="space-y-2">
                  <CardTitle className="mb-2 text-3xl font-semibold tracking-tight text-foreground">
                    Login Arsip
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  {error ? (
                    <div className="rounded-sm border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                      {error}
                    </div>
                  ) : null}

                  <div className="grid gap-2">
                    <Label
                      htmlFor="username"
                      className="text-sm font-medium text-foreground"
                    >
                      Username
                    </Label>
                    <Input
                      id="username"
                      type="username"
                      placeholder="Masukkan username"
                      required
                      name="username"
                      value={form.username}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between gap-3">
                      <Label
                        htmlFor="password"
                        className="text-sm font-medium text-foreground"
                      >
                        Password
                      </Label>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Masukkan password"
                        required
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                      />
                      {showPassword ? (
                        <Eye
                          size={20}
                          onClick={handleViewPassword}
                          className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                        />
                      ) : (
                        <EyeOff
                          size={20}
                          onClick={handleViewPassword}
                          className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="mt-4 flex-col gap-3 pt-4">
                <Button type="submit" disabled={loading}>
                  {loading ? "Memproses..." : "Masuk ke Dashboard"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </div>
    </main>
  );
}

```

### src/pages/physicalLocation/PhysicalLocationCard.jsx

```jsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Edit, Trash2, Archive, Layers } from "lucide-react";
import React from "react";

export default function PhysicalLocationCard({ cabinet }) {
  return (
    <Card className="py-0 rounded-sm border border-border/80 bg-white shadow-none ring-0 overflow-hidden transition-all hover:border-primary/30">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-3 border-b border-border/50 bg-muted/10">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-primary/12 bg-primary/6 text-primary">
            <Archive size={18} />
          </div>
          <CardTitle className="text-sm font-semibold tracking-tight text-foreground">
            {cabinet.name}
          </CardTitle>
        </div>
        
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                aria-label="Edit Physical Location"
                className="h-8 w-8 p-0 hover:text-primary hover:bg-primary/10"
                variant="secondary"
                size="sm"
              >
                <Edit size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit Lokasi</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                aria-label="Delete Physical Location"
                className="h-8 w-8 p-0 hover:text-destructive hover:bg-destructive/10"
                variant="destructive"
                size="sm"
              >
                <Trash2 size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Hapus Lokasi</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 space-y-4">
        {cabinet.racks.length > 0 ? (
          <div className="space-y-3">
            {cabinet.racks.map((rack) => {
              const usagePercent = Math.round((rack.capacity_used / rack.capacity) * 100);
              const isFull = usagePercent >= 100;
              const isHigh = usagePercent >= 80;

              return (
                <div key={rack.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-medium">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Layers size={12} className="text-primary/70" />
                      <span>Rak {rack.rack_number}</span>
                    </div>
                    <span className={isFull ? "text-destructive" : isHigh ? "text-orange-500" : "text-primary font-semibold"}>
                      {rack.capacity_used}/{rack.capacity}
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        isFull ? "bg-destructive" : isHigh ? "bg-orange-500" : "bg-primary"
                      }`}
                      style={{ width: `${usagePercent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-4 text-center">
            <p className="text-xs text-muted-foreground italic">Belum ada rak</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

```

### src/pages/physicalLocation/PhysicalLocationHeader.jsx

```jsx
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Plus, Search, Shield } from "lucide-react";
import React from "react";

export default function PhysicalLocationHeader() {
  return (
    <Header
      title="Daftar Lokasi Fisik"
      desc="Kelola lokasi fisik arsip yang berada di Ruang Data SMP Negeri 1 Waru."
    >
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">

        <Button className="h-10 w-full px-4 py-2 text-sm shadow-none sm:w-fit">
          <Plus />
          Tambah Lokasi Fisik
        </Button>
      </div>
    </Header>
  );
}

```

### src/pages/physicalLocation/PhysicalLocationPage.jsx

```jsx
import Pagination from "@/components/Pagination";
import React, { useState } from "react";
import PhysicalLocationHeader from "./PhysicalLocationHeader";
import PhysicalLocationCard from "./PhysicalLocationCard";

const physicalLocations = [
  {
    id: "1",
    name: "Lemari 1",
    racks: [
      {
        id: "1",
        rack_number: 1,
        capacity: 20,
        capacity_used: 10,
      },
      {
        id: "2",
        rack_number: 2,
        capacity: 20,
        capacity_used: 5,
      },
      {
        id: "3",
        rack_number: 3,
        capacity: 20,
        capacity_used: 15,
      },
      {
        id: "4",
        rack_number: 4,
        capacity: 20,
        capacity_used: 0,
      },
    ],
  },
  {
    id: "2",
    name: "Lemari 2",
    racks: [
      {
        id: "5",
        rack_number: 1,
        capacity: 20,
        capacity_used: 20,
      },
      {
        id: "6",
        rack_number: 2,
        capacity: 20,
        capacity_used: 10,
      },
      {
        id: "7",
        rack_number: 2,
        capacity: 20,
        capacity_used: 10,
      },
      {
        id: "8",
        rack_number: 2,
        capacity: 20,
        capacity_used: 10,
      },
    ],
  },
  {
    id: "3",
    name: "Lemari 3",
    racks: [
      {
        id: "9",
        rack_number: 1,
        capacity: 20,
        capacity_used: 0,
      },
      {
        id: "10",
        rack_number: 2,
        capacity: 20,
        capacity_used: 0,
      },
      {
        id: "11",
        rack_number: 2,
        capacity: 20,
        capacity_used: 0,
      },
      {
        id: "12",
        rack_number: 2,
        capacity: 20,
        capacity_used: 0,
      },
    ],
  },
  {
    id: "4",
    name: "Lemari 4",
    racks: [
      {
        id: "13",
        rack_number: 1,
        capacity: 20,
        capacity_used: 0,
      },
      {
        id: "14",
        rack_number: 2,
        capacity: 20,
        capacity_used: 0,
      },
      {
        id: "15",
        rack_number: 2,
        capacity: 20,
        capacity_used: 0,
      },
      {
        id: "16",
        rack_number: 2,
        capacity: 20,
        capacity_used: 0,
      },
    ],
  },
];

export default function PhysicalLocationPage() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <section className="space-y-6">
      <PhysicalLocationHeader />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {physicalLocations.map((cabinet) => (
          <PhysicalLocationCard key={cabinet.id} cabinet={cabinet} />
        ))}
      </div>
    </section>
  );
}

```

### src/pages/storageRule/StorageRuleHeader.jsx

```jsx
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Plus, Search, Shield } from "lucide-react";
import React from "react";

export default function StorageRuleHeader() {
  return (
    <Header
      title="Daftar Aturan Penyimpanan"
      desc="Tentukan prioritas penyimpanan arsip berdasarkan kategori dan subkategori yang ditetapkan."
    >
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        {/* <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative w-full sm:w-88">
            <Search
              size={16}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Cari nama aturan penyimpanan atau email"
              className="h-10 border-border/80 bg-white pl-9 py-2 text-sm shadow-none"
            />
          </div>

          <NativeSelect className="w-full sm:w-44" name="active" id="active">
            <NativeSelectOption value="">Semua Status</NativeSelectOption>
            <NativeSelectOption value="active">Aktif</NativeSelectOption>
            <NativeSelectOption value="inactive">Nonaktif</NativeSelectOption>
          </NativeSelect>
        </div> */}

        <Button className="h-10 w-full px-4 py-2 text-sm shadow-none sm:w-fit">
          <Plus />
          Tambah Aturan Penyimpanan
        </Button>
      </div>
    </Header>
  );
}

```

### src/pages/storageRule/StorageRulePage.jsx

```jsx
import Pagination from "@/components/Pagination";
import React, { useState } from "react";
import StorageRuleHeader from "./StorageRuleHeader";
import StorageRuleTable from "./StorageRuleTable";

const storageRules = [
  {
    id: "1",
    category: "Akademik",
    subcategory: "Ujian",
    cabinet: "Lemari 1",
    priority: 1,
  },
  {
    id: "2",
    category: "Non-Akademik",
    subcategory: "Keuangan",
    cabinet: "Lemari 2",
    priority: 2,
  },
  {
    id: "3",
    category: "Kesiswaan",
    subcategory: "OSIS",
    cabinet: "Lemari 3",
    priority: 1,
  },
  {
    id: "4",
    category: "Sarana dan Prasarana",
    subcategory: "Inventaris",
    cabinet: "Lemari 4",
    priority: 1,
  },
];

export default function StorageRulePage() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <section className="space-y-6">
      <StorageRuleHeader />
      <StorageRuleTable storageRules={storageRules} />
      {/* <Pagination
        currentPage={currentPage}
        totalPages={8}
        totalData={50}
        dataPerPage={4}
        onPageChange={(page) => setCurrentPage(page)}
      /> */}
    </section>
  );
}

```

### src/pages/storageRule/StorageRuleRow.jsx

```jsx
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Edit, KeyRound, Trash2 } from "lucide-react";
import React from "react";

export default function StorageRuleRow({ rule }) {
  return (
    <TableRow className="hover:bg-muted/20">
      <TableCell className="font-medium text-foreground">{rule.id}</TableCell>
      <TableCell>{rule.category}</TableCell>
      <TableCell>{rule.subcategory}</TableCell>
      <TableCell>{rule.cabinet}</TableCell>
      <TableCell>{rule.priority}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                aria-label="Edit Storage Rule"
                className="h-9 w-fit px-3 py-2 text-sm shadow-none"
                variant="secondary"
                size="sm"
              >
                <Edit />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit Storage Rule</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                aria-label="Delete Storage Rule"
                className="h-9 w-fit px-3 py-2 text-sm shadow-none"
                variant="destructive"
                size="sm"
              >
                <Trash2 />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Hapus Storage Rule</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TableCell>
    </TableRow>
  );
}

```

### src/pages/storageRule/StorageRuleTable.jsx

```jsx
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";
import StorageRuleRow from "./StorageRuleRow";

export default function StorageRuleTable({ storageRules }) {
  return (
    <div className="overflow-hidden rounded-sm border border-border/80 bg-white">
      <Table className="text-sm text-muted-foreground">
        <TableHeader className="bg-muted/35">
          <TableRow className="hover:bg-muted/35">
            <TableHead>No</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead>Subkategori</TableHead>
            <TableHead>Lemari</TableHead>
            <TableHead>Prioritas</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="bg-white">
          {storageRules.map((rule) => (
            <StorageRuleRow
              key={rule.id}
              rule={rule}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

```

### src/pages/user/UserHeader.jsx

```jsx
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Plus, Search, Shield } from "lucide-react";
import React from "react";

export default function UserHeader() {
  return (
    <Header
      title="Manajemen User"
      desc="Kelola akun admin dan guru sekolah."
    >
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative w-full sm:w-88">
            <Search
              size={16}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Cari nama user atau email"
              className="h-10 border-border/80 bg-white pl-9 py-2 text-sm shadow-none"
            />
          </div>

          <NativeSelect defaultValue="" className="w-full sm:w-44" name="role" id="role">
            <NativeSelectOption value="">Semua Role</NativeSelectOption>
            <NativeSelectOption value="admin">Admin</NativeSelectOption>
            <NativeSelectOption value="guru">Guru</NativeSelectOption>
          </NativeSelect>
        </div>

        <Button className="h-10 w-full px-4 py-2 text-sm shadow-none sm:w-fit">
          <Plus />
          Tambah User
        </Button>
      </div>
    </Header>
  );
}

```

### src/pages/user/UserPage.jsx

```jsx
import Pagination from "@/components/Pagination";
import React, { useState } from "react";
import UserHeader from "./UserHeader";
import UserTable from "./UserTable";
import { getUsers } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import UserTableSkeleton from "./UserTableSkeleton";

const users = [
  {
    id: "1",
    name: "Fathur Rahman",
    email: "operator@spentaru.sch.id",
    role: "admin",
    role_label: "Admin",
    last_login: "15 Apr 2026, 07:45",
  },
  {
    id: "2",
    name: "Dewi Lestari",
    email: "admin@spentaru.sch.id",
    role: "admin",
    role_label: "Admin",
    last_login: "15 Apr 2026, 06:20",
  },
  {
    id: "3",
    name: "Ahmad Fauzi",
    email: "kurikulum@spentaru.sch.id",
    role: "guru",
    role_label: "Guru",
    last_login: "14 Apr 2026, 14:10",
  },
  {
    id: "4",
    name: "Siti Nur Aeni",
    email: "kesiswaan@spentaru.sch.id",
    role: "admin",
    role_label: "Admin",
    last_login: "14 Apr 2026, 09:32",
  },
];

const roleStyles = {
  admin: "border-primary/15 bg-primary/6 text-primary",
  operator: "border-sky-200 bg-sky-50 text-sky-700",
  guru: "border-violet-200 bg-violet-50 text-violet-700",
};

export default function UserPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const fetchUsers = async () => {
    try {
      const res = await getUsers(currentPage);
      return res.data.data; // Sesuaikan dengan struktur respons API Anda
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["users", currentPage],
    queryFn: fetchUsers,
  });

  return (
    <section className="space-y-6">
      <UserHeader />
      {isLoading ? (
        <UserTableSkeleton />
      ) : (
        <UserTable users={data} roleStyles={roleStyles} />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={data?.last_page}
        totalData={data?.total}
        dataPerPage={data?.per_page}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </section>
  );
}

```

### src/pages/user/UserRow.jsx

```jsx
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Edit, KeyRound, Trash2, UserRoundCheck } from "lucide-react";
import React from "react";

export default function UserRow({ user, roleStyles }) {
  return (
    <TableRow className="hover:bg-muted/20">
      <TableCell className="font-medium text-foreground">{user.id}</TableCell>
      <TableCell>
        <div className="min-w-44">
          <p className="font-semibold text-foreground whitespace-normal">
            {user.name}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
        </div>
      </TableCell>
      <TableCell className="text-foreground">
        <span
          className={`inline-flex rounded-sm border px-2.5 py-1 text-xs font-semibold ${
            roleStyles[user.role]
          }`}
        >
          {user.role}
        </span>
      </TableCell>
      <TableCell className="text-foreground">{user.last_login ?? "-"}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                aria-label="Reset Password"
                className="h-9 w-fit border-border/80 px-3 py-2 text-sm shadow-none"
              >
                <KeyRound />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Reset Password</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                aria-label="Edit User"
                className="h-9 w-fit px-3 py-2 text-sm shadow-none"
                variant="secondary"
                size="sm"
              >
                <Edit />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit User</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                aria-label="Delete User"
                className="h-9 w-fit px-3 py-2 text-sm shadow-none"
                variant="destructive"
                size="sm"
              >
                <Trash2 />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Hapus User</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TableCell>
    </TableRow>
  );
}

```

### src/pages/user/UserTable.jsx

```jsx
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";
import UserRow from "./UserRow";

export default function UserTable({ users, roleStyles }) {
  return (
    <div className="overflow-hidden rounded-sm border border-border/80 bg-white">
      <Table className="text-sm text-muted-foreground">
        <TableHeader className="bg-muted/35">
          <TableRow className="hover:bg-muted/35">
            <TableHead>No</TableHead>
            <TableHead>Nama User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Login Terakhir</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="bg-white">
          {users?.data?.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              roleStyles={roleStyles}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

```

### src/pages/user/UserTableSkeleton.jsx

```jsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserTableSkeleton({ rows = 5 }) {
  return (
    <div className="overflow-hidden rounded-sm border border-border/80 bg-white">
      <Table className="text-sm text-muted-foreground">
        <TableHeader className="bg-muted/35">
          <TableRow className="hover:bg-muted/35">
            <TableHead>No</TableHead>
            <TableHead>Nama User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Login Terakhir</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="bg-white">
          {[...Array(rows)].map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="h-4 w-6" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-32" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-16" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell className="flex gap-2">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

```

### src/services/archive.service.js

```jsx
import api from "./axios";

export function getArchives(page = 1) {
  const res = api.get("/archives", { params: { page } });
  return res;
}

export function getArchiveById(id) {
  const res = api.get(`/archives/${id}`);
  return res;
}

export function createArchives(data) {
  const res = api.post("/archives", data);
  return res;
}

export function updateArchives(id, data) {
  const res = api.put(`/archives/${id}`, data);
  return res;
}

export function deleteArchives(id) {
  const res = api.delete(`/archives/${id}`);
  return res;
}

```

### src/services/auth.service.js

```jsx
import api from "./axios";

export function login(data) {
  const res = api.post("/auth/login", data);
  return res;
}

export function me() {
  const res = api.get("/auth/me");
  return res;
}

export function logout() {
  const res = api.post("/auth/logout");
  return res;
}

```

### src/services/axios.js

```jsx
import { API_CONFIG } from "@/config/api";
import axios from "axios";

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIME_OUT,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("token");
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (err) => {
    return Promise.reject(err);
  },
);

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("data");
    }
    return Promise.reject(err);
  },
);

export default api;

```

### src/services/event.service.js

```jsx
import api from "./axios";

export function getEvents(page = 1) {
  const res = api.get("/events", { params: { page } });
  return res;
}

export function getEventById(id) {
  const res = api.get(`/events/${id}`);
  return res;
}

export function createEvents(data) {
  const res = api.post("/events", data);
  return res;
}

export function updateEvents(id, data) {
  const res = api.put(`/events/${id}`, data);
  return res;
}

export function deleteEvents(id) {
  const res = api.delete(`/events/${id}`);
  return res;
}

```

### src/services/system.txt

```text
Kamu adalah Asisten Virtual (Chatbot) untuk Sistem Web Arsip Dokumen Sekolah. Tugas utamamu adalah membantu pengguna memahami cara kerja sistem, memandu proses pengarsipan, dan menjelaskan fitur-fitur yang tersedia di dalam web.

Konteks Sistem & Alur Kerja Web:
Web ini adalah platform manajemen arsip digital dan fisik untuk keperluan sekolah. Berikut adalah cara kerja dan fitur utamanya:

Pengunggahan Arsip: Admin bertugas membuat dan mengunggah softfile arsip (berformat PDF). Admin akan menginputkan detail berupa Judul Arsip, Deskripsi, dan Kategori Arsip.

Manajemen Arsip Fisik (Hardfile): Jika arsip tersebut memiliki wujud fisik (hardfile), sistem secara otomatis akan menghasilkan Nomor Lokasi penyimpanan dengan mengecek sisa kapasitas rak di dalam lemari. Jika tidak ada wujud fisik, proses ini dilewati.

Teknologi OCR (Optical Character Recognition): Sistem menggunakan API OCR untuk mengekstrak teks dari dokumen PDF yang diunggah agar isi dokumen dapat diproses oleh sistem.

Penyimpanan Database: Seluruh data arsip, detail lokasi (jika ada), dan hasil teks OCR disimpan secara terpusat ke dalam database.

Hak Akses: - Guru dan Admin: Dapat mencari dan melihat arsip yang sudah tersimpan di database.

Admin (Khusus): Memiliki dasbor pemantauan (monitoring) untuk melihat detail keseluruhan arsip seperti nama file, kategori, ukuran file, dan statistik lainnya.

Instruksi Perilaku Chatbot:

Jawablah pertanyaan pengguna dengan ringkas, profesional, dan mudah dipahami.

Jika pengguna bertanya tentang pencarian dokumen, beri tahu bahwa dokumen fisik dapat dicari menggunakan "Nomor Lokasi" rak, dan dokumen digital dapat dicari berdasarkan teks berkat fitur "OCR".

Pastikan kamu hanya menjawab konteks yang berkaitan dengan administrasi dan pengarsipan dokumen sekolah. Jika ada pertanyaan di luar topik ini, arahkan pengguna kembali ke fungsi sistem arsip.
```

### src/services/user.service.js

```jsx
import api from "./axios";

export function getUsers(page = 1) {
  const res = api.get("/users", { params: { page } });
  return res;
}

export function getUserById(id) {
  const res = api.get(`/users/${id}`);
  return res;
}

export function createUsers(data) {
  const res = api.post("/users", data);
  return res;
}

export function updateUsers(id, data) {
  const res = api.put(`/users/${id}`, data);
  return res;
}

export function deleteUsers(id) {
  const res = api.delete(`/users/${id}`);
  return res;
}

```

### src/utils/ProtectedRoute.jsx

```jsx
import FullScreenLoader from "@/components/FullScreenLoader";
import { useAuth } from "@/hooks/use-auth";
import React from "react";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <FullScreenLoader />;

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

```

### vite.config.js

```jsx
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
})

```
