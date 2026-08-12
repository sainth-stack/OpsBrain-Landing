"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

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

/** Portrait avatar for Diya - AI voice guide persona. */
export function DiyaAvatar({ size = "md", showOnline = false, className }: DiyaAvatarProps) {
  return (
    <div className={cn("relative shrink-0", sizeMap[size], className)}>
      <div
        className={cn(
          "relative h-full w-full overflow-hidden rounded-full",
          "bg-gradient-to-br from-indigo-50 via-violet-50 to-indigo-100",
          "ring-[2.5px] ring-brand-primary/15 shadow-md shadow-brand-primary/10",
        )}
      >
        <Image
          src="/diya/diya-avatar.png"
          alt="Diya, OpsBrain AI voice guide"
          fill
          sizes="104px"
          className="object-cover object-[50%_22%]"
        />
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
