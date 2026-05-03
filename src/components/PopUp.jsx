import { CheckCircle2, LogIn, LogOut, X, XCircle } from "lucide-react";
import { useEffect } from "react";

const iconMap = {
  login: LogIn,
  logout: LogOut,
  success: CheckCircle2,
  error: XCircle,
};

export default function PopUp({
  open,
  title,
  type = "success",
  duration = 3000,
  onClose,
}) {
  useEffect(() => {
    if (!open || !duration) return undefined;

    const timer = window.setTimeout(() => {
      onClose?.();
    }, duration);

    return () => window.clearTimeout(timer);
  }, [duration, onClose, open]);

  const Icon = iconMap[type] || CheckCircle2;
  const isError = type === "error";
  const frameClassName = isError
    ? "border-destructive/20 text-destructive"
    : "border-primary/15 text-primary";
  const iconClassName = isError
    ? "border-destructive/20 bg-destructive/10 text-destructive"
    : "border-primary/15 bg-primary/8 text-primary";

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-100 flex items-start justify-center px-4 py-6 sm:items-start sm:justify-end ${
        open ? "" : "invisible"
      }`}
      aria-hidden={!open}
    >
      <div
        className={`pointer-events-auto w-full max-w-sm rounded-sm border bg-white text-foreground shadow-[0_14px_40px_-24px_rgba(36,54,115,0.38)] transition-all duration-300 ease-out ${frameClassName} ${
          open
            ? "translate-y-0 opacity-100 sm:translate-x-0"
            : "-translate-y-4 opacity-0 sm:translate-x-96"
        }`}
      >
        <div className="flex items-center gap-3 p-4">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border ${iconClassName}`}
          >
            <Icon size={18} />
          </div>

          <div className="min-w-0 flex-1 space-y-1">
            <p className="text-sm md:text-lg md:font-semibold text-foreground">{title}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-sm border border-transparent p-1 text-muted-foreground transition hover:border-border hover:bg-muted hover:text-foreground"
            aria-label="Tutup pop up"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
