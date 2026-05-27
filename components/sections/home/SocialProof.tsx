"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { TESTIMONIALS } from "@/content/testimonials";

const PLATFORM_ICON: Record<string, React.ReactNode> = {
  Instagram: <DotPattern />,
  TikTok: <WavePattern />,
  YouTube: <PlayPattern />,
  Distributor: <BadgePattern />,
};

export function SocialProof() {
  return (
    <section
      aria-labelledby="social-heading"
      className="relative py-24 sm:py-32"
    >
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Social Proof"
            title="The detailing world has been talking."
            description="Creators, professionals, and distributors who've put the catalog to work."
          />
        </ScrollReveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t, i) => (
            <ScrollReveal key={t.id} delay={(i % 4) * 0.06}>
              <GlassCard className="group relative h-full overflow-hidden p-6">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-30 transition-opacity duration-500 group-hover:opacity-60"
                  style={{
                    background: `radial-gradient(circle at 30% 20%, ${t.posterColor}33, transparent 60%)`,
                  }}
                />
                <div className="relative flex h-full flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <span className="display text-[10px] tracking-ultra text-flamingo-titanium">
                      {t.platform}
                    </span>
                    <motion.span
                      aria-hidden
                      className="text-flamingo-pink"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    >
                      {PLATFORM_ICON[t.platform]}
                    </motion.span>
                  </div>

                  <p className="flex-1 text-sm text-flamingo-soft">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  <div className="flex items-center justify-between border-t border-flamingo-titanium/10 pt-4">
                    <span className="display text-xs text-flamingo-pink">
                      {t.handle}
                    </span>
                    {t.context && (
                      <span className="text-[10px] uppercase tracking-ultra text-flamingo-titanium">
                        {t.context}
                      </span>
                    )}
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function DotPattern() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <circle cx="8" cy="8" r="2" />
      <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
function WavePattern() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M2 8 Q5 4 8 8 T14 8" />
    </svg>
  );
}
function PlayPattern() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M5 3l8 5-8 5V3z" />
    </svg>
  );
}
function BadgePattern() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M8 1l2 2 3-1-1 3 2 3-2 3 1 3-3-1-2 2-2-2-3 1 1-3-2-3 2-3-1-3 3 1z" />
    </svg>
  );
}
