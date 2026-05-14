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
import { PlusCircle, Save } from "lucide-react";
import { createEvents, updateEvents } from "@/services/event.service";
import { getUsers } from "@/services/user.service";
import { useLocation, useNavigate } from "react-router";

const createInitialEventFormData = (event) => ({
  title: event?.title || "",
  user_id: event?.user_id ? String(event.user_id) : String(event?.user?.id || ""),
  description: event?.description || "",
  date: event?.date || "",
  status: event?.status || "ongoing",
});

export default function EventModalForm({
  isOpen,
  onClose,
  event = null,
  fetchEvents,
}) {
  if (!isOpen) return null;

  const formKey = event?.id ? `event-edit-${event.id}` : "event-create";
  return (
    <EventModalFormContent
      key={formKey}
      onClose={onClose}
      event={event}
      fetchEvents={fetchEvents}
    />
  );
}

function EventModalFormContent({ onClose, event = null, fetchEvents }) {
  const isEdit = !!event;
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(() =>
    createInitialEventFormData(event),
  );

  useEffect(() => {
    const fetchAllUsers = async () => {
      setIsLoadingUsers(true);
      try {
        const res = await getUsers({ all: true });
        const payload = res?.data?.data;
        const normalizedUsers = Array.isArray(payload)
          ? payload
          : payload?.data || [];
        setUsers(normalizedUsers);
      } catch (fetchError) {
        console.error("Error fetching users:", fetchError.response);
      } finally {
        setIsLoadingUsers(false);
      }
    };

    fetchAllUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (error) setError(null);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async () => {
    console.log(formData);
    try {
      const res = await createEvents(formData);
      if (res.data.status === "success") {
        await fetchEvents();
        return true;
      }

      return false;
    } catch (createError) {
      console.error("Error creating event:", createError.response);
      setError({
        fields: createError.response?.data?.errors || null,
        general: !createError.response?.data?.errors
          ? "Terjadi kesalahan saat membuat event."
          : null,
      });
      return false;
    }
  };

  const handleEdit = async () => {
    try {
      const res = await updateEvents(event.id, formData);
      if (res.data.status === "success") {
        await fetchEvents();
        return true;
      }

      return false;
    } catch (updateError) {
      console.error("Error updating event:", updateError.response);
      setError({
        fields: updateError.response?.data?.errors || null,
        general: !updateError.response?.data?.errors
          ? "Terjadi kesalahan saat memperbarui event."
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
                ? "Event berhasil diperbarui."
                : "Event berhasil ditambahkan.",
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
            {isEdit ? "Edit Event" : "Tambah Event"}
          </ModalTitle>
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-5 px-6 pb-6">
            {error?.general && (
              <p className="mt-1 rounded-sm bg-destructive/[0.04] p-3 text-sm text-destructive">
                {error.general}
              </p>
            )}

            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-semibold">
                Judul Event <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="Contoh: Rapat Komite Semester Genap"
                value={formData.title}
                onChange={handleChange}
                required
                className="h-10 py-0 shadow-none"
              />
              {error?.fields?.title && (
                <p className="mt-1 text-xs text-destructive">
                  {error.fields.title[0]}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="user_id" className="text-sm font-semibold">
                  Penanggung Jawab <span className="text-destructive">*</span>
                </Label>
                <NativeSelect
                  id="user_id"
                  name="user_id"
                  value={formData.user_id}
                  onChange={handleChange}
                  required
                  className="w-full"
                  disabled={isLoadingUsers}
                >
                  <NativeSelectOption value="">
                    {isLoadingUsers
                      ? "Memuat data user..."
                      : "Pilih penanggung jawab"}
                  </NativeSelectOption>
                  {users.map((user) => (
                    <NativeSelectOption key={user.id} value={String(user.id)}>
                      {user.name}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
                {error?.fields?.user_id && (
                  <p className="mt-1 text-xs text-destructive">
                    {error.fields.user_id[0]}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="date" className="text-sm font-semibold">
                  Tanggal Event <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date.split("T")[0]} // Ambil hanya bagian tanggal
                  onChange={handleChange}
                  required
                  className="h-10 py-0 shadow-none"
                />
                {error?.fields?.date && (
                  <p className="mt-1 text-xs text-destructive">
                    {error.fields.date[0]}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-semibold">
                Deskripsi
              </Label>
              <textarea
                id="description"
                name="description"
                placeholder="Tambahkan keterangan singkat event (opsional)"
                value={formData.description}
                onChange={handleChange}
                className="min-h-28 w-full rounded-sm border border-border bg-card px-3 py-2 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
              {error?.fields?.description && (
                <p className="mt-1 text-xs text-destructive">
                  {error.fields.description[0]}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="text-sm font-semibold">
                Status <span className="text-destructive">*</span>
              </Label>
              <NativeSelect
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full"
              >
                <NativeSelectOption value="ongoing">
                  Berlangsung
                </NativeSelectOption>
                <NativeSelectOption value="done">Selesai</NativeSelectOption>
              </NativeSelect>
              {error?.fields?.status && (
                <p className="mt-1 text-xs text-destructive">
                  {error.fields.status[0]}
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
                  : "Simpan Event"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
