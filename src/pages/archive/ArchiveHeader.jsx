import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Plus, Search } from "lucide-react";
import React from "react";

export default function ArchiveHeader({
  onAddClick,
  keyword,
  setKeyword,
  sortFilter,
  setSortFilter,
}) {
  return (
    <Header title="Manajemen Arsip">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative w-full sm:w-auto">
            <Search
              size={16}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Cari judul atau kategori arsip"
              className="h-10 border-border/80 bg-white pl-9 py-2 text-sm shadow-none"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          <NativeSelect
            className="w-full sm:w-auto"
            name="category"
            id="category"
            disabled
            defaultValue=""
          >
            <NativeSelectOption value="">Semua Kategori</NativeSelectOption>
            <NativeSelectOption value="" disabled>
              Filter kategori (coming soon)
            </NativeSelectOption>
          </NativeSelect>

          <NativeSelect
            className="w-full sm:w-auto"
            name="sort"
            id="sort"
            value={sortFilter}
            onChange={(e) => setSortFilter(e.target.value)}
          >
            <NativeSelectOption value="created_at:desc">
              Terbaru-Terlama
            </NativeSelectOption>
            <NativeSelectOption value="created_at:asc">
              Terlama-Terbaru
            </NativeSelectOption>
            <NativeSelectOption value="title:asc">A-Z</NativeSelectOption>
            <NativeSelectOption value="title:desc">Z-A</NativeSelectOption>
          </NativeSelect>
        </div>

        <Button
          onClick={onAddClick}
          className="h-10 w-full px-4 py-2 text-sm shadow-none sm:w-fit"
        >
          <Plus />
          Tambah Arsip
        </Button>
      </div>
    </Header>
  );
}
