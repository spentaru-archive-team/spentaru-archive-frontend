import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalFooter,
} from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Info, User } from "lucide-react";

const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatDateTime = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function EventModalDetail({ isOpen, onClose, event }) {
  if (!event) return null;

  const statusLabel =
    event.status === "ongoing"
      ? "Berlangsung"
      : event.status === "done" || event.status === "completed"
        ? "Selesai"
        : "Akan Datang";

  const statusColor =
    event.status === "ongoing"
      ? "bg-emerald-100 text-emerald-700 border-emerald-200"
      : "bg-slate-100 text-slate-700 border-slate-200";

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent className="max-w-2xl">
        <ModalHeader>
          <ModalTitle className="flex items-center gap-2">
            <Info size={20} className="text-primary" />
            Detail Event
          </ModalTitle>
        </ModalHeader>

        <div className="space-y-6 p-6">
          <div className="space-y-1">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Judul Event
            </h4>
            <p className="text-lg font-bold leading-tight text-foreground">
              {event.title}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="rounded-sm bg-primary/10 p-2 text-primary">
                  <Calendar size={18} />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Tanggal Event
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {formatDate(event.date)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-sm bg-primary/10 p-2 text-primary">
                  <Info size={18} />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Status
                  </p>
                  <span
                    className={`mt-1 inline-flex items-center rounded-sm border px-2.5 py-0.5 text-xs font-medium ${statusColor}`}
                  >
                    {statusLabel}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="rounded-sm bg-primary/10 p-2 text-primary">
                  <User size={18} />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Penanggung Jawab
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {event.user?.name || "-"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-sm bg-primary/10 p-2 text-primary">
                  <User size={18} />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Jabatan
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {event.user?.position || event.user?.subject || "-"}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="rounded-sm bg-primary/10 p-2 text-primary">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Dibuat
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {formatDateTime(event.created_at)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-sm bg-primary/10 p-2 text-primary">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Diperbarui
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {formatDateTime(event.updated_at)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2 border-t pt-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Deskripsi Event
            </h4>
            <p className="text-sm text-foreground">
              {event.description || "-"}
            </p>
          </div>
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
