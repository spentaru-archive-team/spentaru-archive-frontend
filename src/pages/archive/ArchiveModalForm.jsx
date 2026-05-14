import React, { useEffect, useRef, useState } from "react";
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
import { updateArchives } from "@/services/archive.service";
import { createArchives } from "@/services/archive.service";
import { useLocation, useNavigate } from "react-router";
import { getEvents } from "@/services/event.service";
import { useAuth } from "@/hooks/use-auth";

const toFormId = (value) => {
  if (value === null || value === undefined || value === "") return "";
  if (typeof value === "object") {
    const objectId = value?.id;
    return objectId === null || objectId === undefined || objectId === ""
      ? ""
      : String(objectId);
  }
  return String(value);
};

const createInitialArchiveFormData = (archive) => ({
  title: archive?.title || "",
  year: String(archive?.year || new Date().getFullYear()),
  category_id: toFormId(archive?.category_id ?? archive?.category?.id),
  subcategory_id: toFormId(archive?.subcategory_id ?? archive?.subcategory?.id),
  notes: archive?.notes || "",
  event_id: toFormId(archive?.event_id ?? ""),
  uploader: toFormId(archive?.uploader ?? ""),
  file: null,
});

export default function ArchiveModalForm({
  isOpen,
  onClose,
  archive = null,
  fetchArchives,
  initialEventId = null,
}) {
  const formKey = archive?.id ? `archive-edit-${archive.id}` : "archive-create";
  return (
    <ArchiveModalFormContent
      key={formKey}
      isOpen={isOpen}
      onClose={onClose}
      archive={archive}
      fetchArchives={fetchArchives}
      initialEventId={initialEventId}
    />
  );
}

function ArchiveModalFormContent({
  isOpen,
  onClose,
  archive = null,
  fetchArchives,
  initialEventId = null,
}) {
  const isEdit = !!archive;
  const { user, loading: isUserLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const formRef = useRef(null);
  const [fileError, setFileError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [formData, setFormData] = useState(() =>
    createInitialArchiveFormData(archive),
  );

  useEffect(() => {
    if (isOpen && initialEventId && !archive) {
      setFormData((prev) => ({
        ...prev,
        event_id: toFormId(initialEventId),
      }));
    }
  }, [isOpen, initialEventId, archive]);

  useEffect(() => {
    if (error?.general && formRef.current) {
      formRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [error?.general]);

  const selectedCategory = formData.category_id;
  const allowedExtensions = new Set([
    "pdf",
    "doc",
    "docx",
    "xls",
    "xlsx",
    "png",
    "jpg",
    "jpeg",
  ]);
  const imageExtensions = new Set(["png", "jpg", "jpeg"]);

  const formatFileSize = (bytes) => {
    if (typeof bytes !== "number") return "";
    const kb = bytes / 1024;
    if (kb < 1024) return `${Math.max(1, Math.round(kb))} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  };

  const getExtension = (fileName) => {
    if (!fileName || !fileName.includes(".")) return "";
    return fileName.split(".").pop().toLowerCase();
  };

  const handleFileSelect = (file) => {
    if (!file) return;
    const extension = getExtension(file.name);

    if (!allowedExtensions.has(extension)) {
      setFileError(
        "Format file tidak didukung. Gunakan pdf, doc, docx, xls, xlsx, png, jpg, atau jpeg.",
      );
      return;
    }

    setFileError(null);
    setFormData((prev) => ({
      ...prev,
      file,
    }));
    setFileInfo({
      name: file.name,
      extension,
      size: formatFileSize(file.size),
    });
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer?.files?.[0];
    handleFileSelect(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  useEffect(() => {
    if (!formData.file) {
      setPreviewUrl(null);
      return;
    }

    const extension = getExtension(formData.file.name);
    if (!imageExtensions.has(extension)) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(formData.file);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.file]);

  useEffect(() => {
    if (!user?.id) return;
    setFormData((prev) => ({
      ...prev,
      uploader: toFormId(user.id),
    }));
  }, [user?.id]);

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

  const subcategoryOptionsReady =
    !!selectedCategory && !isLoadingSubcategories && !errorSubcategories;
  const hasSubcategories =
    subcategoryOptionsReady &&
    Array.isArray(subcategories) &&
    subcategories.length > 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (error) setError(null);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async () => {
    console.log("Submitting form data:", formData);
    try {
      const res = await createArchives(formData);
      if (res.data.status === "success") {
        await fetchArchives();
        setFormData(createInitialArchiveFormData(archive));
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error creating archive:", error.response ?? error);
      setError({
        fields: error.response?.data?.errors || null,
        general: !error.response?.data?.errors
          ? "Terjadi kesalahan saat membuat archive."
          : null,
      });
      return false;
    } 
  };

  const handleEdit = async () => {
    try {
      const res = await updateArchives(archive.id, formData);
      if (res.data.status === "success") {
        await fetchArchives();
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error updating archive:", error.response);
      setError({
        fields: error.response?.data?.errors || null,
        general: !error.response?.data?.errors
          ? "Terjadi kesalahan saat memperbarui archive."
          : null,
      });
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (isUserLoading || !user?.id) {
      setError({
        fields: null,
        general: "User belum terautentikasi. Silakan login ulang.",
      });
      return;
    }

    if (!isEdit && !formData.file) {
      setFileError("File arsip wajib diunggah.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const isSuccess = isEdit ? await handleEdit() : await handleCreate();

      if (isSuccess) {
        onClose();
        navigate(location.pathname, {
          state: {
            popup: {
              title: isEdit
                ? "Archive berhasil diperbarui."
                : "Archive berhasil ditambahkan.",
              type: "success",
              duration: 3000,
            },
          },
        });
      }
    } finally {
      setIsSubmitting(false);
    }
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

        <form
          id="archive-form"
          ref={formRef}
          onSubmit={handleSubmit}
          className="min-h-0 flex-1 overflow-y-auto pt-4 space-y-6"
        >
          <div className="px-6 pb-6 space-y-5">
            {error?.general && (
              <p className="mt-1 rounded-sm bg-destructive/[0.04] p-3 text-sm text-destructive">
                {error.general}
              </p>
            )}

            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-semibold">
                Judul Arsip <span className="text-destructive">*</span>
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
              {error?.fields?.title && (
                <p className="mt-1 text-xs text-destructive">
                  {error.fields.title[0]}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year" className="text-sm font-semibold">
                  Tahun <span className="text-destructive">*</span>
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
                {error?.fields?.year && (
                  <p className="mt-1 text-xs text-destructive">
                    {error.fields.year[0]}
                  </p>
                )}
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
                  {error?.fields?.notes && (
                    <p className="mt-1 text-xs text-destructive">
                      {error.fields.notes[0]}
                    </p>
                  )}
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
              {error?.fields?.event_id && (
                <p className="mt-1 text-xs text-destructive">
                  {error.fields.event_id[0]}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category_id" className="text-sm font-semibold">
                  Kategori <span className="text-destructive">*</span>
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
                {error?.fields?.category_id && (
                  <p className="mt-1 text-xs text-destructive">
                    {error.fields.category_id[0]}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="subcategory_id"
                  className="text-sm font-semibold"
                >
                  Sub Kategori{hasSubcategories && <span className="text-destructive"> *</span>}
                </Label>
                <NativeSelect
                  id="subcategory_id"
                  name="subcategory_id"
                  value={formData.subcategory_id}
                  onChange={handleChange}
                  required={hasSubcategories}
                  disabled={!selectedCategory || isLoadingSubcategories || !hasSubcategories}
                  className="w-full"
                >
                  {!selectedCategory ? (
                    <NativeSelectOption value="" disabled>
                      Harap pilih kategori terlebih dahulu
                    </NativeSelectOption>
                  ) : isLoadingSubcategories ? (
                    <NativeSelectOption value="" disabled>
                      Memuat subkategori...
                    </NativeSelectOption>
                  ) : errorSubcategories ? (
                    <NativeSelectOption value="" disabled>
                      Gagal memuat subkategori
                    </NativeSelectOption>
                  ) : !hasSubcategories ? (
                    <NativeSelectOption value="" disabled>
                      Tidak ada subkategori
                    </NativeSelectOption>
                  ) : (
                    <>
                      <NativeSelectOption value="" disabled>
                        Pilih Subkategori
                      </NativeSelectOption>
                      {subcategories.map((subcategory) => (
                        <NativeSelectOption
                          key={subcategory.id}
                          value={String(subcategory.id)}
                        >
                          {subcategory.name}
                        </NativeSelectOption>
                      ))}
                    </>
                  )}
                </NativeSelect>
                {error?.fields?.subcategory_id && (
                  <p className="mt-1 text-xs text-destructive">
                    {error.fields.subcategory_id[0]}
                  </p>
                )}
              </div>
            </div>

            <div className="upload-archive space-y-2">
              <Label htmlFor="file" className="text-sm font-semibold">
                Upload Arsip <span className="text-destructive">*</span>
              </Label>
              <Input
                id="file"
                name="file"
                type="file"
                onChange={(e) => handleFileSelect(e.target.files?.[0])}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                maxLength={10485760} // 10MB
                required={false}
                className="hidden h-10 leading-10 shadow-none py-0"
              />
              {error?.fields?.file && (
                <p className="mt-1 text-xs text-destructive">
                  {error.fields.file[0]}
                </p>
              )}
              {fileError && (
                <p className="mt-1 text-xs text-destructive">{fileError}</p>
              )}
              {/* drag and drop */}
              <Label
                htmlFor="file"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                className={`flex flex-col gap-0 border-2 border-dashed rounded-md p-4 justify-center items-center cursor-pointer transition-colors ${
                  isDragging
                    ? "border-primary/60 bg-primary/5"
                    : "border-border hover:bg-muted/50"
                }`}
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
              {fileInfo && (
                <div className="rounded-sm border border-border/70 bg-muted/40 p-3 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">{fileInfo.name}</p>
                  <p className="text-xs">{fileInfo.size}</p>
                  {previewUrl ? (
                    <div className="mt-2 overflow-hidden rounded-sm border border-border/70 bg-card">
                      <img
                        src={previewUrl}
                        alt={fileInfo.name}
                        className="h-40 w-full object-contain"
                      />
                    </div>
                  ) : (
                    <p className="mt-1 text-xs">
                      Preview tidak tersedia untuk file pdf, doc, docx, dan
                      xlsx.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </form>

        <ModalFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
            className="w-1/2 rounded-sm border-border/80"
          >
            Batal
          </Button>
          <Button
            form="archive-form"
            type="submit"
            disabled={isSubmitting}
            className="w-1/2 rounded-sm bg-primary hover:bg-primary/90"
          >
            {isSubmitting
              ? "Menyimpan..."
              : isEdit
                ? "Simpan Perubahan"
                : "Simpan Arsip"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
