import Pagination from "@/components/Pagination";
import React, { useState } from "react";
import UserHeader from "./UserHeader";
import UserTable from "./UserTable";
import { deleteUsers, getUsers, updateUsers } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import UserTableSkeleton from "./UserTableSkeleton";
import UserModalForm from "./UserModalForm";
import Confirm from "@/components/Confirm";

const roleStyles = {
  admin: "border-primary/15 bg-primary/6 text-primary",
  operator: "border-sky-200 bg-sky-50 text-sky-700",
  guru: "border-violet-200 bg-violet-50 text-violet-700",
};

export default function UserPage() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [confirmResetPassword, setConfirmResetPassword] = useState(false);
  const [selectedResetUser, setSelectedResetUser] = useState(null);
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedDeleteUser, setSelectedDeleteUser] = useState(null);
  const [isDeletingUser, setIsDeletingUser] = useState(false);

  const handleAddClick = () => {
    setSelectedUser(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (user) => {
    setSelectedDeleteUser(user);
    setConfirmDelete(true);
  };

  const handleCloseDeleteConfirm = () => {
    if (isDeletingUser) return;
    setConfirmDelete(false);
    setSelectedDeleteUser(null);
  }

  const handleDeleteConfirm = async () => {
    if (!selectedDeleteUser) return;

    setIsDeletingUser(true);
    try {
      await deleteUsers(selectedDeleteUser.id);
      await refetch();
      setConfirmDelete(false);
      setSelectedDeleteUser(null);
    } catch (error) {
      console.error("Error deleting user:", error.response);
    } finally {
      setIsDeletingUser(false);
    }
  }

  const fetchUsers = async () => {
    try {
      const res = await getUsers(currentPage);
      return res.data.data; // Sesuaikan dengan struktur respons API Anda
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["users", currentPage],
    queryFn: fetchUsers,
  });

  const handleRequestResetPassword = (user) => {
    setSelectedResetUser(user);
    setConfirmResetPassword(true);
  };

  const handleCloseResetPasswordConfirm = () => {
    if (isResettingPassword) return;
    setConfirmResetPassword(false);
    setSelectedResetUser(null);
  };

  const handleConfirmResetPassword = async () => {
    if (!selectedResetUser) return;

    setIsResettingPassword(true);
    try {
      await updateUsers(selectedResetUser.id, {
        name: selectedResetUser.name,
        username: selectedResetUser.username,
        role: selectedResetUser.role,
        password: "Password123",
      });
      await refetch();
      setConfirmResetPassword(false);
      setSelectedResetUser(null);
    } catch (error) {
      console.error("Error resetting user password:", error.response);
    } finally {
      setIsResettingPassword(false);
    }
  };

  return (
    <section className="space-y-6">
      <Confirm
        open={confirmResetPassword}
        title="Konfirmasi Reset Password"
        description={`Apakah Anda yakin ingin mereset password user "${selectedResetUser?.name || "ini"}"? Password akan direset ke nilai default.`}
        confirmLabel="Ya, Reset"
        cancelLabel="Batalkan"
        loading={isResettingPassword}
        onConfirm={handleConfirmResetPassword}
        onClose={handleCloseResetPasswordConfirm}
      />

      <Confirm
        open={confirmDelete}
        title="Konfirmasi Hapus User"
        description={`Apakah Anda yakin ingin menghapus user "${selectedDeleteUser?.name || "ini"}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel="Ya, Hapus"
        cancelLabel="Batalkan"
        loading={isDeletingUser}
        onConfirm={handleDeleteConfirm}
        onClose={handleCloseDeleteConfirm}
      />

      <UserHeader onAddClick={handleAddClick} />
      {isLoading ? (
        <UserTableSkeleton />
      ) : error ? (
        <div className="text-center text-red-500">Error: {error.message}</div>
      ) : (
        <UserTable
          users={data}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
          roleStyles={roleStyles}
          onResetPasswordClick={handleRequestResetPassword}
        />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={data?.last_page}
        totalData={data?.total}
        dataPerPage={data?.per_page}
        onPageChange={(page) => setCurrentPage(page)}
      />

      <UserModalForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        user={selectedUser}
        fetchUsers={refetch}
      />
    </section>
  );
}
