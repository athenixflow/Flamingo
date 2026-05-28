"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}

/**
 * Reveal-on-scroll wrapper. SSR-safe: server renders content fully visible.
 * After mount, we transition to the "hidden" starting state and animate in
 * via `whileInView`. This avoids the prior bug where 44+ elements shipped
 * with `style="opacity:0"` and stayed invisible if JS failed.
 */
export function ScrollReveal({
  children,
  delay = 0,
  y = 32,
  className,
  once = true,
}: ScrollRevealProps) {
  const reduced = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!reduced) setHydrated(true);
  }, [reduced]);

  if (reduced || !hydrated) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
