import { Link } from "@/i18n/navigation";

export default function Logo({
  className = "",
  href = "/",
}: {
  className?: string;
  href?: string;
}) {
  return (
    <Link href={href} className={className} aria-label="NgeKost">
      <span className="text-xl font-light uppercase tracking-tight text-current">
        Nge<span className="font-normal">Kost</span>
      </span>
    </Link>
  );
}
