import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalFooter,
} from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { STORAGE_URL } from "@/config/api";
import { FileText, Calendar, Tag, FolderTree, Info } from "lucide-react";

export default function ArchiveModalDetail({ isOpen, onClose, archive }) {
  if (!archive) return null;

  const statusLabel =
    archive.status === "pending_upload" ? "Menunggu Upload" : "Telah Upload";
  const statusColor =
    archive.status === "pending_upload"
      ? "bg-amber-100 text-amber-700 border-amber-200"
      : "bg-emerald-100 text-emerald-700 border-emerald-200";

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent className="max-w-2xl">
        <ModalHeader>
          <ModalTitle className="flex items-center gap-2">
            <Info size={20} className="text-primary" />
            Detail Arsip
          </ModalTitle>
        </ModalHeader>

        <div className="p-6 space-y-6">
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
                    {archive.event.title || "-"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-sm bg-primary/10 text-primary">
                  <Info size={18} />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Status Event
                  </p>
                  <span
                    className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-sm border text-xs font-medium ${archive.event.status === "ongoing"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-slate-200 bg-slate-100 text-slate-700"
                    }`}
                  >
                    {archive.event.status === "ongoing"
                      ? "Berlangsung"
                      : "Selesai"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {archive.files && (
            <div className="pt-4 border-t">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Lampiran File
              </p>
              <a
                href={`${STORAGE_URL}${archive?.files?.file_url}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-4 rounded-sm border border-border bg-muted/10 hover:bg-muted/20 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-50 text-red-600 rounded-sm">
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {archive.files.file_name || "Lihat Dokumen"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Format: PDF / Image
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
              </a>
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
