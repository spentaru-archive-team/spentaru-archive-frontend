import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { useAuth } from "@/hooks/use-auth";
import { updateProfile } from "@/services/auth.service";
import { useTheme } from "@/context/ThemeContext";
import {
  BadgeCheck,
  ChevronRight,
  Info,
  Moon,
  ShieldCheck,
  Sun,
  UserRound,
} from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function Settings() {
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState({
    fields: null,
    general: null,
  });
  const [formData, setFormData] = useState({
    name: user?.name || "",
    username: user?.username || "",
  });
  const { theme, setTheme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsUpdating(true);
      setError({ fields: null, general: null });
      const res = await updateProfile(formData);

      if (res.data.status === "success") {
        await refreshUser();

        navigate(location.pathname, {
          state: {
            popup: {
              title: "Profil berhasil diperbarui",
              description: "Perubahan profil Anda telah disimpan.",
              type: "success",
            },
          },
        });
      }
    } catch (error) {
      console.error("Error updating user:", error.response);
      setError({
        fields: error.response?.data?.errors || null,
        general: !error.response?.data?.errors
          ? "Terjadi kesalahan saat memperbarui user."
          : null,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <section className="space-y-5">
      <Header title="Pengaturan Profil Akun" />

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-[1fr_0.85fr]">
        <Card className="rounded-sm border border-border/80 bg-white py-0 ring-0">
          <CardHeader className="gap-2 border-b border-border/70 px-5 py-4">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <CardTitle className="text-lg font-semibold text-foreground">
                  Profil Pengguna
                </CardTitle>
                <CardDescription className="text-sm leading-6">
                  Data ini digunakan sebagai identitas utama akun di dashboard.
                </CardDescription>
              </div>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-primary/15 bg-primary/5 text-primary">
                <UserRound size={18} />
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 px-5 py-5">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-foreground"
                >
                  Nama Lengkap
                </Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Masukkan nama lengkap Anda"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                {error.fields?.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {error.fields.name[0]}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="username"
                  className="text-sm font-medium text-foreground"
                >
                  Username
                </Label>
                <Input
                  type="text"
                  id="username"
                  placeholder="Ubah username Anda"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
                {error.fields?.username && (
                  <p className="mt-1 text-sm text-red-600">
                    {error.fields.username[0]}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-foreground"
                >
                  Password
                </Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Masukkan password Anda"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                {error.fields?.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {error.fields.password[0]}
                  </p>
                )}
              </div>
              <div className="pt-1">
                <Button
                  className="w-fit px-5"
                  type="submit"
                  disabled={isUpdating}
                >
                  {isUpdating ? "Menyimpan..." : "Simpan Perubahan"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="rounded-sm border border-border/80 bg-white py-0 ring-0">
          <CardHeader className="gap-2 border-b border-border/70 px-5 py-4">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <CardTitle className="text-lg font-semibold text-foreground">
                  Keamanan Akun
                </CardTitle>
                <CardDescription className="text-sm leading-6">
                  Panduan singkat untuk menjaga akses sistem arsip tetap aman.
                </CardDescription>
              </div>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-primary/15 bg-primary/5 text-primary">
                <ShieldCheck size={18} />
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 px-5 py-5">
            <div className="rounded-sm border border-border/70 bg-muted/20 px-4 py-3">
              <div className="mb-1 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                <BadgeCheck size={16} className="text-primary" />
                Status Akses
              </div>
              <p className="text-sm text-muted-foreground">
                Akun Anda saat ini aktif dan memiliki akses ke fitur pengelolaan
                arsip sekolah.
              </p>
            </div>

            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="rounded-sm border border-border/70 bg-muted/15 px-4 py-3">
                Gunakan password unik dan ubah secara berkala untuk menjaga
                keamanan akun.
              </li>
              <li className="rounded-sm border border-border/70 bg-muted/15 px-4 py-3">
                Pastikan logout setelah selesai, terutama saat memakai perangkat
                bersama.
              </li>
              <li className="rounded-sm border border-border/70 bg-muted/15 px-4 py-3">
                Gunakan nama profil yang valid agar aktivitas arsip mudah
                dilacak oleh tim.
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-sm border border-border/80 bg-white py-0 ring-0">
        <CardHeader className="gap-2 border-b border-border/70 px-5 py-4">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <CardTitle className="text-lg font-semibold text-foreground">
                Pilih Tema
              </CardTitle>
              <CardDescription className="text-sm leading-6">
                Sesuaikan tampilan dashboard sesuai preferensi Anda.
              </CardDescription>
            </div>
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-primary/15 bg-primary/5 text-primary">
              {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
            </span>
          </div>
        </CardHeader>
        <CardContent className="px-5 py-5">
          <div className="space-y-1.5">
            <Label htmlFor="theme" className="text-sm font-medium text-foreground">
              Mode Tampilan
            </Label>
            <NativeSelect
              id="theme"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full sm:w-48"
            >
              <NativeSelectOption value="system">Sistem</NativeSelectOption>
              <NativeSelectOption value="light">Light</NativeSelectOption>
              <NativeSelectOption value="dark">Dark</NativeSelectOption>
            </NativeSelect>
          </div>
        </CardContent>
      </Card>

      <Link
        to="/about"
        aria-label="Buka halaman Tentang Website"
        className="group block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <Card className="rounded-sm border border-border/80 bg-white py-0 ring-0 transition-colors group-hover:border-primary/35 group-hover:bg-primary/[0.03]">
          <CardContent className="px-5 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-start gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-primary/15 bg-primary/5 text-primary">
                  <Info size={18} />
                </span>
                <div className="min-w-0 space-y-1">
                  <p className="text-base font-semibold text-foreground">
                    Tentang Website
                  </p>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Pelajari informasi tentang sistem pengarsipan sekolah ini
                  </p>
                </div>
              </div>
              <ChevronRight
                size={18}
                className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
              />
            </div>
          </CardContent>
        </Card>
      </Link>
    </section>
  );
}
