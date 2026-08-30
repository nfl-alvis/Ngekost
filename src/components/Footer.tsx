import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Logo from "@/components/Logo";

export default function Footer() {
  const t = useTranslations("footer");

  const exploreLinks = [
    { href: "/kost", label: t("exploreAll") },
    { href: "/kost?kota=Jakarta", label: t("jakarta") },
    { href: "/kost?kota=Bandung", label: t("bandung") },
    { href: "/kost?kota=Yogyakarta", label: t("yogyakarta") },
    { href: "/kost?kota=Malang", label: t("malang") },
  ];

  const companyLinks = [
    { href: "#", label: t("about") },
    { href: "#", label: t("blog") },
    { href: "#", label: t("jobs") },
    { href: "#", label: t("partners") },
  ];

  const supportLinks = [
    { href: "#", label: t("help") },
    { href: "#", label: t("faq") },
    { href: "#", label: t("terms") },
    { href: "#", label: t("privacy") },
  ];

  return (
    <footer className="bg-nk-dark pt-20 pb-10 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 border-t border-white/10 pt-16 md:grid-cols-4 mb-20">
          <div className="col-span-1">
            <Logo className="mb-8 h-8 w-auto text-white" />
            <p className="text-sm leading-relaxed text-nk-dark-border">
              {t("tagline")}
            </p>
            <p className="mt-4 text-xs text-nk-dark-border">
              {t("verifiedBadge")}
            </p>
          </div>

          <div className="col-span-1 flex flex-col gap-4">
            <p className="mb-2 text-sm font-medium text-nk-dark-border">
              {t("explore")}
            </p>
            {exploreLinks.map((l) => (
              <Link
                key={l.label + l.href}
                href={l.href as `${string}/${string}`}
                className="text-sm text-white transition-colors hover:text-nk-accent"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="col-span-1 flex flex-col gap-4">
            <p className="mb-2 text-sm font-medium text-nk-dark-border">
              {t("company")}
            </p>
            {companyLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-white transition-colors hover:text-nk-accent"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="col-span-1 flex flex-col gap-4">
            <p className="mb-2 text-sm font-medium text-nk-dark-border">
              {t("support")}
            </p>
            {supportLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-white transition-colors hover:text-nk-accent"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <Link
            href="/kost"
            className="group relative col-span-1 h-48 overflow-hidden rounded-lg md:col-span-2"
          >
            <img
              src={`https://picsum.photos/seed/ngekost-footer-buy/800/400`}
              alt={t("exploreAll")}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute bottom-6 left-6">
              <h3 className="font-serif text-xl font-medium text-white">
                {t("exploreAll")}
              </h3>
            </div>
          </Link>
          <Link
            href="/kost"
            className="group relative col-span-1 h-48 overflow-hidden rounded-lg"
          >
            <img
              src={`https://picsum.photos/seed/ngekost-footer-list/600/400`}
              alt={t("listProperty")}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute bottom-6 left-6">
              <h3 className="font-serif text-xl font-medium text-white">
                {t("listProperty")}
              </h3>
            </div>
          </Link>
          <div className="col-span-1 flex h-48 flex-col gap-4">
            <a
              href="#"
              className="group relative flex-1 overflow-hidden rounded-lg"
            >
              <img
                src={`https://picsum.photos/seed/ngekost-footer-guide/400/200`}
                alt={t("guide")}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute bottom-4 left-4">
                <h3 className="font-serif text-base font-medium text-white">
                  {t("guide")}
                </h3>
              </div>
            </a>
            <a
              href="#"
              className="group relative flex-1 overflow-hidden rounded-lg"
            >
              <img
                src={`https://picsum.photos/seed/ngekost-footer-careers/400/200`}
                alt={t("jobs")}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute bottom-4 left-4">
                <h3 className="font-serif text-base font-medium text-white">
                  {t("jobs")}
                </h3>
              </div>
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-white/10 pt-12 text-xs text-nk-dark-border md:flex-row">
          <div className="mb-4 flex items-center gap-2 md:mb-0">
            <span>© 2026 NgeKost.</span>
            <span>·</span>
            <span>{t("rights")}</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="transition-colors hover:text-white">
              {t("privacy")}
            </a>
            <span>·</span>
            <a href="#" className="transition-colors hover:text-white">
              {t("terms")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
