import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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

  const stats = [
    {
      value: "120+",
      label: locale === "en" ? "verified kosts" : "kost terverifikasi",
    },
    { value: "6", label: locale === "en" ? "cities" : "kota" },
    {
      value: "8.4rb",
      label: locale === "en" ? "active renters" : "penyewa aktif",
    },
  ];

  return (
    <div>
      {/* ===== Hero — full-bleed photo, copy anchored bottom-left ===== */}
      <section className="relative isolate flex min-h-[76dvh] items-end overflow-hidden">
        <img
          src="/images/about-hero-wide.jpg"
          alt={t("imageAlt")}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          loading="eager"
        />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-t from-[#21150c]/90 via-[#21150c]/40 to-[#21150c]/10"
          aria-hidden="true"
        />

        <div className="mx-auto w-full max-w-7xl px-6 pb-14 pt-40 lg:px-10">
          <p className="text-xs font-medium tracking-[0.14em] text-white/60">
            {t("eyebrow")}
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl leading-[1.05] font-semibold tracking-tight text-white md:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
            {t("subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="/kost">{t("ctaButton")}</Button>
            <Button href="/kost?kota=Bandung" variant="light">
              {locale === "en" ? "Start in Bandung" : "Mulai dari Bandung"}
            </Button>
          </div>
        </div>
      </section>

      {/* ===== Mission — offset label, asymmetric copy ===== */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28 lg:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="font-mono text-xs tracking-widest text-nk-text-muted">
              {t("missionLabel")}
            </p>
          </div>
          <div className="md:col-span-8 md:col-start-5">
            <h2 className="max-w-2xl text-3xl leading-[1.15] tracking-tight text-nk-text md:text-[2.6rem]">
              {t("missionTitle")}
            </h2>
            <p className="mt-6 max-w-[36rem] text-base leading-relaxed text-nk-text-muted">
              {t("missionBody")}
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Separator />
      </div>

      {/* ===== Values — editorial two-column, no boxes ===== */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28 lg:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="max-w-xs text-2xl leading-snug tracking-tight text-nk-text md:text-3xl">
              {t("valuesTitle")}
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <div className="flex flex-col gap-10">
              {values.map((v, i) => (
                <article key={v.title} className="grid grid-cols-12 gap-4">
                  <p className="col-span-12 font-mono text-xs text-nk-text-muted sm:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <div className="col-span-12 sm:col-span-11">
                    <h3 className="text-xl font-medium tracking-tight text-nk-text">
                      {v.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-nk-text-muted">
                      {v.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Process — warm band, horizontal timeline with connecting line ===== */}
      <section className="bg-nk-warm">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 lg:px-10">
          <p className="font-mono text-xs tracking-widest text-nk-text-muted">
            {t("processLabel")}
          </p>
          <h2 className="mt-3 max-w-xl text-3xl leading-[1.15] tracking-tight text-nk-text md:text-[2.6rem]">
            {t("processTitle")}
          </h2>

          <ol className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <li key={p.title} className="relative">
                {i < process.length - 1 && (
                  <span
                    className="absolute left-11 top-4 hidden h-px w-[calc(100%-3.5rem)] bg-nk-dark-border/40 lg:block"
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10 flex size-8 items-center justify-center rounded-full border border-nk-dark-border bg-nk-warm font-mono text-xs text-nk-text">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-sm font-medium text-nk-text">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-nk-text-muted">
                  {p.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== Stats + CTA — image-backed stats band ===== */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28 lg:px-10">
        <div className="relative isolate overflow-hidden rounded-xl">
          <img
            src="/images/about-hero.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-10 h-full w-full object-cover"
            loading="lazy"
          />
          <div
            className="absolute inset-0 -z-10 bg-[#21150c]/85"
            aria-hidden="true"
          />
          <div className="px-6 py-14 md:px-12 md:py-20">
            <div className="flex flex-wrap items-end gap-x-14 gap-y-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-mono text-5xl font-medium tracking-tight text-white tabular-nums md:text-6xl">
                    {s.value}
                  </p>
                  <p className="mt-2 text-sm text-white/60">{s.label}</p>
                </div>
              ))}
            </div>

            <Separator className="my-12 bg-white/15" />

            <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div className="max-w-lg">
                <h2 className="text-2xl tracking-tight text-white md:text-3xl">
                  {t("ctaTitle")}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-white/70">
                  {t("ctaBody")}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <Button href="/kost">{t("ctaButton")}</Button>
                <Link
                  href="/kost"
                  className="text-sm font-medium text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  {locale === "en" ? "See all cities" : "Lihat semua kota"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* extra breathing room before footer; footer is dark brown, matches */}
      <div className="pb-8" />
      <Badge variant="outline" className="sr-only">
        {t("statsLabel")}
      </Badge>
    </div>
  );
}
