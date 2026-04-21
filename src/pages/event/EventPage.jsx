import Pagination from "@/components/Pagination";
import React, { useState } from "react";
import EventHeader from "./EventHeader";
import EventTable from "./EventTable";
import { deleteEvents, getEvents } from "@/services/event.service";
import { useQuery } from "@tanstack/react-query";
import EventTableSkeleton from "./EventTableSkeleton";
import EventModalForm from "./EventModalForm";
import Confirm from "@/components/Confirm";
import { useLocation, useNavigate } from "react-router";

const statusStyles = {
  ongoing: "border-emerald-200 bg-emerald-50 text-emerald-700",
  done: "border-slate-200 bg-slate-100 text-slate-700",
  completed: "border-slate-200 bg-slate-100 text-slate-700",
  pending_upload: "border-yellow-200 bg-yellow-50 text-yellow-700",
  uploaded: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

export default function EventPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedDeleteEvent, setSelectedDeleteEvent] = useState(null);
  const [isDeletingEvent, setIsDeletingEvent] = useState(false);

  const handleAddClick = () => {
    setSelectedEvent(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (event) => {
    setSelectedEvent(event);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (event) => {
    setSelectedDeleteEvent(event);
    setConfirmDelete(true);
  };

  const handleCloseDeleteConfirm = () => {
    if (isDeletingEvent) return;
    setConfirmDelete(false);
    setSelectedDeleteEvent(null);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedDeleteEvent) return;

    setIsDeletingEvent(true);
    try {
      const res = await deleteEvents(selectedDeleteEvent.id);
      if (res.data.status === "success") {
        navigate(location.pathname, {
          state: {
            popup: {
              title: "Event berhasil dihapus.",
              type: "success",
              duration: 3000,
            },
          },
        });
      }
      await refetch();
      setConfirmDelete(false);
      setSelectedDeleteEvent(null);
    } catch (error) {
      console.error("Error deleting event:", error.response);
    } finally {
      setIsDeletingEvent(false);
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await getEvents({ page: currentPage });
      return res.data.data; // Sesuaikan dengan struktur respons API Anda
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["events", currentPage],
    queryFn: fetchEvents,
  });

  return (
    <section className="space-y-6">
      <Confirm
        open={confirmDelete}
        title="Konfirmasi Hapus Event"
        description={`Apakah Anda yakin ingin menghapus event "${selectedDeleteEvent?.title || "ini"}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel="Ya, Hapus"
        cancelLabel="Batalkan"
        loading={isDeletingEvent}
        onConfirm={handleDeleteConfirm}
        onClose={handleCloseDeleteConfirm}
      />

      <EventHeader onAddClick={handleAddClick} />

      {isLoading ? (
        <EventTableSkeleton />
      ) : error ? (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          Terjadi kesalahan saat memuat data event.
        </div>
      ) : (
        <EventTable
          events={data}
          statusStyles={statusStyles}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={data?.last_page}
        totalData={data?.total}
        dataPerPage={data?.per_page}
        onPageChange={(page) => setCurrentPage(page)}
      />

      <EventModalForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        event={selectedEvent}
        fetchEvents={refetch}
      />
    </section>
  );
}
