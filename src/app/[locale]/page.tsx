import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import SearchBar from "@/components/SearchBar";
import PromoCarousel from "@/components/PromoCarousel";
import PropertyCard from "@/components/PropertyCard";
import Kost3D from "@/components/Kost3D";
import { getVerifiedProperties, CITIES } from "@/lib/data/properties";

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

const CATEGORY_IMAGES = [
  { seed: "ngekost-cat-bandung", label: "Bandung", area: "Dago · Setiabudi", hero: 0 },
  { seed: "ngekost-cat-jogja", label: "Yogyakarta", area: "Kotabaru · Caturtunggal", hero: 1 },
  { seed: "ngekost-cat-jakarta", label: "Jakarta", area: "Menteng · Tebet", hero: 2 },
  { seed: "ngekost-cat-malang", label: "Malang", area: "Sumbersari · Dinoyo", hero: 3 },
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
  const featured = props.slice(0, 4);

  const marqueeItems = [
    { label: t("why.verified") },
    { label: t("why.transparent") },
    { label: t("why.nearCampus") },
  ];

  return (
    <>
      {/* ===== HERO — giant uppercase type + search ===== */}
      <section className="relative overflow-hidden border-b border-nk-border">
        {/* full-bleed background image, slightly transparent */}
        <img
          src="/assets/hero-bg.png"
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-right opacity-40"
        />
        {/* overlay: solid cream on left (text zone), fades to transparent mid-right */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-nk-bg via-nk-bg/95 via-60% to-transparent" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-7xl px-6 py-24 md:py-32 lg:px-10">
          <p className="mb-6 text-xs font-normal uppercase tracking-[0.3em] text-nk-text">
            {t("hero.tagline")}
          </p>
          <h1 className="max-w-3xl font-sans text-5xl font-semibold uppercase leading-[0.95] tracking-tight text-nk-text sm:text-6xl md:text-7xl lg:text-8xl">
            {t("hero.title1")}
            <br />
            {t("hero.title2")}
          </h1>
          <div className="mt-12 max-w-xl">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* ===== MARQUEE STRIP — 3 value props, hairline grid ===== */}
      <section className="border-b border-nk-border bg-[#E5E4DE]">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-[1px] md:grid-cols-3">
          {marqueeItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between bg-nk-bg px-6 py-5"
            >
              <span className="text-sm font-light uppercase tracking-[0.2em] text-nk-text">
                {item.label}
              </span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="text-nk-text-muted" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FEATURED / KOST UNGGULAN — hairline grid ===== */}
      <section className="border-b border-nk-border">
        <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="flex items-center justify-between pb-10">
            <h2 className="text-2xl font-light uppercase tracking-tight text-nk-text sm:text-3xl">
              {t("featured.title")}
            </h2>
            <Link
              href="/kost"
              className="hidden text-xs font-light uppercase tracking-widest text-nk-text underline underline-offset-4 transition-colors hover:text-nk-text-muted sm:block"
            >
              {t("featured.viewAll")}
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-[1px] bg-[#E5E4DE] sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <PropertyCard key={p.slug} property={p} />
            ))}
          </div>

          <div className="mt-8 sm:hidden">
            <Link
              href="/kost"
              className="block w-full border border-nk-border bg-nk-bg px-6 py-3 text-center text-xs uppercase tracking-widest text-nk-text transition-colors hover:bg-nk-section"
            >
              {t("featured.viewAll")}
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SHOP BY CATEGORY — full-height image columns ===== */}
      <section className="border-b border-nk-border">
        <div className="mx-auto w-full max-w-7xl px-6 pt-16 lg:px-10">
          <div className="flex items-end justify-between pb-8">
            <h2 className="text-2xl font-light uppercase tracking-tight text-nk-text sm:text-3xl">
              {t("category.title")}
            </h2>
            <Link
              href="/kost"
              className="hidden text-xs font-light uppercase tracking-widest text-nk-text underline underline-offset-4 transition-colors hover:text-nk-text-muted sm:block"
            >
              {t("category.viewAll")}
            </Link>
          </div>
        </div>

        <div className="flex flex-col border-t border-nk-border lg:h-[75vh] lg:flex-row">
          {CATEGORY_IMAGES.map((cat, i) => (
            <Link
              key={cat.label}
              href={`/kost?kota=${encodeURIComponent(cat.label)}`}
              className="group relative flex-1 overflow-hidden border-b border-nk-border last:border-b-0 lg:h-full lg:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-out group-hover:scale-105"
                style={{ backgroundImage: `url(https://picsum.photos/seed/${cat.seed}/800/1000)` }}
              />
              <div className="absolute inset-x-0 top-0 h-[60%] bg-gradient-to-b from-nk-bg via-nk-bg/80 to-transparent" />
              <div className="relative z-10 flex h-[38vh] flex-col p-6 lg:h-full lg:p-8 lg:pt-12">
                <h3 className="text-xl font-light uppercase tracking-tight text-nk-text lg:text-2xl">
                  {cat.label}
                </h3>
                <div className="mt-auto pb-2">
                  <div className="flex w-full items-center justify-between border-t border-nk-text/10 pt-4">
                    <span className="text-[10px] font-light uppercase tracking-[0.25em] text-nk-text">
                      {t("category.explore")}
                    </span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-nk-text opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                      style={{ transform: "translateX(-8px)" }}
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== PROMO ===== */}
      <section className="border-b border-nk-border">
        <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="flex items-end justify-between pb-10">
            <div>
              <p className="mb-3 text-xs font-light uppercase tracking-[0.3em] text-nk-text-muted">
                {t("promo.subtitle")}
              </p>
              <h2 className="text-2xl font-light uppercase tracking-tight text-nk-text sm:text-3xl">
                {t("promo.title")}
              </h2>
            </div>
            <Link
              href="/kost"
              className="hidden text-xs font-light uppercase tracking-widest text-nk-text underline underline-offset-4 transition-colors hover:text-nk-text-muted sm:block"
            >
              {t("promo.viewAll")}
            </Link>
          </div>
          <PromoCarousel />
        </div>
      </section>

      {/* ===== SPLIT CTA — 3D house + giant type ===== */}
      <section className="border-b border-nk-border bg-[#E5E4DE]">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 lg:grid-cols-2">
          {/* 3D house side */}
          <div className="flex items-center justify-center border-b border-nk-border p-10 lg:border-b-0 lg:border-r">
            <Kost3D className="scale-90 lg:scale-100" />
          </div>
          {/* Type side */}
          <div className="flex flex-col justify-center p-10 lg:p-16">
            <h2 className="text-3xl font-light uppercase leading-[0.95] tracking-tight text-nk-text sm:text-4xl lg:text-5xl">
              {t("cta.heading")}
            </h2>
            <p className="mt-6 max-w-md text-sm font-light leading-relaxed text-nk-text-muted">
              {t("cta.body")}
            </p>
            <Link
              href="/kost"
              className="mt-10 inline-block w-fit bg-nk-accent px-8 py-4 text-xs font-light uppercase tracking-[0.25em] text-nk-text-inverse transition-opacity hover:opacity-90"
            >
              {t("cta.button")}
            </Link>
          </div>
        </div>
      </section>

      {/* ===== STATS STRIP ===== */}
      <section className="bg-nk-dark text-nk-text-inverse">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-[1px] md:grid-cols-3">
          {[
            { value: "120+", label: t("stats.properties") },
            { value: "6", label: t("stats.cities") },
            { value: "8.4rb", label: t("stats.tenants") },
          ].map((s) => (
            <div
              key={s.label}
              className="flex flex-col gap-2 bg-nk-dark px-6 py-10"
            >
              <div className="text-4xl font-light tracking-tight md:text-5xl">
                {s.value}
              </div>
              <div className="text-xs font-light uppercase tracking-[0.25em] text-nk-dark-border">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
