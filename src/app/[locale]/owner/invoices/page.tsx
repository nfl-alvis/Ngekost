"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import DashboardShell from "@/components/DashboardShell";
import { StatusBadge } from "@/components/StatusBadge";
import { Dialog } from "@/components/ui/dialog";
import { invoices as seedInvoices, tenants } from "@/lib/data/entities";
import type { Invoice } from "@/lib/data/types";
import { formatIDR } from "@/lib/utils";

export default function OwnerInvoicesPage() {
  const t = useTranslations("owner.invoices");
  const [filter, setFilter] = useState<"all" | "lunas" | "belum">("all");
  const [rows, setRows] = useState<Invoice[]>(seedInvoices);
  const [createOpen, setCreateOpen] = useState(false);
  const [newInv, setNewInv] = useState({ tenant: "", period: "", amount: "" });

  const filtered = useMemo(() => {
    if (filter === "lunas") return rows.filter((r) => r.status === "lunas");
    if (filter === "belum") return rows.filter((r) => r.status !== "lunas");
    return rows;
  }, [filter, rows]);

  const unpaidThisMonth = rows.filter((r) => r.status !== "lunas").length;
  const arrears = tenants.filter((tn) => tn.paymentStatus === "menunggak").length;

  const markPaid = (id: string) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status: "lunas" as const } : r)));

  const tabs = [
    { id: "all" as const, label: t("filterAll") },
    { id: "lunas" as const, label: t("statusLunas") },
    { id: "belum" as const, label: t("statusBelum") },
  ];

  const badge = (inv: Invoice) =>
    inv.status === "lunas" ? (
      <StatusBadge color="green">{t("statusLunas")}</StatusBadge>
    ) : (
      <StatusBadge color="yellow">{t("statusBelum")}</StatusBadge>
    );

  return (
    <DashboardShell role="owner">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-medium tracking-tight text-nk-text">{t("title")}</h1>
        <button
          type="button"
          onClick={() => setCreateOpen(true)}
          className="w-fit rounded-lg bg-nk-accent px-4 py-2.5 text-sm font-medium text-nk-text-inverse transition-opacity hover:opacity-90 active:scale-[0.99]"
        >
          {t("create")}
        </button>
      </div>

      {/* ringkasan */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:max-w-md">
        <div className="rounded-lg border border-nk-border bg-nk-surface p-4">
          <p className="text-xs text-nk-text-muted">{t("summaryUnpaid")}</p>
          <p className="mt-1 text-2xl font-semibold text-nk-text">{unpaidThisMonth}</p>
        </div>
        <div className="rounded-lg border border-nk-border bg-nk-surface p-4">
          <p className="text-xs text-nk-text-muted">{t("summaryArrears")}</p>
          <p className="mt-1 text-2xl font-semibold text-nk-text">{arrears}</p>
        </div>
      </div>

      {/* tab filter */}
      <div className="mb-5 flex gap-1 rounded-lg border border-nk-border bg-nk-surface p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilter(tab.id)}
            className={`rounded-md px-3.5 py-2 text-sm transition-colors ${
              filter === tab.id
                ? "bg-nk-accent font-medium text-nk-text-inverse"
                : "text-nk-text-muted hover:text-nk-text"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* desktop tabel */}
      <div className="hidden overflow-hidden rounded-lg border border-nk-border bg-nk-surface lg:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-nk-border text-left text-xs text-nk-text-muted">
              <th className="px-4 py-3 font-medium">{t("colTenant")}</th>
              <th className="px-4 py-3 font-medium">{t("colPeriod")}</th>
              <th className="px-4 py-3 font-medium">{t("colAmount")}</th>
              <th className="px-4 py-3 font-medium">{t("colStatus")}</th>
              <th className="px-4 py-3 font-medium">{t("colDue")}</th>
              <th className="px-4 py-3 font-medium">{t("colAction")}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((inv) => (
              <tr key={inv.id} className="border-b border-nk-border last:border-b-0">
                <td className="px-4 py-3 font-medium text-nk-text">{inv.tenantName}</td>
                <td className="px-4 py-3 text-nk-text">{inv.period}</td>
                <td className="px-4 py-3 text-nk-text">{formatIDR(inv.amount)}</td>
                <td className="px-4 py-3">{badge(inv)}</td>
                <td className="px-4 py-3 text-nk-text-muted">{inv.dueDate}</td>
                <td className="px-4 py-3">
                  {inv.status === "lunas" ? (
                    <span className="text-xs text-nk-text-muted">
                      {t("paidOn", { date: inv.paidAt ?? "" })}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => markPaid(inv.id)}
                      className="rounded-md border border-nk-border px-3 py-1.5 text-xs font-medium text-nk-text transition-colors hover:bg-nk-warm active:scale-[0.98]"
                    >
                      {t("markPaid")}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* mobile cards */}
      <div className="flex flex-col gap-3 lg:hidden">
        {filtered.map((inv) => (
          <article key={inv.id} className="rounded-lg border border-nk-border bg-nk-surface p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-nk-text">{inv.tenantName}</p>
                <p className="text-xs text-nk-text-muted">
                  {inv.period} · {formatIDR(inv.amount)}
                </p>
                <p className="mt-0.5 text-xs text-nk-text-muted">{inv.dueDate}</p>
              </div>
              {badge(inv)}
            </div>
            {inv.status !== "lunas" && (
              <button
                type="button"
                onClick={() => markPaid(inv.id)}
                className="mt-3 w-full rounded-md border border-nk-border px-3 py-2 text-xs font-medium text-nk-text transition-colors hover:bg-nk-warm"
              >
                {t("markPaid")}
              </button>
            )}
          </article>
        ))}
      </div>

      {/* modal buat tagihan manual */}
      <Dialog open={createOpen} onClose={() => setCreateOpen(false)} className="max-w-sm">
        <h2 className="pr-8 text-lg font-medium text-nk-text">{t("create")}</h2>
        <div className="mt-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="inv-tenant" className="text-sm font-medium text-nk-text">
              {t("tenant")}
            </label>
            <select
              id="inv-tenant"
              value={newInv.tenant}
              onChange={(e) => setNewInv((v) => ({ ...v, tenant: e.target.value }))}
              className="rounded-lg border border-nk-border bg-nk-surface px-3 py-2.5 text-sm text-nk-text outline-none focus:border-nk-accent"
            >
              <option value="">—</option>
              {tenants.map((tn) => (
                <option key={tn.id} value={tn.name}>
                  {tn.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="inv-period" className="text-sm font-medium text-nk-text">
              {t("colPeriod")}
            </label>
            <input
              id="inv-period"
              type="month"
              value={newInv.period}
              onChange={(e) => setNewInv((v) => ({ ...v, period: e.target.value }))}
              className="rounded-lg border border-nk-border bg-nk-surface px-3 py-2.5 text-sm text-nk-text outline-none focus:border-nk-accent"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="inv-amount" className="text-sm font-medium text-nk-text">
              {t("colAmount")}
            </label>
            <input
              id="inv-amount"
              type="number"
              min="0"
              value={newInv.amount}
              onChange={(e) => setNewInv((v) => ({ ...v, amount: e.target.value }))}
              className="rounded-lg border border-nk-border bg-nk-surface px-3 py-2.5 text-sm text-nk-text outline-none focus:border-nk-accent"
            />
          </div>
          <button
            type="button"
            disabled={!newInv.tenant || !newInv.period || !newInv.amount}
            onClick={() => {
              setRows((prev) => [
                {
                  id: `INV-${String(prev.length + 1).padStart(4, "0")}`,
                  tenantName: newInv.tenant,
                  period: newInv.period,
                  amount: Number(newInv.amount),
                  status: "belum-lunas",
                  dueDate: "20/" + newInv.period.slice(5) + "/" + newInv.period.slice(0, 4),
                },
                ...prev,
              ]);
              setNewInv({ tenant: "", period: "", amount: "" });
              setCreateOpen(false);
            }}
            className="rounded-lg bg-nk-accent px-5 py-3 text-sm font-medium text-nk-text-inverse transition-opacity hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {t("create")}
          </button>
        </div>
      </Dialog>
    </DashboardShell>
  );
}
