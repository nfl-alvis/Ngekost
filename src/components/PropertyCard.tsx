import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Property } from "@/lib/data/types";
import { formatIDR, formatDistance, cn } from "@/lib/utils";

const GENDER_LABEL: Record<Property["gender"], "genderMixed" | "genderMale" | "genderFemale"> = {
  mixed: "genderMixed",
  male: "genderMale",
  female: "genderFemale",
};

export default async function PropertyCard({ property }: { property: Property }) {
  const t = await getTranslations("card");

  return (
    <Link
      href={`/kost/${property.slug}`}
      className="group block rounded-xl border border-nk-border bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nk-accent"
    >
      <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-lg">
        <Image
          src={`https://picsum.photos/seed/${property.imageSeed}/800/450`}
          alt={property.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {property.verified && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-nk-text backdrop-blur-sm">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            {t("verified")}
          </span>
        )}
        <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
          {formatDistance(property.distanceToCampusM)}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <h3 className="truncate font-serif text-lg font-medium tracking-tight text-nk-text">
          {property.name}
        </h3>
        <span className="text-nk-text-muted">·</span>
        <span className="truncate font-serif text-lg font-medium tracking-tight text-nk-text-muted">
          {t(GENDER_LABEL[property.gender])}
        </span>
      </div>

      <p className="mt-1 flex items-center gap-1 text-sm text-nk-text-muted">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        {property.district}, {property.city}
      </p>

      <div className="mt-4 flex items-center gap-4 text-sm text-nk-text-muted">
        <span className="flex items-center gap-1.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 2l2.9 6.26L21.5 9.27l-5 4.87L17.8 21 12 17.77 6.2 21l1.3-6.86-5-4.87 6.6-1.01L12 2z" />
          </svg>
          {property.rating.toFixed(1)}
          <span className="text-xs text-nk-text-muted/70">({property.reviewCount})</span>
        </span>
        <span className="flex items-center gap-1.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2 4h20v14H2z" />
            <path d="M8 21h8" />
          </svg>
          {property.roomTypes.length} {t("roomTypes")}
        </span>
      </div>

      <div className="mt-4 flex items-baseline gap-1.5 border-t border-nk-border pt-4">
        <span className="text-xs text-nk-text-muted">{t("from")}</span>
        <span className="font-serif text-xl font-medium tracking-tight text-nk-text">
          {formatIDR(property.minPrice)}
        </span>
        <span className="text-xs text-nk-text-muted">{t("perMonth")}</span>
        <span className={cn(
          "ml-auto inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium",
          property.roomTypes.some((r) => r.available > 0)
            ? "bg-emerald-50 text-emerald-700"
            : "bg-nk-border/60 text-nk-text-muted"
        )}>
          {property.roomTypes.some((r) => r.available > 0)
            ? `${property.roomTypes.reduce((s, r) => s + r.available, 0)} ${t("available")}`
            : t("full")}
        </span>
      </div>
    </Link>
  );
}
