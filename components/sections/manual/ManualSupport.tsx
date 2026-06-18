"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { MANUAL_SUPPORT } from "@/content/manual";
import { HQ, WHATSAPP_URL } from "@/content/contact";

const SUPPORT_HREF = {
  whatsapp: WHATSAPP_URL,
  email: `mailto:${HQ.email}`,
  distributor: "/contact?type=distributor",
  products: "/products",
} as const;

const ICONS: Record<string, ReactNode> = {
  whatsapp: <WAGlyph className="h-5 w-5" />,
  email: <MailGlyph className="h-5 w-5" />,
  distributor: <HandshakeGlyph className="h-5 w-5" />,
  products: <BoxGlyph className="h-5 w-5" />,
};

export function ManualSupport() {
  return (
    <section
      aria-labelledby="manual-support"
      className="relative py-24 sm:py-32"
    >
      <Container>
        <motion.span
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7 }}
          className="text-eyebrow flex items-center gap-3 text-flamingo-titanium"
        >
          <span aria-hidden className="h-px w-10 bg-flamingo-titanium/60" />
          Support
        </motion.span>

        <motion.h2
          id="manual-support"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-display mt-6 max-w-3xl text-flamingo-soft"
        >
          NEED <span className="text-gradient-pink">HELP?</span>
        </motion.h2>

        <p className="mt-4 max-w-2xl text-base text-flamingo-titanium md:text-lg">
          Four routes into the team — every inquiry routes directly to the right desk.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MANUAL_SUPPORT.map((opt, i) => {
            const href = SUPPORT_HREF[opt.type];
            const external = opt.type === "whatsapp";
            return (
              <motion.a
                key={opt.id}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.7, delay: 0.05 + i * 0.07 }}
                whileHover={{ y: -3 }}
                className="block group"
              >
                <GlassCard className="flex h-full flex-col gap-4 p-6 transition-colors duration-500 group-hover:border-flamingo-pink/40">
                  <span
                    aria-hidden
                    className="flex h-10 w-10 items-center justify-center rounded-2xl bg-flamingo-pink/12 text-flamingo-pink"
                  >
                    {ICONS[opt.type]}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="display text-sm font-bold uppercase tracking-ultra text-flamingo-soft">
                      {opt.label}
                    </h3>
                    <p className="text-xs text-flamingo-titanium">
                      {opt.description}
                    </p>
                  </div>
                  <span className="text-meta mt-auto inline-flex items-center gap-2 text-flamingo-pink transition-transform group-hover:translate-x-0.5">
                    {opt.cta} →
                  </span>
                </GlassCard>
              </motion.a>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function WAGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.81 11.81 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.518 5.272l-.999 3.648 3.97-1.619z" />
    </svg>
  );
}
function MailGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function HandshakeGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden className={className}>
      <path d="M3 12l3-3 4 1 2-2 4 2 5-2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 12v4l4 3 3-2 4 2 5-3v-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function BoxGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden className={className}>
      <path d="M12 3l9 4v10l-9 4-9-4V7l9-4z" strokeLinejoin="round" />
      <path d="M3 7l9 4 9-4M12 11v10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
