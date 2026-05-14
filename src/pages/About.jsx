import Header from "@/components/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bot,
  CircleUserRound,
  FileSearch,
  FileUp,
  FolderKanban,
  History,
  LockKeyhole,
  SquareArrowOutUpRight,
  ScanText,
  Search,
  ShieldCheck,
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
    title: "Preview File",
    description:
      "Lihat isi dokumen langsung dari sistem sebelum diproses lanjut.",
    icon: FileSearch,
  },
  {
    title: "Pencarian Arsip",
    description: "Temukan dokumen lebih cepat dengan pencarian kata kunci.",
    icon: Search,
  },
  {
    title: "Kategorisasi Dokumen",
    description: "Susun arsip agar konsisten, terstruktur, dan mudah diaudit.",
    icon: ShieldCheck,
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
    title: "Riwayat Aktivitas",
    description:
      "Pantau jejak aktivitas pengelolaan arsip oleh setiap pengguna.",
    icon: History,
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
    instagram: "https://instagram.com/naufal.rafaa",
    github: "https://github.com/Falrafa4",
  },
  {
    name: "Aliezzar Wijaya",
    role: "Backend Developer & DevOps",
    bio: "Menangani API, struktur data, dan integrasi layanan sistem.",
    instagram: "https://instagram.com/aliezzarwijaya",
    github: "https://github.com/aliezzarwijaya",
  },
  {
    name: "Gregorius Olvans Adi Wicaksono",
    role: "AI Specialist",
    bio: "Mengelola OCR, ekstraksi teks, dan optimasi kualitas hasil AI.",
    instagram: "https://instagram.com/gregoriusolvans",
    github: "https://github.com/gregoriusolvans",
  },
  {
    name: "Agung Dwi Saputra",
    role: "Prompt Engineer/Vibe Coder/VPS Specialist",
    bio: "Mengembangkan chatbot AI untuk membantu pengguna dengan pertanyaan terkait pengelolaan arsip.",
    instagram: "https://instagram.com/agungdwisaputra",
    github: "https://github.com/agungdwisaputra",
  },
  {
    name: "Rifqi Tomy Alana",
    role: "Project Manager",
    bio: "Mengawal prioritas produk agar sesuai kebutuhan sekolah.",
    instagram: "https://instagram.com/rifqitomy",
    github: "https://github.com/rifqitomy",
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

// const getInitials = (name) =>
//   name
//     .split(" ")
//     .map((word) => word[0])
//     .join("")
//     .slice(0, 2)
//     .toUpperCase();

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
                  {/* <div
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-primary/20 bg-primary/10 text-xs font-semibold text-primary"
                    aria-hidden="true"
                  >
                    {getInitials(member.name)}
                  </div> */}
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
                        <CircleUserRound size={14} />
                        Instagram
                      </a>
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`GitHub ${member.name}`}
                        className="inline-flex items-center gap-1.5 rounded-sm border border-border/80 bg-card px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <SquareArrowOutUpRight size={14} />
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
