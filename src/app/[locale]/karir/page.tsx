import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import KarirClient from "./KarirClient";

export const metadata: Metadata = { title: "Karir" };

export default async function KarirPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "karir" });
  const openings = t.raw("openingsList") as {
    title: string;
    type: string;
    location: string;
    team: string;
  }[];
  const steps = t.raw("processSteps") as string[];
  return <KarirClient openings={openings} steps={steps} />;
}
