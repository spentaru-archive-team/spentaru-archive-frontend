import React, { useEffect, useMemo, useState } from "react";
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
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { PlusCircle, Save } from "lucide-react";
import { getCategories } from "@/services/category.service";
import { getSubcategoriesByCategoryId } from "@/services/subcategory.service";
import { getCabinets } from "@/services/cabinet.service";
import {
  createArchiveStorageRules,
  updateArchiveStorageRules,
} from "@/services/storageRule.service";
import { useLocation, useNavigate } from "react-router";

const createInitialStorageRuleFormData = (storageRule) => ({
  category_id: storageRule?.category_id
    ? String(storageRule.category_id)
    : String(storageRule?.category?.id || ""),
  subcategory_id: storageRule?.subcategory_id
    ? String(storageRule.subcategory_id)
    : String(storageRule?.subcategory?.id || ""),
  cabinet_id: storageRule?.cabinet_id
    ? String(storageRule.cabinet_id)
    : String(storageRule?.cabinet?.id || ""),
  priority: storageRule?.priority ? String(storageRule.priority) : "",
});

const normalizeList = (payload) =>
  Array.isArray(payload) ? payload : payload?.data || [];

export default function StorageRuleModalForm({
  isOpen,
  onClose,
  storageRule = null,
  fetchStorageRules,
}) {
  if (!isOpen) return null;

  const formKey = storageRule?.id
    ? `storage-rule-edit-${storageRule.id}`
    : "storage-rule-create";

  return (
    <StorageRuleModalFormContent
      key={formKey}
      onClose={onClose}
      storageRule={storageRule}
      fetchStorageRules={fetchStorageRules}
    />
  );
}

function StorageRuleModalFormContent({
  onClose,
  storageRule = null,
  fetchStorageRules,
}) {
  const isEdit = Boolean(storageRule);
  const routerLocation = useLocation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingMeta, setIsLoadingMeta] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [cabinets, setCabinets] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(() =>
    createInitialStorageRuleFormData(storageRule),
  );

  useEffect(() => {
    const fetchMeta = async () => {
      setIsLoadingMeta(true);
      try {
        const [categoryRes, cabinetRes] = await Promise.all([
          getCategories({ all: true }),
          getCabinets(),
        ]);

        setCategories(normalizeList(categoryRes?.data?.data));
        setCabinets(normalizeList(cabinetRes?.data?.data));
      } catch (metaError) {
        console.error("Error fetching storage rule metadata:", metaError);
      } finally {
        setIsLoadingMeta(false);
      }
    };

    fetchMeta();
  }, []);

  useEffect(() => {
    const fetchSubcategories = async () => {
      if (!formData.category_id) {
        setSubcategories([]);
        return;
      }

      try {
        const subcategoryRes = await getSubcategoriesByCategoryId(
          formData.category_id,
          { all: true },
        );
        setSubcategories(normalizeList(subcategoryRes?.data?.data));
      } catch (subcategoryError) {
        console.error("Error fetching subcategories:", subcategoryError);
        setSubcategories([]);
      }
    };

    fetchSubcategories();
  }, [formData.category_id]);

  const selectedCategory = useMemo(
    () =>
      categories.find(
        (category) => String(category.id) === String(formData.category_id),
      ),
    [categories, formData.category_id],
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (error) setError(null);

    if (name === "category_id") {
      setFormData((prev) => ({
        ...prev,
        category_id: value,
        subcategory_id: "",
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const buildPayload = () => ({
    category_id: formData.category_id ? Number(formData.category_id) : null,
    subcategory_id: formData.subcategory_id
      ? Number(formData.subcategory_id)
      : null,
    cabinet_id: Number(formData.cabinet_id),
    priority: Number(formData.priority),
  });

  const handleCreate = async () => {
    try {
      const res = await createArchiveStorageRules(buildPayload());
      if (res.data.status === "success") {
        await fetchStorageRules();
        return true;
      }

      return false;
    } catch (createError) {
      console.error("Error creating storage rule:", createError.response);
      setError({
        fields: createError.response?.data?.errors || null,
        general: !createError.response?.data?.errors
          ? "Terjadi kesalahan saat membuat aturan penyimpanan."
          : null,
      });
      return false;
    }
  };

  const handleEdit = async () => {
    try {
      const res = await updateArchiveStorageRules(storageRule.id, buildPayload());
      if (res.data.status === "success") {
        await fetchStorageRules();
        return true;
      }

      return false;
    } catch (updateError) {
      console.error("Error updating storage rule:", updateError.response);
      setError({
        fields: updateError.response?.data?.errors || null,
        general: !updateError.response?.data?.errors
          ? "Terjadi kesalahan saat memperbarui aturan penyimpanan."
          : null,
      });
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const isSuccess = isEdit ? await handleEdit() : await handleCreate();
      if (isSuccess) {
        onClose();
        navigate(routerLocation.pathname, {
          state: {
            popup: {
              title: isEdit
                ? "Aturan penyimpanan berhasil diperbarui."
                : "Aturan penyimpanan berhasil ditambahkan.",
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
            {isEdit ? "Edit Aturan Penyimpanan" : "Tambah Aturan Penyimpanan"}
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
              <Label htmlFor="category_id" className="text-sm font-semibold">
                Kategori
              </Label>
              <NativeSelect
                id="category_id"
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className="w-full"
                disabled={isLoadingMeta}
              >
                <NativeSelectOption value="">
                  {isLoadingMeta ? "Memuat kategori..." : "Semua kategori"}
                </NativeSelectOption>
                {categories.map((category) => (
                  <NativeSelectOption
                    key={category.id}
                    value={String(category.id)}
                  >
                    {category.name}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
              {error?.fields?.category_id && (
                <p className="mt-1 text-xs text-destructive">
                  {error.fields.category_id[0]}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="subcategory_id" className="text-sm font-semibold">
                Subkategori
              </Label>
              <NativeSelect
                id="subcategory_id"
                name="subcategory_id"
                value={formData.subcategory_id}
                onChange={handleChange}
                className="w-full"
                disabled={!selectedCategory}
              >
                <NativeSelectOption value="">
                  {selectedCategory
                    ? "Semua subkategori"
                    : "Pilih kategori dulu"}
                </NativeSelectOption>
                {subcategories.map((subcategory) => (
                  <NativeSelectOption
                    key={subcategory.id}
                    value={String(subcategory.id)}
                  >
                    {subcategory.name}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
              {error?.fields?.subcategory_id && (
                <p className="mt-1 text-xs text-destructive">
                  {error.fields.subcategory_id[0]}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cabinet_id" className="text-sm font-semibold">
                  Lemari <span className="text-red-500">*</span>
                </Label>
                <NativeSelect
                  id="cabinet_id"
                  name="cabinet_id"
                  value={formData.cabinet_id}
                  onChange={handleChange}
                  required
                  className="w-full"
                  disabled={isLoadingMeta}
                >
                  <NativeSelectOption value="">
                    {isLoadingMeta ? "Memuat lemari..." : "Pilih lemari"}
                  </NativeSelectOption>
                  {cabinets.map((cabinet) => (
                    <NativeSelectOption
                      key={cabinet.id}
                      value={String(cabinet.id)}
                    >
                      {cabinet.name}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
                {error?.fields?.cabinet_id && (
                  <p className="mt-1 text-xs text-destructive">
                    {error.fields.cabinet_id[0]}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority" className="text-sm font-semibold">
                  Prioritas <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="priority"
                  name="priority"
                  type="number"
                  min={1}
                  placeholder="Contoh: 1"
                  value={formData.priority}
                  onChange={handleChange}
                  required
                  className="h-10 py-0 shadow-none"
                />
                {error?.fields?.priority && (
                  <p className="mt-1 text-xs text-destructive">
                    {error.fields.priority[0]}
                  </p>
                )}
              </div>
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
                  : "Simpan Aturan"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
