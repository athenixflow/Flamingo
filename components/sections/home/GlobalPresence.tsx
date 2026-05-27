"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { COUNTRIES, STATS } from "@/content/global-presence";
import { WorldMap } from "@/components/maps/WorldMap";

export function GlobalPresence() {
  const [activeCode, setActiveCode] = useState<string | null>(null);
  const active = COUNTRIES.find((c) => c.code === activeCode);

  return (
    <section
      aria-labelledby="global-heading"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[140%] -translate-x-1/2 rounded-[50%] bg-flamingo-pink/10 blur-3xl"
      />

      <Container className="relative">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Global Presence"
            title="From the chemistry lab to six continents."
            description="Distributors across the Americas, Europe, Middle East, Asia Pacific, Africa, and Oceania."
          />
        </ScrollReveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.7fr_1fr] lg:items-stretch">
          <ScrollReveal>
            <GlassCard className="relative h-full overflow-hidden p-4 sm:p-6">
              <WorldMap
                countries={COUNTRIES}
                activeCode={activeCode}
                onHover={setActiveCode}
              />
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex h-full flex-col gap-4">
              <div className="grid grid-cols-3 gap-2">
                <Stat value={`${STATS.countries}+`} label="Countries" />
                <Stat value={`${STATS.regions}`} label="Regions" />
                <Stat value={STATS.oemPartners} label="OEM partners" />
              </div>

              <GlassCard className="flex-1 p-6">
                <span className="display text-[10px] tracking-ultra text-flamingo-pink">
                  Distributor Detail
                </span>
                <div className="mt-4 min-h-[180px]">
                  <AnimatePresence mode="wait">
                    {active ? (
                      <motion.div
                        key={active.code}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                      >
                        <h3 className="display text-3xl text-flamingo-soft">
                          {active.name}
                        </h3>
                        <p className="mt-2 text-xs uppercase tracking-ultra text-flamingo-titanium">
                          {active.region}
                        </p>
                        <div className="mt-6 flex flex-col gap-2 text-sm text-flamingo-titanium">
                          {active.distributor && (
                            <div>
                              <span className="text-flamingo-soft">Distributor: </span>
                              {active.distributor}
                            </div>
                          )}
                          {active.city && (
                            <div>
                              <span className="text-flamingo-soft">City: </span>
                              {active.city}
                            </div>
                          )}
                          <div>
                            <span className="text-flamingo-soft">Status: </span>
                            <span
                              className={
                                active.status === "available"
                                  ? "text-flamingo-pink"
                                  : "text-flamingo-cyan"
                              }
                            >
                              {active.status === "available"
                                ? "Active distribution"
                                : "Coming soon"}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-sm text-flamingo-titanium"
                      >
                        Hover or tap a region on the map to see distributor detail.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </GlassCard>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <GlassCard className="p-4">
      <div className="display text-2xl text-flamingo-pink">{value}</div>
      <div className="mt-1 text-[10px] uppercase tracking-ultra text-flamingo-titanium">
        {label}
      </div>
    </GlassCard>
  );
}
