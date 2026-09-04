"use client";

import { usePathname } from "@/i18n/navigation";
import Navbar from "@/components/Navbar";

/**
 * Navbar disembunyikan di dashboard owner & admin —
 * area tersebut hanya memakai sidebar (DashboardShell).
 */
export default function ConditionalNavbar() {
  const pathname = usePathname();
  if (pathname.startsWith("/owner") || pathname.startsWith("/admin")) return null;
  return <Navbar />;
}
