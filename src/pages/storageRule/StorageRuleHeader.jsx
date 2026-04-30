import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";

export default function StorageRuleHeader({ onAddClick }) {
  return (
    <Header
      title="Daftar Aturan Penyimpanan"
      desc="Tentukan prioritas penyimpanan arsip berdasarkan kategori dan subkategori yang ditetapkan."
    >
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <Button
          className="h-10 w-full px-4 py-2 text-sm shadow-none sm:w-fit"
          onClick={onAddClick}
        >
          <Plus />
          Tambah Aturan Penyimpanan
        </Button>
      </div>
    </Header>
  );
}
