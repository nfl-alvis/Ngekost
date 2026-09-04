"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";

/**
 * Modal dialog sederhana ala shadcn: portal tidak perlu (render conditional),
 * backdrop klik-tutup, Escape tutup, lock scroll body.
 */
export function Dialog({
  open,
  onClose,
  className,
  children,
}: {
  open: boolean;
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-nk-dark/40 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={cn(
          "relative w-full max-w-md rounded-lg border border-nk-border bg-nk-surface p-6 shadow-xl",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Tutup"
          onClick={onClose}
          className="absolute right-4 top-4 text-nk-text-muted transition-colors hover:text-nk-text"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}

/** Tombol X saja, untuk parent yang mau atur posisi sendiri */
export function DialogClose({ onClose, className }: { onClose: () => void; className?: string }) {
  return (
    <button
      type="button"
      aria-label="Tutup"
      onClick={onClose}
      className={cn("text-nk-text-muted transition-colors hover:text-nk-text", className)}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
    </button>
  );
}
