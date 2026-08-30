import type { Metadata } from "next";
import { IBM_Plex_Serif, Spline_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const serif = IBM_Plex_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const sans = Spline_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: {
    default: "NgeKost — Cari Kost Terverifikasi",
    template: "%s — NgeKost",
  },
  description:
    "Platform kost terverifikasi untuk anak kos Indonesia. Harga transparan, fasilitas lengkap.",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${serif.variable} ${sans.variable}`}>
      <body className="grain min-h-dvh flex flex-col bg-nk-bg text-nk-text antialiased selection:bg-nk-accent selection:text-white">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[99] focus:rounded-md focus:bg-nk-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white">
          {(messages as any)?.common?.skip || "Skip to content"}
        </a>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
