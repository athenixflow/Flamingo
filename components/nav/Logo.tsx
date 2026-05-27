import Link from "next/link";
import { cn } from "@/lib/utils/cn";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizes = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-2xl",
  };

  return (
    <Link
      href="/"
      aria-label="Flamingo Car Care home"
      className={cn(
        "group inline-flex items-center gap-2 no-tap-highlight",
        className,
      )}
    >
      <span
        aria-hidden
        className="relative inline-flex h-7 w-7 items-center justify-center rounded-full bg-flamingo-pink shadow-glow-soft"
      >
        <span className="absolute inset-1 rounded-full bg-flamingo-obsidian" />
        <span className="relative h-2 w-2 rounded-full bg-flamingo-pink" />
      </span>
      <span
        className={cn(
          "display font-bold tracking-ultra text-flamingo-soft transition-colors group-hover:text-flamingo-pink",
          sizes[size],
        )}
      >
        Flamingo
      </span>
    </Link>
  );
}
