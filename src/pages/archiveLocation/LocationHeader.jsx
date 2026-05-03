import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import React from "react";

export default function LocationHeader({ onAddClick, keyword, setKeyword }) {
  return (
    <Header title="Manajemen Lokasi Arsip" desc='Kelola lokasi arsip untuk penempatan arsip sekolah di ruang data.'>
      <div className="flex flex-col gap-2 md:flex-row justify-between w-full">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative w-full sm:w-auto">
            <Search
              size={16}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Cari judul lokasi arsip"
              className="h-10 border-border/80 bg-white pl-9 py-2 text-sm shadow-none"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
        </div>

        <Button
          className="h-10 w-full px-4 py-2 text-sm shadow-none sm:w-fit"
          type="button"
          onClick={onAddClick}
        >
          <Plus />
          Tambah Lokasi Arsip
        </Button>
      </div>
    </Header>
  );
}
