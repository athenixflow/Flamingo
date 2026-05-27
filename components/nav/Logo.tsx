"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  /** Public URL of the brand logo image, or `null` to render the typographic fallback. */
  src?: string | null;
}

const SIZE_CLASSES = {
  sm: { text: "text-base", image: "h-7" },
  md: { text: "text-lg", image: "h-8" },
  lg: { text: "text-2xl", image: "h-12" },
};

export function Logo({ className, size = "md", src }: LogoProps) {
  const sizes = SIZE_CLASSES[size];
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = Boolean(src) && !imgFailed;

  return (
    <Link
      href="/"
      aria-label="Flamingo Car Care home"
      className={cn(
        "group inline-flex items-center gap-2 no-tap-highlight",
        className,
      )}
    >
      {showImage ? (
        <Image
          src={src as string}
          alt="Flamingo Car Care"
          width={240}
          height={64}
          priority={size === "lg"}
          onError={() => setImgFailed(true)}
          className={cn("w-auto object-contain", sizes.image)}
        />
      ) : (
        <span className="inline-flex items-center gap-2">
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
              sizes.text,
            )}
          >
            Flamingo
          </span>
        </span>
      )}
    </Link>
  );
}
