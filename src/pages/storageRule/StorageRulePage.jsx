import Pagination from "@/components/Pagination";
import React, { useEffect, useState } from "react";
import StorageRuleHeader from "./StorageRuleHeader";
import StorageRuleTable from "./StorageRuleTable";
import { useLocation, useNavigate } from "react-router";
import { deleteArchiveStorageRules, getArchiveStorageRules } from "@/services/storageRule.service";
import { useQuery } from "@tanstack/react-query";

const storageRules = [
  {
    id: "1",
    category: "Akademik",
    subcategory: "Ujian",
    cabinet: "Lemari 1",
    priority: 1,
  },
  {
    id: "2",
    category: "Non-Akademik",
    subcategory: "Keuangan",
    cabinet: "Lemari 2",
    priority: 2,
  },
  {
    id: "3",
    category: "Kesiswaan",
    subcategory: "OSIS",
    cabinet: "Lemari 3",
    priority: 1,
  },
  {
    id: "4",
    category: "Sarana dan Prasarana",
    subcategory: "Inventaris",
    cabinet: "Lemari 4",
    priority: 1,
  },
];

export default function StorageRulePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedStorageRule, setSelectedStorageRule] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // search and filter
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const [confirmResetPassword, setConfirmResetPassword] = useState(false);
  const [selectedResetStorageRule, setSelectedResetStorageRule] = useState(null);
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedDeleteStorageRule, setSelectedDeleteStorageRule] = useState(null);
  const [isDeletingArchiveStorageRule, setIsDeletingArchiveStorageRule] = useState(false);

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

  const handleRoleFilterChange = (value) => {
    setCurrentPage(1);
    setRoleFilter(value);
  };

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
              title: "Storage Rule berhasil dihapus.",
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
        query: debouncedKeyword || null,
        role: roleFilter || null,
      });
      return res.data.data;
    } catch (error) {
      if (error.response.status === 404) {
        return { data: [], last_page: 1, total: 0, per_page: 10 };
      }
      console.error("Error fetching archiveStorageRules:", error);
      throw error;
    }
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["archiveStorageRules", currentPage, debouncedKeyword, roleFilter],
    queryFn: fetchArchiveStorageRules,
  });

  return (
    <section className="space-y-6">
      <StorageRuleHeader />
      <StorageRuleTable storageRules={data} />
      <Pagination
        currentPage={currentPage}
        totalPages={data?.last_page || 1}
        totalData={data?.total || 0}
        dataPerPage={data?.per_page || 10}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </section>
  );
}
