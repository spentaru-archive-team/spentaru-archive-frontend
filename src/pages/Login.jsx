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
import { useLocation, useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login: syncLoginState } = useAuth();
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
    email: "",
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
          ? "Email atau password salah."
          : error.response?.data?.message || "Terjadi kesalahan.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleViewPassword = () => {
    setShowPassword((prev) => !prev);
  };

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
