"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { CITIES } from "@/lib/data/properties";

export default function SearchBar() {
  const t = useTranslations("hero");
  const router = useRouter();
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (city) params.set("kota", city);
    router.push(`/kost${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <form
      onSubmit={submit}
      className="flex w-full max-w-2xl flex-col gap-0 border-b border-nk-border sm:flex-row"
    >
      <div className="flex flex-1 items-center gap-2.5 border-b border-nk-border px-4 py-3 sm:border-b-0 sm:border-r">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-nk-text-muted" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t("placeholder")}
          className="w-full bg-transparent text-xs uppercase tracking-widest text-nk-text outline-none placeholder:text-nk-text-muted"
          aria-label={t("placeholder")}
        />
      </div>

      <div className="flex items-center gap-2.5 border-b border-nk-border px-4 py-3 sm:border-b-0 sm:border-r">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-nk-text-muted" aria-hidden="true">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full cursor-pointer bg-transparent text-xs uppercase tracking-widest text-nk-text outline-none"
          aria-label={t("placeholder")}
        >
          <option value="">{t("popular")}</option>
          {CITIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="inline-flex h-11 items-center justify-center gap-2 bg-nk-accent px-6 text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-90 sm:h-auto"
      >
        {t("search")}
      </button>
    </form>
  );
}