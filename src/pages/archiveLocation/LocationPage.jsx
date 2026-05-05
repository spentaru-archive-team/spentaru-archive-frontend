import React, { useEffect, useState } from "react";
import LocationHeader from "./LocationHeader";
import Pagination from "@/components/Pagination";
import LocationTable from "./LocationTable";
import LocationTableSkeleton from "./LocationTableSkeleton";
import Confirm from "@/components/Confirm";
import LocationModalForm from "./LocationModalForm";
import { useLocation, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import PopUp from "@/components/PopUp";
import {
  deleteArchiveLocations,
  getArchiveLocations,
} from "@/services/archiveLocation.service";

export default function LocationPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [initialArchiveId, setInitialArchiveId] = useState("");

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedDeleteLocation, setSelectedDeleteLocation] = useState(null);
  const [isDeletingLocation, setIsDeletingLocation] = useState(false);
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

  const handleAddClick = () => {
    setSelectedLocation(null);
    setInitialArchiveId("");
    setIsFormOpen(true);
  };

  const handleEditClick = (item) => {
    setSelectedLocation(item);
    setInitialArchiveId("");
    setIsFormOpen(true);
  };

  useEffect(() => {
    if (!location.state?.openCreate) return;

    setSelectedLocation(null);
    setInitialArchiveId(
      location.state?.archiveId ? String(location.state.archiveId) : "",
    );
    setIsFormOpen(true);
    navigate(location.pathname, { replace: true, state: {} });
  }, [
    location.state?.openCreate,
    location.state?.archiveId,
    navigate,
    location.pathname,
  ]);

  const handleDeleteClick = (item) => {
    setSelectedDeleteLocation(item);
    setConfirmDelete(true);
  };

  const handleCloseDeleteConfirm = () => {
    if (isDeletingLocation) return;
    setConfirmDelete(false);
    setSelectedDeleteLocation(null);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedDeleteLocation) return;

    setIsDeletingLocation(true);
    try {
      const res = await deleteArchiveLocations(selectedDeleteLocation.id);
      if (res.data.status === "success") {
        navigate(location.pathname, {
          state: {
            popup: {
              title: "Lokasi arsip berhasil dihapus.",
              type: "success",
              duration: 3000,
            },
          },
        });
      }
      await refetch();
      setConfirmDelete(false);
      setSelectedDeleteLocation(null);
    } catch (error) {
      console.error("Error deleting archive location:", error.response);
      setDeleteErrorTitle(
        `Gagal menghapus lokasi arsip "${selectedDeleteLocation?.label_code || "ini"}". ${error.response?.data?.message || "Terjadi kesalahan."}`,
      );
      setDeleteErrorOpen(true);
    } finally {
      setIsDeletingLocation(false);
    }
  };

  const fetchLocations = async () => {
    try {
      const res = await getArchiveLocations({
        page: currentPage,
        query: debouncedKeyword || null,
      });
      return res.data.data;
    } catch (error) {
      if (error.response?.status === 404) {
        return { data: [], last_page: 1, total: 0, per_page: 10 };
      }
      console.error("Error fetching archive locations:", error);
      throw error;
    }
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["archive-locations", currentPage, debouncedKeyword],
    queryFn: fetchLocations,
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
        title="Konfirmasi Hapus Lokasi Arsip"
        description={`Apakah Anda yakin ingin menghapus lokasi arsip "${selectedDeleteLocation?.label_code || "ini"}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel="Ya, Hapus"
        cancelLabel="Batalkan"
        loading={isDeletingLocation}
        onConfirm={handleDeleteConfirm}
        onClose={handleCloseDeleteConfirm}
      />

      <LocationHeader
        onAddClick={handleAddClick}
        keyword={keyword}
        setKeyword={handleKeywordChange}
      />

      {isLoading ? (
        <LocationTableSkeleton rows={8} />
      ) : error ? (
        <div className="rounded-sm border border-red-200 bg-red-50 p-4 text-red-700">
          Terjadi kesalahan saat memuat data lokasi arsip.
        </div>
      ) : (
        <LocationTable
          locations={data}
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

      <LocationModalForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setInitialArchiveId("");
        }}
        locationData={selectedLocation}
        fetchLocations={refetch}
        initialArchiveId={initialArchiveId}
      />
    </section>
  );
}
