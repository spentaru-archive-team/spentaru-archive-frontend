import Header from "@/components/Header";
import agungPhoto from "@/assets/teams/Agung.webp";
import alanPhoto from "@/assets/teams/Alan.webp";
import ezzarPhoto from "@/assets/teams/Ezzar.webp";
import naufalPhoto from "@/assets/teams/Naufal.webp";
import olvansPhoto from "@/assets/teams/Olvans.webp";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bot,
  FileUp,
  FolderKanban,
  LockKeyhole,
  ScanText,
  Search,
  Sparkles,
  UsersRound,
} from "lucide-react";
import React from "react";

const featuresData = [
  {
    title: "Upload Dokumen",
    description:
      "Unggah arsip sekolah secara cepat dengan alur input yang rapi.",
    icon: FileUp,
  },
  {
    title: "Manajemen Arsip",
    description:
      "Kelola dokumen berdasarkan kategori, lokasi, dan status arsip.",
    icon: FolderKanban,
  },
  {
    title: "Pencarian Arsip",
    description: "Temukan dokumen lebih cepat dengan pencarian kata kunci.",
    icon: Search,
  },
  {
    title: "AI Semantic Search",
    description:
      "Cari arsip berdasarkan konteks isi dokumen, bukan hanya judul file.",
    icon: Sparkles,
  },
  {
    title: "OCR dan Ekstraksi Teks",
    description:
      "Baca teks dari berkas hasil pindai agar isi dokumen tetap terindeks.",
    icon: ScanText,
  },
  {
    title: "Authentication dan Role",
    description:
      "Kontrol akses pengguna berdasarkan peran untuk keamanan data arsip.",
    icon: LockKeyhole,
  },
];

const teamMembers = [
  {
    name: "Muhammad Naufal Rafa Al As'ad",
    role: "Frontend Developer",
    bio: "Fokus pada antarmuka yang rapi, responsif, dan konsisten.",
    photo: naufalPhoto,
    instagram: "https://instagram.com/naufal.rafaa",
    github: "https://github.com/Falrafa4",
  },
  {
    name: "Aliezzar Wijaya",
    role: "Backend Developer & DevOps",
    bio: "Menangani API, struktur data, dan integrasi layanan sistem.",
    photo: ezzarPhoto,
    instagram: "https://instagram.com/ezzarforschool",
    github: "https://github.com/ezzarw",
  },
  {
    name: "Gregorius Olvans Adi Wicaksono",
    role: "AI Specialist",
    bio: "Mengelola OCR, ekstraksi teks, dan optimasi kualitas hasil AI.",
    photo: olvansPhoto,
    instagram: "https://instagram.com/vnzxtly.mp3",
    github: "https://github.com/Itsmevnztxt",
  },
  {
    name: "Agung Dwi Saputra",
    role: "Prompt Engineer/Vibe Coder/VPS Specialist",
    bio: "Mengembangkan chatbot AI untuk membantu pengguna dengan pertanyaan terkait pengelolaan arsip.",
    photo: agungPhoto,
    instagram: "https://instagram.com/flaaress",
    github: "https://github.com/Cidzzz",
  },
  {
    name: "Rifqi Tomy Alana",
    role: "Project Manager",
    bio: "Mengawal prioritas produk agar sesuai kebutuhan sekolah.",
    photo: alanPhoto,
    instagram: "https://instagram.com/alennareru",
    github: "https://github.com/Allarrt",
  },
];

const featureCardStyles = [
  {
    card: "border-primary/20 bg-primary/[0.04]",
    icon: "border-primary/20 bg-primary/10 text-primary",
  },
  {
    card: "border-secondary/85 bg-secondary/40",
    icon: "border-secondary/85 bg-secondary text-secondary-foreground",
  },
  {
    card: "border-accent/85 bg-accent/35",
    icon: "border-accent/85 bg-accent text-accent-foreground",
  },
  {
    card: "border-chart-1/30 bg-chart-1/10",
    icon: "border-chart-1/30 bg-chart-1/15 text-chart-1",
  },
  {
    card: "border-chart-2/30 bg-chart-2/10",
    icon: "border-chart-2/30 bg-chart-2/15 text-chart-2",
  },
  {
    card: "border-chart-3/30 bg-chart-3/10",
    icon: "border-chart-3/30 bg-chart-3/15 text-chart-3",
  },
];

function InstagramIcon({ size = 14, className = "" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        height="16"
        rx="4"
        stroke="currentColor"
        strokeWidth="2"
        width="16"
        x="4"
        y="4"
      />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="17" cy="7" fill="currentColor" r="1" />
    </svg>
  );
}

function GithubIcon({ size = 14, className = "" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.71.5.09.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.22-3.37-1.22-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.56 2.35 1.11 2.92.85.09-.66.35-1.11.63-1.36-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.96c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.18.59.69.49A10.08 10.08 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

export default function About() {
  return (
    <section className="space-y-5">
      <Header
        title="Tentang Sistem Pengarsipan Sekolah"
        desc="Platform ini membantu pengelolaan, penyimpanan, pencarian, dan pengarsipan dokumen sekolah secara digital agar lebih efisien, aman, dan terstruktur."
      >
        <div className="flex items-center gap-3 rounded-sm border border-border/70 bg-muted/20 px-4 py-3 text-sm text-muted-foreground">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-primary/15 bg-primary/5 text-primary">
            <Bot size={16} />
          </span>
          Sistem dirancang untuk mendukung kebutuhan administrasi sekolah
          sehari-hari dengan alur kerja yang sederhana.
        </div>
      </Header>

      <Card className="rounded-sm border border-border/80 bg-card py-0 ring-0">
        <CardHeader className="gap-2 border-b border-border/70 px-5 py-4">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold text-foreground">
              Tentang Website
            </CardTitle>
            <CardDescription className="text-sm leading-6">
              Solusi digital untuk pengelolaan arsip sekolah.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 px-5 py-5">
          <p className="text-sm leading-7 text-muted-foreground">
            Sistem pengarsipan sekolah ini dibuat untuk menjawab tantangan
            pengelolaan dokumen yang tersebar, sulit ditelusuri, dan rawan
            kehilangan. Dengan digitalisasi arsip, proses penyimpanan menjadi
            lebih terstruktur, pencarian dokumen lebih efisien, dan kontrol
            akses data lebih aman sesuai kebutuhan masing-masing peran pengguna.
          </p>
          <p className="text-sm leading-7 text-muted-foreground">
            Platform ini juga membantu tim sekolah menjaga ketertiban
            administrasi, mempercepat layanan dokumen, dan memudahkan monitoring
            aktivitas arsip dari waktu ke waktu.
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-sm border border-border/80 bg-card py-0 ring-0">
        <CardHeader className="gap-2 border-b border-border/70 px-5 py-4">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold text-foreground">
              Fitur Website
            </CardTitle>
            <CardDescription className="text-sm leading-6">
              Fitur inti untuk kebutuhan arsip digital sekolah.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-5 py-5">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {featuresData.map((feature, index) => {
              const FeatureIcon = feature.icon;
              const featureCardStyle =
                featureCardStyles[index % featureCardStyles.length];

              return (
                <article
                  key={feature.title}
                  className={`rounded-sm border px-4 py-3 ${featureCardStyle.card}`}
                >
                  <div
                    className={`mb-2 inline-flex h-8 w-8 items-center justify-center rounded-sm border ${featureCardStyle.icon}`}
                  >
                    <FeatureIcon size={15} />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-sm border border-border/80 bg-card py-0 ring-0">
        <CardHeader className="gap-2 border-b border-border/70 px-5 py-4">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <UsersRound size={18} className="text-primary" />
              Tim Pengembang
            </CardTitle>
            <CardDescription className="text-sm leading-6">
              Tim lintas peran yang membangun dan menjaga sistem ini.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-5 py-5">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {teamMembers.map((member) => (
              <article
                key={member.name}
                className="rounded-sm border border-border/70 bg-muted/20 px-4 py-3"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={member.photo}
                    alt={`Foto ${member.name}`}
                    className="h-14 w-14 shrink-0 rounded-sm border border-border/80 bg-muted object-cover"
                  />
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-sm font-medium text-primary/85">
                      {member.role}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {member.bio}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <a
                        href={member.instagram}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Instagram ${member.name}`}
                        className="inline-flex items-center gap-1.5 rounded-sm border border-border/80 bg-card px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <InstagramIcon size={14} />
                        Instagram
                      </a>
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`GitHub ${member.name}`}
                        className="inline-flex items-center gap-1.5 rounded-sm border border-border/80 bg-card px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <GithubIcon size={14} />
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
