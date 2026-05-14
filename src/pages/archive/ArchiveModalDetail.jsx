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
import {
  FileText,
  Calendar,
  Tag,
  FolderTree,
  Info,
  User,
  ShieldCheck,
  ArchiveX,
  ArchiveRestore,
} from "lucide-react";
import { Link } from "react-router";
import { decideArchiveRetention } from "@/services/archive.service";

export default function ArchiveModalDetail({
  isOpen,
  onClose,
  archive,
  onRetentionSaved,
}) {
  const [isSubmittingAction, setIsSubmittingAction] = useState(false);
  const [retentionNote, setRetentionNote] = useState("");
  const [retentionError, setRetentionError] = useState("");
  if (!archive) return null;

  const formatDate = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";

    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const retentionStatusMap = {
    active: {
      label: "Aktif",
      className: "border-success bg-success text-success-foreground",
    },
    ready_for_destruction: {
      label: "Siap Dihapus",
      className: "border-warning bg-warning text-warning-foreground",
    },
    destroyed: {
      label: "Dimusnahkan",
      className: "border-rose-200 bg-rose-50 text-rose-700",
    },
    retained: {
      label: "Ditahan",
      className: "border-info bg-info text-info-foreground",
    },
  };

  const retentionInfo = retentionStatusMap[archive.retention_status] || {
    label: "-",
    className: "border-muted bg-muted text-muted-foreground",
  };

  const canDecideRetention =
    archive.retention_status !== "destroyed" &&
    archive.retention_status !== "retained" &&
    archive.retention_status !== "active";

  const handleRetentionAction = async (retentionStatus) => {
    if (isSubmittingAction) return;

    setRetentionError("");
    setIsSubmittingAction(true);

    try {
      const response = await decideArchiveRetention(archive.id, {
        retention_status: retentionStatus,
        retention_note: retentionNote.trim() || null,
      });

      if (response?.data?.status === "success") {
        onRetentionSaved?.({
          title:
            retentionStatus === "destroyed"
              ? "Arsip berhasil dimusnahkan."
              : "Arsip berhasil ditahan.",
          type: "success",
        });
      }
    } catch (error) {
      console.log(error.response)
      setRetentionError(
        error.response?.data?.message ||
          "Gagal menyimpan keputusan retensi. Silakan coba lagi.",
      );
    } finally {
      setIsSubmittingAction(false);
    }
  };

  const statusLabel =
    archive.status === "pending_upload" ? "Menunggu Upload" : "Telah Upload";
  const statusColor =
    archive.status === "pending_upload"
      ? "bg-warning text-warning-foreground border-warning"
      : "bg-success text-success-foreground border-success";

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent className="max-w-2xl">
        <ModalHeader>
          <ModalTitle className="flex items-center gap-2">
            <Info size={20} className="text-primary" />
            Detail Arsip
          </ModalTitle>
        </ModalHeader>

        <div className="min-h-0 flex-1 overflow-y-auto p-6 space-y-6">
          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Judul Arsip
            </h4>
            <p className="text-lg font-bold text-foreground leading-tight">
              {archive.title}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-sm bg-primary/10 text-primary">
                  <Calendar size={18} />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Tahun
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {archive.year}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-sm bg-primary/10 text-primary">
                  <Tag size={18} />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Kategori
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {archive.category?.name || "-"}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-sm bg-primary/10 text-primary">
                  <FolderTree size={18} />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Sub Kategori
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {archive.subcategory?.name || "-"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-sm bg-primary/10 text-primary">
                  <Info size={18} />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Status
                  </p>
                  <span
                    className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-sm border text-xs font-medium ${statusColor}`}
                  >
                    {statusLabel}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-sm bg-primary/10 text-primary">
                  <FolderTree size={18} />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Arsip dari Event
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {archive.event?.title || "-"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-sm bg-primary/10 text-primary">
                  <User size={18} />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Diupload Oleh
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {archive?.uploader?.name || "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-sm border border-border/80 bg-muted/10 p-4 space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-primary" />
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Informasi Retensi
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Status Retensi
                </p>
                <span
                  className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-sm border text-xs font-medium ${retentionInfo.className}`}
                >
                  {retentionInfo.label}
                </span>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Jatuh Tempo Retensi
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {formatDate(archive.retention_due_date)}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Diputuskan Pada
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {formatDate(archive.retention_decided_at)}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Diputuskan Oleh
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {archive.retention_decided_by?.name ||
                    archive.retention_decided_by ||
                    "-"}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Catatan Retensi
              </p>
              <p className="text-sm text-foreground leading-relaxed">
                {archive.retention_note || "-"}
              </p>
            </div>

            {canDecideRetention && (
              <div className="space-y-3 border-t border-border/80 pt-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Keputusan Retensi
                </p>
                <Input
                  value={retentionNote}
                  onChange={(event) => setRetentionNote(event.target.value)}
                  placeholder="Catatan keputusan (opsional)"
                  className="h-9 rounded-sm border-border/80"
                />
                {retentionError && (
                  <p className="text-xs text-destructive">{retentionError}</p>
                )}
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => handleRetentionAction("destroyed")}
                    disabled={isSubmittingAction}
                    className="rounded-sm border border-destructive/40"
                  >
                    <ArchiveX size={14} />
                    {isSubmittingAction ? "Menyimpan..." : "Destroy"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleRetentionAction("retained")}
                    disabled={isSubmittingAction}
                    className="rounded-sm border-primary/30 text-primary hover:bg-primary/5"
                  >
                    <ArchiveRestore size={14} />
                    {isSubmittingAction ? "Menyimpan..." : "Retain"}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {archive.files && (
            <div className="pt-4 border-t">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Lampiran File
              </p>

              {archive.retention_status !== "destroyed" ? (
                <Link
                  to={`/archives/${archive.id}/preview?file_name=${encodeURIComponent(archive?.files?.file_name || "")}&title=${encodeURIComponent(archive?.title || "")}`}
                  className="flex items-center justify-between p-4 rounded-sm border border-border bg-muted/10 hover:bg-muted/20 transition-colors group whitespace-pre-wrap"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-destructive/10 text-destructive rounded-sm">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {archive.files.file_name || "Lihat Dokumen"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Format: {archive.files.file_type || "PDF / Image"}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary w-fit"
                  >
                    Buka
                  </Button>
                </Link>
              ) : (
                <div className="flex items-center justify-between p-4 rounded-sm border border-border bg-muted/10 cursor-not-allowed opacity-70">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-destructive/10 text-destructive rounded-sm">
                        <FileText size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                          {archive.files.file_name || "Lihat Dokumen"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Format: {archive.files.file_type || "PDF / Image"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary w-fit"
                  >
                    Buka
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        <ModalFooter>
          <Button
            onClick={onClose}
            variant="outline"
            className="rounded-sm border-border/80"
          >
            Tutup
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
