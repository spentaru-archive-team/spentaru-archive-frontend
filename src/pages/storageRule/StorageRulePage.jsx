import Pagination from "@/components/Pagination";
import Confirm from "@/components/Confirm";
import React, { useState } from "react";
import StorageRuleHeader from "./StorageRuleHeader";
import StorageRuleTable from "./StorageRuleTable";
import {
  deleteArchiveStorageRules,
  getArchiveStorageRules,
} from "@/services/storageRule.service";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router";
import StorageRuleTableSkeleton from "./StorageRuleTableSkeleton";
import StorageRuleModalForm from "./StorageRuleModalForm";

export default function StorageRulePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedStorageRule, setSelectedStorageRule] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedDeleteStorageRule, setSelectedDeleteStorageRule] =
    useState(null);
  const [isDeletingArchiveStorageRule, setIsDeletingArchiveStorageRule] =
    useState(false);

  const handleAddClick = () => {
    setSelectedStorageRule(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (archiveStorageRule) => {
    setSelectedStorageRule(archiveStorageRule);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (archiveStorageRule) => {
    setSelectedDeleteStorageRule(archiveStorageRule);
    setConfirmDelete(true);
  };

  const handleCloseDeleteConfirm = () => {
    if (isDeletingArchiveStorageRule) return;
    setConfirmDelete(false);
    setSelectedDeleteStorageRule(null);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedDeleteStorageRule) return;

    setIsDeletingArchiveStorageRule(true);
    try {
      const res = await deleteArchiveStorageRules(selectedDeleteStorageRule.id);
      if (res.data.status === "success") {
        navigate(location.pathname, {
          state: {
            popup: {
              title: "Aturan penyimpanan berhasil dihapus.",
              type: "success",
              duration: 3000,
            },
          },
        });
      }
      await refetch();
      setConfirmDelete(false);
      setSelectedDeleteStorageRule(null);
    } catch (error) {
      console.error("Error deleting storage rule:", error.response);
    } finally {
      setIsDeletingArchiveStorageRule(false);
    }
  };

  const fetchArchiveStorageRules = async () => {
    try {
      const res = await getArchiveStorageRules({
        page: currentPage,
      });
      return res.data.data;
    } catch (error) {
      if (error.response?.status === 404) {
        return { data: [], last_page: 1, total: 0, per_page: 10 };
      }
      console.error("Error fetching archive storage rules:", error);
      throw error;
    }
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["archiveStorageRules", currentPage],
    queryFn: fetchArchiveStorageRules,
  });

  return (
    <section className="space-y-6">
      <Confirm
        open={confirmDelete}
        title="Konfirmasi Hapus Aturan Penyimpanan"
        description={`Apakah Anda yakin ingin menghapus aturan untuk lemari "${selectedDeleteStorageRule?.cabinet?.name || "ini"}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel="Ya, Hapus"
        cancelLabel="Batalkan"
        loading={isDeletingArchiveStorageRule}
        onConfirm={handleDeleteConfirm}
        onClose={handleCloseDeleteConfirm}
      />

      <StorageRuleHeader onAddClick={handleAddClick} />

      {isLoading ? (
        <StorageRuleTableSkeleton />
      ) : error ? (
        <div className="text-center text-destructive">Error: {error.message}</div>
      ) : (
        <StorageRuleTable
          storageRules={data}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={data?.last_page || 1}
        totalData={data?.total || 0}
        dataPerPage={data?.per_page || 10}
        onPageChange={(page) => setCurrentPage(page)}
      />

      <StorageRuleModalForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        storageRule={selectedStorageRule}
        fetchStorageRules={refetch}
      />
    </section>
  );
}
