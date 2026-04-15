import React, { useState } from "react";
import LocationHeader from "./LocationHeader";
import Pagination from "@/components/Pagination";
import LocationTable from "./LocationTable";

const locations = [
  {
    id: "1",
    archive: "Surat Keputusan Kelulusan 2024",
    cabinet: "Lemari 1 - Standar Isi",
    rack: "Rak 1",
    slot_number: "01",
    label_code: "L1-R1-S01",
  },
  {
    id: "2",
    archive: "Data Presensi Siswa Semester Genap",
    cabinet: "Lemari 2 - Standar Kurikulum",
    rack: "Rak 2",
    slot_number: "25",
    label_code: "L1-R2-S25",
  },
  {
    id: "3",
    archive: "Surat Masuk Dinas Pendidikan",
    cabinet: "Lemari 1 - Standar Isi",
    rack: "Rak 1",
    slot_number: "02",
    label_code: "L1-R1-S02",
  },
  {
    id: "4",
    archive: "Laporan Rapat Komite Sekolah",
    cabinet: "Lemari 1 - Standar Isi",
    rack: "Rak 1",
    slot_number: "06",
    label_code: "L1-R1-S06",
  },
];

export default function LocationPage() {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <section className="space-y-6">
      <LocationHeader />
      <LocationTable locations={locations} />
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
