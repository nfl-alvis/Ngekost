import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import SearchBar from "@/components/SearchBar";
import PromoCarousel from "@/components/PromoCarousel";
import PropertyCard from "@/components/PropertyCard";
import { getVerifiedProperties } from "@/lib/data/properties";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "en" ? "Find Verified Boarding Houses" : "Cari Kost Terverifikasi",
  };
}

const FEATURE_ICONS = [
  "M12 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21a10 10 0 0 1 20 0", // agent / user
  "M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4", // key
  "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01", // tag
  "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", // user/careers
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const props = getVerifiedProperties();
  const featured = props.slice(0, 6);

  const heroImages = [
    { seed: "ngekost-hero-a", label: "Bandung", sub: "Dago & Setiabudi" },
    { seed: "ngekost-hero-b", label: "Yogyakarta", sub: "Kotabaru & Caturtunggal" },
    { seed: "ngekost-hero-c", label: "Jakarta", sub: "Menteng & Tebet" },
    { seed: "ngekost-hero-d", label: "Malang", sub: "Sumbersari & Dinoyo" },
    { seed: "ngekost-hero-e", label: "Surabaya", sub: "Wonokromo & Darmo" },
  ];

  const statValues = [
    { value: "120+", label: t("hero.stats.properties") },
    { value: "6", label: t("hero.stats.cities") },
    { value: "8.4rb", label: t("hero.stats.tenants") },
  ];

  const cities = t.raw("hero.popularCities") as string[];

  return (
    <>
      {/* ===== HERO — editorial two-line headline ===== */}
      <section className="mx-auto w-full max-w-7xl px-6 pb-16 pt-20 md:pt-28 lg:px-10 md:pb-20">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end md:gap-10">
          <h1 className="font-serif text-4xl font-medium leading-[1.12] tracking-tight text-nk-text md:w-1/2 md:text-5xl lg:text-[4.2rem]">
            {t("hero.title1")}
          </h1>
          <h2 className="pb-1 font-sans text-2xl font-semibold leading-[1.12] tracking-tight text-nk-text-muted md:w-1/2 md:pb-2 md:text-3xl lg:text-[3rem]">
            {t("hero.title2")}
          </h2>
        </div>

        {/* Search */}
        <div className="mt-10 md:mt-14">
          <SearchBar />
          <p className="mt-4 text-sm font-medium text-nk-text-muted">
            {t("hero.popular")}{" "}
            {cities.map((c, i) => (
              <span key={c}>
                {i > 0 && <span className="mx-1 text-nk-border">·</span>}
                <Link
                  href={`/kost?kota=${encodeURIComponent(c)}`}
                  className="text-nk-text transition-colors hover:text-nk-accent"
                >
                  {c}
                </Link>
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* ===== HERO CAROUSEL — horizontal snap ===== */}
      <section className="mx-auto w-full max-w-7xl pl-6 pb-16 lg:pl-10 md:pb-24">
        <div className="no-scrollbar flex snap-x gap-6 overflow-x-auto pb-8 pr-6 lg:pr-0">
          {heroImages.map((img, i) => (
            <Link
              key={img.seed}
              href={`/kost?kota=${encodeURIComponent(img.label)}`}
              className={`group relative shrink-0 snap-start overflow-hidden rounded-xl ${
                i === 0 ? "aspect-[4/3] w-[320px] md:w-[720px] md:aspect-[16/9]" : "aspect-[4/3] w-[320px] md:w-[400px]"
              }`}
            >
              <img
                src={`https://picsum.photos/seed/${img.seed}/1200/675`}
                alt={img.label}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 flex w-max max-w-full items-center gap-3 rounded-lg border border-white/10 bg-black/60 p-3 backdrop-blur-md md:bottom-6 md:left-6">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-nk-text" aria-hidden="true">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <span className="block font-serif text-lg font-medium tracking-tight text-white">
                    {img.label}
                  </span>
                  <span className="block text-xs text-white/70">
                    {img.sub}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== FEATURE GRID — 4 cards ===== */}
      <section className="mx-auto w-full max-w-7xl px-6 pb-20 lg:px-10 md:pb-28">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: 0, label: t("why.agent") },
            { icon: 1, label: t("why.favorite") },
            { icon: 2, label: t("why.promo") },
            { icon: 3, label: t("why.guide") },
          ].map((f) => (
            <Link
              key={f.label}
              href="/kost"
              className="group flex items-center gap-4 rounded-xl border border-nk-border bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-nk-border bg-nk-section">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-nk-text" aria-hidden="true">
                  <path d={FEATURE_ICONS[f.icon]} />
                </svg>
              </div>
              <span className="flex-1 text-sm font-medium text-nk-text">
                {f.label}
              </span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-nk-text-muted transition-colors group-hover:text-nk-accent" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== WHY NGEKOST — image grid ===== */}
      <section className="bg-nk-section py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14 max-w-3xl">
            <p className="mb-4 text-sm font-medium text-nk-text-muted">
              {t("why.heading")}
            </p>
            <h2 className="font-serif text-3xl font-medium leading-tight tracking-tight text-nk-text md:text-4xl lg:text-5xl">
              {t("why.subheading")}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/kost?kota=Bandung"
              className="group relative aspect-square h-full overflow-hidden rounded-xl md:aspect-auto lg:col-span-1"
            >
              <img src={`https://picsum.photos/seed/ngekost-why-a/800/800`} alt={t("why.verified")} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <h3 className="font-serif text-2xl font-medium tracking-tight text-white">
                  {t("why.verified")}
                </h3>
              </div>
            </Link>
            <Link
              href="/kost"
              className="group relative aspect-square h-full overflow-hidden rounded-xl md:aspect-auto lg:col-span-1"
            >
              <img src={`https://picsum.photos/seed/ngekost-why-b/800/800`} alt={t("why.transparent")} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <h3 className="font-serif text-2xl font-medium tracking-tight text-white">
                  {t("why.transparent")}
                </h3>
              </div>
            </Link>
            <Link
              href="/kost"
              className="group relative aspect-square h-full overflow-hidden rounded-xl md:col-span-2 md:aspect-auto lg:col-span-1"
            >
              <img src={`https://picsum.photos/seed/ngekost-why-c/800/800`} alt={t("why.nearCampus")} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <h3 className="font-serif text-2xl font-medium tracking-tight text-white">
                  {t("why.nearCampus")}
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== PROMO ===== */}
      <section className="mx-auto w-full max-w-7xl py-20 md:py-28">
        <div className="flex flex-col items-start justify-between gap-6 pb-12 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm font-medium text-nk-text-muted">
              {t("promo.subtitle")}
            </p>
            <h2 className="font-serif text-3xl font-medium tracking-tight text-nk-text md:text-4xl lg:text-5xl">
              {t("promo.title")}
            </h2>
          </div>
          <Link
            href="/kost"
            className="hidden border border-nk-border bg-white px-6 py-3 text-sm font-medium text-nk-text shadow-sm transition-colors hover:bg-nk-section md:block"
          >
            {t("promo.viewAll")}
          </Link>
        </div>
        <PromoCarousel />
        <div className="mt-8 md:hidden">
          <Link
            href="/kost"
            className="block w-full border border-nk-border bg-white px-6 py-3 text-center text-sm font-medium text-nk-text shadow-sm transition-colors hover:bg-nk-section"
          >
            {t("promo.viewAll")}
          </Link>
        </div>
      </section>

      {/* ===== FEATURED / AGENT PICKS ===== */}
      <section className="bg-nk-section py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="font-serif text-3xl font-medium tracking-tight text-nk-text md:text-4xl lg:text-5xl">
              {t("featured.title")}
            </h2>
            <Link
              href="/kost"
              className="hidden border border-nk-border bg-white px-6 py-3 text-sm font-medium text-nk-text shadow-sm transition-colors hover:bg-nk-section md:block"
            >
              {t("featured.viewAll")}
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <PropertyCard key={p.slug} property={p} />
            ))}
          </div>

          <div className="mt-8 md:hidden">
            <Link
              href="/kost"
              className="block w-full border border-nk-border bg-white px-6 py-3 text-center text-sm font-medium text-nk-text shadow-sm transition-colors hover:bg-nk-section"
            >
              {t("featured.viewAll")}
            </Link>
          </div>
        </div>
      </section>

      {/* ===== DARK SECTION — stats ===== */}
      <section className="bg-nk-dark pt-20 text-white md:pt-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <h2 className="max-w-lg font-serif text-3xl font-medium leading-tight tracking-tight md:text-4xl lg:text-5xl">
              {t("stats.heading")}
            </h2>
            <Link
              href="/kost"
              className="inline-block rounded-md bg-gradient-to-b from-nk-accent to-nk-accent-dark px-6 py-3 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md"
            >
              {t("stats.cta")}
            </Link>
          </div>

          <div className="flex flex-col gap-8 pb-24 md:flex-row md:gap-12">
            {statValues.map((s) => (
              <div key={s.label} className="flex flex-1 flex-col gap-2 border-l border-nk-dark-border pl-6 md:pl-8">
                <div className="font-sans text-4xl font-light tracking-tight md:text-5xl lg:text-6xl">
                  {s.value}
                </div>
                <div className="text-sm text-nk-dark-border">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DARK CTA — ebook style ===== */}
      <section className="bg-nk-dark pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="relative flex flex-col items-center overflow-hidden rounded-2xl bg-nk-text p-10 text-center md:p-16 lg:p-24">
            <img
              src="https://picsum.photos/seed/ngekost-cta/1200/600"
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
            />
            <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-6">
              <p className="text-sm font-medium text-white/80">{t("cta.badge")}</p>
              <h2 className="font-serif text-3xl font-medium leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
                {t("cta.heading")}
              </h2>
              <Link
                href="/kost"
                className="inline-block rounded-md bg-gradient-to-b from-nk-accent to-nk-accent-dark px-8 py-3 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md"
              >
                {t("cta.button")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
