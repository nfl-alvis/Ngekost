import { cn } from "@/lib/utils";

interface Kost3DProps {
  className?: string;
  tone?: "light" | "dark";
}

/**
 * Kost3D — pure-CSS 3D boarding-house diorama.
 * A 2-storey house built from 6 faces via `transform-style: preserve-3d`.
 * On group-hover it rotates for an interactive feel. Floating companion
 * elements (ball, plant, mini house) add depth and motion.
 */
export default function Kost3D({ className = "", tone = "light" }: Kost3DProps) {
  const isDark = tone === "dark";

  // Palette
  const wall = isDark ? "#f2e7de" : "#f7eadf";
  const wallSide = isDark ? "#e2cfc0" : "#ecd9c9";
  const roof = isDark ? "#d5762b" : "#cf6a24";
  const roofSide = isDark ? "#b85a1e" : "#b65a1f";
  const window = "#7fb2c8";
  const windowFrame = isDark ? "#3d2a24" : "#5b3a2e";
  const door = "#8a4b2e";
  const base = isDark ? "#3d2a24" : "#5b3a2e";

  const S = 130; // half-size of the cube body

  return (
    <div
      className={cn("kost3d-scene select-none", className)}
      aria-hidden="true"
    >
      <div className="kost3d relative h-[380px] w-[380px] md:h-[440px] md:w-[440px]">
        {/* Soft ground shadow */}
        <div
          className="absolute left-1/2 top-1/2 h-64 w-72 -translate-x-1/2 -translate-y-[8%] rounded-full bg-black/20 blur-2xl"
          style={{ transform: "translate(-50%, 55%) rotateX(60deg)" }}
        />

        {/* ===== BUILDING BODY ===== */}
        {/* Front wall */}
        <div
          className="kost3d-face"
          style={{
            width: S * 2,
            height: S * 2,
            transform: `translate(-50%, -50%) translateZ(${S}px)`,
            background: wall,
            border: `1px solid ${isDark ? "#cbb9ab" : "#d8c3b3"}`,
          }}
        >
          {/* windows row 1 */}
          {[0, 1].map((i) => (
            <div
              key={`w1-${i}`}
              className="absolute"
              style={{
                left: 28 + i * 72,
                top: 34,
                width: 40,
                height: 46,
                background: window,
                border: `3px solid ${windowFrame}`,
                borderRadius: 3,
              }}
            />
          ))}
          {/* door */}
          <div
            className="absolute"
            style={{
              left: S - 22,
              top: S + 18,
              width: 44,
              height: 62,
              background: door,
              border: `3px solid ${windowFrame}`,
              borderRadius: "4px 4px 0 0",
            }}
          />
          {/* door knob */}
          <div
            className="absolute"
            style={{ left: S + 13, top: S + 44, width: 5, height: 5, background: "#f2d9a0", borderRadius: 99 }}
          />
          {/* windows row 2 */}
          {[0, 1].map((i) => (
            <div
              key={`w2-${i}`}
              className="absolute"
              style={{
                left: 28 + i * 72,
                top: S + 18,
                width: 40,
                height: 40,
                background: window,
                border: `3px solid ${windowFrame}`,
                borderRadius: 3,
              }}
            />
          ))}
          {/* balcony line */}
          <div
            className="absolute"
            style={{
              left: 10,
              right: 10,
              top: S + 6,
              height: 4,
              background: windowFrame,
              opacity: 0.85,
            }}
          />
        </div>

        {/* Right wall */}
        <div
          className="kost3d-face"
          style={{
            width: S * 2,
            height: S * 2,
            transform: `translate(-50%, -50%) rotateY(90deg) translateZ(${S}px)`,
            background: wallSide,
            border: `1px solid ${isDark ? "#cbb9ab" : "#d8c3b3"}`,
          }}
        >
          {[0, 1].map((i) => (
            <div
              key={`wr-${i}`}
              className="absolute"
              style={{
                left: 34 + i * 64,
                top: 46,
                width: 38,
                height: 44,
                background: window,
                border: `3px solid ${windowFrame}`,
                borderRadius: 3,
              }}
            />
          ))}
        </div>

        {/* Left wall */}
        <div
          className="kost3d-face"
          style={{
            width: S * 2,
            height: S * 2,
            transform: `translate(-50%, -50%) rotateY(-90deg) translateZ(${S}px)`,
            background: wallSide,
            border: `1px solid ${isDark ? "#cbb9ab" : "#d8c3b3"}`,
          }}
        />

        {/* Back wall */}
        <div
          className="kost3d-face"
          style={{
            width: S * 2,
            height: S * 2,
            transform: `translate(-50%, -50%) rotateY(180deg) translateZ(${S}px)`,
            background: isDark ? "#d9c4b4" : "#e7d2c2",
          }}
        />

        {/* Roof — two sloping planes (pyramid-ish) */}
        {[
          {
            // front-left slope
            rotX: -28,
            translateZ: S,
            color: roof,
            width: 276,
            height: 150,
            extra: "rotateX(-28deg) translateY(-20px)",
          },
          {
            // front-right slope
            rotX: -28,
            translateZ: -S,
            color: roofSide,
            width: 276,
            height: 150,
            extra: "",
          },
        ].map((face, i) => (
          <div
            key={`roof-${i}`}
            className="kost3d-face"
            style={{
              width: face.width,
              height: face.height,
              background: face.color,
              border: `1px solid ${isDark ? "#9c4c15" : "#a3511b"}`,
              clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)",
              transform: `translate(-50%, -50%) rotateX(${face.rotX}deg) translateZ(${face.translateZ}px) translateY(-${S}px)`,
              transformOrigin: "center bottom",
            }}
          />
        ))}

        {/* Roof ridge cap */}
        <div
          className="kost3d-face"
          style={{
            width: 120,
            height: 8,
            background: isDark ? "#a3511b" : "#b65a1f",
            transform: `translate(-50%, -50%) translateZ(0) translateY(-${S + 40}px) rotateX(-28deg)`,
            borderRadius: 4,
          }}
        />

        {/* Chimney */}
        <div
          className="kost3d-face"
          style={{
            width: 26,
            height: 40,
            background: "#c98d63",
            border: `1px solid ${isDark ? "#9c6a47" : "#a0704f"}`,
            transform: `translate(-50%, -50%) translate3d(52px, -${S + 34}px, 0) rotateX(-28deg)`,
          }}
        />
      </div>

      {/* ===== FLOATING COMPANIONS ===== */}
      <div className="pointer-events-none absolute inset-0">
        {/* Mini house — floating, animated */}
        <div
          className="absolute animate-float"
          style={{ left: "-8%", top: "8%", animationDelay: "0.6s" }}
        >
          <MiniHouse isDark={isDark} />
        </div>
        {/* Ball */}
        <div
          className="absolute animate-float-slow h-7 w-7 rounded-full"
          style={{
            right: "4%",
            top: "12%",
            background: "radial-gradient(circle at 32% 28%, #f2a35c, #d5762b 70%)",
            boxShadow: `0 10px 18px -6px ${isDark ? "rgba(0,0,0,0.6)" : "rgba(61,42,36,0.4)"}`,
            animationDelay: "1.2s",
          }}
        />
        {/* Plant pot */}
        <div
          className="absolute animate-float"
          style={{ right: "2%", bottom: "10%", animationDelay: "0.2s" }}
        >
          <div className="flex flex-col items-center">
            <div
              className="h-7 w-4 rounded-t-full"
              style={{ background: "linear-gradient(180deg,#6da56a,#4f8a4c)" }}
            />
            <div
              className="h-4 w-9 rounded-b-sm"
              style={{ background: "#c9864f", border: "1px solid #a56a3c" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniHouse({ isDark }: { isDark: boolean }) {
  return (
    <svg width="86" height="74" viewBox="0 0 86 74" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_14px_20px_rgba(61,42,36,0.25)]">
      {/* body */}
      <rect x="12" y="28" width="62" height="40" rx="3" fill={isDark ? "#f2e7de" : "#f5e6d8"} />
      {/* roof */}
      <path d="M6 30 43 4l37 26H6Z" fill={isDark ? "#d5762b" : "#cf6a24"} />
      {/* door */}
      <rect x="36" y="42" width="14" height="26" rx="2" fill="#8a4b2e" />
      {/* windows */}
      <rect x="19" y="36" width="12" height="12" rx="1.5" fill="#7fb2c8" />
      <rect x="56" y="36" width="12" height="12" rx="1.5" fill="#7fb2c8" />
      {/* chimney */}
      <rect x="56" y="12" width="10" height="14" fill="#c98d63" />
    </svg>
  );
}
