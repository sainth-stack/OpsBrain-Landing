"use client";

import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import { AgentMark, type AgentMarkType } from "./AgentMark";

export type AvatarType = AgentMarkType;

const MARK_SIZES = {
  md: 52,
  lg: 60,
  xl: 72,
} as const;

interface EmployeeAvatarProps {
  type: AvatarType;
  className?: string;
  size?: keyof typeof MARK_SIZES;
}

/** Industry-specific agent mark - tinted gradient shell + geometric glyph. */
export function EmployeeAvatar({ type, className, size = "md" }: EmployeeAvatarProps) {
  const { theme } = useTheme();
  const markTheme = theme === "dark" ? "dark" : "light";

  return (
    <AgentMark
      type={type}
      theme={markTheme}
      size={MARK_SIZES[size]}
      className={cn(
        "transition-transform duration-300 group-hover:scale-[1.03] group-hover:shadow-md",
        className,
      )}
    />
  );
}
