"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NAV_ITEMS } from "@/content/nav";
import { cn } from "@/lib/utils/cn";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { Button } from "@/components/ui/Button";

interface NavbarProps {
  logoSrc?: string | null;
}

export function Navbar({ logoSrc }: NavbarProps = {}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 flex items-center justify-center transition-all duration-500",
          scrolled ? "py-3" : "py-5",
        )}
      >
        <nav
          aria-label="Primary"
          className={cn(
            "container-flame flex w-full items-center justify-between gap-6 rounded-full px-4 py-2 transition-all duration-500 md:px-6",
            scrolled ? "glass-strong" : "bg-transparent",
          )}
        >
          <Logo src={logoSrc} />

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "relative inline-flex items-center px-4 py-2 text-xs font-medium uppercase tracking-ultra text-flamingo-titanium transition-colors hover:text-flamingo-soft",
                      active && "text-flamingo-soft",
                    )}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3 -bottom-0.5 h-px bg-flamingo-pink"
                        transition={{ type: "spring", stiffness: 360, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:block">
            <Button href="/contact" size="sm" variant="ghost" magnetic={false}>
              Inquire
            </Button>
          </div>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full glass text-flamingo-soft lg:hidden no-tap-highlight"
          >
            <span className="sr-only">Open menu</span>
            <svg
              width="18"
              height="14"
              viewBox="0 0 18 14"
              fill="none"
              aria-hidden
            >
              <path d="M1 1H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M1 7H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M1 13H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </nav>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} logoSrc={logoSrc} />
    </>
  );
}
