import { cn } from "@/lib/utils/cn";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  strong?: boolean;
  glow?: boolean;
}

export function GlassCard({
  children,
  className,
  strong,
  glow,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-3xl",
        strong ? "glass-strong" : "glass",
        glow && "glow-pink",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.04] via-transparent to-flamingo-pink/[0.05]"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
