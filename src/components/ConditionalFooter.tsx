"use client";

import { usePathname } from "@/i18n/navigation";
import Footer from "@/components/Footer";

/**
 * Footer disembunyikan di dashboard owner & admin.
 * Client component karena pathname hanya tersedia di sisi klien.
 */
export default function ConditionalFooter() {
  const pathname = usePathname();
  if (pathname.startsWith("/owner") || pathname.startsWith("/admin")) return null;
  return <Footer />;
}
