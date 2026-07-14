"use client";

import { cn } from "@/lib/utils";

const sizeMap = {
  sm: "h-9 w-9",
  md: "h-11 w-11",
  lg: "h-[5.5rem] w-[5.5rem]",
  xl: "h-[6.5rem] w-[6.5rem]",
} as const;

type DiyaAvatarProps = {
  size?: keyof typeof sizeMap;
  showOnline?: boolean;
  className?: string;
};

/** Polished illustrated avatar for Diya — AI voice guide persona. */
export function DiyaAvatar({ size = "md", showOnline = false, className }: DiyaAvatarProps) {
  return (
    <div className={cn("relative shrink-0", sizeMap[size], className)}>
      <div
        className={cn(
          "flex h-full w-full items-center justify-center overflow-hidden rounded-full",
          "bg-gradient-to-br from-indigo-50 via-violet-50 to-indigo-100",
          "ring-[2.5px] ring-brand-primary/15 shadow-md shadow-brand-primary/10",
        )}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 80 80"
          className="h-[92%] w-[92%]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="diya-hair" x1="20" y1="10" x2="60" y2="50">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#4F46E5" />
            </linearGradient>
            <linearGradient id="diya-skin" x1="30" y1="35" x2="50" y2="65">
              <stop offset="0%" stopColor="#FDDBCF" />
              <stop offset="100%" stopColor="#F5C4B8" />
            </linearGradient>
            <linearGradient id="diya-blouse" x1="20" y1="55" x2="60" y2="78">
              <stop offset="0%" stopColor="#818CF8" />
              <stop offset="100%" stopColor="#6366F1" />
            </linearGradient>
          </defs>

          <circle cx="40" cy="40" r="38" fill="#EEF2FF" />

          <path
            d="M40 12c-9 0-15 7-15 15.5 0 6.5 4 11.5 9 13.5 1 .5 2-.6 1.5-1.5-3.5-5.5-1.5-12.5 5-15.5 2-1 4.5-1.5 6.5-1.5 7 0 12.5 5.5 12.5 12.5 0 3.5-1.5 6.5-4 8.5-.8.7 0 2 1 1.5 4.5-2 7.5-7 7.5-12.5C58 19.5 50.5 12 40 12z"
            fill="url(#diya-hair)"
          />

          <ellipse cx="40" cy="46" rx="17" ry="19" fill="url(#diya-skin)" />

          <path
            d="M23 66c3-10 9-15 17-15s14 5 17 15"
            fill="url(#diya-skin)"
          />

          <path
            d="M23 68c3.5-7 10-11 17-11s13.5 4 17 11c-5 3.5-11 5.5-17 5.5S28 71.5 23 68z"
            fill="url(#diya-blouse)"
          />

          <ellipse cx="32" cy="44" rx="2.5" ry="2.8" fill="#1E1B4B" />
          <ellipse cx="48" cy="44" rx="2.5" ry="2.8" fill="#1E1B4B" />
          <circle cx="33" cy="43" r="0.8" fill="#fff" opacity="0.7" />
          <circle cx="49" cy="43" r="0.8" fill="#fff" opacity="0.7" />

          <path
            d="M34 52c3 2 9 2 12 0"
            stroke="#C4847A"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          <path
            d="M27 36c-1.5-4 2.5-7.5 6-7"
            stroke="#4F46E5"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M53 36c1.5-4-2.5-7.5-6-7"
            stroke="#4F46E5"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          <ellipse cx="28" cy="50" rx="3" ry="2" fill="#F5A8A0" opacity="0.35" />
          <ellipse cx="52" cy="50" rx="3" ry="2" fill="#F5A8A0" opacity="0.35" />
        </svg>
      </div>

      {showOnline ? (
        <span
          className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 items-center justify-center"
          aria-hidden="true"
        >
          <span className="diya-online-pulse absolute h-full w-full rounded-full bg-emerald-400/40" />
          <span className="relative h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
        </span>
      ) : null}
    </div>
  );
}
