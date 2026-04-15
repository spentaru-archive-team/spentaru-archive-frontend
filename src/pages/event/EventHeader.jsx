import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { CalendarRange, Plus, Search } from "lucide-react";
import React from "react";

export default function EventHeader() {
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
              placeholder="Cari nama event atau penanggung jawab"
              className="h-10 border-border/80 bg-white pl-9 py-2 text-sm shadow-none"
            />
          </div>

          <NativeSelect className="w-full sm:w-48" name="status" id="status">
            <NativeSelectOption value="">Semua Status</NativeSelectOption>
            <NativeSelectOption value="upcoming">Akan Datang</NativeSelectOption>
            <NativeSelectOption value="ongoing">Berlangsung</NativeSelectOption>
            <NativeSelectOption value="completed">Selesai</NativeSelectOption>
          </NativeSelect>

          <NativeSelect className="w-full sm:w-52" name="period" id="period">
            <NativeSelectOption value="">Semua Periode</NativeSelectOption>
            <NativeSelectOption value="semester-genap">
              Semester Genap
            </NativeSelectOption>
            <NativeSelectOption value="tahun-ajaran-baru">
              Tahun Ajaran Baru
            </NativeSelectOption>
            <NativeSelectOption value="kelulusan">Kelulusan</NativeSelectOption>
          </NativeSelect>
        </div>

        <Button className="h-10 w-full px-4 py-2 text-sm shadow-none sm:w-fit">
          <Plus />
          Tambah Event
        </Button>
      </div>
    </Header>
  );
}
