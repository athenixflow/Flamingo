"use client";

import Link from "next/link";
import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";
import { MagneticHover } from "@/components/motion/MagneticHover";

type Variant = "primary" | "ghost" | "outline";

interface BaseProps {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  magnetic?: boolean;
}

interface AnchorProps extends BaseProps, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> {
  href: string;
}

interface ButtonProps extends BaseProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> {
  href?: undefined;
}

type Props = AnchorProps | ButtonProps;

const SIZE: Record<NonNullable<BaseProps["size"]>, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const VARIANT: Record<Variant, string> = {
  primary:
    "bg-flamingo-pink text-white shadow-glow hover:shadow-[0_0_60px_rgba(229,9,130,0.55)]",
  ghost:
    "glass text-flamingo-soft hover:bg-flamingo-carbon/80 hover:border-flamingo-pink/40",
  outline:
    "border border-flamingo-titanium/30 text-flamingo-soft hover:border-flamingo-pink/60 hover:text-white",
};

const Inner = forwardRef<HTMLElement, Omit<Props, "magnetic">>(function Inner(
  { variant = "primary", size = "md", className, children, icon, ...rest },
  ref,
) {
  const classes = cn(
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-display uppercase tracking-ultra transition-all duration-300 ease-out no-tap-highlight",
    SIZE[size],
    VARIANT[variant],
    className,
  );

  const inner = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && <span className="transition-transform group-hover:translate-x-1">{icon}</span>}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"
      />
    </>
  );

  if ("href" in rest && rest.href) {
    const { href, ...anchorProps } = rest as AnchorProps;
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        {...anchorProps}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      {...(rest as ButtonProps)}
    >
      {inner}
    </button>
  );
});

export function Button(props: Props) {
  const { magnetic, ...inner } = props;
  if (magnetic === false) return <Inner {...inner} />;
  return (
    <MagneticHover strength={0.2} className="inline-block">
      <Inner {...inner} />
    </MagneticHover>
  );
}
