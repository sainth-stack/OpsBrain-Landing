export function SectionSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-surface-muted section-padding ${className ?? ""}`}
      aria-hidden="true"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto h-4 w-24 rounded bg-border-default" />
        <div className="mx-auto mt-4 h-8 w-64 max-w-full rounded bg-border-default" />
        <div className="mx-auto mt-3 h-4 w-96 max-w-full rounded bg-border-default" />
        <div className="mt-12 h-48 rounded-xl bg-border-default/60" />
      </div>
    </div>
  );
}
