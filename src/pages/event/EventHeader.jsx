import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Plus, Search } from "lucide-react";
import React from "react";

export default function EventHeader({
  onAddClick,
  keyword,
  setKeyword,
  statusFilter,
  setStatusFilter,
  sortFilter,
  setSortFilter,
}) {
  return (
    <Header
      title="Manajemen Event"
      desc="Kelola kegiatan sekolah dari perencanaan hingga pengarsipan."
    >
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative w-full sm:w-88">
            <Search
              size={16}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Cari nama event atau deskripsi event"
              className="h-10 border-border/80 bg-white pl-9 py-2 text-sm shadow-none"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          <NativeSelect
            className="w-full sm:w-48"
            name="status"
            id="status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <NativeSelectOption value="">Semua Status</NativeSelectOption>
            <NativeSelectOption value="ongoing">Sedang Berlangsung</NativeSelectOption>
            <NativeSelectOption value="done">Selesai</NativeSelectOption>
          </NativeSelect>

          <NativeSelect
            className="w-full sm:w-52"
            name="sort"
            id="sort"
            value={sortFilter}
            onChange={(e) => setSortFilter(e.target.value)}
          >
            <NativeSelectOption value="title:asc">A-Z</NativeSelectOption>
            <NativeSelectOption value="title:desc">Z-A</NativeSelectOption>
            <NativeSelectOption value="date:desc">Terbaru-Terlama</NativeSelectOption>
            <NativeSelectOption value="date:asc">Terlama-Terbaru</NativeSelectOption>
          </NativeSelect>
        </div>

        <Button
          className="h-10 w-full px-4 py-2 text-sm shadow-none sm:w-fit"
          onClick={onAddClick}
          type="button"
        >
          <Plus />
          Tambah Event
        </Button>
      </div>
    </Header>
  );
}
