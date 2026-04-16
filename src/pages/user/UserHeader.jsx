import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Plus, Search, Shield } from "lucide-react";
import React from "react";

export default function UserHeader() {
  return (
    <Header
      title="Manajemen User"
      desc="Kelola akun admin dan guru sekolah."
    >
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative w-full sm:w-88">
            <Search
              size={16}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Cari nama user atau email"
              className="h-10 border-border/80 bg-white pl-9 py-2 text-sm shadow-none"
            />
          </div>

          <NativeSelect defaultValue="" className="w-full sm:w-44" name="role" id="role">
            <NativeSelectOption value="">Semua Role</NativeSelectOption>
            <NativeSelectOption value="admin">Admin</NativeSelectOption>
            <NativeSelectOption value="guru">Guru</NativeSelectOption>
          </NativeSelect>
        </div>

        <Button className="h-10 w-full px-4 py-2 text-sm shadow-none sm:w-fit">
          <Plus />
          Tambah User
        </Button>
      </div>
    </Header>
  );
}
