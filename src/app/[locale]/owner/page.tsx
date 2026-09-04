"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Link } from "@/i18n/navigation";
import DashboardShell from "@/components/DashboardShell";
import { StatusBadge } from "@/components/StatusBadge";
import { OWNER_PROFILE, ownerBookings, roomUnits, tenants } from "@/lib/data/entities";
import { formatIDR } from "@/lib/utils";

const REVENUE = [24.1, 26.8, 25.3, 28.9, 31.2, 33.7]; // juta Rp
const ACTIVITIES = [
  { id: "a1", text: "Booking #BK-1234 disetujui", at: "2 jam lalu" },
  { id: "a2", text: "Pembayaran diterima dari Citra Lestari Dewi", at: "3 jam lalu" },
  { id: "a3", text: "Booking #BK-1231 diajukan Kevin Hanjaya", at: "5 jam lalu" },
  { id: "a4", text: "Kamar A-104 diubah jadi Maintenance", at: "Kemarin, 16.40" },
  { id: "a5", text: "Booking #BK-1155 kedaluwarsa", at: "Kemarin, 10.05" },
];

export default function OwnerDashboardPage() {
  const t = useTranslations("owner");
  const router = useRouter();
  const monthNames = t.raw("months") as string[];

  const pending = ownerBookings.filter((b) => b.status === "pending");
  const filled = Object.values(roomUnits)
    .flat()
    .filter((r) => r.status === "terisi").length;
  const totalRooms = Object.values(roomUnits).flat().length;
  const arrears = tenants.filter((tn) => tn.paymentStatus === "menunggak").length;
  const arrearsSum = tenants
    .filter((tn) => tn.paymentStatus === "menunggak")
    .reduce((acc, tn) => acc + tn.monthlyRent, 0);

  const today = new Date("2026-09-03").toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const max = Math.max(...REVENUE);
  const stats = [
    {
      label: t("statRevenue"),
      value: formatIDR(33700000),
      note: t("statRevenueChange"),
      up: true,
    },
    {
      label: t("statOccupancy"),
      value: `${Math.round((filled / totalRooms) * 100)}%`,
      note: t("statOccupancyNote", { filled, total: totalRooms }),
    },
    {
      label: t("statArrears"),
      value: formatIDR(arrearsSum),
      note: t("statArrearsNote", { count: arrears }),
    },
    {
      label: t("statNewBookings"),
      value: String(pending.length),
      note: pending.length > 0 ? t("statNeedsResponse") : "",
      badge: pending.length > 0,
    },
  ];

  return (
    <DashboardShell role="owner">
      {/* header */}
      <div className="mb-8 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="text-2xl font-medium tracking-tight text-nk-text sm:text-3xl">
          {t("welcome", { name: OWNER_PROFILE.name.split(" ")[0] })}
        </h1>
        <p className="text-sm text-nk-text-muted">{today}</p>
      </div>

      {/* stat cards */}
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg border border-nk-border bg-nk-surface p-5">
            <p className="text-xs text-nk-text-muted">{s.label}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-nk-text">{s.value}</p>
            <div className="mt-2 flex items-center gap-1.5">
              {s.badge && <StatusBadge color="yellow">{s.note}</StatusBadge>}
              {!s.badge && s.note && (
                <>
                  {s.up !== undefined && (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={s.up ? "text-[#2F6B3C]" : "text-[#9C3B32]"}
                      style={{ transform: s.up ? "none" : "rotate(180deg)" }}
                      aria-hidden="true"
                    >
                      <path d="M12 19V5M5 12l7-7 7 7" />
                    </svg>
                  )}
                  <span className="text-xs text-nk-text-muted">{s.note}</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* kolom kiri: booking pending + chart */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-medium text-nk-text">{t("bookingPending")}</h2>
              <Link
                href="/owner/bookings"
                className="text-sm text-nk-text underline underline-offset-4 transition-colors hover:text-nk-text-muted"
              >
                {t("seeAll")}
              </Link>
            </div>
            <div className="flex flex-col divide-y divide-nk-border rounded-lg border border-nk-border bg-nk-surface">
              {pending.slice(0, 5).map((b) => (
                <div key={b.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-nk-text">{b.applicantName}</p>
                    <p className="truncate text-xs text-nk-text-muted">
                      {b.propertyName} · {b.roomType} ({b.roomNumber})
                    </p>
                  </div>
                  <p className="text-xs text-nk-text-muted">
                    {new Date(b.createdAt).toLocaleString("id-ID", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  {/* tombol SELALU aktif */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => router.push("/owner/bookings")}
                      className="rounded-md bg-[#2F6B3C] px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
                    >
                      {t("approve")}
                    </button>
                    <button
                      type="button"
                      onClick={() => router.push("/owner/bookings")}
                      className="rounded-md border border-[#EBC4C0] px-3 py-1.5 text-xs font-medium text-[#9C3B32] transition-colors hover:bg-[#FAEAE8] active:scale-[0.98]"
                    >
                      {t("reject")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* chart SVG */}
          <section className="rounded-lg border border-nk-border bg-nk-surface p-6">
            <h2 className="mb-6 text-lg font-medium text-nk-text">{t("chartTitle")}</h2>
            <div className="flex h-44 items-end gap-3">
              {REVENUE.map((v, i) => (
                <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                  <span className="font-mono text-[10px] tabular-nums text-nk-text-muted">
                    {v.toFixed(1)}
                  </span>
                  <div
                    className="w-full rounded-t-sm bg-nk-accent/80 transition-all hover:bg-nk-accent"
                    style={{ height: `${(v / max) * 100}%` }}
                    role="img"
                    aria-label={`${monthNames[i]}: ${v} juta`}
                  />
                  <span className="text-[10px] text-nk-text-muted">{monthNames[i]}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* sidebar kanan: aktivitas */}
        <aside className="rounded-lg border border-nk-border bg-nk-surface p-5 lg:order-last">
          <h2 className="mb-4 text-base font-medium text-nk-text">{t("activity")}</h2>
          <ol className="flex flex-col">
            {ACTIVITIES.map((a) => (
              <li key={a.id} className="border-b border-nk-border py-3 last:border-b-0">
                <p className="text-sm text-nk-text">{a.text}</p>
                <p className="mt-0.5 text-xs text-nk-text-muted">{a.at}</p>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </DashboardShell>
  );
}
