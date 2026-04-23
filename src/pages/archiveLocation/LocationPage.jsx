import React, { useState } from "react";
import LocationHeader from "./LocationHeader";
import Pagination from "@/components/Pagination";
import LocationTable from "./LocationTable";
import Confirm from "@/components/Confirm";
import LocationModalForm from "./LocationModalForm";
import { useLocation, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  deleteArchiveLocations,
  getArchiveLocations,
} from "@/services/archiveLocation.service";

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
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedDeleteLocation, setSelectedDeleteLocation] = useState(null);
  const [isDeletingLocation, setIsDeletingLocation] = useState(false);

  const handleAddClick = () => {
    setSelectedLocation(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (item) => {
    setSelectedLocation(item);
    setIsFormOpen(true);
  };

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
    } finally {
      setIsDeletingLocation(false);
    }
  };

  const fetchLocations = async () => {
    try {
      const res = await getArchiveLocations({ page: currentPage });
      return res.data.data;
    } catch (error) {
      console.error("Error fetching archive locations:", error);
      throw error;
    }
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["archive-locations", currentPage],
    queryFn: fetchLocations,
  });

  return (
    <section className="space-y-6">
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

      <LocationHeader onAddClick={handleAddClick} />

      {isLoading ? (
        <div className="rounded-sm border border-border/80 bg-white p-6 text-sm text-muted-foreground">
          Memuat data lokasi arsip...
        </div>
      ) : error ? (
        <div className="rounded-sm border border-red-200 bg-red-50 p-4 text-red-700">
          Terjadi kesalahan saat memuat data lokasi arsip.
        </div>
      ) : (
        <LocationTable
          locations={data}
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

      <LocationModalForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        locationData={selectedLocation}
        fetchLocations={fetchLocations}
      />
    </section>
  );
}
