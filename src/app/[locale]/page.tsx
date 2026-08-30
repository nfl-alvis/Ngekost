import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import SearchBar from "@/components/SearchBar";
import PromoCarousel from "@/components/PromoCarousel";
import PropertyCard from "@/components/PropertyCard";
import { Link } from "@/i18n/navigation";
import { getVerifiedProperties } from "@/lib/data/properties";

export function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return params.then(({ locale }) => ({
    title: locale === "en" ? "Find Verified Boarding Houses" : "Cari Kost Terverifikasi",
    description:
      locale === "en"
        ? "Find verified boarding houses across Indonesia."
        : "Cari kost terverifikasi di seluruh Indonesia.",
  }));
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const featured = getVerifiedProperties()
    .slice()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -top-32 right-[-10%] size-[480px] rounded-full bg-nk-accent/10 blur-3xl" />
          <div className="absolute bottom-[-20%] left-[-5%] size-[360px] rounded-full bg-nk-accent/5 blur-3xl" />
        </div>

        <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-8 lg:px-8 lg:pb-24 lg:pt-20">
          <div className="space-y-7">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-nk-border bg-nk-surface px-3.5 py-1.5 text-xs font-medium text-nk-text-muted">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              {t("hero.badge")}
            </span>

            <h1 className="text-4xl font-bold leading-[1.08] tracking-tighter sm:text-5xl lg:text-6xl">
              {t("hero.title1")}{" "}
              <span className="text-nk-accent">{t("hero.title2")}</span>
            </h1>

            <p className="max-w-[46ch] text-base leading-relaxed text-nk-text-muted sm:text-lg">
              {t("hero.subtitle")}
            </p>

            <SearchBar />

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
              <span className="text-xs font-medium uppercase tracking-wider text-nk-text-muted">
                {t("hero.popular")}
              </span>
              {["Bandung", "Jakarta", "Yogyakarta", "Surabaya", "Malang"].map((c) => (
                <Link
                  key={c}
                  href={`/kost?kota=${c}`}
                  className="text-sm font-medium text-nk-text transition-colors hover:text-nk-accent"
                >
                  {c}
                </Link>
              ))}
            </div>
          </div>

          {/* Asymmetric visual */}
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-10">
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src="https://picsum.photos/seed/ngekost-hero-a/600/800"
                    alt="Kamar kost modern"
                    className="aspect-[3/4] w-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src="https://picsum.photos/seed/ngekost-hero-b/600/450"
                    alt="Ruang tamu kost"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src="https://picsum.photos/seed/ngekost-hero-c/600/450"
                    alt="Suasana kost"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Floating stat card */}
            <div className="absolute -left-8 bottom-6 rounded-2xl border border-nk-border bg-nk-surface/95 p-4 shadow-[0_20px_50px_-20px_rgba(28,25,23,0.25)] backdrop-blur-sm">
              <p className="text-2xl font-bold tracking-tight text-nk-text">2.4K+</p>
              <p className="text-xs text-nk-text-muted">{t("hero.stats.properties")}</p>
            </div>
            <div className="absolute -right-4 top-2 rounded-2xl border border-nk-border bg-nk-surface/95 p-4 shadow-[0_20px_50px_-20px_rgba(28,25,23,0.25)] backdrop-blur-sm">
              <p className="text-2xl font-bold tracking-tight text-nk-accent">15</p>
              <p className="text-xs text-nk-text-muted">{t("hero.stats.cities")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Promo */}
      <div className="py-6 lg:py-10">
        <PromoCarousel />
      </div>

      {/* Featured */}
      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 lg:mb-10">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {t("featured.title")}
            </h2>
            <p className="text-sm text-nk-text-muted sm:text-base">
              {t("featured.subtitle")}
            </p>
          </div>
          <Link
            href="/kost"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-nk-accent transition-colors hover:text-nk-accent-hover"
          >
            {t("featured.viewAll")}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <PropertyCard key={p.slug} property={p} />
          ))}
        </div>
      </section>
    </>
  );
}
