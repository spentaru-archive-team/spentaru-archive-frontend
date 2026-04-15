import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Filter, Plus, Search } from "lucide-react";
import React from "react";

export default function ArchiveHeader() {
  return (
    <Header title="Manajemen Arsip">
      <div className="flex flex-col md:flex-row justify-between w-full">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative w-full sm:w-auto">
            <Search
              size={16}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Cari judul atau kategori arsip"
              className="h-10 border-border/80 bg-white pl-9 py-2 text-sm shadow-none"
            />
          </div>
          <NativeSelect className="w-full sm:w-auto" name="filter" id="filter">
            <NativeSelectOption value="">Filter Arsip</NativeSelectOption>
            <NativeSelectOption value="Akademik">Akademik</NativeSelectOption>
            <NativeSelectOption value="Kesiswaan">Kesiswaan</NativeSelectOption>
            <NativeSelectOption value="Administrasi">
              Administrasi
            </NativeSelectOption>
            <NativeSelectOption value="Kehumasan">Kehumasan</NativeSelectOption>
          </NativeSelect>
        </div>

        <Button className="h-10 w-full px-4 py-2 text-sm shadow-none sm:w-fit">
          <Plus />
          Tambah Arsip
        </Button>
      </div>
    </Header>
  );
}
