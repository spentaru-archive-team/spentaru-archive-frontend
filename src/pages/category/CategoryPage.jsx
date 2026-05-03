import React, { useState } from "react";
import CategoryHeader from "./CategoryHeader";
import Pagination from "@/components/Pagination";
import CategoryTable from "./CategoryTable";
import { deleteCategories, getCategories } from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";
import CategoryTableSkeleton from "./CategoryTableSkeleton";
import CategoryModalForm from "./CategoryModalForm";
import Confirm from "@/components/Confirm";
import { useLocation, useNavigate } from "react-router";
import PopUp from "@/components/PopUp";

export default function CategoryPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedDeleteCategory, setSelectedDeleteCategory] = useState(null);
  const [isDeletingCategory, setIsDeletingCategory] = useState(false);
  const [deleteErrorOpen, setDeleteErrorOpen] = useState(false);
  const [deleteErrorTitle, setDeleteErrorTitle] = useState("");

  const handleAddClick = () => {
    setSelectedCategory(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (category) => {
    setSelectedDeleteCategory(category);
    setConfirmDelete(true);
  };

  const handleCloseDeleteConfirm = () => {
    if (isDeletingCategory) return;
    setConfirmDelete(false);
    setSelectedDeleteCategory(null);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedDeleteCategory) return;

    setIsDeletingCategory(true);
    try {
      const res = await deleteCategories(selectedDeleteCategory.id);
      if (res.data.status === "success") {
        navigate(location.pathname, {
          state: {
            popup: {
              title: "Kategori berhasil dihapus.",
              type: "success",
              duration: 3000,
            },
          },
        });
      }
      await refetch();
      setConfirmDelete(false);
      setSelectedDeleteCategory(null);
    } catch (error) {
      console.error("Error deleting category:", error.response);
      setDeleteErrorTitle(
        `Gagal menghapus kategori "${selectedDeleteCategory?.name || "ini"}". ${error.response?.data?.message || "Terjadi kesalahan."}`,
      );
      setDeleteErrorOpen(true);
    } finally {
      setIsDeletingCategory(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await getCategories({ page: currentPage });
      return res.data.data; // Sesuaikan dengan struktur respons API Anda
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["categories", currentPage],
    queryFn: fetchCategories,
  });

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
        title="Konfirmasi Hapus Kategori"
        description={`Apakah Anda yakin ingin menghapus kategori "${selectedDeleteCategory?.name || "ini"}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel="Ya, Hapus"
        cancelLabel="Batalkan"
        loading={isDeletingCategory}
        onConfirm={handleDeleteConfirm}
        onClose={handleCloseDeleteConfirm}
      />

      <CategoryHeader onAddClick={handleAddClick} />

      {isLoading ? (
        <CategoryTableSkeleton />
      ) : error ? (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          Terjadi kesalahan saat memuat data kategori.
        </div>
      ) : (
        <CategoryTable
          categories={data}
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

      <CategoryModalForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        category={selectedCategory}
        fetchCategories={refetch}
      />
    </section>
  );
}
