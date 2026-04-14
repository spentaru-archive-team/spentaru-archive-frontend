import { Button } from "@/components/ui/button";
import { CheckCircle2, LogIn, LogOut, X } from "lucide-react";
import { useEffect, useState } from "react";

const iconMap = {
  login: LogIn,
  logout: LogOut,
  success: CheckCircle2,
};

export default function PopUp({
  open,
  title,
  description,
  type = "success",
  actionLabel = "Tutup",
  duration = 5000,
  onClose,
}) {
  const [isRendered, setIsRendered] = useState(open);
  const [isVisible, setIsVisible] = useState(open);

  useEffect(() => {
    if (open) {
      setIsRendered(true);
      const frame = window.requestAnimationFrame(() => {
        setIsVisible(true);
      });

      return () => window.cancelAnimationFrame(frame);
    }

    setIsVisible(false);
    const timer = window.setTimeout(() => {
      setIsRendered(false);
    }, 240);

    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open || !duration) return undefined;

    const timer = window.setTimeout(() => {
      onClose?.();
    }, duration);

    return () => window.clearTimeout(timer);
  }, [duration, onClose, open]);

  if (!isRendered) return null;

  const Icon = iconMap[type] || CheckCircle2;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-start justify-center px-4 py-6 sm:items-start sm:justify-end">
      <div
        className={`pointer-events-auto w-full max-w-sm rounded-sm border border-primary/15 bg-white text-foreground shadow-[0_14px_40px_-24px_rgba(36,54,115,0.38)] transition-all duration-200 ease-out ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-2 opacity-0 sm:translate-y-1"
        }`}
      >
        <div className="flex items-start gap-3 p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-primary/15 bg-primary/8 text-primary">
            <Icon size={18} />
          </div>

          <div className="min-w-0 flex-1 space-y-1">
            <p className="text-sm font-semibold text-foreground">{title}</p>
            <p className="text-sm leading-6 text-muted-foreground">
              {description}
            </p>
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

        <div className="flex items-center justify-end border-t border-border/70 px-4 py-3">
          <Button
            type="button"
            onClick={onClose}
            className="h-9 w-auto px-4 py-2 text-sm shadow-none"
          >
            {actionLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
