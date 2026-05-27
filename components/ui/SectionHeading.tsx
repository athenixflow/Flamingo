import { cn } from "@/lib/utils/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  accent?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  accent,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <span className="display flex items-center gap-3 text-xs text-flamingo-pink">
          <span aria-hidden className="h-px w-8 bg-flamingo-pink" />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "display text-4xl leading-[0.95] sm:text-5xl md:text-6xl",
          accent ? "text-gradient-pink" : "text-flamingo-soft",
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-base text-flamingo-titanium md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
