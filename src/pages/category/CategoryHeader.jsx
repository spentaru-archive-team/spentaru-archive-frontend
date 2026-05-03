import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import React from "react";

export default function CategoryHeader({ onAddClick }) {
  return (
    <Header title="Manajemen Kategori">
      <div className="flex flex-col gap-2 md:flex-row justify-between w-full">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative w-full sm:w-auto">
            <Search
              size={16}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Cari judul kategori"
              className="h-10 border-border/80 bg-white pl-9 py-2 text-sm shadow-none"
            />
          </div>
        </div>

        <Button
          className="h-10 w-full px-4 py-2 text-sm shadow-none sm:w-fit"
          onClick={onAddClick}
          type="button"
        >
          <Plus />
          Tambah Kategori
        </Button>
      </div>
    </Header>
  );
}
