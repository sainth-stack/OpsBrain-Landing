import { cn } from "@/lib/utils";
import { AgentMark, type AgentMarkType } from "./AgentMark";

const tintStyles: Record<AgentMarkType, string> = {
  sales: "bg-indigo-500/10",
  hr: "bg-violet-500/10",
  hospital: "bg-teal-500/10",
  payment: "bg-amber-500/10",
  support: "bg-cyan-500/10",
  school: "bg-blue-500/10",
  restaurant: "bg-rose-500/10",
  realestate: "bg-emerald-500/10",
  insurance: "bg-sky-500/10",
};

const markSizes = {
  md: { box: "size-12", mark: 40 },
  lg: { box: "size-28", mark: 96 },
} as const;

interface AgentIconBoxProps {
  type: AgentMarkType;
  size?: keyof typeof markSizes;
  className?: string;
}

export function AgentIconBox({ type, size = "md", className }: AgentIconBoxProps) {
  const { box, mark } = markSizes[size];

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-xl",
        box,
        tintStyles[type],
        className,
      )}
      aria-hidden="true"
    >
      <AgentMark type={type} theme="light" size={mark} />
    </div>
  );
}
