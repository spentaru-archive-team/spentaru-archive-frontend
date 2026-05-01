import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Plus } from "lucide-react";
import React from "react";

export default function CabinetHeader({ onAddClick }) {
  const { user } = useAuth();

  return (
    <Header
      title="Daftar Lemari"
      desc="Kelola lemari yang berada di Ruang Data SMP Negeri 1 Waru."
    >
      {user && user.role === "admin" && (
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <Button
            className="h-10 w-full px-4 py-2 text-sm shadow-none sm:w-fit"
            type="button"
            onClick={onAddClick}
          >
            <Plus />
            Tambah Lemari
          </Button>
        </div>
      )}
    </Header>
  );
}
