/**
 * IsoHouse — isometric SVG illustration of a boarding house.
 * Lightweight, reusable in cards, empty states, CTA blocks.
 * Palette matches NgeKost (cream walls, terracotta roof).
 */
export default function IsoHouse({
  className = "",
  seed = "default",
}: {
  className?: string;
  seed?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 160"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`roof-${seed}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d5762b" />
          <stop offset="100%" stopColor="#bc5823" />
        </linearGradient>
        <linearGradient id={`wall-${seed}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f9efe6" />
          <stop offset="100%" stopColor="#eedccd" />
        </linearGradient>
      </defs>

      {/* ground */}
      <ellipse cx="100" cy="140" rx="82" ry="14" fill="#f5f3f2" />

      {/* left wall (darker) */}
      <polygon points="30,60 100,25 100,105 30,140" fill="#ecd9c9" />
      {/* right wall */}
      <polygon points="100,25 170,60 170,140 100,105" fill="url(#wall-default)" />
      {/* roof left */}
      <polygon points="24,58 100,18 100,44 24,84" fill="#b85a1e" />
      {/* roof right */}
      <polygon points="100,18 176,58 176,84 100,44" fill="url(#roof-default)" />
      {/* front face roof */}
      <polygon points="30,60 100,25 170,60 100,95" fill="#cf6a24" />

      {/* windows */}
      <polygon points="55,75 75,65 75,82 55,92" fill="#7fb2c8" stroke="#5b3a2e" strokeWidth="1.5" />
      <polygon points="125,75 145,65 145,82 125,92" fill="#7fb2c8" stroke="#5b3a2e" strokeWidth="1.5" />
      {/* door */}
      <polygon points="92,105 108,98 108,130 92,137" fill="#8a4b2e" stroke="#5b3a2e" strokeWidth="1.5" />

      {/* chimney */}
      <rect x="130" y="30" width="14" height="26" transform="skewY(-22)" fill="#c98d63" />

      {/* shadow */}
      <ellipse cx="100" cy="141" rx="70" ry="8" fill="#3d2a24" opacity="0.12" />
    </svg>
  );
}
