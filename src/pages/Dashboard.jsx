import Header from "@/components/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getArchivesRetentionReady,
  getDashboardData,
  getEventPendingUploads,
  getTeacherPendingUploads,
} from "@/services/dashboard.service";
import { Archive, BookOpenText, FolderKanban, UserRound } from "lucide-react";
import React, { useEffect, useState } from "react";
import DashboardSkeleton from "./DashboardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { useAuth } from "@/hooks/use-auth";

const formatRelativeTime = (dateInput) => {
  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) {
    return "Tanggal tidak valid";
  }

  const rtf = new Intl.RelativeTimeFormat("id-ID", { numeric: "auto" });
  const diffMs = date.getTime() - Date.now();
  const diffSeconds = Math.round(diffMs / 1000);

  const ranges = [
    { unit: "year", seconds: 60 * 60 * 24 * 365 },
    { unit: "month", seconds: 60 * 60 * 24 * 30 },
    { unit: "day", seconds: 60 * 60 * 24 },
    { unit: "hour", seconds: 60 * 60 },
    { unit: "minute", seconds: 60 },
    { unit: "second", seconds: 1 },
  ];

  for (const range of ranges) {
    if (Math.abs(diffSeconds) >= range.seconds || range.unit === "second") {
      const value = Math.round(diffSeconds / range.seconds);
      return rtf.format(value, range.unit);
    }
  }

  return rtf.format(0, "second");
};

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [archiveTotal, setArchiveTotal] = useState(0);
  const [categoryTotal, setCategoryTotal] = useState(0);
  const [cabinetTotal, setCabinetTotal] = useState(0);
  const [userTotal, setUserTotal] = useState(0);
  const { user } = useAuth();

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
      title: "Total Lemari",
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

  const fetchTeacherPendingUploads = async () => {
    try {
      const res = await getTeacherPendingUploads();
      return res.data.data;
    } catch (error) {
      console.error("Error fetching teachers without archives:", error);
      throw error;
    }
  };

  const { data: teacherPendingUploads } = useQuery({
    queryKey: ["teachers-without-archives"],
    queryFn: fetchTeacherPendingUploads,
  });

  const fetchPendingUploads = async () => {
    try {
      const res = await getEventPendingUploads();
      return res.data.data;
    } catch (error) {
      console.error("Error fetching pending uploads:", error);
      throw error;
    }
  };

  const { data: eventPendingUploads } = useQuery({
    queryKey: ["event-pending-uploads"],
    queryFn: fetchPendingUploads,
  });

  const fetchArchivesRetentionReady = async () => {
    try {
      const res = await getArchivesRetentionReady();
      return res.data.data;
    } catch (error) {
      console.error("Error fetching archives without location:", error);
      throw error;
    }
  };

  const { data: archivesRetentionReady } = useQuery({
    queryKey: ["archives-without-location"],
    queryFn: fetchArchivesRetentionReady,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const res = await getDashboardData();
        setArchiveTotal(res.data.data.archive_total);
        setCategoryTotal(res.data.data.archive_category_total);
        setCabinetTotal(res.data.data.cabinet_total);
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

      <div className="grid gap-4 grid-cols-2 xl:grid-cols-4">
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

      <div className="flex flex-col-reverse gap-4 xl:flex-row">
        <Card className="min-w-0 flex-1 rounded-sm border border-border/80 bg-white py-0 ring-0">
          <CardHeader className="gap-2 border-b border-border/70 px-5 py-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle className="text-lg font-semibold text-foreground">
                  Notifikasi Retensi
                </CardTitle>
                <CardDescription className="mt-1 text-sm leading-6">
                  Arsip yang sudah siap untuk proses retensi atau pemusnahan.
                </CardDescription>
              </div>
              {/* <span className="hidden items-center gap-2 text-sm text-primary sm:inline-flex">
                <Clock3 size={16} />
                Hari ini
              </span> */}
            </div>
          </CardHeader>
          <CardContent className="max-h-72 space-y-3 overflow-y-auto px-5 py-5 pr-3">
            {archivesRetentionReady?.map((archive) => (
              <div
                key={archive.id}
                className="flex items-start justify-between gap-4 rounded-sm border border-border/80 bg-muted/20 px-4 py-3"
              >
                <div className="min-w-0 space-y-1">
                  <p className="text-sm text-foreground">
                    <strong>
                      <Link
                        className="hover:underline"
                        to="/archives"
                        state={{
                          keyword: archive.title,
                        }}
                      >
                        {archive.title}
                      </Link>
                    </strong>{" "}
                    - {archive.category.name}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {user.role === "admin" && (
          <Card className="min-w-0 flex-1 rounded-sm border border-border/80 bg-white py-0 ring-0">
            <CardHeader className="gap-2 border-b border-border/70 px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    Guru yang belum upload arsip
                  </CardTitle>
                  <CardDescription className="mt-1 text-sm leading-6">
                    Pemberitahuan penting terkait pengelolaan arsip sekolah.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="max-h-72 space-y-3 overflow-y-auto px-5 py-5 pr-3">
              {eventPendingUploads?.length === 0 && (
                <div className="flex items-start justify-between gap-4 rounded-sm border border-green-100/80 bg-green-50 px-4 py-3">
                  <div className="min-w-0 space-y-1">
                    <p className="text-sm text-foreground">
                      Semua guru sudah mengupload arsip untuk event yang sudah
                      dilaksanakan. Terima kasih atas kerjasamanya!
                    </p>
                  </div>
                </div>
              )}

              {eventPendingUploads?.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between gap-5 rounded-sm border border-yellow-100/80 bg-yellow-50 px-4 py-3"
                >
                  <div className="min-w-0 space-y-1">
                    <p className="text-sm text-foreground">
                      Guru <strong>{event.user.name}</strong> belum mengupload
                      arsip untuk event <strong>{event.title}</strong>
                    </p>
                  </div>
                  <span className="w-15 md:w-20 shrink-0 text-xs font-medium text-primary/70">
                    {formatRelativeTime(event.date)}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {user.role === "guru" && (
          <Card className="min-w-0 flex-1 rounded-sm border border-border/80 bg-white py-0 ring-0">
            <CardHeader className="gap-2 border-b border-border/70 px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    Daftar Event Yang Belum Upload Arsip
                  </CardTitle>
                  <CardDescription className="mt-1 text-sm leading-6">
                    Pastikan untuk segera mengupload arsip terkait event yang
                    sudah dilaksanakan.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 px-5 py-5">
              {teacherPendingUploads?.length === 0 && (
                <div className="flex items-start justify-between gap-4 rounded-sm border border-green-100/80 bg-green-50 px-4 py-3">
                  <div className="min-w-0 space-y-1">
                    <p className="text-sm text-foreground">
                      Semua event sudah diupload arsipnya. Terima kasih atas
                      kerjasamanya!
                    </p>
                  </div>
                </div>
              )}

              {teacherPendingUploads?.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between gap-5 rounded-sm border border-yellow-100/80 bg-yellow-50 px-4 py-3"
                >
                  <div className="min-w-0 space-y-1">
                    <p className="text-sm text-foreground">
                      Anda belum mengupload arsip untuk event {""}
                      <strong>
                        <Link
                          className="hover:underline"
                          to="/archives"
                          state={{ openCreate: true, eventId: event.id }}
                        >
                          {event.title}
                        </Link>
                      </strong>
                    </p>
                  </div>
                  <span className="w-20 shrink-0 text-xs font-medium text-primary/70">
                    {formatRelativeTime(event.date)}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
