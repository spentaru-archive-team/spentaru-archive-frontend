import Pagination from "@/components/Pagination";
import React, { useState } from "react";
import StorageRuleHeader from "./StorageRuleHeader";
import StorageRuleTable from "./StorageRuleTable";

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
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <section className="space-y-6">
      <StorageRuleHeader />
      <StorageRuleTable storageRules={storageRules} />
      {/* <Pagination
        currentPage={currentPage}
        totalPages={8}
        totalData={50}
        dataPerPage={4}
        onPageChange={(page) => setCurrentPage(page)}
      /> */}
    </section>
  );
}
