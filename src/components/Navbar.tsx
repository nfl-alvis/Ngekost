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
    <>
      {/* Meta navigation */}
      <div className="hidden border-b border-nk-border md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-end px-6 py-2 lg:px-10">
          <div className="flex items-center gap-6">
            <a
              href="tel:+6281122334455"
              className="flex items-center gap-2 text-xs font-medium text-nk-text-muted transition-colors hover:text-nk-accent"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>+62 811 2233 4455</span>
            </a>
            <a
              href="mailto:halo@ngekost.id"
              className="flex items-center gap-2 text-xs font-medium text-nk-text-muted transition-colors hover:text-nk-accent"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <path d="m22 6-10 7L2 6" />
              </svg>
              <span>halo@ngekost.id</span>
            </a>
            <span className="flex items-center gap-2 text-xs font-medium text-nk-text-muted">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>6 Kota di Indonesia</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
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
                    ? "text-sm text-nk-text transition-colors"
                    : "text-sm text-nk-text-muted transition-colors hover:text-nk-text"
                }
              >
                {l.label}
              </Link>
            ))}
            <LanguageSwitcher />
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <Link
              href="/kost"
              className="flex items-center gap-2 rounded-md border border-nk-accent/20 bg-gradient-to-b from-nk-accent to-nk-accent-dark px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
    </>
  );
}
