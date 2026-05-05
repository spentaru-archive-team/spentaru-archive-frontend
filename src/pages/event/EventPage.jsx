import Pagination from "@/components/Pagination";
import React, { useEffect, useState } from "react";
import EventHeader from "./EventHeader";
import EventTable from "./EventTable";
import { deleteEvents, getEvents } from "@/services/event.service";
import { useQuery } from "@tanstack/react-query";
import EventTableSkeleton from "./EventTableSkeleton";
import EventModalForm from "./EventModalForm";
import Confirm from "@/components/Confirm";
import { useLocation, useNavigate } from "react-router";
import EventModalDetail from "./EventModalDetail";
import PopUp from "@/components/PopUp";

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

  // search and filter
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sort, setSort] = useState("date:desc");

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDetailEvent, setSelectedDetailEvent] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedDeleteEvent, setSelectedDeleteEvent] = useState(null);
  const [isDeletingEvent, setIsDeletingEvent] = useState(false);
  const [deleteErrorOpen, setDeleteErrorOpen] = useState(false);
  const [deleteErrorTitle, setDeleteErrorTitle] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [keyword]);

  const handleKeywordChange = (value) => {
    setCurrentPage(1);
    setKeyword(value);
  };

  const handleStatusFilterChange = (value) => {
    setCurrentPage(1);
    setStatusFilter(value);
  };

  const handleSortFilterChange = (value) => {
    setCurrentPage(1);
    setSort(value);
  };

  const handleAddClick = () => {
    setSelectedEvent(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (event) => {
    setSelectedEvent(event);
    setIsFormOpen(true);
  };

  const handleDetailClick = (event) => {
    setSelectedDetailEvent(event);
    setIsDetailOpen(true);
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
      setDeleteErrorTitle(
        `Gagal menghapus event "${selectedDeleteEvent?.title || "ini"}". ${error.response?.data?.message || "Terjadi kesalahan."}`,
      );
      setDeleteErrorOpen(true);
    } finally {
      setIsDeletingEvent(false);
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await getEvents({
        page: currentPage,
        query: debouncedKeyword || null,
        status: statusFilter || null,
        sort: sort || null,
      });
      return res.data.data;
    } catch (error) {
      if (error.response?.status === 404) {
        return { data: [], last_page: 1, total: 0, per_page: 10 };
      }
      console.error("Error fetching events:", error);
      throw error;
    }
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["events", currentPage, debouncedKeyword, statusFilter, sort],
    queryFn: fetchEvents,
  });

  const getNumRows = (index) => {
    const numRow = (currentPage - 1) * (data?.per_page || 10) + index + 1;
    return numRow;
  };

  return (
    <section className="space-y-6">
      <PopUp
        open={deleteErrorOpen}
        title={deleteErrorTitle}
        type="error"
        duration={4000}
        onClose={() => setDeleteErrorOpen(false)}
      />

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

      <EventHeader
        onAddClick={handleAddClick}
        keyword={keyword}
        setKeyword={handleKeywordChange}
        statusFilter={statusFilter}
        setStatusFilter={handleStatusFilterChange}
        sort={sort}
        setSort={handleSortFilterChange}
      />

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
          onDetailClick={handleDetailClick}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
          getNumRows={getNumRows}
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

      <EventModalDetail
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedDetailEvent(null);
        }}
        event={selectedDetailEvent}
      />
    </section>
  );
}
