import { cn } from "@/lib/utils";

interface GradientOrbsProps {
  className?: string;
  variant?: "light" | "dark";
}

export function GradientOrbs({
  className,
  variant = "dark",
}: GradientOrbsProps) {
  const orbColors =
    variant === "dark"
      ? [
          "bg-brand-primary/25",
          "bg-purple-600/20",
          "bg-brand-accent/15",
        ]
      : [
          "bg-brand-primary/10",
          "bg-purple-400/10",
          "bg-brand-accent/10",
        ];

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          "absolute -left-20 top-10 size-72 rounded-full blur-3xl animate-orb-drift-1",
          orbColors[0],
        )}
      />
      <div
        className={cn(
          "absolute -right-16 top-1/3 size-64 rounded-full blur-3xl animate-orb-drift-2",
          orbColors[1],
        )}
      />
      <div
        className={cn(
          "absolute bottom-0 left-1/3 size-56 rounded-full blur-3xl animate-orb-drift-3",
          orbColors[2],
        )}
      />
    </div>
  );
}

interface DotGridProps {
  className?: string;
  variant?: "light" | "dark";
}

export function DotGrid({ className, variant = "dark" }: DotGridProps) {
  const dotColor =
    variant === "dark"
      ? "rgb(255 255 255 / 0.06)"
      : "rgb(79 70 229 / 0.08)";

  return (
    <div
      className={cn("pointer-events-none absolute inset-0", className)}
      aria-hidden="true"
      style={{
        backgroundImage: `radial-gradient(circle, ${dotColor} 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
        maskImage:
          "radial-gradient(ellipse 85% 75% at 50% 50%, black 25%, transparent 80%)",
      }}
    />
  );
}

export function BackgroundEffects({
  orbs = true,
  dots = true,
  variant = "dark",
  className,
}: {
  orbs?: boolean;
  dots?: boolean;
  variant?: "light" | "dark";
  className?: string;
}) {
  return (
    <>
      {dots && <DotGrid variant={variant} className={className} />}
      {orbs && <GradientOrbs variant={variant} className={className} />}
    </>
  );
}
