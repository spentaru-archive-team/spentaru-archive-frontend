import Pagination from "@/components/Pagination";
import React, { useState } from "react";
import UserHeader from "./UserHeader";
import UserTable from "./UserTable";

const users = [
  {
    id: "1",
    name: "Fathur Rahman",
    email: "operator@spentaru.sch.id",
    role: "admin",
    role_label: "Admin",
    last_login: "15 Apr 2026, 07:45",
  },
  {
    id: "2",
    name: "Dewi Lestari",
    email: "admin@spentaru.sch.id",
    role: "admin",
    role_label: "Admin",
    last_login: "15 Apr 2026, 06:20",
  },
  {
    id: "3",
    name: "Ahmad Fauzi",
    email: "kurikulum@spentaru.sch.id",
    role: "guru",
    role_label: "Guru",
    last_login: "14 Apr 2026, 14:10",
  },
  {
    id: "4",
    name: "Siti Nur Aeni",
    email: "kesiswaan@spentaru.sch.id",
    role: "admin",
    role_label: "Admin",
    last_login: "14 Apr 2026, 09:32",
  },
];

const roleStyles = {
  admin: "border-primary/15 bg-primary/6 text-primary",
  operator: "border-sky-200 bg-sky-50 text-sky-700",
  guru: "border-violet-200 bg-violet-50 text-violet-700",
};

export default function UserPage() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <section className="space-y-6">
      <UserHeader />
      <UserTable
        users={users}
        roleStyles={roleStyles}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={8}
        totalData={50}
        dataPerPage={4}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </section>
  );
}
