"use client";

import { cn } from "@/lib/utils";

export type AgentMarkType =
  | "sales"
  | "hr"
  | "hospital"
  | "payment"
  | "support"
  | "school"
  | "restaurant"
  | "realestate"
  | "insurance";

export type AgentMarkTheme = "light" | "dark";

export type AvatarType = AgentMarkType;

interface AgentMarkProps {
  type: AgentMarkType;
  theme?: AgentMarkTheme;
  size?: number;
  className?: string;
}

const BRAND_ACCENT = "#10B981";

const AGENT_STYLES: Record<
  AgentMarkType,
  {
    from: string;
    to: string;
    shellLight: string;
    shellDark: string;
    borderLight: string;
    borderDark: string;
    glyph: (primary: string, secondary: string) => React.ReactNode;
  }
> = {
  sales: {
    from: "#6366F1",
    to: "#7C3AED",
    shellLight: "from-indigo-500/25 via-indigo-500/15 to-violet-600/10",
    shellDark: "from-indigo-400/30 via-indigo-500/20 to-violet-500/15",
    borderLight: "border-indigo-500/20",
    borderDark: "border-indigo-400/30",
    glyph: (p, s) => (
      <>
        <path
          d="M17 41 L25 33 L31 37 L37 25"
          stroke={p}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="37" cy="25" r="2.5" fill={p} />
        <rect x="36" y="24" width="13" height="21" rx="3.5" fill={p} />
        <rect x="38.5" y="27" width="8" height="2" rx="1" fill={s} />
        <rect x="38.5" y="31" width="5.5" height="1.5" rx="0.75" fill={s} opacity="0.85" />
      </>
    ),
  },
  hr: {
    from: "#8B5CF6",
    to: "#9333EA",
    shellLight: "from-violet-500/25 via-violet-500/15 to-purple-600/10",
    shellDark: "from-violet-400/30 via-violet-500/20 to-purple-500/15",
    borderLight: "border-violet-500/20",
    borderDark: "border-violet-400/30",
    glyph: (p, s) => (
      <>
        <circle cx="28" cy="26" r="5" fill={p} />
        <path d="M18 42 C18 36 22 33 28 33 C34 33 38 36 38 42" fill={p} />
        <circle cx="42" cy="40" r="7" fill={p} />
        <path
          d="M39 40 L41.5 42.5 L46 38"
          stroke={s}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </>
    ),
  },
  hospital: {
    from: "#14B8A6",
    to: "#059669",
    shellLight: "from-teal-500/25 via-teal-500/15 to-emerald-600/10",
    shellDark: "from-teal-400/30 via-teal-500/20 to-emerald-500/15",
    borderLight: "border-teal-500/20",
    borderDark: "border-teal-400/30",
    glyph: (p, s) => (
      <>
        <path d="M32 18 L44 24 V34 C44 40 32 44 32 44 C32 44 20 40 20 34 V24 Z" fill={p} />
        <rect x="29" y="27" width="6" height="12" rx="1" fill={s} />
        <rect x="26" y="30" width="12" height="6" rx="1" fill={s} />
      </>
    ),
  },
  payment: {
    from: "#F59E0B",
    to: "#EA580C",
    shellLight: "from-amber-500/30 via-amber-500/18 to-orange-600/12",
    shellDark: "from-amber-400/35 via-amber-500/22 to-orange-500/15",
    borderLight: "border-amber-500/25",
    borderDark: "border-amber-400/30",
    glyph: (p, s) => (
      <>
        <path d="M34 20 C34 17 42 17 42 20 V24 C42 27 34 27 34 24 Z" fill={p} />
        <path d="M38 27 V30" stroke={p} strokeWidth="2" strokeLinecap="round" />
        <path
          d="M26 32 C26 28 30 26 34 26 C38 26 42 28 42 32 C42 36 38 38 34 38 C30 38 26 36 26 32 Z"
          fill={p}
        />
        <path
          d="M31.5 32 H36.5 M34 29.5 V34.5"
          stroke={s}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    ),
  },
  support: {
    from: "#06B6D4",
    to: "#2563EB",
    shellLight: "from-cyan-500/25 via-cyan-500/15 to-blue-600/10",
    shellDark: "from-cyan-400/30 via-cyan-500/20 to-blue-500/15",
    borderLight: "border-cyan-500/20",
    borderDark: "border-cyan-400/30",
    glyph: (p, s) => (
      <>
        <path d="M22 28 C22 22 42 22 42 28" stroke={p} strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <rect x="18" y="28" width="6" height="10" rx="3" fill={p} />
        <rect x="40" y="28" width="6" height="10" rx="3" fill={p} />
        <rect x="24" y="34" width="16" height="11" rx="4" fill={p} />
        <circle cx="28" cy="39.5" r="1.25" fill={s} />
        <circle cx="32" cy="39.5" r="1.25" fill={s} />
        <circle cx="36" cy="39.5" r="1.25" fill={s} />
      </>
    ),
  },
  school: {
    from: "#3B82F6",
    to: "#4F46E5",
    shellLight: "from-blue-500/25 via-blue-500/15 to-indigo-600/10",
    shellDark: "from-blue-400/30 via-blue-500/20 to-indigo-500/15",
    borderLight: "border-blue-500/20",
    borderDark: "border-blue-400/30",
    glyph: (p) => (
      <>
        <polygon points="32,18 46,26 32,34 18,26" fill={p} />
        <rect x="28" y="34" width="8" height="3" fill={p} />
        <rect x="22" y="40" width="3" height="8" rx="1" fill={p} opacity="0.75" />
        <rect x="27" y="36" width="3" height="12" rx="1" fill={p} opacity="0.85" />
        <rect x="32" y="38" width="3" height="10" rx="1" fill={p} />
        <rect x="37" y="34" width="3" height="14" rx="1" fill={p} opacity="0.9" />
      </>
    ),
  },
  restaurant: {
    from: "#F43F5E",
    to: "#EC4899",
    shellLight: "from-rose-500/25 via-rose-500/15 to-pink-600/10",
    shellDark: "from-rose-400/30 via-rose-500/20 to-pink-500/15",
    borderLight: "border-rose-500/20",
    borderDark: "border-rose-400/30",
    glyph: (p, s) => (
      <>
        <path
          d="M32 20 C32 20 24 24 24 32 C24 36 27.5 38 32 38 C36.5 38 40 36 40 32 C40 24 32 20 32 20 Z"
          fill={p}
        />
        <line x1="32" y1="16" x2="32" y2="20" stroke={p} strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="32" cy="44" rx="12" ry="3.5" fill={p} />
        <ellipse cx="32" cy="42.5" rx="9" ry="2" fill={s} opacity="0.45" />
      </>
    ),
  },
  realestate: {
    from: "#10B981",
    to: "#14B8A6",
    shellLight: "from-emerald-500/25 via-emerald-500/15 to-teal-600/10",
    shellDark: "from-emerald-400/30 via-emerald-500/20 to-teal-500/15",
    borderLight: "border-emerald-500/20",
    borderDark: "border-emerald-400/30",
    glyph: (p, s) => (
      <>
        <path d="M32 20 L44 30 V42 H20 V30 Z" fill={p} />
        <rect x="28" y="34" width="8" height="8" fill={s} opacity="0.4" />
        <path
          d="M32 16 C32 16 28 20 28 24 C28 27 32 29 32 29 C32 29 36 27 36 24 C36 20 32 16 32 16 Z"
          fill={p}
        />
        <circle cx="32" cy="23" r="2.5" fill={s} />
      </>
    ),
  },
  insurance: {
    from: "#0EA5E9",
    to: "#06B6D4",
    shellLight: "from-sky-500/25 via-sky-500/15 to-cyan-600/10",
    shellDark: "from-sky-400/30 via-sky-500/20 to-cyan-500/15",
    borderLight: "border-sky-500/20",
    borderDark: "border-sky-400/30",
    glyph: (p, s) => (
      <>
        <path d="M32 18 L44 24 V32 C44 38 32 42 32 42 C32 42 20 38 20 32 V24 Z" fill={p} />
        <rect x="26" y="28" width="12" height="14" rx="2" fill={s} opacity="0.35" />
        <rect
          x="26"
          y="28"
          width="12"
          height="14"
          rx="2"
          stroke={s}
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M29 34 L31.5 36.5 L36 32"
          stroke={s}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </>
    ),
  },
};

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function rgba(hex: string, alpha: number) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r},${g},${b},${alpha})`;
}

function CircuitMotif({ primary, opacity }: { primary: string; opacity: number }) {
  return (
    <g opacity={opacity} aria-hidden="true">
      <circle cx="50" cy="50" r="1.5" fill={primary} />
      <circle cx="56" cy="46" r="1.5" fill={primary} />
      <circle cx="54" cy="54" r="1" fill={BRAND_ACCENT} />
      <line x1="50" y1="50" x2="56" y2="46" stroke={primary} strokeWidth="0.75" />
      <line x1="56" y1="46" x2="54" y2="54" stroke={primary} strokeWidth="0.75" />
    </g>
  );
}

export function AgentMark({ type, theme = "light", size = 64, className }: AgentMarkProps) {
  const agent = AGENT_STYLES[type];
  const isLight = theme === "light";
  const primary = isLight ? agent.from : agent.to;
  const secondary = "#FFFFFF";
  const circuitOpacity = isLight ? 0.35 : 0.45;
  const strokeColor = rgba(agent.from, isLight ? 0.22 : 0.35);

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-gradient-to-br shadow-sm",
        isLight ? agent.shellLight : agent.shellDark,
        isLight ? agent.borderLight : agent.borderDark,
        className,
      )}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-full"
      >
        <CircuitMotif primary={primary} opacity={circuitOpacity} />
        <g>{agent.glyph(primary, secondary)}</g>
        <rect
          x="0.5"
          y="0.5"
          width="63"
          height="63"
          rx="11.5"
          stroke={strokeColor}
          fill="none"
        />
      </svg>
    </div>
  );
}
