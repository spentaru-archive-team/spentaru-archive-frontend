import React, { useState } from "react";
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
import { CloudUpload, PlusCircle, Save } from "lucide-react";
import { getCategories } from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";
import { getSubcategoriesByCategoryId } from "@/services/subcategory.service";
import { getEvents } from "@/services/event.service";

const toFormId = (value) => {
  if (value === null || value === undefined || value === "") return "";
  return String(value);
};

const createInitialArchiveFormData = (archive) => ({
  title: archive?.title || "",
  year: String(archive?.year || new Date().getFullYear()),
  category_id: toFormId(archive?.category_id ?? archive?.category?.id),
  subcategory_id: toFormId(
    archive?.subcategory_id ?? archive?.subcategory?.id,
  ),
  notes: archive?.notes || "",
  event_id: toFormId(archive?.event_id ?? archive?.event?.id),
  status: archive?.status || "pending_upload",
  file: null,
});

export default function ArchiveModalForm({ isOpen, onClose, archive = null }) {
  if (!isOpen) return null;

  const formKey = archive?.id ? `archive-edit-${archive.id}` : "archive-create";
  return (
    <ArchiveModalFormContent
      key={formKey}
      onClose={onClose}
      archive={archive}
    />
  );
}

function ArchiveModalFormContent({ onClose, archive = null }) {
  const isEdit = !!archive;
  const [formData, setFormData] = useState(() =>
    createInitialArchiveFormData(archive),
  );
  const selectedCategory = formData.category_id;

  const fetchEvents = async () => {
    try {
      const res = await getEvents({ all: true });
      return res.data.data; // Sesuaikan dengan struktur respons API Anda
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  };

  const {
    data: events,
    isLoading: isLoadingEvents,
    error: errorEvents,
  } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    staleTime: 1000 * 60 * 5, // cache 5 menit
  });

  const fetchSubcategories = async (categoryId) => {
    if (!categoryId) return [];
    try {
      const res = await getSubcategoriesByCategoryId(categoryId, { all: true });
      return res.data.data; // Sesuaikan dengan struktur respons API Anda
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      throw error;
    }
  };

  const {
    data: subcategories,
    isLoading: isLoadingSubcategories,
    error: errorSubcategories,
  } = useQuery({
    queryKey: ["subcategories", selectedCategory],
    queryFn: () => fetchSubcategories(selectedCategory),
    enabled: !!selectedCategory, // Hanya jalankan jika kategori dipilih
    staleTime: 1000 * 60 * 5, // cache 5 menit
  });

  const fetchCategories = async () => {
    try {
      const res = await getCategories({ all: true });
      return res.data.data; // Sesuaikan dengan struktur respons API Anda
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  };

  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5, // cache 5 menit
  });

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
    <Modal open={true} onOpenChange={onClose}>
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
              >
                <NativeSelectOption value="">Pilih Event</NativeSelectOption>
                {isLoadingEvents ? (
                  <NativeSelectOption value="" disabled>
                    Memuat event...
                  </NativeSelectOption>
                ) : errorEvents ? (
                  <NativeSelectOption value="" disabled>
                    Gagal memuat event
                  </NativeSelectOption>
                ) : (
                  Array.isArray(events) &&
                  events.map((event) => {
                    const eventDate = new Date(event.date);
                    const option = {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    };
                    const formattedDate = eventDate.toLocaleDateString(
                      "id-ID",
                      option,
                    );
                    return (
                      <NativeSelectOption
                        key={event.id}
                        value={String(event.id)}
                      >
                        {event.title} - {formattedDate}
                      </NativeSelectOption>
                    );
                  })
                )}
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
                  onChange={(e) => {
                    const nextCategory = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      category_id: nextCategory,
                      subcategory_id: "",
                    }));
                  }}
                  required
                  className="w-full"
                >
                  <NativeSelectOption value="" disabled>
                    Pilih Kategori
                  </NativeSelectOption>

                  {isLoadingCategories ? (
                    <NativeSelectOption value="" disabled>
                      Memuat kategori...
                    </NativeSelectOption>
                  ) : errorCategories ? (
                    <NativeSelectOption value="" disabled>
                      Gagal memuat kategori
                    </NativeSelectOption>
                  ) : (
                    Array.isArray(categories) &&
                    categories.map((category) => (
                      <NativeSelectOption
                        key={category.id}
                        value={String(category.id)}
                      >
                        {category.name}
                      </NativeSelectOption>
                    ))
                  )}
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
                  <NativeSelectOption value="" disabled>
                    Harap pilih kategori terlebih dahulu
                  </NativeSelectOption>
                  {isLoadingSubcategories ? (
                    <NativeSelectOption value="" disabled>
                      Memuat subkategori...
                    </NativeSelectOption>
                  ) : errorSubcategories ? (
                    <NativeSelectOption value="" disabled>
                      Gagal memuat subkategori
                    </NativeSelectOption>
                  ) : (
                    Array.isArray(subcategories) &&
                    subcategories.map((subcategory) => (
                      <NativeSelectOption
                        key={subcategory.id}
                        value={String(subcategory.id)}
                      >
                        {subcategory.name}
                      </NativeSelectOption>
                    ))
                  )}
                </NativeSelect>
              </div>
            </div>

            <div className="upload-archive space-y-2">
              <Label htmlFor="file" className="text-sm font-semibold">
                Upload Arsip <span className="text-red-500">*</span>
              </Label>
              <Input
                id="file"
                name="file"
                type="file"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    file: e.target.files[0],
                  }))
                }
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                maxLength={10485760} // 10MB
                required={!isEdit}
                className="hidden h-10 leading-10 shadow-none py-0"
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
