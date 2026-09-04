"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import Logo from "@/components/Logo";
import { useSession } from "@/components/SessionProvider";
import { cn } from "@/lib/utils";

type Item = { href: string; label: string };

const OWNER_ITEMS: Item[] = [
  { href: "/owner", label: "dashboard" },
  { href: "/owner/properties", label: "properties" },
  { href: "/owner/bookings", label: "bookings" },
  { href: "/owner/tenants", label: "tenants" },
  { href: "/owner/invoices", label: "invoices" },
  { href: "/owner/messages", label: "messages" },
  { href: "/owner/notifications", label: "notifications" },
  { href: "/owner/subscription", label: "subscription" },
  { href: "/owner/settings", label: "settings" },
];

const ADMIN_ITEMS: Item[] = [
  { href: "/admin/verification", label: "queue" },
  { href: "/admin/verification/history", label: "history" },
];

export default function DashboardShell({
  role,
  children,
}: {
  role: "owner" | "admin";
  children: React.ReactNode;
}) {
  const t = useTranslations(role === "owner" ? "owner.nav" : "admin.nav");
  const navT = useTranslations("nav");
  const pathname = usePathname();
  const { user } = useSession();

  const items = role === "owner" ? OWNER_ITEMS : ADMIN_ITEMS;
  const isActive = (href: string) =>
    href === "/owner" || href === "/admin/verification"
      ? pathname === href
      : pathname === href || pathname.startsWith(href + "/");

  const userName = user?.name ?? (role === "owner" ? "Ratri Wulandari" : "Bayu Pratama");
  const initial = userName.trim().charAt(0).toUpperCase();

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
        {/* Sidebar — horizontal scroll di mobile, kolom di desktop */}
        <aside className="lg:w-56 lg:shrink-0">
          <div className="mb-4 hidden lg:block">
            <Logo className="h-7 w-auto text-nk-text" />
          </div>
          <nav
            aria-label={role === "owner" ? "Owner" : "Admin"}
            className="no-scrollbar -mx-6 flex gap-1 overflow-x-auto px-6 lg:mx-0 lg:flex-col lg:px-0"
          >
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "whitespace-nowrap rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive(item.href)
                    ? "bg-nk-accent font-medium text-nk-text-inverse"
                    : "text-nk-text-muted hover:bg-nk-warm hover:text-nk-text"
                )}
              >
                {t(item.label)}
              </Link>
            ))}
          </nav>

          {/* profil singkat di bawah sidebar (desktop) */}
          <div className="mt-8 hidden items-center gap-3 border-t border-nk-border pt-4 lg:flex">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-nk-accent text-sm font-medium text-nk-text-inverse">
              {initial}
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-medium text-nk-text">{userName}</span>
              <span className="text-xs capitalize text-nk-text-muted">
                {role === "owner" ? navT("dashboard") : navT("adminPanel")}
              </span>
            </span>
          </div>
        </aside>

        {/* konten */}
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
