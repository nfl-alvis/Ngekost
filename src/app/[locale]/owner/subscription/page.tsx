"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import DashboardShell from "@/components/DashboardShell";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { subscriptionState, subscriptionPlans } from "@/lib/data/entities";
import { formatIDR, cn } from "@/lib/utils";

export default function OwnerSubscriptionPage() {
  const t = useTranslations("owner.subscription");
  const [state, setState] = useState(subscriptionState);
  const [cancelOpen, setCancelOpen] = useState(false);

  const statusBadge = () => {
    switch (state.status) {
      case "trial":
        return <span className="rounded-full border border-[#EAD9A8] bg-[#FBF3DC] px-3 py-1 text-xs font-medium text-[#8A6A1F]">{t("statusTrial")}</span>;
      case "active":
        return <span className="rounded-full border border-[#BFDCC5] bg-[#E9F4EC] px-3 py-1 text-xs font-medium text-[#2F6B3C]">{t("statusActive")}</span>;
      case "grace":
        return <span className="rounded-full border border-[#EBC4C0] bg-[#FAEAE8] px-3 py-1 text-xs font-medium text-[#9C3B32]">{t("statusGrace")}</span>;
      default:
        return <span className="rounded-full border border-nk-border bg-nk-section px-3 py-1 text-xs font-medium text-nk-text-muted">{t("statusExpired")}</span>;
    }
  };

  const endDate =
    state.status === "trial"
      ? t("trialLeft", { days: state.trialDaysLeft ?? 0 })
      : t("activeUntil", { date: state.activeUntil ?? "" });

  return (
    <DashboardShell role="owner">
      <h1 className="mb-2 text-2xl font-medium tracking-tight text-nk-text">{t("title")}</h1>
      <div className="mb-8 flex flex-wrap items-center gap-3">
        {statusBadge()}
        <span className="text-sm text-nk-text-muted">{endDate}</span>
      </div>

      {/* kartu paket */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {subscriptionPlans.map((plan) => {
          const isCurrent = plan.id === state.planId;
          const highlighted = plan.recommended;
          return (
            <article
              key={plan.id}
              className={cn(
                "relative flex flex-col rounded-lg border bg-nk-surface p-6",
                highlighted ? "border-nk-accent border-2" : "border-nk-border"
              )}
            >
              {highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-nk-accent px-3 py-0.5 text-xs font-medium text-nk-text-inverse">
                  {t("recommended")}
                </span>
              )}
              <h2 className="text-lg font-medium text-nk-text">{plan.name}</h2>
              <p className="mt-1 flex items-baseline gap-1">
                <span className="text-3xl font-semibold tracking-tight text-nk-text">
                  {formatIDR(plan.pricePerMonth)}
                </span>
                <span className="text-sm text-nk-text-muted">/bln</span>
              </p>

              <ul className="mt-5 flex flex-1 flex-col gap-2.5 text-sm text-nk-text">
                <li className="flex items-start gap-2">
                  <Check /> <span>{plan.maxProperties === null ? t("maxPropertiesUnlimited") : t("maxProperties", { count: plan.maxProperties })}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check /> <span>{plan.maxRooms === null ? t("maxRoomsUnlimited") : t("maxRooms", { count: plan.maxRooms })}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check /> <span>{t("analytics")}: {plan.advancedAnalytics ? t("yes") : t("no")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check /> <span>{t("autoMessages")}: {plan.autoMessages ? t("yes") : t("no")}</span>
                </li>
              </ul>

              {isCurrent ? (
                <div className="mt-6 rounded-lg border border-nk-border bg-nk-section px-4 py-2.5 text-center text-sm text-nk-text-muted">
                  {t("currentPlan")}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setState({ ...state, planId: plan.id, status: "active" })}
                  className={cn(
                    "mt-6 rounded-lg px-4 py-2.5 text-sm font-medium transition-all active:scale-[0.99]",
                    highlighted
                      ? "bg-nk-accent text-nk-text-inverse hover:opacity-90"
                      : "border border-nk-border text-nk-text hover:bg-nk-warm"
                  )}
                >
                  {state.status === "trial" ? t("choose") : t("renew")}
                </button>
              )}
            </article>
          );
        })}
      </div>

      {/* cancel subscription */}
      <div className="mt-10 border-t border-nk-border pt-6">
        <button
          type="button"
          onClick={() => setCancelOpen(true)}
          className="text-sm text-[#9C3B32] underline underline-offset-4 transition-opacity hover:opacity-80"
        >
          {t("cancelTitle")}
        </button>
      </div>

      <Dialog open={cancelOpen} onOpenChange={(o) => !o && setCancelOpen(false)}>
        <DialogContent className="max-w-sm">
        <h2 className="pr-8 text-lg font-medium text-nk-text">{t("cancelTitle")}</h2>
        <p className="mt-2 text-sm text-nk-text-muted">
          {t("cancelBody", { date: state.activeUntil ?? "30 Sep 2026" })}
        </p>
        <button
          type="button"
          onClick={() => {
            setState({ ...state, status: "grace" });
            setCancelOpen(false);
          }}
          className="mt-5 w-full rounded-lg bg-[#9C3B32] px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 active:scale-[0.99]"
        >
          {t("cancelConfirm")}
        </button>
      </DialogContent>
      </Dialog>
    </DashboardShell>
  );
}

function Check() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-[#2F6B3C]" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
