import React, { useState } from "react";
import CategoryHeader from "./CategoryHeader";
import Pagination from "@/components/Pagination";
import CategoryTable from "./CategoryTable";

const categories = [
  {
    id: "1",
    name: "Data Siswa",
    description: "-",
  },
  {
    id: "2",
    name: "Data Guru dan Staf",
    description: "Data Presensi Guru dan Staf",
  },
  {
    id: "3",
    name: "Akademik/Kurikulum",
    description: "Berisi data terkait kurikulum, jadwal pelajaran, dan nilai siswa",
  },
  {
    id: "4",
    name: "Administrasi Sekolah dan Bendahara",
    description: "Laporan Rapat Komite Sekolah",
  },
];

export default function CategoryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <section className="space-y-6">
      <CategoryHeader />
      <CategoryTable categories={categories} />
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
