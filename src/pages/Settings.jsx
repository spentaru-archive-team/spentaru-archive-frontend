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
import { useAuth } from "@/hooks/use-auth";
import { BadgeCheck, ShieldCheck, UserRound } from "lucide-react";
import React from "react";

export default function Settings() {
  const { user } = useAuth();

  return (
    <section className="space-y-5">
      <Header
        title="Pengaturan Profil Akun"
      />

      <div className="grid gap-4 xl:grid-cols-[1fr_0.85fr]">
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
            <form action="" className="space-y-4">
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
                  defaultValue={user?.name}
                />
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
                  defaultValue={user?.username}
                />
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
                />
              </div>
              <div className="pt-1">
                <Button className="w-fit px-5" type="submit">
                  Simpan Perubahan
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
    </section>
  );
}
