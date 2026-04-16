import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Plus, Search, Shield } from "lucide-react";
import React from "react";

export default function StorageRuleHeader() {
  return (
    <Header
      title="Daftar Aturan Penyimpanan"
      desc="Kelola aturan penyimpanan arsip digital untuk memastikan keamanan dan keteraturan dalam penyimpanan data."
    >
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        {/* <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative w-full sm:w-88">
            <Search
              size={16}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Cari nama aturan penyimpanan atau email"
              className="h-10 border-border/80 bg-white pl-9 py-2 text-sm shadow-none"
            />
          </div>

          <NativeSelect className="w-full sm:w-44" name="active" id="active">
            <NativeSelectOption value="">Semua Status</NativeSelectOption>
            <NativeSelectOption value="active">Aktif</NativeSelectOption>
            <NativeSelectOption value="inactive">Nonaktif</NativeSelectOption>
          </NativeSelect>
        </div> */}

        <Button className="h-10 w-full px-4 py-2 text-sm shadow-none sm:w-fit">
          <Plus />
          Tambah Aturan Penyimpanan
        </Button>
      </div>
    </Header>
  );
}
