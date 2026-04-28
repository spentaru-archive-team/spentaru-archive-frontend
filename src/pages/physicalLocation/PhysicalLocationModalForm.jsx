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
import {
  createCabinets,
  updateCabinets,
} from "@/services/physicalLocation.service";
import { useLocation, useNavigate } from "react-router";

const createInitialFormData = (cabinet) => ({
  cabinet_number: cabinet?.cabinet_number ? String(cabinet.cabinet_number) : "",
  name: cabinet?.name || "",
  racks:
    cabinet?.racks?.length > 0
      ? cabinet.racks.map((rack) => ({
        id: rack?.id ?? null,
        rack_number: rack?.rack_number ? String(rack.rack_number) : "",
        capacity: rack?.capacity ? String(rack.capacity) : "",
        used_capacity:
          rack?.used_capacity || rack?.used_capacity === 0
            ? String(rack.used_capacity)
            : "0",
      }))
      : [{ id: null, rack_number: "", capacity: "", used_capacity: "0" }],
});

export default function PhysicalLocationModalForm({
  isOpen,
  onClose,
  cabinet = null,
  fetchCabinets,
}) {
  if (!isOpen) return null;

  const formKey = cabinet?.id ? `cabinet-edit-${cabinet.id}` : "cabinet-create";
  return (
    <PhysicalLocationModalFormContent
      key={formKey}
      onClose={onClose}
      cabinet={cabinet}
      fetchCabinets={fetchCabinets}
    />
  );
}

function PhysicalLocationModalFormContent({
  onClose,
  cabinet = null,
  fetchCabinets,
}) {
  const isEdit = !!cabinet;
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(() => createInitialFormData(cabinet));

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (error) setError(null);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRackChange = (index, field, value) => {
    if (error) setError(null);
    setFormData((prev) => {
      const nextRacks = [...prev.racks];
      nextRacks[index] = {
        ...nextRacks[index],
        [field]: value,
      };
      return { ...prev, racks: nextRacks };
    });
  };

  const handleAddRack = () => {
    setFormData((prev) => ({
      ...prev,
      racks: [...prev.racks, { id: null, rack_number: "", capacity: "", used_capacity: "0" }],
    }));
  };

  const handleRemoveRack = (index) => {
    setFormData((prev) => {
      if (prev.racks.length === 1) {
        return {
          ...prev,
          racks: [{ id: null, rack_number: "", capacity: "", used_capacity: "0" }],
        };
      }

      return {
        ...prev,
        racks: prev.racks.filter((_, idx) => idx !== index),
      };
    });
  };

  const buildPayload = () => {
    const racks = formData.racks
      .map((rack) => ({
        id: rack.id,
        rack_number: Number(rack.rack_number),
        capacity: Number(rack.capacity),
        used_capacity: Number(rack.used_capacity || 0),
      }))
      .filter((rack) => Number.isFinite(rack.rack_number) && Number.isFinite(rack.capacity))
      .map((rack) =>
        rack.id
          ? {
            id: rack.id,
            rack_number: rack.rack_number,
            capacity: rack.capacity,
            used_capacity: rack.used_capacity,
          }
          : {
            rack_number: rack.rack_number,
            capacity: rack.capacity,
            used_capacity: rack.used_capacity,
          },
      );

    return {
      cabinet_number: Number(formData.cabinet_number),
      name: formData.name,
      racks,
    };
  };

  const handleCreate = async () => {
    try {
      const res = await createCabinets(buildPayload());
      if (res.data.status === "success") {
        await fetchCabinets();
        return true;
      }
      return false;
    } catch (createError) {
      console.error("Error creating cabinet:", createError.response);
      setError({
        fields: createError.response?.data?.errors || null,
        general: !createError.response?.data?.errors
          ? "Terjadi kesalahan saat membuat lokasi fisik."
          : null,
      });
      return false;
    }
  };

  const handleEdit = async () => {
    try {
      const res = await updateCabinets(cabinet.id, buildPayload());
      if (res.data.status === "success") {
        await fetchCabinets();
        return true;
      }
      return false;
    } catch (updateError) {
      console.error("Error updating cabinet:", updateError.response);
      setError({
        fields: updateError.response?.data?.errors || null,
        general: !updateError.response?.data?.errors
          ? "Terjadi kesalahan saat memperbarui lokasi fisik."
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
        navigate(location.pathname, {
          state: {
            popup: {
              title: isEdit
                ? "Lokasi fisik berhasil diperbarui."
                : "Lokasi fisik berhasil ditambahkan.",
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
      <ModalContent className="max-w-2xl">
        <ModalHeader>
          <ModalTitle className="flex items-center gap-2">
            {isEdit ? <Save size={20} /> : <PlusCircle size={20} />}
            {isEdit ? "Edit Lokasi Fisik" : "Tambah Lokasi Fisik"}
          </ModalTitle>
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-5 px-6 pb-6">
            {error?.general && (
              <p className="mt-1 rounded-sm bg-red-100/40 p-3 text-sm text-destructive">
                {error.general}
              </p>
            )}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cabinet_number" className="text-sm font-semibold">
                  Nomor Lemari <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="cabinet_number"
                  name="cabinet_number"
                  type="number"
                  min={1}
                  value={formData.cabinet_number}
                  onChange={handleChange}
                  placeholder="Contoh: 1"
                  required
                  className="h-10 py-0 shadow-none"
                />
                {error?.fields?.cabinet_number && (
                  <p className="mt-1 text-xs text-destructive">
                    {error.fields.cabinet_number[0]}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold">
                  Nama Lemari <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Contoh: Standar Kurikulum"
                  required
                  className="h-10 py-0 shadow-none"
                />
                {error?.fields?.name && (
                  <p className="mt-1 text-xs text-destructive">{error.fields.name[0]}</p>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold">Daftar Rak</Label>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddRack}
                  className="h-9 w-fit px-3 py-2 text-xs shadow-none"
                >
                  Tambah Rak
                </Button>
              </div>

              <div className="space-y-2">
                <div className="grid grid-cols-3">
                  <p className="text-sm text-muted-foreground">
                    No Rak
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Kapasitas
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Terpakai
                  </p>
                </div>
                {formData.racks.map((rack, index) => (
                  <div
                    key={rack.id ? `rack-${rack.id}` : `rack-new-${index}`}
                    className="grid grid-cols-1 gap-2 rounded-sm border border-border/80 p-3 md:grid-cols-[1fr_1fr_1fr_auto]"
                  >
                    <Input
                      type="number"
                      min={1}
                      placeholder="No. Rak"
                      value={rack.rack_number}
                      onChange={(e) =>
                        handleRackChange(index, "rack_number", e.target.value)
                      }
                      className="h-10 py-0 shadow-none"
                    />
                    <Input
                      type="number"
                      min={1}
                      placeholder="Kapasitas"
                      value={rack.capacity}
                      onChange={(e) =>
                        handleRackChange(index, "capacity", e.target.value)
                      }
                      className="h-10 py-0 shadow-none"
                    />
                    <Input
                      type="number"
                      min={0}
                      placeholder="Terpakai"
                      value={rack.used_capacity}
                      onChange={(e) =>
                        handleRackChange(index, "used_capacity", e.target.value)
                      }
                      className="h-10 py-0 shadow-none"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => handleRemoveRack(index)}
                      className="h-10 w-fit px-3 py-2 text-sm shadow-none"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                ))}
              </div>
              {error?.fields?.racks && (
                <p className="mt-1 text-xs text-destructive">{error.fields.racks[0]}</p>
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
