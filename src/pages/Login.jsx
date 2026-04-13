import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/services/auth.service";
import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await login(form);
      if (res.data.status) {
        localStorage.setItem("token", res.data.data.token);
        navigate("/dashboard");
      } else {
        setError(res.data.message || "Login gagal. Silakan coba lagi.");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Login gagal. Silakan coba lagi.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="relative mx-auto flex min-h-dvh w-full max-w-6xl items-center px-5 py-10 md:px-8 lg:px-12">
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <section className="hidden lg:block">
            <div className="max-w-xl space-y-6">
              <div className="inline-flex items-center rounded-full border border-primary/15 bg-white/75 px-4 py-2 text-sm font-medium text-primary shadow-sm backdrop-blur">
                Portal Arsip Digital SMP Negeri 1 Waru
              </div>
              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-primary/70">
                  Spentaru Archive
                </p>
                <h1 className="max-w-lg text-4xl font-semibold tracking-tight text-foreground lg:text-5xl">
                  Akses dokumen sekolah dengan tampilan yang lebih rapi dan
                  terpercaya.
                </h1>
                <p className="max-w-xl text-base leading-7 text-muted-foreground">
                  Sistem arsip sekolah yang membantu pengelolaan dokumen
                  penting, surat, dan administrasi internal agar tetap tertata
                  dan mudah ditemukan.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/70 bg-white/80 p-5 shadow-[0_18px_60px_-28px_rgba(36,54,115,0.35)] backdrop-blur">
                  <p className="text-sm font-semibold text-primary">Tertata</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Arsip sekolah dan dokumen tersusun lebih terstruktur untuk
                    kebutuhan administrasi sekolah.
                  </p>
                </div>
                <div className="rounded-3xl border border-white/70 bg-primary p-5 text-primary-foreground shadow-[0_18px_60px_-28px_rgba(36,54,115,0.55)]">
                  <p className="text-sm font-semibold">Aman Diakses</p>
                  <p className="mt-2 text-sm leading-6 text-primary-foreground/80">
                    Login diperlukan agar pengelolaan arsip tetap terjaga dan
                    aman.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <form className="w-full" onSubmit={handleLogin}>
            <Card className="mx-auto w-full max-w-lg border-white/70 bg-white/90 shadow-[0_24px_80px_-32px_rgba(36,54,115,0.45)] backdrop-blur">
              <CardHeader className="space-y-4 pb-2">
                <div className="space-y-2">
                  <CardTitle className="text-3xl font-semibold tracking-tight text-foreground">
                    Login Arsip
                  </CardTitle>
                  <CardDescription className="text-sm leading-6 text-muted-foreground">
                    Masuk ke{" "}
                    <strong className="font-semibold text-primary">
                      Spentaru Archive
                    </strong>{" "}
                    untuk mengelola arsip sekolah dengan lebih cepat dan
                    terorganisir.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-5">
                  <div className="grid gap-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-foreground"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="operator@spentaru.sch.id"
                      required
                      name="email"
                      value={form.email}
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
                      <button
                        type="button"
                        className="text-sm font-medium text-primary transition hover:text-primary/80"
                      >
                        Lupa password?
                      </button>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Masukkan password"
                      required
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-3 pt-2">
                <Button type="submit" disabled={loading}>
                  {loading ? "Memproses..." : "Masuk ke Dashboard"}
                </Button>
                <p className="text-center text-sm leading-6 text-muted-foreground">
                  Khusus untuk guru atau admin yang memiliki hak akses sistem
                  arsip.
                </p>
              </CardFooter>
            </Card>
          </form>
        </div>
      </div>
    </main>
  );
}
