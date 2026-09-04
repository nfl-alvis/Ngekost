import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import BlogDetailClient from "./BlogDetailClient";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const posts = t.raw("posts") as Record<string, { title: string }>;
  return { title: posts[slug]?.title ?? "Blog" };
}

export function generateStaticParams() {
  // slug dinamis dirender on-demand; route tetap statis per locale
  return [];
}

export default async function BlogDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "blog" });
  const posts = t.raw("posts") as Record<string, { title: string }>;
  if (!posts[slug]) notFound();
  return <BlogDetailClient slug={slug} />;
}
