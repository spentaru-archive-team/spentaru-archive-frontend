import React, { useEffect, useState } from "react";
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
import PopUp from "@/components/PopUp";

const statusStyles = {
  active: "border-green-300 bg-green-100 text-green-800",
  ready_for_destruction: "border-yellow-300 bg-yellow-100 text-yellow-800",
  destroyed: "border-red-300 bg-red-100 text-red-800",
  retained: "border-blue-300 bg-blue-100 text-blue-800",
};

export default function ArchivePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedArchive, setSelectedArchive] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [initialEventId, setInitialEventId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [sort, setSort] = useState("created_at:desc");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedDeleteArchive, setSelectedDeleteArchive] = useState(null);
  const [isDeletingArchive, setIsDeletingArchive] = useState(false);
  const [deleteErrorOpen, setDeleteErrorOpen] = useState(false);
  const [deleteErrorTitle, setDeleteErrorTitle] = useState("");
  const [retentionPopup, setRetentionPopup] = useState({
    open: false,
    title: "",
    type: "success",
  });

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

  const handleSortFilterChange = (value) => {
    setCurrentPage(1);
    setSort(value);
  };

  const handleCategoryFilterChange = (value) => {
    setCurrentPage(1);
    setCategoryFilter(value);
  };

  const handleDetailClick = (archive) => {
    setSelectedArchive(archive);
    setIsDetailOpen(true);
  };

  const handleAddClick = (prefillEventId = null) => {
    setSelectedArchive(null);
    setInitialEventId(prefillEventId || "");
    setIsFormOpen(true);
  };

  useEffect(() => {
    const state = location.state;
    if (state?.openCreate) {
      handleAddClick(state.eventId || null);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state]);

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
      setDeleteErrorTitle(
        `Gagal menghapus arsip "${selectedDeleteArchive?.title || "ini"}". ${deleteError.response?.data?.message || "Terjadi kesalahan."}`,
      );
      setDeleteErrorOpen(true);
    } finally {
      setIsDeletingArchive(false);
    }
  };

  const fetchArchives = async () => {
    try {
      const res = await getArchives({
        page: currentPage,
        query: debouncedKeyword || null,
        sort: sort || null,
        filters: categoryFilter ? { category_id: categoryFilter } : null,
      });
      return res.data.data;
    } catch (error) {
      if (error.response?.status === 404) {
        return { data: [], last_page: 1, total: 0, per_page: 10 };
      }
      console.error("Error fetching archives:", error);
      throw error;
    }
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["archives", currentPage, debouncedKeyword, sort, categoryFilter],
    queryFn: fetchArchives,
  });

  const getNumRows = (index) => {
    const numRow = (currentPage - 1) * (data?.per_page || 10) + index + 1;
    return numRow;
  };

  const handleRetentionSaved = async ({ title, type }) => {
    await refetch();
    setIsDetailOpen(false);
    setSelectedArchive(null);
    setRetentionPopup({
      open: true,
      title,
      type: type || "success",
    });
  };

  return (
    <section className="space-y-6">
      <PopUp
        open={retentionPopup.open}
        title={retentionPopup.title}
        type={retentionPopup.type}
        duration={3000}
        onClose={() =>
          setRetentionPopup((prev) => ({
            ...prev,
            open: false,
          }))
        }
      />

      <PopUp
        open={deleteErrorOpen}
        title={deleteErrorTitle}
        type="error"
        duration={4000}
        onClose={() => setDeleteErrorOpen(false)}
      />

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

      <ArchiveHeader
        onAddClick={handleAddClick}
        keyword={keyword}
        setKeyword={handleKeywordChange}
        sort={sort}
        setSort={handleSortFilterChange}
        categoryFilter={categoryFilter}
        setCategoryFilter={handleCategoryFilterChange}
      />
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

      <ArchiveModalDetail
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        archive={selectedArchive}
        onRetentionSaved={handleRetentionSaved}
      />

      <ArchiveModalForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setInitialEventId("");
        }}
        archive={selectedArchive}
        fetchArchives={refetch}
        initialEventId={initialEventId}
      />
    </section>
  );
}
