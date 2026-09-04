import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

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
        ? "NgeKost is Indonesia's trusted platform for verified boarding houses with transparent pricing and real owner verification."
        : "NgeKost adalah platform terpercaya untuk kost terverifikasi di Indonesia dengan harga transparan dan verifikasi pemilik resmi.",
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
    { value: "120+", label: locale === "en" ? "verified kosts" : "kost terverifikasi" },
    { value: "6", label: locale === "en" ? "cities" : "kota" },
    { value: "8.4rb", label: locale === "en" ? "active renters" : "penyewa aktif" },
  ];

  return (
    <div className="bg-nk-bg">
      {/* ===== Hero — Premium editorial hero with warm tone ===== */}
      <section className="relative flex min-h-[85dvh] items-end overflow-hidden">
        <Image
          src="/images/about-hero-wide.jpg"
          alt={t("imageAlt")}
          fill
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          priority
        />

        {/* Soft cream overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F7]/90 via-[#FAF9F7]/70 to-[#FAF9F7]/40" />

        <div className="mx-auto w-full max-w-7xl px-6 pb-20 pt-32 lg:px-10 lg:pb-32">
          <p className="font-mono text-sm tracking-[0.125em] text-nk-text-muted">
            {t("eyebrow")}
          </p>

          <h1 className="mt-4 max-w-2xl text-5xl leading-[1.05] font-semibold tracking-tighter text-nk-text md:text-[4.25rem] lg:text-[4.75rem]">
            {t("title")}
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-nk-text-muted md:text-xl">
            {t("subtitle")}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button size="lg" href="/kost">
              {t("ctaButton")}
            </Button>
            <Button size="lg" variant="outline" href="/kost?kota=Bandung">
              {locale === "en" ? "Start in Bandung" : "Mulai dari Bandung"}
            </Button>
          </div>
        </div>
      </section>

      {/* ===== Mission + Values ===== */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="font-mono text-sm tracking-widest text-nk-text-muted">
              {t("missionLabel")}
            </p>
            <h2 className="mt-6 text-4xl leading-[1.1] font-semibold tracking-tight text-nk-text md:text-5xl">
              {t("missionTitle")}
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-nk-text-muted">
              {t("missionBody")}
            </p>
          </div>

          <div className="lg:col-span-7 lg:pl-12">
            <h2 className="mb-10 text-3xl font-semibold tracking-tight text-nk-text">
              {t("valuesTitle")}
            </h2>

            <div className="space-y-16">
              {values.map((v, i) => (
                <article key={v.title} className="group">
                  <div className="flex items-start gap-6">
                    <span className="font-mono text-sm text-nk-accent tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-2xl font-medium tracking-tight text-nk-text">
                        {v.title}
                      </h3>
                      <p className="mt-4 max-w-xl text-lg leading-relaxed text-nk-text-muted">
                        {v.body}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Separator className="mx-auto max-w-7xl" />

      {/* ===== Process Timeline ===== */}
      <section className="bg-nk-warm py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="font-mono text-sm tracking-widest text-nk-text-muted">
            {t("processLabel")}
          </p>

          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-nk-text md:text-5xl">
            {t("processTitle")}
          </h2>

          <ol className="mt-20 grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <li key={p.title} className="relative flex flex-col">
                <span className="font-mono text-xs text-nk-accent tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-6 text-xl font-medium text-nk-text">
                  {p.title}
                </h3>

                <p className="mt-4 text-base leading-relaxed text-nk-text-muted">
                  {p.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== Stats + CTA ===== */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="relative overflow-hidden rounded-2xl">
          <Image
            src="/images/about-hero.jpg"
            alt=""
            fill
            className="absolute inset-0 -z-10 h-full w-full object-cover"
            priority
          />

          <div className="absolute inset-0 bg-gradient-to-br from-[#FAF9F7]/95 via-[#FAF9F7]/90 to-[#FAF9F7]/95" />

          <div className="relative px-6 py-20 md:px-12 md:py-28">
            <div className="flex flex-wrap items-end gap-x-16 gap-y-12">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-mono text-6xl font-medium tabular-nums text-nk-text">
                    {s.value}
                  </p>
                  <p className="mt-3 text-xl text-nk-text-muted">{s.label}</p>
                </div>
              ))}
            </div>

            <Separator className="my-16" />

            <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div className="max-w-lg">
                <h2 className="text-3xl font-semibold tracking-tight text-nk-text">
                  {t("ctaTitle")}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-nk-text-muted">
                  {t("ctaBody")}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-4">
                <Button size="lg" href="/kost">
                  {t("ctaButton")}
                </Button>
                <Link
                  href="/kost"
                  className="text-lg font-medium text-nk-text hover:underline underline-offset-4"
                >
                  {locale === "en" ? "See all cities" : "Lihat semua kota"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}