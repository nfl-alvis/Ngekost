import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";

export default async function Navbar() {
  const t = await getTranslations("nav");

  return (
    <header className="sticky top-0 z-40 border-b border-nk-border bg-nk-surface/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-7 md:flex" aria-label="Navigasi utama">
          <Link
            href="/"
            className="text-sm font-medium text-nk-text-muted transition-colors hover:text-nk-text"
          >
            {t("search")}
          </Link>
          <Link
            href="/kost"
            className="text-sm font-medium text-nk-text-muted transition-colors hover:text-nk-text"
          >
            {t("listings")}
          </Link>
          <Link
            href="/bantuan"
            className="text-sm font-medium text-nk-text-muted transition-colors hover:text-nk-text"
          >
            {t("help")}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <div className="hidden items-center gap-3 sm:flex">
            <Link
              href="/masuk"
              className="text-sm font-medium text-nk-text transition-colors hover:text-nk-accent"
            >
              {t("login")}
            </Link>
            <Link
              href="/daftar"
              className="inline-flex h-9 items-center rounded-full bg-nk-accent px-4 text-sm font-semibold text-nk-text-inverse transition-colors hover:bg-nk-accent-hover"
            >
              {t("register")}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
