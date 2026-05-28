import { cn } from "@/lib/utils/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  /** Optional second-line accent rendered in pink gradient — for hero moments. */
  accentTitle?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  /** "default" = display tier; "hero" = mega tier reserved for ONE moment per page. */
  size?: "default" | "hero";
  /** Optional preset accent color for the hairline rule (defaults to titanium). */
  accentColor?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  accentTitle,
  description,
  align = "left",
  className,
  size = "default",
  accentColor,
}: SectionHeadingProps) {
  const isHero = size === "hero";

  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "text-eyebrow flex items-center gap-3",
            align === "center" && "justify-center",
          )}
        >
          <span
            aria-hidden
            className="inline-block h-px w-10"
            style={{ background: accentColor ?? "rgba(184,184,184,0.6)" }}
          />
          <span style={{ color: accentColor ?? "rgb(184 184 184)" }}>
            {eyebrow}
          </span>
        </span>
      )}

      {isHero ? (
        <h2 className="text-mega text-flamingo-soft">
          {title}
          {accentTitle && (
            <>
              <br />
              <span className="text-gradient-pink">{accentTitle}</span>
            </>
          )}
        </h2>
      ) : (
        <h2 className="text-display text-flamingo-soft">
          {title}
          {accentTitle && (
            <>
              <br />
              <span className="text-gradient-pink">{accentTitle}</span>
            </>
          )}
        </h2>
      )}

      {description && (
        <p
          className={cn(
            "max-w-2xl text-base text-flamingo-titanium md:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
