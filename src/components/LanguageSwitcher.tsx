"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const nextLocale = locale === "id" ? "en" : "id";

  function switchLocale() {
    router.replace(
      // @ts-expect-error — dynamic pathname with locale
      { pathname, params },
      { locale: nextLocale }
    );
  }

  return (
    <button
      onClick={switchLocale}
      className="inline-flex h-9 items-center gap-1.5 rounded-full border border-nk-border bg-nk-surface px-3.5 text-sm font-medium text-nk-text transition-colors hover:border-nk-accent hover:text-nk-accent"
      aria-label={locale === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3.6 9h16.8M3.6 15h16.8" />
        <path d="M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
      </svg>
      <span className="uppercase">{nextLocale}</span>
    </button>
  );
}
