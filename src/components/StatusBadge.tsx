import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * Badge status semantik lintas domain: booking, verifikasi, pembayaran, kamar.
 * Wraps shadcn Badge dengan varian warna warm-palette:
 * hijau=sehat, kuning=menunggu, biru=proses bayar, merah=masalah, abu=netral.
 */
const colorVariants = {
  green: "border-[#BFDCC5] bg-[#E9F4EC] text-[#2F6B3C]",
  yellow: "border-[#EAD9A8] bg-[#FBF3DC] text-[#8A6A1F]",
  blue: "border-[#B9CCE4] bg-[#E8EFF8] text-[#33517C]",
  red: "border-[#EBC4C0] bg-[#FAEAE8] text-[#9C3B32]",
  gray: "border-nk-border bg-nk-section text-nk-text-muted",
} as const;

export type StatusColor = keyof typeof colorVariants;

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
    <Badge variant="outline" className={cn(colorVariants[color], className)}>
      {children}
    </Badge>
  );
}
