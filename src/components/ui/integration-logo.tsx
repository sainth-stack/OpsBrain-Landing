import { cn } from "@/lib/utils";
import Image from "next/image";

const logoDimensions: Record<
  string,
  { width: number; height: number; src: string }
> = {
  salesforce: { width: 32, height: 20, src: "/integrations/salesforce.svg" },
  hubspot: { width: 24, height: 24, src: "/integrations/hubspot.svg" },
  pipedrive: { width: 24, height: 24, src: "/integrations/pipedrive.svg" },
  twilio: { width: 36, height: 20, src: "/integrations/twilio.svg" },
  "google-calendar": {
    width: 24,
    height: 24,
    src: "/integrations/google-calendar.svg",
  },
};

type IntegrationLogoProps = {
  slug: string;
  label: string;
  className?: string;
};

export function IntegrationLogo({ slug, label, className }: IntegrationLogoProps) {
  const logo = logoDimensions[slug];

  if (!logo) {
    return (
      <span className={cn("text-sm font-semibold text-text-muted", className)}>
        {label}
      </span>
    );
  }

  return (
    <Image
      src={logo.src}
      alt={label}
      width={logo.width}
      height={logo.height}
      className={cn("h-5 w-auto", className)}
      unoptimized
    />
  );
}
