import { cn } from "@/lib/utils";

export type AvatarType =
  | "sales"
  | "hr"
  | "hospital"
  | "payment"
  | "support"
  | "school"
  | "restaurant"
  | "realestate"
  | "insurance";

interface EmployeeAvatarProps {
  type: AvatarType;
  className?: string;
  size?: number;
}

function BaseFace({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <circle cx="32" cy="28" r="14" fill="#E0E7FF" />
      <circle cx="27" cy="26" r="2" fill="#4F46E5" />
      <circle cx="37" cy="26" r="2" fill="#4F46E5" />
      <path
        d="M26 32 Q32 36 38 32"
        stroke="#4F46E5"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      {children}
    </>
  );
}

const avatarRenderers: Record<AvatarType, React.ReactNode> = {
  sales: (
    <>
      <BaseFace />
      <rect x="44" y="18" width="14" height="20" rx="3" fill="#10B981" opacity="0.9" />
      <path d="M47 24 L51 28 L47 32" stroke="white" strokeWidth="1.5" fill="none" />
      <rect x="8" y="40" width="20" height="14" rx="2" fill="#6366F1" opacity="0.8" />
      <rect x="10" y="46" width="8" height="6" rx="1" fill="#A5B4FC" />
      <rect x="19" y="44" width="7" height="8" rx="1" fill="#818CF8" />
    </>
  ),
  hr: (
    <>
      <BaseFace />
      <rect x="42" y="16" width="16" height="22" rx="2" fill="#8B5CF6" opacity="0.9" />
      <line x1="45" y1="22" x2="55" y2="22" stroke="white" strokeWidth="1.5" />
      <line x1="45" y1="27" x2="53" y2="27" stroke="white" strokeWidth="1.5" />
      <line x1="45" y1="32" x2="55" y2="32" stroke="white" strokeWidth="1.5" />
      <circle cx="14" cy="44" r="8" fill="#10B981" opacity="0.8" />
      <path d="M10 44 L14 40 L18 44 L14 48 Z" fill="white" opacity="0.7" />
    </>
  ),
  hospital: (
    <>
      <BaseFace />
      <rect x="42" y="20" width="16" height="16" rx="3" fill="#EF4444" opacity="0.9" />
      <rect x="48" y="24" width="4" height="8" rx="1" fill="white" />
      <rect x="45" y="27" width="10" height="2" rx="1" fill="white" />
      <path d="M8 42 L16 42 L16 52 L8 52 Z" fill="#10B981" opacity="0.7" />
      <circle cx="12" cy="38" r="3" fill="#10B981" />
    </>
  ),
  payment: (
    <>
      <BaseFace />
      <rect x="40" y="18" width="20" height="14" rx="3" fill="#F59E0B" opacity="0.9" />
      <rect x="43" y="22" width="14" height="2" rx="1" fill="white" />
      <rect x="43" y="26" width="10" height="2" rx="1" fill="white" opacity="0.7" />
      <circle cx="14" cy="46" r="10" fill="#10B981" opacity="0.8" />
      <text x="14" y="50" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
        ₹
      </text>
    </>
  ),
  support: (
    <>
      <BaseFace />
      <path
        d="M42 22 C42 18 56 18 56 22 L56 32 C56 36 42 36 42 32 Z"
        fill="#06B6D4"
        opacity="0.9"
      />
      <circle cx="49" cy="27" r="3" fill="white" />
      <path d="M8 38 Q16 46 24 38" stroke="#10B981" strokeWidth="2" fill="none" />
      <circle cx="8" cy="38" r="3" fill="#10B981" />
      <circle cx="24" cy="38" r="3" fill="#10B981" />
    </>
  ),
  school: (
    <>
      <BaseFace />
      <polygon points="50,16 62,22 50,28 38,22" fill="#3B82F6" opacity="0.9" />
      <rect x="46" y="28" width="8" height="4" fill="#3B82F6" opacity="0.7" />
      <rect x="8" y="40" width="18" height="14" rx="2" fill="#6366F1" opacity="0.8" />
      <line x1="11" y1="45" x2="23" y2="45" stroke="white" strokeWidth="1.5" />
      <line x1="11" y1="49" x2="20" y2="49" stroke="white" strokeWidth="1.5" />
    </>
  ),
  restaurant: (
    <>
      <BaseFace />
      <line x1="48" y1="14" x2="48" y2="34" stroke="#F43F5E" strokeWidth="2" />
      <line x1="44" y1="18" x2="52" y2="18" stroke="#F43F5E" strokeWidth="2" />
      <line x1="43" y1="22" x2="53" y2="22" stroke="#F43F5E" strokeWidth="2" />
      <ellipse cx="14" cy="46" rx="10" ry="6" fill="#10B981" opacity="0.7" />
      <ellipse cx="14" cy="44" rx="8" ry="4" fill="#34D399" opacity="0.8" />
    </>
  ),
  realestate: (
    <>
      <BaseFace />
      <polygon points="50,34 62,22 38,22" fill="#10B981" opacity="0.9" />
      <rect x="42" y="34" width="16" height="12" fill="#059669" opacity="0.8" />
      <rect x="46" y="38" width="4" height="4" fill="#A7F3D0" />
      <rect x="52" y="38" width="4" height="4" fill="#A7F3D0" />
    </>
  ),
  insurance: (
    <>
      <BaseFace />
      <path
        d="M50 16 L62 22 L62 30 C62 36 50 40 50 40 C50 40 38 36 38 30 L38 22 Z"
        fill="#0EA5E9"
        opacity="0.9"
      />
      <path d="M47 28 L50 31 L54 25" stroke="white" strokeWidth="2" fill="none" />
      <rect x="8" y="42" width="16" height="10" rx="2" fill="#6366F1" opacity="0.7" />
    </>
  ),
};

export function EmployeeAvatar({ type, className, size = 64 }: EmployeeAvatarProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      <rect width="64" height="64" rx="16" fill="#EEF2FF" />
      {avatarRenderers[type]}
    </svg>
  );
}
