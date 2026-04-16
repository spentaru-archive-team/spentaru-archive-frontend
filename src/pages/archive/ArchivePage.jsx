import React, { useState } from "react";
import ArchiveHeader from "./ArchiveHeader";
import Pagination from "@/components/Pagination";
import ArchiveTable from "./ArchiveTable";
import { getArchives } from "@/services/archive.service";
import { useQuery } from "@tanstack/react-query";
import ArchiveTableSkeleton from "./ArchiveTableSkeleton";
import ArchiveModalDetail from "./ArchiveModalDetail";
import ArchiveModalForm from "./ArchiveModalForm";

const statusStyles = {
  pending_upload: "border-primary/15 bg-primary/6 text-primary",
  uploaded: "border-emerald-200 bg-emerald-50 text-emerald-700",
  "Perlu Tinjau": "border-amber-200 bg-amber-50 text-amber-700",
};

export default function ArchivePage() {
  const [selectedArchive, setSelectedArchive] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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
    if (window.confirm(`Apakah Anda yakin ingin menghapus arsip "${archive.title}"?`)) {
      console.log("Deleting archive:", archive.id);
      // Logic for delete API call would go here
    }
  };

  const fetchArchives = async () => {
    try {
      const res = await getArchives(currentPage);
      return res.data.data; // Sesuaikan dengan struktur respons API Anda
    } catch (error) {
      console.error("Error fetching archives:", error);
      throw error;
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["archives", currentPage],
    queryFn: fetchArchives,
  });

  return (
    <section className="space-y-6">
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
      />
    </section>
  );
}
