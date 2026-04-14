import React, { useState } from "react";
import CategoryHeader from "./CategoryHeader";
import Pagination from "@/components/Pagination";
import CategoryTable from "./CategoryTable";

const categories = [
  {
    id: "1",
    event: "Kelulusan",
    title: "Surat Keputusan Kelulusan 2024",
    year: "2024",
    note: "Dokumen final untuk arsip akademik.",
    category: "Akademik",
    subcategory: "Surat Keputusan",
    status: "pending_upload",
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
    status: "uploaded",
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
    status: "uploaded",
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
    status: "pending_upload",
    file: "Rapat-Komite-2024.pdf",
  },
];

const statusStyles = {
  pending_upload: "border-primary/15 bg-primary/6 text-primary",
  uploaded: "border-emerald-200 bg-emerald-50 text-emerald-700",
  "Perlu Tinjau": "border-amber-200 bg-amber-50 text-amber-700",
};

export default function CategoryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <section className="space-y-6">
      <CategoryHeader />
      <CategoryTable categories={categories} statusStyles={statusStyles} />
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        totalData={124}
        dataPerPage={4}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </section>
  );
}
