"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";

type GeoResult = {
  name: string;
  formatted: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  country: string;
  resultType: string;
  category: string;
  lon: number | null;
  lat: number | null;
};

export type LocationPick =
  | { kind: "query"; text: string }
  | { kind: "nearby"; lat: number; lon: number }
  | { kind: "campus"; label: string; city: string }
  | { kind: "area"; label: string; city: string }
  | { kind: "station"; label: string; city: string };

const TABS = ["campus", "area", "station"] as const;
type Tab = (typeof TABS)[number];

const QUICK_OPTIONS: Record<Tab, { label: string; city: string }[]> = {
  campus: [
    { label: "UGM", city: "Yogyakarta" },
    { label: "UI", city: "Jakarta" },
    { label: "ITB", city: "Bandung" },
    { label: "ITS", city: "Surabaya" },
    { label: "UNPAD", city: "Bandung" },
    { label: "UNAIR", city: "Surabaya" },
    { label: "UNDIP", city: "Semarang" },
    { label: "UB", city: "Malang" },
    { label: "UNY", city: "Yogyakarta" },
    { label: "BINUS", city: "Jakarta" },
  ],
  area: [
    { label: "Dago", city: "Bandung" },
    { label: "Setiabudi", city: "Bandung" },
    { label: "Kotabaru", city: "Yogyakarta" },
    { label: "Caturtunggal", city: "Yogyakarta" },
    { label: "Menteng", city: "Jakarta" },
    { label: "Tebet", city: "Jakarta" },
    { label: "Wonokromo", city: "Surabaya" },
    { label: "Sumbersari", city: "Malang" },
    { label: "Dinoyo", city: "Malang" },
    { label: "Tembalang", city: "Semarang" },
  ],
  station: [
    { label: "Stasiun Bandung", city: "Bandung" },
    { label: "Stasiun Tugu", city: "Yogyakarta" },
    { label: "Stasiun Gambir", city: "Jakarta" },
    { label: "Stasiun Gubeng", city: "Surabaya" },
    { label: "Halte Trans Bandung Dago", city: "Dago, Bandung" },
    { label: "Halte Trans Jogja UGM", city: "Yogyakarta" },
    { label: "Halte TransJakarta Monas", city: "Jakarta" },
    { label: "Stasiun Lempuyangan", city: "Yogyakarta" },
    { label: "Stasiun Kiaracondong", city: "Bandung" },
    { label: "Stasiun Malang", city: "Malang" },
  ],
};

export default function LocationSearchPopup({
  open,
  onClose,
  onPick,
  anchorRef,
}: {
  open: boolean;
  onClose: () => void;
  onPick: (pick: LocationPick) => void;
  anchorRef: React.RefObject<HTMLElement | null>;
}) {
  const t = useTranslations("hero");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeoResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("campus");
  const abortRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [anchorRect, setAnchorRect] = useState<{
    left: number;
    width: number;
    top: number;
    flip: boolean;
    maxH: number;
  } | null>(null);

  // Measure the anchor (the form) once on open, so the portalled panel can
  // align itself under it. If there is not enough room below (short viewports),
  // flip the panel above the anchor and clamp its max height to the viewport.
  // Fixed positioning + portal = immune to ancestor overflow clipping.
  const GAP = 8;
  useEffect(() => {
    if (!open) return;
    const measure = () => {
      const el = anchorRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const spaceBelow = vh - r.bottom;
      const EST_HEIGHT = 230;
      const flip = spaceBelow < EST_HEIGHT + GAP && r.top > EST_HEIGHT;
      const maxH = flip ? r.top - GAP * 2 : spaceBelow - GAP * 2;
      setAnchorRect({
        left: r.left,
        width: r.width,
        // below: panel top = anchor bottom + gap; flip: panel bottom = anchor top - gap
        top: flip ? r.top - GAP : r.bottom + GAP,
        flip,
        maxH: Math.max(160, maxH),
      });
    };
    const raf = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, [open, anchorRef]);

  // Debounced autocomplete — avoids burning through Geoapify requests.
  // 350ms idle window; aborted in-flight requests when a newer one fires.
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    const timer = setTimeout(async () => {
      const trimmed = query.trim();
      if (trimmed.length < 3) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const res = await fetch(
          `/api/geocode?text=${encodeURIComponent(trimmed)}`
        );
        if (!res.ok) throw new Error("geocode failed");
        const data = await res.json();
        if (!cancelled && !controller.signal.aborted) setResults(data.features || []);
      } catch {
        if (controller.signal.aborted) return;
        if (!cancelled) setResults([]);
      } finally {
        if (!cancelled && abortRef.current === controller) setLoading(false);
      }
    }, 350);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query, open]);

  // focus input on open — reset + focus in rAF (async), not sync in effect
  useEffect(() => {
    if (!open) return;
    const raf = requestAnimationFrame(() => {
      setQuery("");
      setResults([]);
      setActiveTab("campus");
      inputRef.current?.focus();
    });
    return () => cancelAnimationFrame(raf);
  }, [open]);

  // Esc to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const tabs = useMemo(
    () => TABS.map((tab) => ({ tab, label: t(`popup.tab.${tab}`) })),
    [t]
  );

  const handleNearby = useCallback(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onPick({
          kind: "nearby",
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
        onClose();
      },
      () => {
        // denied or unavailable — silently close
        onClose();
      }
    );
  }, [onPick, onClose]);

  if (!open) return null;

  if (!anchorRect || typeof document === "undefined") {
    // not yet measured (or SSR) — render nothing yet
    return null;
  }

  return createPortal(
    <>
      {/* backdrop */}
      <div
        className="fixed inset-0 z-40 bg-nk-text/30 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* popup panel — fixed so no ancestor overflow can clip it */}
      <div
        className="fixed z-50 overflow-y-auto rounded-lg border border-nk-border bg-nk-surface shadow-xl"
        style={{
          left: anchorRect.left,
          top: anchorRect.top,
          width: anchorRect.width,
          maxHeight: anchorRect.maxH,
          transform: anchorRect.flip ? "translateY(-100%)" : "none",
        }}
        role="dialog"
        aria-modal="true"
      >
        {/* search input */}
        <div className="flex items-center gap-2.5 border-b border-nk-border px-4 py-3">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-nk-text-muted" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("placeholder")}
            className="w-full bg-transparent text-sm text-nk-text outline-none placeholder:text-nk-text-muted"
            aria-label={t("placeholder")}
          />
          {loading && (
            <span className="text-xs text-nk-text-muted">{t("popup.searching")}</span>
          )}
        </div>

        {/* autocomplete results */}
        {results.length > 0 && (
          <ul className="max-h-64 overflow-y-auto border-b border-nk-border">
            {results.map((r, i) => (
              <li key={`${r.formatted}-${i}`}>
                <button
                  type="button"
                  onClick={() => {
                    onPick({ kind: "query", text: r.formatted });
                    onClose();
                  }}
                  className="flex w-full items-start gap-3 px-4 py-2.5 text-left transition-colors hover:bg-nk-warm"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-nk-text-muted" aria-hidden="true">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className="flex min-w-0 flex-col">
                    <span className="truncate text-sm font-medium text-nk-text">
                      {r.name || r.line1}
                    </span>
                    <span className="truncate text-xs text-nk-text-muted">
                      {r.line2 || r.formatted}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* nearby */}
        <div className="border-b border-nk-border px-4 py-3">
          <button
            type="button"
            onClick={handleNearby}
            className="inline-flex items-center gap-2 text-sm font-medium text-nk-accent transition-opacity hover:opacity-80"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
            </svg>
            {t("popup.nearby")}
          </button>
        </div>

        {/* tabs */}
        <div className="flex border-b border-nk-border">
          {tabs.map(({ tab, label }) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-2.5 text-sm transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-nk-accent font-medium text-nk-text"
                  : "text-nk-text-muted hover:text-nk-text"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* quick options for active tab */}
        <div className="flex flex-wrap gap-2 p-4">
          {QUICK_OPTIONS[activeTab].map((opt) => (
            <button
              key={opt.label}
              type="button"
              onClick={() => {
                onPick({ kind: activeTab, label: opt.label, city: opt.city });
                onClose();
              }}
              className="inline-flex items-center rounded-md border border-nk-dark-border bg-nk-bg px-3 py-1.5 text-xs font-medium text-nk-text transition-colors hover:bg-nk-section"
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      {/* popup panel */}
    </>,
    document.body
  );
}
