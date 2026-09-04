"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import DashboardShell from "@/components/DashboardShell";
import { StatusBadge } from "@/components/StatusBadge";
import { Dialog } from "@/components/ui/dialog";
import { ownerBookings } from "@/lib/data/entities";
import type { Booking } from "@/lib/data/types";
import { formatIDR } from "@/lib/utils";

type Tab = "all" | "pending" | "processing" | "done" | "rejected";

function statusBadge(b: Booking, tr: Record<string, string>) {
  switch (b.status) {
    case "pending":
      return <StatusBadge color="yellow">{tr.pending}</StatusBadge>;
    case "approved-awaiting-payment":
      return <StatusBadge color="blue">{tr.awaitPay}</StatusBadge>;
    case "active":
      return <StatusBadge color="green">{tr.active}</StatusBadge>;
    case "expired":
      return <StatusBadge color="red">{tr.expired}</StatusBadge>;
    case "rejected":
      return <StatusBadge color="red">{tr.rejected}</StatusBadge>;
    default:
      return <StatusBadge color="gray">{tr.cancelled}</StatusBadge>;
  }
}

export default function OwnerBookingsPage() {
  const t = useTranslations("owner.bookingsIn");
  const to = useTranslations("owner");
  const tb = useTranslations("myBookings");
  const [tab, setTab] = useState<Tab>("all");
  const [detail, setDetail] = useState<Booking | null>(null);
  const [rejectTarget, setRejectTarget] = useState<Booking | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [localStatus, setLocalStatus] = useState<Record<string, Booking["status"]>>({});

  const filtered = useMemo(() => {
    const withStatus = ownerBookings.map((b) => ({ ...b, status: localStatus[b.id] ?? b.status }));
    switch (tab) {
      case "pending":
        return withStatus.filter((b) => b.status === "pending");
      case "processing":
        return withStatus.filter((b) => b.status === "approved-awaiting-payment");
      case "done":
        return withStatus.filter((b) => b.status === "active");
      case "rejected":
        return withStatus.filter((b) => ["rejected", "expired", "cancelled"].includes(b.status));
      default:
        return withStatus;
    }
  }, [tab, localStatus]);

  const tabs: { id: Tab; label: string }[] = [
    { id: "all", label: t("tabAll") },
    { id: "pending", label: t("tabPending") },
    { id: "processing", label: t("tabProcessing") },
    { id: "done", label: t("tabDone") },
    { id: "rejected", label: t("tabRejected") },
  ];

  const tr: Record<string, string> = {
    pending: tb("statusPending"),
    awaitPay: tb("statusAwaitPay"),
    active: tb("statusActive"),
    expired: tb("statusExpired"),
    rejected: tb("statusRejected"),
    cancelled: tb("statusCancelled"),
  };

  const stages = ["diajukan", "disetujui", "menunggu-bayar", "lunas"] as const;
  const stageLabels: Record<(typeof stages)[number], string> = {
    diajukan: t("stageDiajukan"),
    disetujui: t("stageDisetujui"),
    "menunggu-bayar": t("stageMenungguBayar"),
    lunas: t("stageLunas"),
  };

  const setStatus = (id: string, status: Booking["status"]) => {
    setLocalStatus((prev) => ({ ...prev, [id]: status }));
    setRejectTarget(null);
    setRejectReason("");
  };

  const payStatusColor = { berhasil: "green", gagal: "red", pending: "yellow" } as const;

  return (
    <DashboardShell role="owner">
      <h1 className="mb-6 text-2xl font-medium tracking-tight text-nk-text">{t("title")}</h1>

      {/* tab filter */}
      <div className="no-scrollbar mb-5 flex gap-1 overflow-x-auto rounded-lg border border-nk-border bg-nk-surface p-1 lg:w-fit">
        {tabs.map((tab2) => (
          <button
            key={tab2.id}
            type="button"
            onClick={() => setTab(tab2.id)}
            className={`whitespace-nowrap rounded-md px-3.5 py-2 text-sm transition-colors ${
              tab === tab2.id
                ? "bg-nk-accent font-medium text-nk-text-inverse"
                : "text-nk-text-muted hover:text-nk-text"
            }`}
          >
            {tab2.label}
          </button>
        ))}
      </div>

      {/* desktop: tabel / mobile: card list */}
      <div className="hidden overflow-hidden rounded-lg border border-nk-border bg-nk-surface lg:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-nk-border text-left text-xs text-nk-text-muted">
              <th className="px-4 py-3 font-medium">{t("colName")}</th>
              <th className="px-4 py-3 font-medium">{t("colProperty")}</th>
              <th className="px-4 py-3 font-medium">{t("colDate")}</th>
              <th className="px-4 py-3 font-medium">{t("colStatus")}</th>
              <th className="px-4 py-3 font-medium">{t("colAction")}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr key={b.id} className="border-b border-nk-border last:border-b-0">
                <td className="px-4 py-3">
                  <p className="font-medium text-nk-text">{b.applicantName}</p>
                  <p className="font-mono text-xs text-nk-text-muted">{b.id}</p>
                </td>
                <td className="px-4 py-3 text-nk-text">
                  {b.propertyName}
                  <span className="block text-xs text-nk-text-muted">
                    {b.roomType} ({b.roomNumber})
                  </span>
                </td>
                <td className="px-4 py-3 text-nk-text-muted">
                  {new Date(b.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                </td>
                <td className="px-4 py-3">{statusBadge(b, tr)}</td>
                <td className="px-4 py-3">
                  {b.status === "pending" ? (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setStatus(b.id, "approved-awaiting-payment")}
                        className="rounded-md bg-[#2F6B3C] px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
                      >
                        {to("approve")}
                      </button>
                      <button
                        type="button"
                        onClick={() => setRejectTarget(b)}
                        className="rounded-md border border-[#EBC4C0] px-3 py-1.5 text-xs font-medium text-[#9C3B32] transition-colors hover:bg-[#FAEAE8] active:scale-[0.98]"
                      >
                        {to("reject")}
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setDetail(b)}
                      className="rounded-md border border-nk-border px-3 py-1.5 text-xs text-nk-text transition-colors hover:bg-nk-warm"
                    >
                      {t("viewDetail")}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* mobile card list */}
      <div className="flex flex-col gap-3 lg:hidden">
        {filtered.map((b) => (
          <article key={b.id} className="rounded-lg border border-nk-border bg-nk-surface p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-nk-text">{b.applicantName}</p>
                <p className="truncate text-xs text-nk-text-muted">
                  {b.propertyName} · {b.roomType} ({b.roomNumber})
                </p>
                <p className="mt-0.5 text-xs text-nk-text-muted">
                  {new Date(b.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
              {statusBadge(b, tr)}
            </div>
            <div className="mt-3 flex gap-2">
              {b.status === "pending" ? (
                <>
                  <button
                    type="button"
                    onClick={() => setStatus(b.id, "approved-awaiting-payment")}
                    className="flex-1 rounded-md bg-[#2F6B3C] px-3 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90"
                  >
                    {to("approve")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setRejectTarget(b)}
                    className="flex-1 rounded-md border border-[#EBC4C0] px-3 py-2 text-xs font-medium text-[#9C3B32] transition-colors hover:bg-[#FAEAE8]"
                  >
                    {to("reject")}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setDetail(b)}
                  className="w-full rounded-md border border-nk-border px-3 py-2 text-xs text-nk-text transition-colors hover:bg-nk-warm"
                >
                  {t("viewDetail")}
                </button>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* modal detail */}
      <Dialog open={detail !== null} onClose={() => setDetail(null)} className="max-w-lg">
        {detail && (
          <>
            <h2 className="pr-8 text-lg font-medium text-nk-text">{t("detailTitle")}</h2>
            <p className="mt-0.5 font-mono text-xs text-nk-text-muted">{detail.id}</p>

            <h3 className="mb-2 mt-5 text-sm font-medium text-nk-text">{t("applicant")}</h3>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
              <dt className="text-nk-text-muted">{t("colName")}</dt>
              <dd className="text-right font-medium text-nk-text">{detail.applicantName}</dd>
              <dt className="text-nk-text-muted">Telepon</dt>
              <dd className="text-right text-nk-text">{detail.applicantPhone}</dd>
              <dt className="text-nk-text-muted">Email</dt>
              <dd className="truncate text-right text-nk-text">{detail.applicantEmail}</dd>
            </dl>

            <h3 className="mb-2 mt-5 text-sm font-medium text-nk-text">{t("requested")}</h3>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
              <dt className="text-nk-text-muted">{t("colProperty")}</dt>
              <dd className="text-right font-medium text-nk-text">
                {detail.propertyName} · {detail.roomType} ({detail.roomNumber})
              </dd>
              <dt className="text-nk-text-muted">{tb("startDate")}</dt>
              <dd className="text-right text-nk-text">{detail.startDate}</dd>
              <dt className="text-nk-text-muted">Harga</dt>
              <dd className="text-right text-nk-text">{formatIDR(detail.monthlyPrice)}/bln</dd>
            </dl>

            <h3 className="mb-3 mt-5 text-sm font-medium text-nk-text">{t("timeline")}</h3>
            <ol className="flex flex-col gap-0">
              {stages.map((stage) => {
                const hit = detail.timeline.find((tl) => tl.stage === stage);
                return (
                  <li key={stage} className="flex items-center gap-3">
                    <span className={`size-2 shrink-0 rounded-full ${hit ? "bg-nk-accent" : "bg-nk-border"}`} aria-hidden="true" />
                    <span className={hit ? "text-sm text-nk-text" : "text-sm text-nk-text-muted/50"}>
                      {stageLabels[stage]}
                      {hit && (
                        <span className="ml-2 text-xs text-nk-text-muted">
                          {new Date(hit.at).toLocaleString("id-ID")}
                        </span>
                      )}
                    </span>
                  </li>
                );
              })}
            </ol>

            <h3 className="mb-2 mt-5 text-sm font-medium text-nk-text">{t("payments")}</h3>
            {detail.payments?.length ? (
              <ul className="flex flex-col gap-2">
                {detail.payments.map((p) => (
                  <li key={p.id} className="flex items-center justify-between rounded-md border border-nk-border px-3 py-2 text-sm">
                    <span className="font-mono text-xs text-nk-text-muted">{p.id}</span>
                    <span className="text-nk-text">{formatIDR(p.amount)}</span>
                    <StatusBadge color={payStatusColor[p.status]}>
                      {p.status === "berhasil" ? t("payBerhasil") : p.status === "gagal" ? t("payGagal") : t("payPending")}
                    </StatusBadge>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-nk-text-muted">{t("noPayments")}</p>
            )}
          </>
        )}
      </Dialog>

      {/* modal reject */}
      <Dialog open={rejectTarget !== null} onClose={() => setRejectTarget(null)} className="max-w-sm">
        {rejectTarget && (
          <>
            <h2 className="pr-8 text-lg font-medium text-nk-text">{t("rejectTitle")}</h2>
            <p className="mt-1 text-sm text-nk-text-muted">
              {rejectTarget.applicantName} · {rejectTarget.propertyName} ({rejectTarget.roomNumber})
            </p>
            <label htmlFor="reject-reason" className="mt-5 block text-sm font-medium text-nk-text">
              {t("rejectReason")}
            </label>
            <textarea
              id="reject-reason"
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="mt-2 w-full resize-none rounded-lg border border-nk-border bg-nk-surface px-4 py-3 text-sm text-nk-text outline-none focus:border-nk-accent"
            />
            <button
              type="button"
              onClick={() => setStatus(rejectTarget.id, "rejected")}
              className="mt-4 w-full rounded-lg bg-[#9C3B32] px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 active:scale-[0.99]"
            >
              {t("rejectConfirm")}
            </button>
          </>
        )}
      </Dialog>
    </DashboardShell>
  );
}

