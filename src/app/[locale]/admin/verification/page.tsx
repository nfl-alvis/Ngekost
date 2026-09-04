"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import DashboardShell from "@/components/DashboardShell";
import { Dialog } from "@/components/ui/dialog";
import { verificationQueue } from "@/lib/data/entities";
import type { AdminReviewEntry } from "@/lib/data/types";

export default function AdminVerificationPage() {
  const t = useTranslations("admin.queue");
  const [queue, setQueue] = useState<AdminReviewEntry[]>(verificationQueue);
  const [review, setReview] = useState<AdminReviewEntry | null>(null);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [reasonError, setReasonError] = useState(false);
  const [approveConfirm, setApproveConfirm] = useState(false);

  const decide = () => {
    if (!review) return;
    setQueue((prev) => prev.filter((p) => p.id !== review.id));
    setReview(null);
    setRejectOpen(false);
    setApproveConfirm(false);
    setRejectReason("");
    setReasonError(false);
  };

  return (
    <DashboardShell role="admin">
      <div className="mb-6 flex items-center gap-3">
        <h1 className="text-2xl font-medium tracking-tight text-nk-text">{t("title")}</h1>
        {queue.length > 0 && (
          <span className="rounded-full bg-nk-accent px-2.5 py-0.5 text-xs font-medium text-nk-text-inverse">
            {t("pendingBadge", { count: queue.length })}
          </span>
        )}
      </div>

      {queue.length === 0 ? (
        <div className="flex flex-col items-center rounded-lg border border-dashed border-nk-border px-6 py-16 text-center">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-nk-text-muted" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
          <p className="text-sm text-nk-text-muted">{t("empty")}</p>
        </div>
      ) : (
        <>
          {/* desktop tabel */}
          <div className="hidden overflow-hidden rounded-lg border border-nk-border bg-nk-surface lg:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-nk-border text-left text-xs text-nk-text-muted">
                  <th className="px-4 py-3 font-medium">{t("colProperty")}</th>
                  <th className="px-4 py-3 font-medium">{t("colOwner")}</th>
                  <th className="px-4 py-3 font-medium">{t("colCity")}</th>
                  <th className="px-4 py-3 font-medium">{t("colDate")}</th>
                  <th className="px-4 py-3 font-medium">{t("colAction")}</th>
                </tr>
              </thead>
              <tbody>
                {queue.map((p) => (
                  <tr key={p.id} className="border-b border-nk-border last:border-b-0">
                    <td className="px-4 py-3 font-medium text-nk-text">{p.propertyName}</td>
                    <td className="px-4 py-3 text-nk-text">{p.ownerName}</td>
                    <td className="px-4 py-3 text-nk-text">{p.city}</td>
                    <td className="px-4 py-3 text-nk-text-muted">{p.submittedAt}</td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => setReview(p)}
                        className="rounded-md border border-nk-border px-3 py-1.5 text-xs text-nk-text transition-colors hover:bg-nk-warm"
                      >
                        {t("review")}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* mobile cards */}
          <div className="flex flex-col gap-3 lg:hidden">
            {queue.map((p) => (
              <article key={p.id} className="rounded-lg border border-nk-border bg-nk-surface p-4">
                <p className="text-sm font-medium text-nk-text">{p.propertyName}</p>
                <p className="mt-0.5 text-xs text-nk-text-muted">
                  {p.ownerName} · {p.city}
                </p>
                <p className="mt-0.5 text-xs text-nk-text-muted">{p.submittedAt}</p>
                <button
                  type="button"
                  onClick={() => setReview(p)}
                  className="mt-3 w-full rounded-md border border-nk-border px-3 py-2 text-xs text-nk-text transition-colors hover:bg-nk-warm"
                >
                  {t("review")}
                </button>
              </article>
            ))}
          </div>
        </>
      )}

      {/* modal review */}
      <Dialog
        open={review !== null}
        onClose={() => {
          setReview(null);
          setRejectOpen(false);
          setApproveConfirm(false);
          setReasonError(false);
        }}
        className="max-w-lg"
      >
        {review && (
          <>
            <h2 className="pr-8 text-lg font-medium text-nk-text">{t("detailTitle")}</h2>
            <p className="mt-0.5 font-mono text-xs text-nk-text-muted">{review.id}</p>

            <div className="mt-4 flex items-center gap-4">
              <img
                src={`https://picsum.photos/seed/${review.propertySlug}/160/120`}
                alt={review.propertyName}
                className="h-16 w-24 shrink-0 rounded-md object-cover"
              />
              <div className="min-w-0">
                <p className="truncate text-base font-medium text-nk-text">{review.propertyName}</p>
                <p className="truncate text-sm text-nk-text-muted">{review.city}</p>
              </div>
            </div>

            <h3 className="mb-2 mt-5 text-sm font-medium text-nk-text">{t("ownerData")}</h3>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
              <dt className="text-nk-text-muted">{t("colOwner")}</dt>
              <dd className="text-right font-medium text-nk-text">{review.ownerName}</dd>
              <dt className="text-nk-text-muted">Email</dt>
              <dd className="truncate text-right text-nk-text">{review.ownerEmail}</dd>
              <dt className="text-nk-text-muted">{t("ownerJoined")}</dt>
              <dd className="text-right text-nk-text">{review.ownerJoinedAt}</dd>
            </dl>

            {!rejectOpen && !approveConfirm && (
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setApproveConfirm(true)}
                  className="flex-1 rounded-lg bg-[#2F6B3C] px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 active:scale-[0.99]"
                >
                  {t("approve")}
                </button>
                <button
                  type="button"
                  onClick={() => setRejectOpen(true)}
                  className="flex-1 rounded-lg border border-[#EBC4C0] px-5 py-3 text-sm font-medium text-[#9C3B32] transition-colors hover:bg-[#FAEAE8] active:scale-[0.99]"
                >
                  {t("reject")}
                </button>
              </div>
            )}

            {/* inline: konfirmasi approve */}
            {approveConfirm && (
              <div className="mt-6 rounded-lg border border-[#BFDCC5] bg-[#E9F4EC] p-4">
                <p className="text-sm font-medium text-[#2F6B3C]">{t("approveConfirmTitle")}</p>
                <p className="mt-1 text-xs text-[#2F6B3C]/80">{t("approveConfirmBody")}</p>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={decide}
                    className="rounded-md bg-[#2F6B3C] px-4 py-2 text-xs font-medium text-white hover:opacity-90"
                  >
                    {t("approveConfirmCta")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setApproveConfirm(false)}
                    className="rounded-md border border-nk-border px-4 py-2 text-xs text-nk-text hover:bg-nk-surface"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            {/* inline: reject dengan alasan wajib */}
            {rejectOpen && (
              <div className="mt-6 rounded-lg border border-[#EBC4C0] bg-[#FAEAE8] p-4">
                <p className="text-sm font-medium text-[#9C3B32]">{t("rejectTitle")}</p>
                <label htmlFor="admin-reject-reason" className="mt-3 block text-xs font-medium text-[#9C3B32]">
                  {t("rejectReason")}
                </label>
                <textarea
                  id="admin-reject-reason"
                  rows={3}
                  value={rejectReason}
                  onChange={(e) => {
                    setRejectReason(e.target.value);
                    setReasonError(false);
                  }}
                  className="mt-1.5 w-full resize-none rounded-md border border-[#EBC4C0] bg-nk-surface px-3 py-2 text-sm text-nk-text outline-none focus:border-[#9C3B32]"
                />
                {reasonError && (
                  <p className="mt-1.5 text-xs font-medium text-[#9C3B32]">{t("rejectReasonRequired")}</p>
                )}
                <button
                  type="button"
                  onClick={() => {
                    if (!rejectReason.trim()) {
                      setReasonError(true);
                      return;
                    }
                    decide();
                  }}
                  className="mt-3 w-full rounded-md bg-[#9C3B32] px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 active:scale-[0.99]"
                >
                  {t("rejectConfirm")}
                </button>
              </div>
            )}
          </>
        )}
      </Dialog>
    </DashboardShell>
  );
}
