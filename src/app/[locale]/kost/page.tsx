import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getVerifiedProperties } from "@/lib/data/properties";
import FilterPanel, { type FilterState } from "@/components/FilterPanel";
import PropertyCard from "@/components/PropertyCard";
import type { Property, Facility } from "@/lib/data/types";

export function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return params.then(({ locale }) => ({
    title: locale === "en" ? "Explore Boarding Houses" : "Jelajahi Kost",
  }));
}

function filterAndSort(list: Property[], filters: FilterState): Property[] {
  const result = list.filter((p) => {
    if (filters.kota && p.city !== filters.kota) return false;
    if (filters.maxPrice > 0 && p.minPrice > filters.maxPrice) return false;
    if (filters.gender && p.gender !== filters.gender) return false;
    if (filters.fasilitas.length > 0) {
      const pf = new Set(p.facilities);
      if (!filters.fasilitas.every((f) => pf.has(f as Facility))) return false;
    }
    return true;
  });

  switch (filters.sort) {
    case "price-asc":
      result.sort((a, b) => a.minPrice - b.minPrice);
      break;
    case "price-desc":
      result.sort((a, b) => b.minPrice - a.minPrice);
      break;
    default:
      result.sort((a, b) => b.rating - a.rating);
  }

  return result;
}

export default async function ListPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ kota?: string; max?: string; fas?: string | string[]; gender?: string; sort?: string }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations();

  const filterState: FilterState = {
    kota: sp.kota || "",
    maxPrice: Number(sp.max) || 0,
    fasilitas: Array.isArray(sp.fas) ? sp.fas : sp.fas ? [sp.fas] : [],
    gender: sp.gender || "",
    sort: sp.sort || "rating",
  };

  const all = getVerifiedProperties();
  const filtered = filterAndSort(all, filterState);

  return (
    <>
      {/* Header — editorial */}
      <section className="border-b border-nk-border">
        <div className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl font-medium tracking-tight md:text-5xl">
              {t("list.title")}
            </h1>
            <p className="mt-4 text-base text-nk-text-muted">
              {t("list.subtitle")}
            </p>
            <p className="mt-3 text-sm font-medium text-nk-text-muted">
              {t("list.resultCount", { count: filtered.length })}
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-6 py-12 lg:grid-cols-[300px_1fr] lg:px-10 lg:py-16">
        {/* Sidebar filter */}
        <aside>
          <FilterPanel state={filterState} />
        </aside>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p) => (
              <PropertyCard key={p.slug} property={p} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-6 grid size-16 place-items-center rounded-full bg-nk-section">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-nk-text-muted" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <h3 className="font-serif text-xl font-medium text-nk-text">{t("list.emptyTitle")}</h3>
            <p className="mt-2 max-w-sm text-sm text-nk-text-muted">{t("list.emptyBody")}</p>
          </div>
        )}
      </div>
    </>
  );
}
