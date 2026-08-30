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
      className="group block overflow-hidden rounded-xl border border-nk-border bg-nk-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-16px_rgba(28,25,23,0.18)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nk-accent"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={`https://picsum.photos/seed/${property.imageSeed}/800/600`}
          alt={property.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" aria-hidden="true" />
        <div className="absolute left-3 top-3 flex gap-2">
          {property.verified && (
            <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-nk-text backdrop-blur-sm">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              {t("verified")}
            </span>
          )}
          <span className="inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-nk-text backdrop-blur-sm">
            {t(GENDER_LABEL[property.gender])}
          </span>
        </div>
        <div className="absolute bottom-3 right-3 rounded-full bg-nk-text/80 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
          {formatDistance(property.distanceToCampusM)}
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div>
          <h3 className="truncate text-base font-semibold text-nk-text">
            {property.name}
          </h3>
          <p className="mt-0.5 flex items-center gap-1 text-sm text-nk-text-muted">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {property.district}, {property.city}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-nk-text">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2l2.9 6.26L21.5 9.27l-5 4.87L17.8 21 12 17.77 6.2 21l1.3-6.86-5-4.87 6.6-1.01L12 2z" />
            </svg>
            {property.rating.toFixed(1)}
          </span>
          <span className="text-xs text-nk-text-muted">({property.reviewCount})</span>
          <span className={cn(
            "ml-auto inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium",
            property.roomTypes.some((r) => r.available > 0)
              ? "bg-emerald-50 text-emerald-700"
              : "bg-nk-border/60 text-nk-text-muted"
          )}>
            {property.roomTypes.some((r) => r.available > 0)
              ? `${property.roomTypes.reduce((s, r) => s + r.available, 0)} ${t("available")}`
              : t("full")}
          </span>
        </div>

        <div className="flex items-baseline gap-1 border-t border-nk-border pt-3">
          <span className="text-xs text-nk-text-muted">{t("from")}</span>
          <span className="text-lg font-bold tracking-tight text-nk-accent">
            {formatIDR(property.minPrice)}
          </span>
          <span className="text-xs text-nk-text-muted">{t("perMonth")}</span>
        </div>
      </div>
    </Link>
  );
}
