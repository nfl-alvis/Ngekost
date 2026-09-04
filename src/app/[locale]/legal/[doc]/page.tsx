import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import LegalDoc from "@/components/LegalDoc";

type Props = { params: Promise<{ locale: string; doc: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, doc } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return { title: doc === "privasi" ? t("privacyTitle") : t("termsTitle") };
}

export default async function LegalPage({ params }: Props) {
  const { locale, doc } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legal" });

  if (doc !== "syarat-ketentuan" && doc !== "privasi") notFound();
  const isPrivacy = doc === "privasi";
  const title = isPrivacy ? t("privacyTitle") : t("termsTitle");
  const updated = isPrivacy ? t("privacyUpdated") : t("termsUpdated");
  const sections = (isPrivacy ? t.raw("sectionsPrivacy") : t.raw("sections")) as {
    heading: string;
    body: string;
    list?: string[];
  }[];

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12 lg:px-10 lg:py-16">
      <header className="mb-10">
        <h1 className="text-3xl font-light tracking-tight text-nk-text lg:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-nk-text-muted">{updated}</p>
      </header>
      <LegalDoc sections={sections} />
    </div>
  );
}
