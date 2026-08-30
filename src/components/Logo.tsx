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
      <span className="font-serif text-[1.4rem] font-semibold leading-none tracking-tight text-current">
        Nge<span className="text-nk-accent">Kost</span>
      </span>
    </Link>
  );
}
