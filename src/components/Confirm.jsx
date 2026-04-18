import { Button } from "@/components/ui/button";
import { AlertTriangle, LogOut, X } from "lucide-react";
import { useEffect } from "react";

export default function Confirm({
  open,
  title,
  description,
  confirmLabel = "Ya, Logout",
  cancelLabel = "Batal",
  loading = false,
  onConfirm,
  onClose,
}) {
  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 py-6 m-0 transition-all duration-200 ${
        open ? "bg-primary/18 opacity-100" : "pointer-events-none bg-primary/0 opacity-0"
      }`}
      aria-hidden={!open}
    >
      <div
        className={`w-full max-w-md rounded-sm border border-primary/15 bg-white text-foreground shadow-[0_18px_56px_-26px_rgba(36,54,115,0.42)] transition-all duration-200 ease-out ${
          open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
      >
        <div className="flex items-start gap-3 border-b border-border/70 px-5 py-7">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-primary/12 bg-primary/6 text-primary">
            <AlertTriangle size={18} />
          </div>

          <div className="min-w-0 flex-1 space-y-1">
            <p
              id="confirm-title"
              className="text-xl font-semibold tracking-tight text-foreground"
            >
              {title}
            </p>
            <p className="text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-sm border border-transparent p-1 text-muted-foreground transition hover:border-border hover:bg-muted hover:text-foreground"
            aria-label="Tutup konfirmasi"
          >
            <X size={16} />
          </button>
        </div>

        {/* <div className="px-5 py-4">
          <div className="rounded-sm border border-border/80 bg-muted/25 px-4 py-3 text-sm leading-6 text-muted-foreground">
            Anda akan keluar dari dashboard dan perlu login kembali untuk
            mengakses data arsip sekolah.
          </div>
        </div> */}

        <div className="flex flex-col-reverse gap-2 px-5 py-4 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            className="h-10 w-full border-border/80 px-4 py-2 text-sm shadow-none sm:w-fit"
            onClick={onClose}
            disabled={loading}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            className="h-10 w-full px-4 py-2 text-sm shadow-none sm:w-fit"
            onClick={onConfirm}
            disabled={loading}
          >
            <LogOut />
            {loading ? "Memproses..." : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
