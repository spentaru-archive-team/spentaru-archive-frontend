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
import { getArchives, getArchivesWithoutLocation } from "@/services/archive.service";
import { getCabinets } from "@/services/physicalLocation.service";
import {
  createArchiveLocations,
  updateArchiveLocations,
} from "@/services/archiveLocation.service";
import { useLocation, useNavigate } from "react-router";

const createInitialLocationFormData = (location) => ({
  archive_id: location?.archive_id
    ? String(location.archive_id)
    : String(location?.archive?.id || ""),
  cabinet_id: location?.cabinet_id
    ? String(location.cabinet_id)
    : String(location?.cabinet?.id || ""),
  rack_id: location?.rack_id ? String(location.rack_id) : String(location?.rack?.id || ""),
  slot_number: location?.slot_number ? String(location.slot_number) : "",
  label_code: location?.label_code || "",
  notes: location?.notes || "",
});

export default function LocationModalForm({
  isOpen,
  onClose,
  locationData = null,
  fetchLocations,
}) {
  if (!isOpen) return null;

  const formKey = locationData?.id
    ? `archive-location-edit-${locationData.id}`
    : "archive-location-create";
  return (
    <LocationModalFormContent
      key={formKey}
      onClose={onClose}
      locationData={locationData}
      fetchLocations={fetchLocations}
    />
  );
}

function LocationModalFormContent({ onClose, locationData = null, fetchLocations }) {
  const isEdit = !!locationData;
  const routerLocation = useLocation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingMeta, setIsLoadingMeta] = useState(false);
  const [archives, setArchives] = useState([]);
  const [cabinets, setCabinets] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(() =>
    createInitialLocationFormData(locationData),
  );

  useEffect(() => {
    const fetchMeta = async () => {
      setIsLoadingMeta(true);
      try {
        const [archiveRes, cabinetRes] = await Promise.all([
          getArchivesWithoutLocation(),
          getCabinets(),
        ]);

        const archivePayload = archiveRes?.data?.data;
        const cabinetPayload = cabinetRes?.data?.data;

        const normalizedArchives = Array.isArray(archivePayload)
          ? archivePayload
          : archivePayload?.data || [];
        const normalizedCabinets = Array.isArray(cabinetPayload)
          ? cabinetPayload
          : cabinetPayload?.data || [];

        setArchives(normalizedArchives);
        setCabinets(normalizedCabinets);
      } catch (metaError) {
        console.error("Error fetching modal metadata:", metaError.response);
      } finally {
        setIsLoadingMeta(false);
      }
    };

    fetchMeta();
  }, []);

  const selectedCabinet = useMemo(
    () => cabinets.find((cabinet) => String(cabinet.id) === formData.cabinet_id),
    [cabinets, formData.cabinet_id],
  );

  const rackOptions = selectedCabinet?.racks || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (error) setError(null);

    if (name === "cabinet_id") {
      setFormData((prev) => ({ ...prev, cabinet_id: value, rack_id: "" }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async () => {
    try {
      const res = await createArchiveLocations(formData);
      if (res.data.status === "success") {
        await fetchLocations();
        return true;
      }

      return false;
    } catch (createError) {
      console.error("Error creating archive location:", createError.response);
      setError({
        fields: createError.response?.data?.errors || null,
        general: !createError.response?.data?.errors
          ? "Terjadi kesalahan saat membuat lokasi arsip."
          : null,
      });
      return false;
    }
  };

  const handleEdit = async () => {
    try {
      const res = await updateArchiveLocations(locationData.id, formData);
      if (res.data.status === "success") {
        await fetchLocations();
        return true;
      }

      return false;
    } catch (updateError) {
      console.error("Error updating archive location:", updateError.response);
      setError({
        fields: updateError.response?.data?.errors || null,
        general: !updateError.response?.data?.errors
          ? "Terjadi kesalahan saat memperbarui lokasi arsip."
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
                ? "Lokasi arsip berhasil diperbarui."
                : "Lokasi arsip berhasil ditambahkan.",
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
            {isEdit ? "Edit Lokasi Arsip" : "Tambah Lokasi Arsip"}
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
              <Label htmlFor="archive_id" className="text-sm font-semibold">
                Arsip <span className="text-red-500">*</span>
              </Label>
              <NativeSelect
                id="archive_id"
                name="archive_id"
                value={formData.archive_id}
                onChange={handleChange}
                required
                className="w-full"
                disabled={isLoadingMeta}
              >
                <NativeSelectOption value="">
                  {isLoadingMeta ? "Memuat data arsip..." : "Pilih arsip"}
                </NativeSelectOption>
                {archives.map((archive) => (
                  <NativeSelectOption key={archive.id} value={String(archive.id)}>
                    {archive.title}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
              {error?.fields?.archive_id && (
                <p className="mt-1 text-xs text-destructive">
                  {error.fields.archive_id[0]}
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
                    {isLoadingMeta ? "Memuat data lemari..." : "Pilih lemari"}
                  </NativeSelectOption>
                  {cabinets.map((cabinet) => (
                    <NativeSelectOption key={cabinet.id} value={String(cabinet.id)}>
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
                <Label htmlFor="rack_id" className="text-sm font-semibold">
                  Rak <span className="text-red-500">*</span>
                </Label>
                <NativeSelect
                  id="rack_id"
                  name="rack_id"
                  value={formData.rack_id}
                  onChange={handleChange}
                  required
                  className="w-full"
                  disabled={!formData.cabinet_id || isLoadingMeta}
                >
                  <NativeSelectOption value="">
                    {formData.cabinet_id ? "Pilih rak" : "Pilih lemari dulu"}
                  </NativeSelectOption>
                  {rackOptions.map((rack) => (
                    <NativeSelectOption key={rack.id} value={String(rack.id)}>
                      {rack.name || `Rak ${rack.rack_number}`}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
                {error?.fields?.rack_id && (
                  <p className="mt-1 text-xs text-destructive">
                    {error.fields.rack_id[0]}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="slot_number" className="text-sm font-semibold">
                  Nomor Slot <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="slot_number"
                  name="slot_number"
                  type="number"
                  min={1}
                  placeholder="Contoh: 1"
                  value={formData.slot_number}
                  onChange={handleChange}
                  required
                  className="h-10 py-0 shadow-none"
                />
                {error?.fields?.slot_number && (
                  <p className="mt-1 text-xs text-destructive">
                    {error.fields.slot_number[0]}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="label_code" className="text-sm font-semibold">
                  Kode Label
                </Label>
                <Input
                  id="label_code"
                  name="label_code"
                  placeholder="Contoh: L1-R1-S01"
                  value={formData.label_code}
                  onChange={handleChange}
                  className="h-10 py-0 shadow-none"
                />
                {error?.fields?.label_code && (
                  <p className="mt-1 text-xs text-destructive">
                    {error.fields.label_code[0]}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-sm font-semibold">
                Catatan
              </Label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Catatan tambahan lokasi arsip (opsional)"
                className="min-h-28 w-full rounded-sm border border-border bg-white px-3 py-2 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
              {error?.fields?.notes && (
                <p className="mt-1 text-xs text-destructive">
                  {error.fields.notes[0]}
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
                  : "Simpan Lokasi"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
