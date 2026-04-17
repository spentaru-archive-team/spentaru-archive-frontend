import React, { useState } from "react";
import CategoryHeader from "./CategoryHeader";
import Pagination from "@/components/Pagination";
import CategoryTable from "./CategoryTable";
import { getCategories } from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";
import CategoryTableSkeleton from "./CategoryTableSkeleton";

export default function CategoryPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const fetchCategories = async () => {
    try {
      const res = await getCategories(currentPage);
      return res.data.data; // Sesuaikan dengan struktur respons API Anda
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["categories", currentPage],
    queryFn: fetchCategories,
  });

  return (
    <section className="space-y-6">
      <CategoryHeader />

      {isLoading ? (
        <CategoryTableSkeleton />
      ) : error ? (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          Terjadi kesalahan saat memuat data kategori.
        </div>
      ) : (
        <CategoryTable categories={data} />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={data?.last_page}
        totalData={data?.total}
        dataPerPage={data?.per_page}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </section>
  );
}
