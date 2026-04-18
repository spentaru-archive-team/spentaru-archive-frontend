import Pagination from "@/components/Pagination";
import React, { useState } from "react";
import UserHeader from "./UserHeader";
import UserTable from "./UserTable";
import { getUsers } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import UserTableSkeleton from "./UserTableSkeleton";
import UserModalForm from "./UserModalForm";

const roleStyles = {
  admin: "border-primary/15 bg-primary/6 text-primary",
  operator: "border-sky-200 bg-sky-50 text-sky-700",
  guru: "border-violet-200 bg-violet-50 text-violet-700",
};

export default function UserPage() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleAddClick = () => {
    setSelectedUser(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

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

  return (
    <section className="space-y-6">
      <UserHeader onAddClick={handleAddClick} />
      {isLoading ? (
        <UserTableSkeleton />
      ) : error ? (
        <div className="text-center text-red-500">Error: {error.message}</div>
      ) : (
        <UserTable users={data} roleStyles={roleStyles} />
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
