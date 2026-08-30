import { Link } from "@/i18n/navigation";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 text-nk-text"
      aria-label="NgeKost — Beranda"
    >
      <span className="grid size-9 place-items-center rounded-lg bg-nk-accent text-nk-text-inverse">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 11.5 12 4l9 7.5" />
          <path d="M5 10.5V20h14v-9.5" />
          <path d="M10 20v-5h4v5" />
        </svg>
      </span>
      <span className="text-lg font-bold tracking-tight">
        Nge<span className="text-nk-accent">Kost</span>
      </span>
    </Link>
  );
}
