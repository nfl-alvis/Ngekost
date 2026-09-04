import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import BookingApplyClient from "./BookingApplyClient";

export const metadata: Metadata = { title: "Ajukan Booking" };

export default async function BookingApplyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <Suspense>
      <BookingApplyClient />
    </Suspense>
  );
}
