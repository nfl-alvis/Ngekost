import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
      {/* Hero — split: left copy, right image */}
      <section className="grid grid-cols-1 items-center gap-12 py-16 md:grid-cols-2 md:py-20">
        <div>
          <Badge variant="secondary">{t("eyebrow")}</Badge>
          <h1 className="mt-4 text-4xl leading-[1.1] tracking-tight text-nk-text md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-nk-text-muted">
            {t("subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href="/kost" render-as-link>
              {t("ctaButton")}
            </Button>
            <Button href="/kost?kota=Bandung" variant="ghost">
              <span className="inline-flex size-6 items-center justify-center rounded-full border border-nk-border text-nk-text-muted">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
              {locale === "en" ? "Start in Bandung" : "Mulai dari Bandung"}
            </Button>
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
          <Card className="absolute -bottom-6 -left-6 hidden w-auto md:block">
            <CardContent className="p-4">
              <p className="text-2xl font-medium tracking-tight text-nk-text">
                120+
              </p>
              <p className="text-xs text-nk-text-muted">
                {locale === "en" ? "verified kosts" : "kost terverifikasi"}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Mission — left label, right copy */}
      <Separator />
      <section className="py-16 md:py-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <Badge variant="outline">{t("missionLabel")}</Badge>
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
      <Separator />
      <section className="py-16 md:py-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <Badge variant="outline">{t("valuesLabel")}</Badge>
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
                    <h3 className="text-lg font-medium tracking-tight text-nk-text">
                      {v.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-nk-text-muted">
                      {v.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process — warm tint band with 4 steps */}
      <section className="rounded-lg bg-nk-warm px-6 py-12 md:px-10 md:py-16">
        <Badge variant="outline">{t("processLabel")}</Badge>
        <h2 className="mt-4 max-w-xl text-2xl tracking-tight text-nk-text md:text-3xl">
          {t("processTitle")}
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {process.map((p, i) => (
            <div key={p.title} className="flex flex-col">
              <span className="flex size-8 items-center justify-center rounded-full border border-nk-dark-border text-sm font-medium text-nk-text">
                {i + 1}
              </span>
              <h3 className="mt-4 text-sm font-medium text-nk-text">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-nk-text-muted">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats + CTA */}
      <section className="py-16 md:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Badge variant="outline">{t("statsLabel")}</Badge>
          </div>
          <div className="md:col-span-8">
            <div className="flex flex-wrap items-end gap-10">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-4xl font-medium tracking-tight text-nk-text">
                    {s.value}
                  </p>
                  <p className="mt-1 text-sm text-nk-text-muted">{s.label}</p>
                </div>
              ))}
            </div>

            <Card className="mt-12">
              <CardHeader>
                <CardTitle className="text-2xl tracking-tight md:text-3xl">
                  {t("ctaTitle")}
                </CardTitle>
                <CardDescription className="max-w-lg text-base">
                  {t("ctaBody")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button href="/kost" render-as-link>
                  {t("ctaButton")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
