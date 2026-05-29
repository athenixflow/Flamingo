"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { COUNTRIES, STATS } from "@/content/global-presence";
import { WorldMap } from "@/components/maps/WorldMap";
import { ClientErrorBoundary } from "@/components/motion/ClientErrorBoundary";

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
        className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[140%] -translate-x-1/2 rounded-[50%] bg-flamingo-violet/10 blur-3xl"
      />

      <Container className="relative">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Global Presence"
            title="From the chemistry lab"
            accentTitle="to six continents."
            description="Distributors across the Americas, Europe, Middle East, Asia Pacific, Africa, and Oceania."
          />
        </ScrollReveal>

        {/* Mega-tier active-country reveal — only shows when a country is hovered */}
        <div className="mt-12 min-h-[7rem] sm:min-h-[9rem] lg:min-h-[11rem]">
          <AnimatePresence mode="wait">
            {active ? (
              <motion.h3
                key={active.code}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="text-mega text-flamingo-soft"
              >
                <span className="text-gradient-pink">{active.name}</span>
              </motion.h3>
            ) : (
              <motion.p
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-meta text-flamingo-titanium"
              >
                Hover or tap any pin to reveal a distributor →
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.7fr_1fr] lg:items-stretch">
          <ScrollReveal>
            <GlassCard className="relative h-full overflow-hidden p-4 sm:p-6">
              <ClientErrorBoundary
                name="WorldMap"
                fallback={
                  <div className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-3 text-center">
                    <span className="text-eyebrow">Global Presence</span>
                    <span className="display text-3xl text-flamingo-soft">
                      Available in {STATS.countries}+ countries
                    </span>
                    <span className="text-meta text-flamingo-titanium">
                      Across {STATS.regions} regions · {STATS.oemPartners} OEM partners
                    </span>
                  </div>
                }
              >
                <WorldMap
                  countries={COUNTRIES}
                  activeCode={activeCode}
                  onHover={setActiveCode}
                />
              </ClientErrorBoundary>
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
                <span className="text-eyebrow">Distributor Detail</span>
                <div className="mt-4 min-h-[160px]">
                  <AnimatePresence mode="wait">
                    {active ? (
                      <motion.div
                        key={active.code}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p className="text-meta text-flamingo-titanium">
                          {active.region}
                        </p>
                        <div className="mt-4 flex flex-col gap-2 text-sm text-flamingo-titanium">
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
                              style={{
                                color:
                                  active.status === "available"
                                    ? "rgb(245 245 245)"
                                    : "rgb(0 207 255)",
                              }}
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
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-sm text-flamingo-titanium"
                      >
                        Pick a region above to see its distributor.
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
      <div className="display text-2xl text-flamingo-soft">{value}</div>
      <div className="text-meta mt-1 text-flamingo-titanium">{label}</div>
    </GlassCard>
  );
}
