import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  FileSearch,
  FileText,
  Filter,
  FolderArchive,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import React from "react";

const archives = [
  {
    id: "1",
    event: "Kelulusan",
    title: "Surat Keputusan Kelulusan 2024",
    year: "2024",
    note: "Dokumen final untuk arsip akademik.",
    category: "Akademik",
    subcategory: "Surat Keputusan",
    status: "Aktif",
    file: "SK-Kelulusan-2024.pdf",
  },
  {
    id: "2",
    event: "Kesiswaan",
    title: "Data Presensi Siswa Semester Genap",
    year: "2024",
    note: "Rekap presensi per kelas semester genap.",
    category: "Kesiswaan",
    subcategory: "Presensi",
    status: "Tervalidasi",
    file: "Presensi-Genap-2024.pdf",
  },
  {
    id: "3",
    event: "Tata Usaha",
    title: "Surat Masuk Dinas Pendidikan",
    year: "2023",
    note: "Perlu pelabelan ulang lokasi fisik.",
    category: "Administrasi",
    subcategory: "Surat Masuk",
    status: "Perlu Tinjau",
    file: "Surat-Masuk-Dinas.pdf",
  },
  {
    id: "4",
    event: "Humas",
    title: "Laporan Rapat Komite Sekolah",
    year: "2024",
    note: "Sudah sinkron antara file dan dokumen fisik.",
    category: "Kehumasan",
    subcategory: "Laporan",
    status: "Aktif",
    file: "Rapat-Komite-2024.pdf",
  },
];

const pagination = ["1", "2", "3", "4"];

const statusStyles = {
  Aktif: "border-primary/15 bg-primary/6 text-primary",
  Tervalidasi: "border-emerald-200 bg-emerald-50 text-emerald-700",
  "Perlu Tinjau": "border-amber-200 bg-amber-50 text-amber-700",
};

export default function Archive() {
  return (
    <section className="space-y-6">
      <Header title="Manajemen Arsip">
        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative w-full sm:w-auto">
              <Search
                size={16}
                className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                placeholder="Cari judul atau kategori arsip"
                className="h-10 border-border/80 bg-white pl-9 py-2 text-sm shadow-none"
              />
            </div>
            <Button
              variant="outline"
              className="h-10 w-full border-border/80 px-4 py-2 text-sm shadow-none sm:w-fit"
            >
              <Filter />
              Filter Arsip
            </Button>
          </div>

          <Button className="h-10 w-full px-4 py-2 text-sm shadow-none sm:w-fit">
            <Plus />
            Tambah Arsip
          </Button>
        </div>
      </Header>

      <div className="overflow-hidden rounded-sm border border-border/80">
        <Table className="text-sm text-muted-foreground">
          <TableHeader className="bg-muted/35">
            <TableRow className="hover:bg-muted/35">
              <TableHead>No</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Tahun</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Subkategori</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>File</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="bg-white">
            {archives.map((archive) => (
              <TableRow key={archive.id} className="hover:bg-muted/20">
                <TableCell className=" font-medium text-foreground">
                  {archive.id}
                </TableCell>
                <TableCell className=" text-foreground">
                  {archive.event}
                </TableCell>
                <TableCell>
                  <p className="font-semibold text-foreground whitespace-normal">
                    {archive.title}
                  </p>
                </TableCell>
                <TableCell className=" text-foreground">
                  {archive.year}
                </TableCell>
                <TableCell className=" text-foreground">
                  {archive.category}
                </TableCell>
                <TableCell className=" text-foreground">
                  {archive.subcategory}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex rounded-sm border px-2.5 py-1 text-xs font-semibold ${
                      statusStyles[archive.status]
                    }`}
                  >
                    {archive.status}
                  </span>
                </TableCell>
                <TableCell>
                  <a
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:text-primary/80 hover:underline"
                  >
                    <FileText size={16} />
                    Lihat File
                  </a>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      className="h-9 w-fit px-3 py-2 text-sm shadow-none"
                      size="sm"
                    >
                      <Edit />
                      Edit
                    </Button>
                    <Button
                      className="h-9 w-fit border-border/80 px-3 py-2 text-sm shadow-none"
                      variant="outline"
                      size="sm"
                    >
                      <Trash2 />
                      Hapus
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex flex-col gap-3 border-t border-border/70 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-muted-foreground">
          Menampilkan <span className="font-semibold text-foreground">1-4</span>{" "}
          dari <span className="font-semibold text-foreground">124</span> arsip.
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            className="h-9 w-fit border-border/80 px-3 py-2 text-sm shadow-none"
          >
            <ChevronLeft size={16} />
            Sebelumnya
          </Button>

          {pagination.map((page) => {
            const isActive = page === "1";

            return (
              <Button
                key={page}
                variant={isActive ? "default" : "outline"}
                className={`h-9 w-9 px-0 py-0 text-sm shadow-none ${
                  !isActive ? "border-border/80" : ""
                }`}
              >
                {page}
              </Button>
            );
          })}

          <Button
            variant="outline"
            className="h-9 w-fit border-border/80 px-3 py-2 text-sm shadow-none"
          >
            Berikutnya
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
}
