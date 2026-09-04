"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import DashboardShell from "@/components/DashboardShell";
import { StatusBadge } from "@/components/StatusBadge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { verificationHistory } from "@/lib/data/entities";
import type { AdminReviewEntry } from "@/lib/data/types";

export default function AdminHistoryPage() {
  const t = useTranslations("admin.history");
  const [filter, setFilter] = useState<"all" | "approved" | "rejected">("all");
  const [detail, setDetail] = useState<AdminReviewEntry | null>(null);

  const filtered = useMemo(() => {
    if (filter === "approved") return verificationHistory.filter((h) => h.decision === "approved");
    if (filter === "rejected") return verificationHistory.filter((h) => h.decision === "rejected");
    return verificationHistory;
  }, [filter]);

  const tabs = [
    { id: "all" as const, label: t("filterAll") },
    { id: "approved" as const, label: t("filterApproved") },
    { id: "rejected" as const, label: t("filterRejected") },
  ];

  return (
    <DashboardShell role="admin">
      <h1 className="mb-6 text-2xl font-medium tracking-tight text-nk-text">{t("title")}</h1>

      {/* tab filter */}
      <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
        <TabsList className="mb-5 flex h-auto w-fit gap-1 rounded-lg border border-nk-border bg-nk-surface p-1">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className="rounded-md px-3.5 py-2 text-sm font-normal transition-colors data-[state=active]:bg-nk-accent data-[state=active]:font-medium data-[state=active]:text-nk-text-inverse data-[state=inactive]:text-nk-text-muted hover:data-[state=inactive]:text-nk-text"
          >
            {tab.label}
          </TabsTrigger>
        ))}
        </TabsList>

      </Tabs>

      {/* desktop tabel */}
      <div className="hidden overflow-hidden rounded-lg border border-nk-border bg-nk-surface lg:block">
        <Table className="w-full text-sm">
          <TableHeader>
            <TableRow className="border-b border-nk-border text-left text-xs text-nk-text-muted">
              <TableHead className="px-4 py-3 font-medium">{t("colProperty")}</TableHead>
              <TableHead className="px-4 py-3 font-medium">{t("colOwner")}</TableHead>
              <TableHead className="px-4 py-3 font-medium">{t("colSubmitted")}</TableHead>
              <TableHead className="px-4 py-3 font-medium">{t("colDecided")}</TableHead>
              <TableHead className="px-4 py-3 font-medium">{t("colStatus")}</TableHead>
              <TableHead className="px-4 py-3 font-medium">{t("colBy")}</TableHead>
              <TableHead className="px-4 py-3 font-medium">{t("colAction")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((h) => (
              <TableRow key={h.id} className="border-b border-nk-border last:border-b-0">
                <TableCell className="px-4 py-3 font-medium text-nk-text">{h.propertyName}</TableCell>
                <TableCell className="px-4 py-3 text-nk-text">{h.ownerName}</TableCell>
                <TableCell className="px-4 py-3 text-nk-text-muted">{h.submittedAt}</TableCell>
                <TableCell className="px-4 py-3 text-nk-text-muted">{h.decidedAt}</TableCell>
                <TableCell className="px-4 py-3">
                  {h.decision === "approved" ? (
                    <StatusBadge color="green">{t("statusApproved")}</StatusBadge>
                  ) : (
                    <StatusBadge color="red">{t("statusRejected")}</StatusBadge>
                  )}
                </TableCell>
                <TableCell className="px-4 py-3 text-nk-text">{detail?.decidedBy ?? "—"}</TableCell>
                <TableCell className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => setDetail(h)}
                    className="rounded-md border border-nk-border px-3 py-1.5 text-xs text-nk-text transition-colors hover:bg-nk-warm"
                  >
                    {t("viewDetail")}
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* mobile cards */}
      <div className="flex flex-col gap-3 lg:hidden">
        {filtered.map((h) => (
          <article key={h.id} className="rounded-lg border border-nk-border bg-nk-surface p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-nk-text">{h.propertyName}</p>
                <p className="text-xs text-nk-text-muted">{h.ownerName}</p>
                <p className="mt-0.5 text-xs text-nk-text-muted">
                  {h.submittedAt} → {h.decidedAt}
                </p>
              </div>
              {h.decision === "approved" ? (
                <StatusBadge color="green">{t("statusApproved")}</StatusBadge>
              ) : (
                <StatusBadge color="red">{t("statusRejected")}</StatusBadge>
              )}
            </div>
            <button
              type="button"
              onClick={() => setDetail(h)}
              className="mt-3 w-full rounded-md border border-nk-border px-3 py-2 text-xs text-nk-text transition-colors hover:bg-nk-warm"
            >
              {t("viewDetail")}
            </button>
          </article>
        ))}
      </div>

      {/* modal detail */}
      <Dialog open={detail !== null} onOpenChange={(o) => !o && setDetail(null)}>
        <DialogContent className="max-w-lg">
        {detail && (
          <>
            <h2 className="pr-8 text-lg font-medium text-nk-text">{t("detailTitle")}</h2>
            <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <dt className="text-nk-text-muted">{t("colProperty")}</dt>
              <dd className="text-right font-medium text-nk-text">{detail.propertyName}</dd>
              <dt className="text-nk-text-muted">{t("colOwner")}</dt>
              <dd className="text-right text-nk-text">{detail.ownerName}</dd>
              <dt className="text-nk-text-muted">{t("colSubmitted")}</dt>
              <dd className="text-right text-nk-text">{detail.submittedAt}</dd>
              <dt className="text-nk-text-muted">{t("colDecided")}</dt>
              <dd className="text-right text-nk-text">{detail.decidedAt}</dd>
              <dt className="text-nk-text-muted">{t("colBy")}</dt>
              <dd className="text-right text-nk-text">{detail?.decidedBy ?? "—"}</dd>
              <dt className="text-nk-text-muted">{t("colStatus")}</dt>
              <dd className="text-right">
                {detail.decision === "approved" ? (
                  <StatusBadge color="green">{t("statusApproved")}</StatusBadge>
                ) : (
                  <StatusBadge color="red">{t("statusRejected")}</StatusBadge>
                )}
              </dd>
              {detail.decision === "rejected" && detail.rejectionReason && (
                <>
                  <dt className="text-nk-text-muted">{t("rejectionReason")}</dt>
                  <dd className="text-right text-nk-text">{detail.rejectionReason}</dd>
                </>
              )}
            </dl>
          </>
        )}
      </DialogContent>
      </Dialog>
    </DashboardShell>
  );
}
