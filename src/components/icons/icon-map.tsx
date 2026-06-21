import { cn } from "@/lib/utils";
import {
  ArrowRightLeft,
  Banknote,
  BarChart3,
  Bot,
  Building2,
  Calendar,
  CalendarCheck,
  Clock,
  Cloud,
  Database,
  GraduationCap,
  Headphones,
  HeartPulse,
  Kanban,
  Layers,
  Megaphone,
  MessageCircle,
  Phone,
  PhoneMissed,
  RefreshCw,
  Search,
  Send,
  Shield,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

const workflowIconMap: Record<string, LucideIcon> = {
  Search,
  Sparkles,
  Target,
  Send,
  MessageCircle,
  CalendarCheck,
  RefreshCw,
  ArrowRightLeft,
};

const capabilityIconMap: Record<string, LucideIcon> = {
  Search,
  Layers,
  Phone,
  Target,
  Calendar,
  Database,
  Headphones,
  BarChart3,
  Bot,
  Shield,
};

const trustBarIconMap: Record<string, LucideIcon> = {
  Building2,
  HeartPulse,
  GraduationCap,
  ShieldCheck,
  UtensilsCrossed,
  TrendingUp,
};

const integrationIconMap: Record<string, LucideIcon> = {
  Cloud,
  Megaphone,
  Kanban,
  Phone,
  Calendar,
};

const problemIconMap: Record<string, LucideIcon> = {
  Clock,
  PhoneMissed,
  Users,
  Database,
};

const agentIconMap: Record<string, LucideIcon> = {
  sales: TrendingUp,
  hr: Users,
  hospital: HeartPulse,
  payment: Banknote,
  support: Headphones,
  school: GraduationCap,
  restaurant: UtensilsCrossed,
  realestate: Building2,
  insurance: ShieldCheck,
};

export function getWorkflowIcon(name: string): LucideIcon {
  return workflowIconMap[name] ?? Search;
}

export function getCapabilityIcon(name: string): LucideIcon {
  return capabilityIconMap[name] ?? Search;
}

export function getTrustBarIcon(name: string): LucideIcon {
  return trustBarIconMap[name] ?? Building2;
}

export function getIntegrationIcon(name: string): LucideIcon {
  return integrationIconMap[name] ?? Cloud;
}

export function getProblemIcon(name: string): LucideIcon {
  return problemIconMap[name] ?? Clock;
}

export function getAgentIcon(name: string): LucideIcon {
  return agentIconMap[name] ?? Bot;
}

export interface IconBoxProps {
  icon: LucideIcon;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "primary" | "accent" | "dark";
}

const sizeStyles = {
  sm: "size-10 [&>svg]:size-5",
  md: "size-12 [&>svg]:size-6",
  lg: "size-14 [&>svg]:size-7",
  xl: "size-24 [&>svg]:size-12",
} as const;

const variantStyles = {
  primary: "bg-brand-primary-light text-brand-primary",
  accent: "bg-brand-accent-light text-brand-accent",
  dark: "bg-white/10 text-brand-accent",
} as const;

export function IconBox({
  icon: Icon,
  className,
  size = "md",
  variant = "primary",
}: IconBoxProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-xl",
        sizeStyles[size],
        variantStyles[variant],
        className,
      )}
      aria-hidden="true"
    >
      <Icon />
    </div>
  );
}
