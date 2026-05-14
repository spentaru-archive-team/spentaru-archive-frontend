import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Compass, Home, SearchX } from "lucide-react";
import { Link } from "react-router";

const quickLinks = [
  { label: "Dashboard", path: "/dashboard", icon: Home },
  { label: "Arsip", path: "/archives", icon: Compass },
  { label: "Lokasi Arsip", path: "/archive-locations", icon: Compass },
];

export default function NotFoundPage() {
  return (
    <section className="space-y-6">
      <Header
        title="404 - Halaman Tidak Ditemukan"
        desc="Link yang Anda akses tidak tersedia atau sudah dipindahkan. Silakan kembali ke halaman yang valid melalui menu di kiri."
      >
        <div className="flex flex-wrap gap-3">
          <Button
            asChild
            size="lg"
            className="h-10 w-auto gap-2 rounded-sm border border-primary/20 px-4 py-0 shadow-none"
          >
            <Link to="/dashboard">
              <ArrowLeft size={16} />
              Kembali ke Dashboard
            </Link>
          </Button>
        </div>
      </Header>

      <Card className="rounded-sm border border-border/80 bg-card py-0 ring-0 shadow-none">
        <CardHeader className="border-b border-border/70 px-5 py-4">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <span className="flex h-8 w-8 items-center justify-center rounded-sm border border-primary/15 bg-primary/6 text-primary">
              <SearchX size={16} />
            </span>
            Navigasi Cepat
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 px-5 py-5 sm:grid-cols-3">
          {quickLinks.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center justify-between gap-3 rounded-sm border border-border/80 bg-muted/20 px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/25 hover:bg-primary/6 hover:text-primary"
              >
                <span className="flex items-center gap-2">
                  <Icon size={16} />
                  {item.label}
                </span>
                <ArrowLeft size={14} className="rotate-180 text-primary/70" />
              </Link>
            );
          })}
        </CardContent>
      </Card>
    </section>
  );
}
