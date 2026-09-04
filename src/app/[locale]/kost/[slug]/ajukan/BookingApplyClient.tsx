"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Link, useRouter as useI18nRouter } from "@/i18n/navigation";
import { getPropertyBySlug } from "@/lib/data/properties";
import { formatIDR } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function BookingApplyPage() {
  const t = useTranslations("booking");
  const params = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const i18nRouter = useI18nRouter();

  const slug = params.slug;
  const property = getPropertyBySlug(slug);
  const roomId = searchParams.get("kamar") ?? property?.roomTypes[0]?.id ?? "";
  const roomType = property?.roomTypes.find((r) => r.id === roomId) ?? property?.roomTypes[0];

  const [startDate, setStartDate] = useState("");
  const [note, setNote] = useState("");
  const [agree, setAgree] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!property || !roomType) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center lg:px-10">
        <p className="text-sm text-nk-text-muted">404</p>
        <Link href="/kost" className="mt-3 inline-block text-sm text-nk-text underline underline-offset-4">
          {"/kost"}
        </Link>
      </div>
    );
  }

  const dp = property.dpAmount;
  const canSubmit = Boolean(startDate) && agree;

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-10 lg:px-10">
      {/* breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-nk-text-muted">
        <Link href={`/kost/${property.slug}`} className="transition-colors hover:text-nk-text">
          {t("breadcrumbDetail")}
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-nk-text">{t("breadcrumbApply")}</span>
      </nav>

      {/* ringkasan kamar (read-only) */}
      <section className="mb-8 flex items-center gap-4 rounded-lg border border-nk-border bg-nk-surface p-4">
        <img
          src={`https://picsum.photos/seed/${property.imageSeed}/160/120`}
          alt={property.name}
          className="h-16 w-24 shrink-0 rounded-md object-cover"
        />
        <div className="min-w-0">
          <h2 className="truncate text-base font-medium text-nk-text">{property.name}</h2>
          <p className="truncate text-sm text-nk-text-muted">
            {t("summary")} · {roomType.name} · {formatIDR(roomType.pricePerMonth)}{t("perMonth")}
          </p>
        </div>
      </section>

      <h1 className="mb-6 text-2xl font-medium tracking-tight text-nk-text">{t("breadcrumbApply")}</h1>

      {/* form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (canSubmit) setSubmitted(true);
        }}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="startDate" className="text-sm font-medium text-nk-text">
            {t("startDate")}
          </label>
          <input
            id="startDate"
            type="date"
            required
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="rounded-lg border border-nk-border bg-nk-surface px-4 py-3 text-sm text-nk-text outline-none focus:border-nk-accent"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="note" className="text-sm font-medium text-nk-text">
            {t("note")}
          </label>
          <textarea
            id="note"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={t("notePlaceholder")}
            className="resize-none rounded-lg border border-nk-border bg-nk-surface px-4 py-3 text-sm text-nk-text outline-none placeholder:text-nk-text-muted focus:border-nk-accent"
          />
        </div>

        {/* ringkasan biaya */}
        <div className="rounded-lg border border-nk-border bg-nk-surface p-5">
          <h3 className="mb-3 text-sm font-medium text-nk-text">{t("costSummary")}</h3>
          <dl className="flex flex-col gap-2 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-nk-text-muted">{t("rent")}</dt>
              <dd className="font-medium text-nk-text">
                {formatIDR(roomType.pricePerMonth)}{t("perMonth")}
              </dd>
            </div>
            {dp != null ? (
              <>
                <div className="flex items-center justify-between">
                  <dt className="text-nk-text-muted">{t("dp")}</dt>
                  <dd className="font-medium text-nk-text">{formatIDR(dp)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-nk-text-muted">{t("dpRemainder")}</dt>
                  <dd className="font-medium text-nk-text">
                    {formatIDR(roomType.pricePerMonth - dp)}
                  </dd>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-between">
                <dt className="text-nk-text-muted">{t("fullPayment")}</dt>
                <dd className="font-medium text-nk-text">{formatIDR(roomType.pricePerMonth)}</dd>
              </div>
            )}
          </dl>
        </div>

        <label className="flex cursor-pointer items-start gap-3 text-sm text-nk-text">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="mt-0.5 size-4 accent-[#3A2618]"
          />
          {t("agree")}
        </label>

        <button
          type="submit"
          disabled={!canSubmit}
          className="rounded-lg bg-nk-accent px-6 py-3.5 text-sm font-medium text-nk-text-inverse transition-opacity hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {t("submit")}
        </button>
      </form>

      {/* modal sukses */}
      <Dialog open={submitted} onOpenChange={(o) => !o && setSubmitted(false)}>
        <DialogContent className="max-w-sm text-center">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-[#E9F4EC] text-[#2F6B3C]">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h2 className="text-lg font-medium text-nk-text">{t("successTitle")}</h2>
        <p className="mt-2 text-sm text-nk-text-muted">{t("successBody")}</p>
        <button
          type="button"
          onClick={() => i18nRouter.push("/bookings")}
          className="mt-6 w-full rounded-lg bg-nk-accent px-5 py-3 text-sm font-medium text-nk-text-inverse transition-opacity hover:opacity-90 active:scale-[0.99]"
        >
          {t("successCta")}
        </button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
