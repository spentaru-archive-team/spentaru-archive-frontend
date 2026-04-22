import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Save, Trash2 } from "lucide-react";
import { createCategories, updateCategories } from "@/services/category.service";
import { useLocation, useNavigate } from "react-router";

const createInitialCategoryFormData = (category) => ({
  name: category?.name || "",
  description: category?.description || "",
  subcategories:
    category?.subcategories?.length > 0
      ? category.subcategories.map((subcat) => ({
        id: subcat?.id ?? null,
        name: subcat?.name || "",
      }))
      : [{ id: null, name: "" }],
});

export default function CategoryModalForm({
  isOpen,
  onClose,
  category = null,
  fetchCategories,
}) {
  if (!isOpen) return null;

  const formKey = category?.id ? `category-edit-${category.id}` : "category-create";
  return (
    <CategoryModalFormContent
      key={formKey}
      onClose={onClose}
      category={category}
      fetchCategories={fetchCategories}
    />
  );
}

function CategoryModalFormContent({ onClose, category = null, fetchCategories }) {
  const isEdit = !!category;
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(() =>
    createInitialCategoryFormData(category),
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (error) setError(null);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubcategoryChange = (index, value) => {
    if (error) setError(null);
    setFormData((prev) => {
      const nextSubcategories = [...prev.subcategories];
      nextSubcategories[index] = {
        ...nextSubcategories[index],
        name: value,
      };
      return { ...prev, subcategories: nextSubcategories };
    });
  };

  const handleAddSubcategory = () => {
    setFormData((prev) => ({
      ...prev,
      subcategories: [...prev.subcategories, { id: null, name: "" }],
    }));
  };

  const handleRemoveSubcategory = (index) => {
    setFormData((prev) => {
      if (prev.subcategories.length === 1) {
        return { ...prev, subcategories: [{ id: null, name: "" }] };
      }
      return {
        ...prev,
        subcategories: prev.subcategories.filter((_, idx) => idx !== index),
      };
    });
  };

  const buildPayload = () => {
    const cleanedSubcategories = formData.subcategories
      .map((item) => ({
        id: item.id,
        name: item.name.trim(),
      }))
      .filter((item) => Boolean(item.name))
      .map((item) => (item.id ? { id: item.id, name: item.name } : { name: item.name }));

    return {
      name: formData.name,
      description: formData.description,
      subcategories: cleanedSubcategories,
    };
  };

  const handleCreate = async () => {
    try {
      const res = await createCategories(buildPayload());
      if (res.data.status === "success") {
        await fetchCategories();
        return true;
      }

      return false;
    } catch (createError) {
      console.error("Error creating category:", createError.response);
      setError({
        fields: createError.response?.data?.errors || null,
        general: !createError.response?.data?.errors
          ? "Terjadi kesalahan saat membuat kategori."
          : null,
      });
      return false;
    }
  };

  const handleEdit = async () => {
    try {
      const res = await updateCategories(category.id, buildPayload());
      if (res.data.status === "success") {
        await fetchCategories();
        return true;
      }

      return false;
    } catch (updateError) {
      console.error("Error updating category:", updateError.response);
      setError({
        fields: updateError.response?.data?.errors || null,
        general: !updateError.response?.data?.errors
          ? "Terjadi kesalahan saat memperbarui kategori."
          : null,
      });
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(buildPayload());
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const isSuccess = isEdit ? await handleEdit() : await handleCreate();

      if (isSuccess) {
        onClose();
        navigate(location.pathname, {
          state: {
            popup: {
              title: isEdit
                ? "Kategori berhasil diperbarui."
                : "Kategori berhasil ditambahkan.",
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
    <Modal open={true} onOpenChange={onClose}>
      <ModalContent className="max-w-xl">
        <ModalHeader>
          <ModalTitle className="flex items-center gap-2">
            {isEdit ? <Save size={20} /> : <PlusCircle size={20} />}
            {isEdit ? "Edit Kategori" : "Tambah Kategori"}
          </ModalTitle>
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-5 px-6 pb-6">
            {error?.general && (
              <p className="mt-1 rounded-sm bg-red-100/40 p-3 text-sm text-destructive">
                {error.general}
              </p>
            )}

            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-semibold">
                Nama Kategori <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Contoh: Administrasi Akademik"
                value={formData.name}
                onChange={handleChange}
                required
                className="h-10 py-0 shadow-none"
              />
              {error?.fields?.name && (
                <p className="mt-1 text-xs text-destructive">{error.fields.name[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-semibold">
                Deskripsi
              </Label>
              <textarea
                id="description"
                name="description"
                placeholder="Tambahkan deskripsi kategori (opsional)"
                value={formData.description}
                onChange={handleChange}
                className="min-h-24 w-full rounded-sm border border-border bg-white px-3 py-2 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
              {error?.fields?.description && (
                <p className="mt-1 text-xs text-destructive">
                  {error.fields.description[0]}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <Label className="text-sm font-semibold">Subkategori</Label>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddSubcategory}
                  className="h-9 w-fit px-3 py-2 text-xs shadow-none"
                >
                  Tambah Subkategori
                </Button>
              </div>

              <div className="space-y-2">
                {formData.subcategories.map((subcategory, index) => (
                  <div
                    key={subcategory.id ? `subcat-${subcategory.id}` : `subcat-new-${index}`}
                    className="flex items-center gap-2"
                  >
                    <Input
                      placeholder={`Subkategori ${index + 1}`}
                      value={subcategory.name}
                      onChange={(e) =>
                        handleSubcategoryChange(index, e.target.value)
                      }
                      className="h-10 py-0 shadow-none"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => handleRemoveSubcategory(index)}
                      className="h-10 w-fit px-3 py-2 text-sm shadow-none"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                ))}
              </div>

              {error?.fields?.subcategories && (
                <p className="mt-1 text-xs text-destructive">
                  {error.fields.subcategories[0]}
                </p>
              )}
            </div>
          </div>

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
              type="submit"
              disabled={isSubmitting}
              className="w-1/2 rounded-sm bg-primary hover:bg-primary/90"
            >
              {isSubmitting
                ? "Menyimpan..."
                : isEdit
                  ? "Simpan Perubahan"
                  : "Simpan Kategori"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
