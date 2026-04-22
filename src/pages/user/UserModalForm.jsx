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
import { Eye, EyeOff, PlusCircle, Save } from "lucide-react";
import { createUsers, updateUsers } from "@/services/user.service";
import { useLocation, useNavigate } from "react-router";

const createInitialUserFormData = (user) => ({
  name: user?.name || "",
  subject: user?.subject || "",
  position: user?.position || "",
  username: user?.username || "",
  password: user?.password || "Password123",
  role: user?.role || "guru",
});

export default function UserModalForm({
  isOpen,
  onClose,
  user = null,
  fetchUsers,
}) {
  if (!isOpen) return null;

  const formKey = user?.id ? `user-edit-${user.id}` : "user-create";
  return (
    <UserModalFormContent
      key={formKey}
      onClose={onClose}
      user={user}
      fetchUsers={fetchUsers}
    />
  );
}

function UserModalFormContent({ onClose, user = null, fetchUsers }) {
  const isEdit = !!user;
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(() =>
    createInitialUserFormData(user),
  );

  const handleViewPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (error) setError(null);
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
      setError({
        fields: error.response?.data?.errors || null,
        general: !error.response?.data?.errors
          ? "Terjadi kesalahan saat membuat user."
          : null,
      });
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
      setError({
        fields: error.response?.data?.errors || null,
        general: !error.response?.data?.errors
          ? "Terjadi kesalahan saat memperbarui user."
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
                ? "User berhasil diperbarui."
                : "User berhasil ditambahkan.",
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
            {isEdit ? "Edit User" : "Tambah User"}
          </ModalTitle>
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          <div className="px-6 pb-6 space-y-5">
            {error?.general && (
              <p className="mt-1 text-sm text-destructive bg-red-100/40 p-3 rounded-sm">
                {error.general}
              </p>
            )}
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
              {error?.fields?.name && (
                <p className="mt-1 text-xs text-destructive">
                  {error.fields.name[0]}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-sm font-semibold">
                  Subject <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Contoh: Matematika"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="h-10 shadow-none py-0"
                />
                {error?.fields?.subject && (
                  <p className="mt-1 text-xs text-destructive">
                    {error.fields.subject[0]}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="position" className="text-sm font-semibold">
                  Position <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="position"
                  name="position"
                  placeholder="Masukkan jabatan"
                  value={formData.position}
                  onChange={handleChange}
                  required={!isEdit}
                  className="h-10 shadow-none py-0"
                />
                {error?.fields?.position && (
                  <p className="mt-1 text-xs text-destructive">
                    {error.fields.position[0]}
                  </p>
                )}
              </div>
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
                {error?.fields?.username && (
                  <p className="mt-1 text-xs text-destructive">
                    {error.fields.username[0]}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold">
                  {isEdit ? "Password Baru" : "Password (Default: Password123)"}
                  {!isEdit && <span className="text-red-500">*</span>}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    value={isEdit ? "" : "Password123"}
                    onChange={handleChange}
                    required={!isEdit}
                    className="h-10 shadow-none py-0"
                  />
                  {showPassword ? (
                    <Eye
                      size={18}
                      onClick={handleViewPassword}
                      className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    />
                  ) : (
                    <EyeOff
                      size={18}
                      onClick={handleViewPassword}
                      className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    />
                  )}
                </div>
                {error?.fields?.password && (
                  <p className="mt-1 text-xs text-destructive">
                    {error.fields.password[0]}
                  </p>
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
