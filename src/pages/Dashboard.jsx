import Header from "@/components/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getDashboardData } from "@/services/dashboard.service";
import {
  Archive,
  BookOpenText,
  Clock3,
  FolderKanban,
  UserRound,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import DashboardSkeleton from "./DashboardSkeleton";

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
  const [loading, setLoading] = useState(true);
  const [archiveTotal, setArchiveTotal] = useState(0);
  const [categoryTotal, setCategoryTotal] = useState(0);
  const [cabinetTotal, setCabinetTotal] = useState(0);
  const [userTotal, setUserTotal] = useState(0);

  const stats = [
    {
      title: "Total Arsip",
      value: archiveTotal,
      detail: "Dokumen aktif yang sudah terdigitalisasi",
      icon: Archive,
    },
    {
      title: "Kategori Arsip",
      value: categoryTotal,
      detail: "Pembagian map dan jenis dokumen sekolah",
      icon: FolderKanban,
    },
    {
      title: "Lemari Penyimpanan",
      value: cabinetTotal,
      detail: "Lemari fisik yang terhubung dengan kode arsip",
      icon: BookOpenText,
    },
    {
      title: "Total Pengguna",
      value: userTotal,
      detail: "Guru dan admin yang memiliki akses sistem",
      icon: UserRound,
    },
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const res = await getDashboardData();
        setArchiveTotal(res.data.data.archive_total);
        setCategoryTotal(res.data.data.archive_category_total);
        setCabinetTotal(res.data.data.archive_subcategory_total);
        setUserTotal(res.data.data.user_total);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <section className="space-y-6">
      <Header
        title="Dashboard Pengelolaan Arsip"
        desc="Monitoring arsip dan aktivitas pengelolaan dalam satu tempat."
      />

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
