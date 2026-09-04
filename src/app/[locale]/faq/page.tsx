import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import FaqClient from "./FaqClient";

export const metadata: Metadata = { title: "FAQ" };

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "faq" });
  const groups = t.raw("groups") as Record<string, string>;
  const items = t.raw("items") as Record<string, string>;
  return <FaqClient groups={groups} items={items} />;
}
