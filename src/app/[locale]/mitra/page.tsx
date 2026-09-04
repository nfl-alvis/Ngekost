import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import MitraClient from "./MitraClient";

export const metadata: Metadata = { title: "Mitra Pengelola" };

export default async function MitraPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "mitra" });
  const steps = [1, 2, 3].map((i) => ({
    title: t(`step${i}Title`),
    body: t(`step${i}Body`),
  }));
  const why = [1, 2, 3].map((i) => ({
    title: t(`why${i}Title`),
    body: t(`why${i}Body`),
  }));
  return <MitraClient steps={steps} why={why} />;
}
