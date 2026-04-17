import Pagination from "@/components/Pagination";
import React, { useState } from "react";
import EventHeader from "./EventHeader";
import EventTable from "./EventTable";
import { getEvents } from "@/services/event.service";
import { useQuery } from "@tanstack/react-query";

const events = [
  {
    id: "1",
    title: "Rapat Komite Semester Genap",
    user: "Ahmad Fauzi, S.Pd.",
    description: "Aula Sekolah",
    date: "22 Apr 2026",
    status: "ongoing",
    status_upload: "pending_upload",
  },
  {
    id: "2",
    title: "Simulasi Asesmen Sekolah",
    user: "Dita Permata Putra, S.Pd.",
    description: "Lab Komputer",
    date: "30 Apr 2026",
    status: "ongoing",
    status_upload: "uploaded",
  },
  {
    id: "3",
    title: "Wisuda Kelulusan",
    user: "Muhammad Rizky, S.Pd.",
    description: "Gedung Serbaguna",
    date: "12 Mei 2026",
    status: "ongoing",
    status_upload: "pending_upload",
  },
  {
    id: "4",
    title: "Workshop Digitalisasi Arsip",
    user: "Siti Aisyah, S.Kom.",
    description: "Ruang Multimedia",
    date: "14 Apr 2026",
    status: "completed",
    status_upload: "uploaded",
  },
];

const statusStyles = {
  ongoing: "border-emerald-200 bg-emerald-50 text-emerald-700",
  completed: "border-slate-200 bg-slate-100 text-slate-700",
  pending_upload: "border-yellow-200 bg-yellow-50 text-yellow-700",
  uploaded: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

export default function EventPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const fetchEvents = async () => {
    try {
      const res = await getEvents(currentPage);
      return res.data.data; // Sesuaikan dengan struktur respons API Anda
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["events", currentPage],
    queryFn: fetchEvents,
  });

  return (
    <section className="space-y-6">
      <EventHeader />
      <EventTable events={data} statusStyles={statusStyles} />
      <Pagination
        currentPage={currentPage}
        totalPages={data?.last_page}
        totalData={data?.total}
        dataPerPage={data?.per_page}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </section>
  );
}
