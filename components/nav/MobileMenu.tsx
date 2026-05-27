"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { NAV_ITEMS } from "@/content/nav";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  logoSrc?: string | null;
}

export function MobileMenu({ open, onClose, logoSrc }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex flex-col bg-flamingo-obsidian/95 backdrop-blur-2xl"
        >
          <div className="container-flame flex items-center justify-between py-5">
            <Logo src={logoSrc} />
            <button
              type="button"
              aria-label="Close menu"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full glass text-flamingo-soft no-tap-highlight"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav
            aria-label="Mobile"
            className="container-flame flex flex-1 flex-col justify-between gap-12 pb-12 pt-10"
          >
            <ul className="flex flex-col gap-2">
              {NAV_ITEMS.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.08 + index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="display block py-3 text-4xl font-bold tracking-cinematic text-flamingo-soft transition-colors hover:text-flamingo-pink"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-col gap-4">
              <Button href="/contact" size="lg" magnetic={false} className="w-full">
                Start an Inquiry
              </Button>
              <p className="text-xs uppercase tracking-ultra text-flamingo-titanium">
                Engineered in USA · Nothing But The Best
              </p>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
