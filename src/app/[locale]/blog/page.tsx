import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import BlogIndexClient from "./BlogIndexClient";

export const metadata: Metadata = { title: "Blog" };

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <BlogIndexClient />;
}
