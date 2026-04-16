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
import { CloudUpload, PlusCircle, Save, X } from "lucide-react";

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
          <div className="px-6 pb-6 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-semibold">
                Judul Arsip <span className="text-red-500">*</span>
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
                  Tahun <span className="text-red-500">*</span>
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
                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-sm font-semibold">
                    Catatan
                  </Label>
                  <Input
                    id="notes"
                    name="notes"
                    placeholder="Tambahkan catatan (opsional)"
                    value={formData.notes}
                    onChange={handleChange}
                    required={false}
                    className="h-10 shadow-none py-0"
                  ></Input>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="event_id" className="text-sm font-semibold">
                Event (Opsional)
              </Label>
              <NativeSelect
                id="event_id"
                name="event_id"
                value={formData.event_id}
                onChange={handleChange}
                required={false}
                className="w-full"
                defaultValue=""
              >
                <NativeSelectOption value="" disabled>
                  Pilih Event
                </NativeSelectOption>
                <NativeSelectOption value="1">Event 1</NativeSelectOption>
                <NativeSelectOption value="2">Event 2</NativeSelectOption>
                <NativeSelectOption value="3">Event 3</NativeSelectOption>
                <NativeSelectOption value="4">Event 4</NativeSelectOption>
              </NativeSelect>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category_id" className="text-sm font-semibold">
                  Kategori <span className="text-red-500">*</span>
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
                  Sub Kategori <span className="text-red-500">*</span>
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

            <div className="upload-archive space-y-2">
              <Label htmlFor="status" className="text-sm font-semibold">
                Upload Arsip <span className="text-red-500">*</span>
              </Label>
              <Input
                id="file"
                name="file"
                type="hidden"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    file: e.target.files[0],
                  }))
                }
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                maxLength={10485760} // 10MB
                required={!isEdit}
                className="h-10 leading-10 shadow-none py-0"
              />
              {/* drag and drop */}
              <Label
                htmlFor="file"
                className="flex flex-col gap-0 border-2 border-dashed border-border rounded-md p-4 justify-center items-center cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <CloudUpload
                  size={24}
                  className="mx-auto mb-2 text-muted-foreground"
                />
                <p className="text-sm text-muted-foreground">
                  {isEdit
                    ? "Ganti file arsip (opsional)"
                    : "Klik atau seret file ke sini untuk mengunggah"}
                </p>
              </Label>
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
