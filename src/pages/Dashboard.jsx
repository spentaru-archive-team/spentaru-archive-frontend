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
import { CirclePause, Clock3, FileCheck2, Files, Trash2 } from "lucide-react";
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
  const [activeTotal, setActiveTotal] = useState(0);
  const [readyTotal, setReadyTotal] = useState(0);
  const [retainedTotal, setRetainedTotal] = useState(0);
  const [destroyedTotal, setDestroyedTotal] = useState(0);
  const { user } = useAuth();

  const stats = [
    {
      title: "Total Arsip",
      value: archiveTotal,
      icon: Files,
      tone: {
        icon: "border-info/50 bg-info text-info-foreground",
        accent: "bg-info-foreground",
      },
    },
    {
      title: "Arsip Aktif",
      value: activeTotal,
      icon: FileCheck2,
      tone: {
        icon: "border-success/70 bg-success text-success-foreground",
        accent: "bg-success-foreground",
      },
    },
    {
      title: "Siap Retensi",
      value: readyTotal,
      icon: Clock3,
      tone: {
        icon: "border-warning/80 bg-warning text-warning-foreground",
        accent: "bg-warning-foreground",
      },
    },
    {
      title: "Arsip Ditahan",
      value: retainedTotal,
      icon: CirclePause,
      tone: {
        icon: "border-primary/20 bg-primary/10 text-primary",
        accent: "bg-primary",
      },
    },
    {
      title: "Arsip Dihapus",
      value: destroyedTotal,
      icon: Trash2,
      tone: {
        icon: "border-destructive/30 bg-destructive/10 text-destructive",
        accent: "bg-destructive",
      },
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
        setArchiveTotal(res.data.data.total ?? 0);
        setActiveTotal(res.data.data.active ?? 0);
        setReadyTotal(res.data.data.ready ?? 0);
        setRetainedTotal(res.data.data.retained ?? 0);
        setDestroyedTotal(res.data.data.destroyed ?? 0);
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <Card
              key={item.title}
              className="overflow-hidden rounded-sm border border-border/80 bg-card py-0 ring-0"
            >
              <div className={`h-1 ${item.tone.accent}`} />
              <CardContent className="px-4 py-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0 space-y-1">
                    <p className="truncate text-sm font-medium text-muted-foreground">
                      {item.title}
                    </p>
                    <p className="text-3xl font-semibold tracking-tight text-foreground">
                      {item.value}
                    </p>
                  </div>
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border ${item.tone.icon}`}
                  >
                    <Icon size={18} strokeWidth={2.2} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex flex-col-reverse gap-4 xl:flex-row">
        <Card className="min-w-0 flex-1 rounded-sm border border-border/80 bg-card py-0 ring-0">
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
          <Card className="min-w-0 flex-1 rounded-sm border border-border/80 bg-card py-0 ring-0">
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
                <div className="flex items-start justify-between gap-4 rounded-sm border border-success/80 bg-success px-4 py-3">
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
                  className="flex items-center justify-between gap-5 rounded-sm border border-warning bg-warning/70 px-4 py-3"
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
          <Card className="min-w-0 flex-1 rounded-sm border border-border/80 bg-card py-0 ring-0">
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
                <div className="flex items-start justify-between gap-4 rounded-sm border border-success/80 bg-success px-4 py-3">
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
                  className="flex items-center justify-between gap-5 rounded-sm border border-warning/80 bg-warning px-4 py-3"
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
