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
      <span className="text-xl font-semibold tracking-tight text-current">
        NgeKost
      </span>
    </Link>
  );
}
