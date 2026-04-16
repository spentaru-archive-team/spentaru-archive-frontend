import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalFooter,
} from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { PlusCircle, Save, X } from "lucide-react";

export default function ArchiveModalForm({ isOpen, onClose, archive = null }) {
  const isEdit = !!archive;
  const [formData, setFormData] = useState({
    title: "",
    year: new Date().getFullYear().toString(),
    category_id: "",
    subcategory_id: "",
    status: "pending_upload",
  });

  useEffect(() => {
    if (archive) {
      setFormData({
        title: archive.title || "",
        year: archive.year || new Date().getFullYear().toString(),
        category_id: archive.category_id || archive.category?.id || "",
        subcategory_id: archive.subcategory_id || archive.subcategory?.id || "",
        status: archive.status || "pending_upload",
      });
    } else {
      setFormData({
        title: "",
        year: new Date().getFullYear().toString(),
        category_id: "",
        subcategory_id: "",
        status: "pending_upload",
      });
    }
  }, [archive, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", formData);
    // Logic for API call would go here
    onClose();
  };

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent className="max-w-xl">
        <ModalHeader>
          <ModalTitle className="flex items-center gap-2">
            {isEdit ? <Save size={20} /> : <PlusCircle size={20} />}
            {isEdit ? "Edit Arsip" : "Tambah Arsip Baru"}
          </ModalTitle>
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-semibold">
                Judul Arsip
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="Contoh: Laporan Keuangan 2023"
                value={formData.title}
                onChange={handleChange}
                required
                className="h-10 shadow-none py-0"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year" className="text-sm font-semibold">
                  Tahun
                </Label>
                <Input
                  id="year"
                  name="year"
                  type="number"
                  placeholder="2024"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="h-10 shadow-none py-0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status" className="text-sm font-semibold">
                  Status
                </Label>
                <NativeSelect
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full"
                >
                  <NativeSelectOption value="pending_upload">
                    Menunggu Upload
                  </NativeSelectOption>
                  <NativeSelectOption value="uploaded">
                    Telah Upload
                  </NativeSelectOption>
                </NativeSelect>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category_id" className="text-sm font-semibold">
                  Kategori
                </Label>
                <NativeSelect
                  id="category_id"
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  required
                  className="w-full"
                >
                  <NativeSelectOption value="">
                    Pilih Kategori
                  </NativeSelectOption>
                  <NativeSelectOption value="1">Akademik</NativeSelectOption>
                  <NativeSelectOption value="2">Kesiswaan</NativeSelectOption>
                  <NativeSelectOption value="3">
                    Administrasi
                  </NativeSelectOption>
                  <NativeSelectOption value="4">Kehumasan</NativeSelectOption>
                </NativeSelect>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="subcategory_id"
                  className="text-sm font-semibold"
                >
                  Sub Kategori
                </Label>
                <NativeSelect
                  id="subcategory_id"
                  name="subcategory_id"
                  value={formData.subcategory_id}
                  onChange={handleChange}
                  required
                  className="w-full"
                >
                  <NativeSelectOption value="">
                    Pilih Sub Kategori
                  </NativeSelectOption>
                  <NativeSelectOption value="1">Kurikulum</NativeSelectOption>
                  <NativeSelectOption value="2">
                    Kesiswaan Umum
                  </NativeSelectOption>
                  <NativeSelectOption value="3">Keuangan</NativeSelectOption>
                </NativeSelect>
              </div>
            </div>
          </div>

          <ModalFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="w-1/2 rounded-sm border-border/80"
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="w-1/2 rounded-sm bg-primary hover:bg-primary/90"
            >
              {isEdit ? "Simpan Perubahan" : "Simpan Arsip"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
