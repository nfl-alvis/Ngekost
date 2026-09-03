import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "en" ? "About NgeKost" : "Tentang NgeKost",
    description:
      locale === "en"
        ? "NgeKost helps renters find verified boarding houses with transparent pricing."
        : "NgeKost membantu anak kos menemukan kost terverifikasi dengan harga transparan.",
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  const values = t.raw("values") as { title: string; body: string }[];
  const process = t.raw("process") as { title: string; body: string }[];

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
      {/* Hero — split: left copy, right image */}
      <section className="grid grid-cols-1 items-center gap-12 py-16 md:grid-cols-2 md:py-20">
        <div>
          <p className="text-sm font-medium text-nk-text-muted">{t("eyebrow")}</p>
          <h1 className="mt-4 text-4xl leading-[1.1] tracking-tight text-nk-text md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-nk-text-muted">
            {t("subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/kost"
              className="inline-flex items-center rounded-lg bg-nk-accent px-5 py-2.5 text-sm font-medium text-nk-text-inverse transition-opacity hover:opacity-90 active:scale-[0.99]"
            >
              {t("ctaButton")}
            </Link>
            <Link
              href="/kost?kota=Bandung"
              className="inline-flex items-center gap-2 text-sm font-medium text-nk-text transition-colors hover:text-nk-text-muted"
            >
              <span className="inline-flex size-6 items-center justify-center rounded-full border border-nk-border text-nk-text-muted">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
              {locale === "en" ? "Start in Bandung" : "Mulai dari Bandung"}
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-lg">
            <img
              src="/images/about-hero.jpg"
              alt={t("imageAlt")}
              className="aspect-[4/3] w-full object-cover"
              loading="eager"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden rounded-lg border border-nk-border bg-nk-surface p-4 shadow-lg md:block">
            <p className="text-2xl font-medium tracking-tight text-nk-text">120+</p>
            <p className="text-xs text-nk-text-muted">{locale === "en" ? "verified kosts" : "kost terverifikasi"}</p>
          </div>
        </div>
      </section>

      {/* Mission — left label, right copy */}
      <section className="border-t border-nk-border py-16 md:py-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="text-sm font-medium text-nk-text-muted">{t("missionLabel")}</p>
          </div>
          <div className="md:col-span-8">
            <h2 className="text-2xl leading-snug tracking-tight text-nk-text md:text-3xl">
              {t("missionTitle")}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-nk-text-muted">
              {t("missionBody")}
            </p>
          </div>
        </div>
      </section>

      {/* Values — numbered rows, no card boxes */}
      <section className="border-t border-nk-border py-16 md:py-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="text-sm font-medium text-nk-text-muted">{t("valuesLabel")}</p>
            <h2 className="mt-4 text-2xl tracking-tight text-nk-text md:text-3xl">
              {t("valuesTitle")}
            </h2>
          </div>
          <div className="md:col-span-8">
            <div className="divide-y divide-nk-border">
              {values.map((v, i) => (
                <div key={v.title} className="grid grid-cols-12 gap-4 py-6">
                  <div className="col-span-2 sm:col-span-1">
                    <span className="font-mono text-sm text-nk-text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="col-span-10 sm:col-span-11">
                    <h3 className="text-lg font-medium tracking-tight text-nk-text">{v.title}</h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-nk-text-muted">{v.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process — warm tint band with 4 steps */}
      <section className="rounded-lg bg-nk-warm px-6 py-12 md:px-10 md:py-16">
        <p className="text-sm font-medium text-nk-text-muted">{t("processLabel")}</p>
        <h2 className="mt-4 max-w-xl text-2xl tracking-tight text-nk-text md:text-3xl">
          {t("processTitle")}
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {process.map((p, i) => (
            <div key={p.title} className="flex flex-col">
              <span className="flex size-8 items-center justify-center rounded-full border border-nk-dark-border text-sm font-medium text-nk-text">
                {i + 1}
              </span>
              <h3 className="mt-4 text-sm font-medium text-nk-text">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-nk-text-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats + CTA */}
      <section className="py-16 md:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="text-sm font-medium text-nk-text-muted">{t("statsLabel")}</p>
          </div>
          <div className="md:col-span-8">
            <div className="flex flex-wrap items-end gap-10">
              <div>
                <p className="text-4xl font-medium tracking-tight text-nk-text">120+</p>
                <p className="mt-1 text-sm text-nk-text-muted">{locale === "en" ? "verified kosts" : "kost terverifikasi"}</p>
              </div>
              <div>
                <p className="text-4xl font-medium tracking-tight text-nk-text">6</p>
                <p className="mt-1 text-sm text-nk-text-muted">{locale === "en" ? "cities" : "kota"}</p>
              </div>
              <div>
                <p className="text-4xl font-medium tracking-tight text-nk-text">8.4rb</p>
                <p className="mt-1 text-sm text-nk-text-muted">{locale === "en" ? "active renters" : "penyewa aktif"}</p>
              </div>
            </div>

            <div className="mt-12 rounded-lg border border-nk-border bg-nk-surface p-8 md:p-10">
              <h2 className="text-2xl tracking-tight text-nk-text md:text-3xl">{t("ctaTitle")}</h2>
              <p className="mt-3 max-w-lg text-base leading-relaxed text-nk-text-muted">{t("ctaBody")}</p>
              <Link
                href="/kost"
                className="mt-6 inline-flex items-center rounded-lg bg-nk-accent px-5 py-2.5 text-sm font-medium text-nk-text-inverse transition-opacity hover:opacity-90 active:scale-[0.99]"
              >
                {t("ctaButton")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
