import React, { useState } from "react";
import PhysicalLocationHeader from "./PhysicalLocationHeader";
import PhysicalLocationCard from "./PhysicalLocationCard";
import {
  deleteCabinets,
  getCabinets,
} from "@/services/physicalLocation.service";
import { useQuery } from "@tanstack/react-query";
import PhysicalLocationSkeleton from "./PhysicalLocationSkeleton";
import Confirm from "@/components/Confirm";
import PhysicalLocationModalForm from "./PhysicalLocationModalForm";
import { useLocation, useNavigate } from "react-router";

export default function PhysicalLocationPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedCabinet, setSelectedCabinet] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedDeleteCabinet, setSelectedDeleteCabinet] = useState(null);
  const [isDeletingCabinet, setIsDeletingCabinet] = useState(false);

  const handleAddClick = () => {
    setSelectedCabinet(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (cabinet) => {
    setSelectedCabinet(cabinet);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (cabinet) => {
    setSelectedDeleteCabinet(cabinet);
    setConfirmDelete(true);
  };

  const handleCloseDeleteConfirm = () => {
    if (isDeletingCabinet) return;
    setConfirmDelete(false);
    setSelectedDeleteCabinet(null);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedDeleteCabinet) return;

    setIsDeletingCabinet(true);
    try {
      const res = await deleteCabinets(selectedDeleteCabinet.id);
      if (res.data.status === "success") {
        navigate(location.pathname, {
          state: {
            popup: {
              title: "Lokasi fisik berhasil dihapus.",
              type: "success",
              duration: 3000,
            },
          },
        });
      }
      await refetch();
      setConfirmDelete(false);
      setSelectedDeleteCabinet(null);
    } catch (error) {
      console.error("Error deleting cabinet:", error.response);
    } finally {
      setIsDeletingCabinet(false);
    }
  };

  const fetchPhysicalLocations = async () => {
    try {
      const res = await getCabinets();
      return res.data.data;
    } catch (error) {
      console.error("Error fetching cabinets:", error);
      throw error;
    }
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["cabinets"],
    queryFn: fetchPhysicalLocations,
  });

  return (
    <section className="space-y-6">
      <Confirm
        open={confirmDelete}
        title="Konfirmasi Hapus Lokasi Fisik"
        description={`Apakah Anda yakin ingin menghapus lemari "${selectedDeleteCabinet?.name || "ini"}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel="Ya, Hapus"
        cancelLabel="Batalkan"
        loading={isDeletingCabinet}
        onConfirm={handleDeleteConfirm}
        onClose={handleCloseDeleteConfirm}
      />

      <PhysicalLocationHeader onAddClick={handleAddClick} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          Array(8).fill(0).map((_, i) => <PhysicalLocationSkeleton key={i} />)
        ) : error ? (
          <div className="text-center text-red-500">Error: {error.message}</div>
        ) : (
          data?.map((cabinet) => (
            <PhysicalLocationCard
              key={cabinet.id}
              cabinet={cabinet}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
            />
          ))
        )}
      </div>

      <PhysicalLocationModalForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        cabinet={selectedCabinet}
        fetchCabinets={refetch}
      />
    </section>
  );
}
