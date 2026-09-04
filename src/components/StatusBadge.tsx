import { cn } from "@/lib/utils";

/**
 * Badge status semantik lintas domain: booking, verifikasi, pembayaran, kamar.
 * Warna konsisten: hijau=sehat, kuning=menunggu, biru=proses bayar,
 * merah=masalah, abu=netral/terisi.
 */
const statusColors = {
  yellow: "border-[#EAD9A8] bg-[#FBF3DC] text-[#8A6A14]",
  green: "border-[#BFDCC5] bg-[#E9F4EC] text-[#2F6B3C]",
  blue: "border-[#BFD3E8] bg-[#EAF1FA] text-[#2C5A8F]",
  red: "border-[#EBC4C0] bg-[#FAEAE8] text-[#9C3B32]",
  gray: "border-nk-border bg-nk-section text-nk-text-muted",
} as const;

export type StatusColor = keyof typeof statusColors;

export function StatusBadge({
  color,
  className,
  children,
}: {
  color: StatusColor;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-md border px-2.5 py-0.5 text-xs font-medium",
        statusColors[color],
        className
      )}
    >
      {children}
    </span>
  );
}
