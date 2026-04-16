import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Plus, Search, Shield } from "lucide-react";
import React from "react";

export default function PhysicalLocationHeader() {
  return (
    <Header
      title="Daftar Lokasi Fisik"
      desc="Kelola lokasi fisik arsip yang berada di Ruang Data SMP Negeri 1 Waru."
    >
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">

        <Button className="h-10 w-full px-4 py-2 text-sm shadow-none sm:w-fit">
          <Plus />
          Tambah Lokasi Fisik
        </Button>
      </div>
    </Header>
  );
}
