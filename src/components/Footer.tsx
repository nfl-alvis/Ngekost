import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Logo from "./Logo";

export default async function Footer() {
  const t = await getTranslations("footer");

  const groups = [
    { title: t("explore"), links: [
      { label: t("product"), href: "/kost" },
      { label: "Kost Jakarta", href: "/kost?kota=Jakarta" },
      { label: "Kost Bandung", href: "/kost?kota=Bandung" },
      { label: "Kost Yogyakarta", href: "/kost?kota=Yogyakarta" },
    ]},
    { title: t("company"), links: [
      { label: t("about"), href: "/tentang" },
      { label: t("blog"), href: "/blog" },
      { label: t("jobs"), href: "/karir" },
    ]},
    { title: t("support"), links: [
      { label: t("help"), href: "/bantuan" },
      { label: t("faq"), href: "/faq" },
    ]},
    { title: t("legal"), links: [
      { label: t("terms"), href: "/syarat" },
      { label: t("privacy"), href: "/privasi" },
    ]},
  ];

  return (
    <footer className="border-t border-nk-border bg-nk-surface">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2 space-y-4">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-nk-text-muted">
              {t("tagline")}
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-nk-border px-3 py-1.5 text-xs font-medium text-nk-text-muted">
              <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
              {t("verifiedBadge")}
            </div>
          </div>

          {groups.map((g) => (
            <div key={g.title} className="space-y-3">
              <h3 className="text-sm font-semibold text-nk-text">{g.title}</h3>
              <ul className="space-y-2.5">
                {g.links.map((l) => (
                  <li key={l.label + l.href}>
                    <Link
                      href={l.href as `${string}/${string}`}
                      className="text-sm text-nk-text-muted transition-colors hover:text-nk-accent"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-nk-border pt-6 sm:flex-row">
          <p className="text-xs text-nk-text-muted">
            © {new Date().getFullYear()} NgeKost. {t("rights")}
          </p>
          <p className="text-xs text-nk-text-muted">Made in Indonesia</p>
        </div>
      </div>
    </footer>
  );
}
