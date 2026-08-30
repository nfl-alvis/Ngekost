"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Logo from "@/components/Logo";

export default function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const navLinks = [
    { href: "/kost", label: t("listings") },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-nk-border bg-nk-bg/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" aria-label={t("home")}>
          <Logo className="h-8 w-auto text-nk-text" />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={
                isActive(l.href)
                  ? "text-sm font-medium text-nk-text"
                  : "text-sm text-nk-text-muted transition-colors hover:text-nk-text"
              }
            >
              {l.label}
            </Link>
          ))}
          <LanguageSwitcher />
        </div>

        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/kost"
            className="flex items-center gap-2 text-sm text-nk-text transition-colors hover:text-nk-text-muted"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            {t("search")}
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button
            aria-label={t("menu")}
            className="flex flex-col gap-1.5 p-2"
          >
            <span className="h-[2px] w-5 rounded-full bg-nk-text-muted"></span>
            <span className="h-[2px] w-5 rounded-full bg-nk-text-muted"></span>
            <span className="h-[2px] w-5 rounded-full bg-nk-text-muted"></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
