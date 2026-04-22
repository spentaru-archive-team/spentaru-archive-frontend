import React, { useState } from "react";
import ArchiveHeader from "./ArchiveHeader";
import Pagination from "@/components/Pagination";
import ArchiveTable from "./ArchiveTable";
import { deleteArchives, getArchives } from "@/services/archive.service";
import { useQuery } from "@tanstack/react-query";
import ArchiveTableSkeleton from "./ArchiveTableSkeleton";
import ArchiveModalDetail from "./ArchiveModalDetail";
import ArchiveModalForm from "./ArchiveModalForm";
import Confirm from "@/components/Confirm";
import { useLocation, useNavigate } from "react-router";

const statusStyles = {
  pending_upload: "border-primary/15 bg-primary/6 text-primary",
  uploaded: "border-emerald-200 bg-emerald-50 text-emerald-700",
  "Perlu Tinjau": "border-amber-200 bg-amber-50 text-amber-700",
};

export default function ArchivePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedArchive, setSelectedArchive] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedDeleteArchive, setSelectedDeleteArchive] = useState(null);
  const [isDeletingArchive, setIsDeletingArchive] = useState(false);

  const handleDetailClick = (archive) => {
    setSelectedArchive(archive);
    setIsDetailOpen(true);
  };

  const handleAddClick = () => {
    setSelectedArchive(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (archive) => {
    setSelectedArchive(archive);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (archive) => {
    setSelectedDeleteArchive(archive);
    setConfirmDelete(true);
  };

  const handleCloseDeleteConfirm = () => {
    if (isDeletingArchive) return;
    setConfirmDelete(false);
    setSelectedDeleteArchive(null);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedDeleteArchive) return;

    setIsDeletingArchive(true);
    try {
      const res = await deleteArchives(selectedDeleteArchive.id);
      if (res.data.status === "success") {
        navigate(location.pathname, {
          state: {
            popup: {
              title: "Arsip berhasil dihapus.",
              type: "success",
              duration: 3000,
            },
          },
        });
      }

      await refetch();
      setConfirmDelete(false);
      setSelectedDeleteArchive(null);
    } catch (deleteError) {
      console.error("Error deleting archive:", deleteError.response);
    } finally {
      setIsDeletingArchive(false);
    }
  };

  const fetchArchives = async () => {
    try {
      const res = await getArchives({ page: currentPage });
      return res.data.data; // Sesuaikan dengan struktur respons API Anda
    } catch (error) {
      console.error("Error fetching archives:", error);
      throw error;
    }
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["archives", currentPage],
    queryFn: fetchArchives,
  });

  return (
    <section className="space-y-6">
      <Confirm
        open={confirmDelete}
        title="Konfirmasi Hapus Arsip"
        description={`Apakah Anda yakin ingin menghapus arsip "${selectedDeleteArchive?.title || "ini"}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel="Ya, Hapus"
        cancelLabel="Batalkan"
        loading={isDeletingArchive}
        onConfirm={handleDeleteConfirm}
        onClose={handleCloseDeleteConfirm}
      />

      <ArchiveHeader onAddClick={handleAddClick} />
      {isLoading ? (
        <ArchiveTableSkeleton />
      ) : error ? (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          Terjadi kesalahan saat memuat data arsip.
        </div>
      ) : (
        <ArchiveTable
          archives={data}
          statusStyles={statusStyles}
          onDetailClick={handleDetailClick}
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

      <ArchiveModalDetail
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        archive={selectedArchive}
      />

      <ArchiveModalForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        archive={selectedArchive}
        fetchArchives={refetch}
      />
    </section>
  );
}
