"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function WhyFaq() {
  const t = useTranslations("why.faq");
  const [open, setOpen] = useState(0);

  return (
    <div className="divide-y divide-nk-border border-y border-nk-border">
      {[0, 1, 2, 3].map((i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-3 py-4 text-left"
            >
              <span className="text-xs tabular-nums text-nk-text-muted">
                {String(i + 1).padStart(2, "0")}.
              </span>
              <span className="flex-1 text-sm tracking-tight text-nk-text sm:text-base">
                {t(`items.${i}.q`)}
              </span>
              <span
                className="text-base text-nk-text-muted"
                aria-hidden="true"
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && (
              <p className="pb-4 pl-7 pr-6 text-sm leading-relaxed text-nk-text-muted">
                {t(`items.${i}.a`)}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
