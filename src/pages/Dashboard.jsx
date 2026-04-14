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

// const archiveHealth = [
//   {
//     label: "Arsip sudah tervalidasi",
//     value: "92%",
//     note: "Mayoritas dokumen sudah memiliki kode, kategori, dan lokasi simpan.",
//   },
//   {
//     label: "Dokumen perlu pengecekan ulang",
//     value: "18 berkas",
//     note: "Berfokus pada kelengkapan lampiran dan penamaan file digital.",
//   },
//   {
//     label: "Sinkronisasi bulan ini",
//     value: "126 arsip",
//     note: "Pembaruan data fisik dan digital berjalan stabil minggu ini.",
//   },
// ];

// const quickActions = [
//   "Periksa arsip yang belum memiliki kategori.",
//   "Rapikan penamaan file agar konsisten per tahun ajaran.",
//   "Tinjau lemari dengan volume arsip paling padat.",
// ];

export default function Dashboard() {
  return (
    <section className="space-y-6">
      <Header title="Dashboard Pengelolaan Arsip" desc="Pantau jumlah arsip, status validasi dokumen, dan aktivitas pengelolaan harian dalam satu tampilan yang tenang, formal, dan mudah dibaca." />

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
                    <p className="text-sm leading-6 text-muted-foreground">
                      {item.detail}
                    </p>
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

      {/* <div className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
        <Card className="rounded-sm border border-border/80 bg-white py-0 ring-0">
          <CardHeader className="gap-2 border-b border-border/70 px-5 py-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle className="text-lg font-semibold text-foreground">
                  Kondisi Arsip
                </CardTitle>
                <CardDescription className="mt-1 text-sm leading-6">
                  Gambaran singkat kualitas pengelolaan arsip sekolah saat ini.
                </CardDescription>
              </div>
              <span className="inline-flex items-center gap-2 rounded-sm border border-primary/12 bg-primary/6 px-3 py-1.5 text-xs font-semibold text-primary">
                <ShieldCheck size={14} />
                Stabil
              </span>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 px-5 py-5 md:grid-cols-3">
            {archiveHealth.map((item) => (
              <div
                key={item.label}
                className="rounded-sm border border-border/80 bg-muted/30 px-4 py-4"
              >
                <p className="text-sm font-medium text-muted-foreground">
                  {item.label}
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                  {item.value}
                </p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {item.note}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-sm border border-border/80 bg-white py-0 ring-0">
          <CardHeader className="gap-2 border-b border-border/70 px-5 py-4">
            <CardTitle className="text-lg font-semibold text-foreground">
              Tindak Lanjut
            </CardTitle>
            <CardDescription className="text-sm leading-6">
              Fokus perapian arsip yang paling berdampak untuk operasional.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 px-5 py-5">
            {quickActions.map((action, index) => (
              <div
                key={action}
                className="flex items-start gap-3 rounded-sm border border-border/80 bg-muted/25 px-4 py-3"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border border-primary/12 bg-primary/6 text-xs font-semibold text-primary">
                  {index + 1}
                </div>
                <p className="text-sm leading-6 text-foreground">{action}</p>
              </div>
            ))}
            <Button className="mt-2 h-10 w-full px-4 py-2 text-sm shadow-none">
              Lihat Pengelolaan Arsip
            </Button>
          </CardContent>
        </Card>
      </div> */}

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

        {/* <Card className="rounded-sm border border-border/80 bg-white py-0 ring-0">
          <CardHeader className="gap-2 border-b border-border/70 px-5 py-4">
            <CardTitle className="text-lg font-semibold text-foreground">
              Ringkasan Pengelolaan
            </CardTitle>
            <CardDescription className="text-sm leading-6">
              Indikator cepat untuk membantu admin melihat arah pekerjaan hari
              ini.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 px-5 py-5">
            <div className="rounded-sm border border-primary/12 bg-primary/6 px-4 py-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-primary/75">
                    Capaian Mingguan
                  </p>
                  <p className="mt-1 text-2xl font-semibold tracking-tight text-primary">
                    84%
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-primary/15 bg-white text-primary">
                  <ArrowUpRight size={18} />
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-primary/80">
                Proses digitalisasi dan penataan metadata berjalan sesuai target
                mingguan unit arsip.
              </p>
            </div>

            <div className="space-y-3">
              <div className="rounded-sm border border-border/80 px-4 py-3">
                <p className="text-sm font-medium text-muted-foreground">
                  Arsip paling banyak diakses
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  Dokumen kelulusan dan surat keputusan sekolah
                </p>
              </div>
              <div className="rounded-sm border border-border/80 px-4 py-3">
                <p className="text-sm font-medium text-muted-foreground">
                  Rekomendasi
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  Lanjutkan pengecekan dokumen administrasi semester berjalan.
                </p>
              </div>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </section>
  );
}
