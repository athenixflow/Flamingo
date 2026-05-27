"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Logo } from "@/components/nav/Logo";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export function LoaderOverlay() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reduced) {
      setVisible(false);
      return;
    }

    document.documentElement.style.overflow = "hidden";
    const timer = setTimeout(() => {
      setVisible(false);
      document.documentElement.style.overflow = "";
    }, 2400);

    return () => {
      clearTimeout(timer);
      document.documentElement.style.overflow = "";
    };
  }, [reduced]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            transition: { duration: 0.8, ease: [0.65, 0, 0.35, 1] },
          }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-flamingo-obsidian"
        >
          <div className="absolute inset-0 grid-noise opacity-30" />
          <div
            aria-hidden
            className="absolute inset-0 bg-radial-glow"
          />

          <div className="relative flex flex-col items-center gap-8">
            <motion.div
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <Logo size="lg" />
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-metal-sweep bg-[length:200%_100%]"
                animate={{ backgroundPositionX: ["-200%", "200%"] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  WebkitMaskImage: "linear-gradient(to right, transparent, black, transparent)",
                  maskImage: "linear-gradient(to right, transparent, black, transparent)",
                }}
              />
            </motion.div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="display text-[10px] tracking-ultra text-flamingo-titanium"
            >
              Engineered in USA · Nothing But The Best
            </motion.span>

            <div className="relative h-px w-48 overflow-hidden bg-flamingo-titanium/15">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 bg-flamingo-pink shadow-glow"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
