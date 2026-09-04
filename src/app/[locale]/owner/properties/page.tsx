"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import DashboardShell from "@/components/DashboardShell";
import { StatusBadge } from "@/components/StatusBadge";
import { getOwnerProperties, subscriptionState } from "@/lib/data/entities";

export default function OwnerPropertiesPage() {
  const t = useTranslations("owner.properties");
  const router = useRouter();
  const props = getOwnerProperties();

  const isTrial = subscriptionState.status === "trial";
  const LIMIT = isTrial ? 1 : Infinity;
  const atLimit = props.filter((p) => p.verificationStatus === "verified").length >= LIMIT;

  if (props.length === 0) {
    return (
      <DashboardShell role="owner">
        <div className="flex flex-col items-center rounded-lg border border-dashed border-nk-border px-6 py-16 text-center">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-nk-text-muted" aria-hidden="true">
            <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
          </svg>
          <h2 className="text-lg font-medium text-nk-text">{t("emptyTitle")}</h2>
          <p className="mt-1 max-w-sm text-sm text-nk-text-muted">{t("emptyBody")}</p>
          <button
            type="button"
            className="mt-6 rounded-lg bg-nk-accent px-6 py-3 text-sm font-medium text-nk-text-inverse transition-opacity hover:opacity-90 active:scale-[0.99]"
          >
            {t("emptyCta")}
          </button>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell role="owner">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-medium tracking-tight text-nk-text">{t("title")}</h1>
        <div className="group relative w-fit">
          <button
            type="button"
            disabled={atLimit}
            aria-describedby={atLimit ? "limit-tooltip" : undefined}
            className="inline-flex items-center gap-2 rounded-lg bg-nk-accent px-4 py-2.5 text-sm font-medium text-nk-text-inverse transition-opacity hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-nk-section disabled:text-nk-text-muted"
          >
            {atLimit && (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="4" y="11" width="16" height="10" rx="2" />
                <path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </svg>
            )}
            {t("add")}
          </button>
          {atLimit && (
            <span
              id="limit-tooltip"
              role="tooltip"
              className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 hidden w-64 -translate-x-1/2 rounded-md border border-nk-border bg-nk-surface p-3 text-xs text-nk-text shadow-xl group-hover:block"
            >
              {t("addLocked")}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {props.map((p) => {
          const totalRooms = p.roomTypes.reduce((acc, rt) => acc + rt.total, 0);
          const filledRooms = p.roomTypes.reduce(
            (acc, rt) => acc + (rt.total - rt.available),
            0
          );
          return (
            <article key={p.slug} className="overflow-hidden rounded-lg border border-nk-border bg-nk-surface">
              <div className="relative">
                <img
                  src={`https://picsum.photos/seed/${p.imageSeed}/640/360`}
                  alt={p.name}
                  className="aspect-[16/9] w-full object-cover"
                />
                <div className="absolute right-2 top-2">
                  {p.verificationStatus === "verified" && (
                    <StatusBadge color="green">{t("verified")}</StatusBadge>
                  )}
                  {p.verificationStatus === "pending" && (
                    <StatusBadge color="yellow">{t("pending")}</StatusBadge>
                  )}
                  {p.verificationStatus === "rejected" && (
                    <StatusBadge color="red">{t("rejected")}</StatusBadge>
                  )}
                </div>
              </div>
              <div className="p-4">
                <h2 className="truncate text-base font-medium text-nk-text">{p.name}</h2>
                <p className="text-sm text-nk-text-muted">
                  {p.district}, {p.city}
                </p>

                {p.verificationStatus === "rejected" && p.verificationNote && (
                  <div className="mt-3 rounded-md border border-[#EBC4C0] bg-[#FAEAE8] p-3">
                    <p className="text-xs text-[#9C3B32]">
                      {t("rejectionReason", { reason: p.verificationNote })}
                    </p>
                    <button
                      type="button"
                      className="mt-2 text-xs font-medium text-[#9C3B32] underline underline-offset-4 hover:opacity-80"
                    >
                      {t("resubmit")}
                    </button>
                  </div>
                )}

                <div className="mt-3 flex items-center gap-3 text-xs text-nk-text-muted">
                  <span>{t("rooms", { count: totalRooms })}</span>
                  <span aria-hidden="true">·</span>
                  <span>{t("occupancy", { count: filledRooms, total: totalRooms })}</span>
                </div>

                <button
                  type="button"
                  onClick={() => router.push(`/owner/properties/${p.slug}`)}
                  className="mt-4 w-full rounded-lg border border-nk-border px-4 py-2.5 text-sm font-medium text-nk-text transition-colors hover:bg-nk-warm active:scale-[0.99]"
                >
                  {t("manage")}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </DashboardShell>
  );
}
