"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { CAMPAIGN_REELS } from "@/content/media";
import { cn } from "@/lib/utils/cn";

export function MediaReels() {
  const [activeId, setActiveId] = useState<string>(CAMPAIGN_REELS[0].id);
  const active = CAMPAIGN_REELS.find((r) => r.id === activeId)!;

  return (
    <>
      <section className="py-12" aria-labelledby="active-reel">
        <Container>
          <ScrollReveal>
            <div className="relative aspect-video overflow-hidden rounded-3xl border border-flamingo-titanium/10 shadow-cinema">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${active.posterColor}55, transparent 60%), linear-gradient(180deg, #050505, #0a0a0a)`,
                  }}
                >
                  <div className="absolute inset-0 grid-noise opacity-30" />
                  <ReelArt color={active.posterColor} />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-flamingo-obsidian via-flamingo-obsidian/40 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-8 sm:p-12">
                <span className="text-eyebrow text-flamingo-titanium">
                  {active.category} · {active.duration}
                </span>
                <h2
                  id="active-reel"
                  className="display mt-2 text-3xl text-flamingo-soft sm:text-5xl"
                >
                  {active.title}
                </h2>
                <p className="mt-3 max-w-2xl text-sm text-flamingo-titanium sm:text-base">
                  {active.copy}
                </p>
              </div>

              <button
                type="button"
                className="absolute left-1/2 top-1/2 inline-flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-flamingo-pink shadow-glow transition-transform hover:scale-110 sm:h-24 sm:w-24"
                aria-label="Play reel (preview only — final media coming soon)"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="white" aria-hidden>
                  <path d="M5 2l13 8-13 8V2z" />
                </svg>
              </button>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <section className="pb-32 pt-12" aria-labelledby="reel-grid">
        <Container>
          <h2 id="reel-grid" className="text-eyebrow text-flamingo-titanium">
            All Reels
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CAMPAIGN_REELS.map((reel) => {
              const isActive = reel.id === activeId;
              return (
                <button
                  key={reel.id}
                  type="button"
                  onClick={() => setActiveId(reel.id)}
                  className="group text-left"
                >
                  <GlassCard
                    className={cn(
                      "overflow-hidden transition-all duration-300",
                      isActive ? "ring-1 ring-flamingo-pink/60 shadow-glow-soft" : "",
                    )}
                  >
                    <div
                      className="relative aspect-video"
                      style={{
                        background: `radial-gradient(ellipse at 30% 20%, ${reel.posterColor}55, transparent 65%), #050505`,
                      }}
                    >
                      <ReelArt color={reel.posterColor} small />
                      <span className="absolute right-3 top-3 rounded-full bg-flamingo-obsidian/80 px-2.5 py-1 text-[10px] uppercase tracking-ultra text-flamingo-titanium">
                        {reel.duration}
                      </span>
                    </div>
                    <div className="p-5">
                      <span className="text-meta text-flamingo-titanium">
                        {reel.category}
                      </span>
                      <h3 className="mt-2 display text-lg text-flamingo-soft">
                        {reel.title}
                      </h3>
                    </div>
                  </GlassCard>
                </button>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}

function ReelArt({ color, small }: { color: string; small?: boolean }) {
  const count = small ? 5 : 12;
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 100 56"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {Array.from({ length: count }).map((_, i) => (
        <motion.line
          key={i}
          x1={(i / count) * 100}
          y1={0}
          x2={(i / count) * 100 + 6}
          y2={56}
          stroke={color}
          strokeOpacity={0.18}
          strokeWidth="0.4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: i * 0.04, duration: 1.4 }}
        />
      ))}
      <circle cx="50" cy="28" r="6" fill={color} opacity="0.18" />
    </svg>
  );
}
