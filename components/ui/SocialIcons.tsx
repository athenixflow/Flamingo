import { cn } from "@/lib/utils/cn";
import type { SocialLink } from "@/content/contact";

const SIZE_CLASS = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
} as const;

const BUTTON_SIZE = {
  sm: "h-8 w-8",
  md: "h-9 w-9",
  lg: "h-11 w-11",
} as const;

interface SocialIconsProps {
  links: SocialLink[];
  size?: keyof typeof SIZE_CLASS;
  className?: string;
}

export function SocialIcons({ links, size = "md", className }: SocialIconsProps) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {links.map((link) => (
        <li key={link.id}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className={cn(
              "inline-flex items-center justify-center rounded-full border border-flamingo-titanium/20 bg-flamingo-obsidian/60 text-flamingo-titanium transition-colors hover:border-flamingo-pink/50 hover:text-flamingo-pink",
              BUTTON_SIZE[size],
            )}
          >
            <Glyph id={link.id} className={SIZE_CLASS[size]} />
          </a>
        </li>
      ))}
    </ul>
  );
}

function Glyph({ id, className }: { id: SocialLink["id"]; className?: string }) {
  switch (id) {
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
          <path d="M22 12.07C22 6.51 17.52 2 12 2S2 6.51 2 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.02H7.9v-2.91h2.54V9.83c0-2.52 1.49-3.91 3.78-3.91 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.75 8.44-4.91 8.44-9.93z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden className={className}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
          <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.2 8h4.6v14H.2V8zm7.4 0h4.4v1.9h.06c.61-1.09 2.1-2.24 4.32-2.24 4.62 0 5.47 3.04 5.47 7v7.34h-4.6V15c0-1.67-.03-3.82-2.33-3.82-2.33 0-2.69 1.82-2.69 3.7V22H7.6V8z" />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zM17.083 19.77h1.833L7.084 4.126H5.117L17.083 19.77z" />
        </svg>
      );
  }
}
