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
import { createUsers, updateUsers } from "@/services/user.service";

export default function UserModalForm({
  isOpen,
  onClose,
  user = null,
  fetchUsers,
}) {
  const isEdit = !!user;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    role: "guru",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        username: user.username || "",
        password: user.password || "",
        role: user.role || "guru",
      });
    } else {
      setFormData({
        name: "",
        username: "",
        password: "",
        role: "guru",
      });
    }
  }, [user, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async () => {
    try {
      const res = await createUsers(formData);
      if (res.data.status === "success") {
        await fetchUsers();
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error creating user:", error.response);
      setError(
        error.response?.data?.errors || "Terjadi kesalahan saat membuat user.",
      );
      return false;
    }
  };

  const handleEdit = async () => {
    try {
      const res = await updateUsers(user.id, formData);
      if (res.data.status === "success") {
        await fetchUsers();
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error updating user:", error.response);
      setError(
        error.response?.data?.errors ||
          "Terjadi kesalahan saat mengupdate user.",
      );
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
            {isEdit ? "Edit User" : "Tambah User"}
          </ModalTitle>
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          <div className="px-6 pb-6 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-semibold">
                Nama Lengkap <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Contoh: John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                className="h-10 shadow-none py-0"
              />
              {error?.name && (
                <p className="mt-1 text-xs text-destructive">{error.name[0]}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-semibold">
                  Username <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="Contoh: johndoe"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="h-10 shadow-none py-0"
                />
                {error?.username && (
                  <p className="mt-1 text-xs text-destructive">{error.username[0]}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold">
                  Password <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Masukkan password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="h-10 shadow-none py-0"
                />
                {error?.password && (
                  <p className="mt-1 text-xs text-destructive">{error.password[0]}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-sm font-semibold">
                Role <span className="text-red-500">*</span>
              </Label>
              <NativeSelect
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full"
              >
                <NativeSelectOption value="guru">Guru</NativeSelectOption>
                <NativeSelectOption value="admin">Admin</NativeSelectOption>
              </NativeSelect>
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
                  : "Simpan User"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
