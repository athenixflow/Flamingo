"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { TECH_PILLARS } from "@/content/technology";
import { TechViz } from "@/components/tech/TechViz";

export function TechShowcase() {
  return (
    <section
      aria-labelledby="tech-heading"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-noise opacity-20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-flamingo-violet/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-1/3 h-96 w-96 rounded-full bg-flamingo-pink/15 blur-[120px]"
      />

      <Container className="relative">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Engineering"
            title="The science behind the shine."
            description="Every Flamingo formula is built on a measurable failure mode in the field — and an engineered chemistry response."
            accent
          />
        </ScrollReveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {TECH_PILLARS.map((pillar, index) => (
            <ScrollReveal key={pillar.id} delay={index * 0.08}>
              <GlassCard className="h-full overflow-hidden">
                <div className="relative aspect-[16/9] overflow-hidden border-b border-flamingo-titanium/10">
                  <TechViz type={pillar.vizType} accent={pillar.accent} />
                </div>
                <div className="flex flex-col gap-4 p-8">
                  <span
                    className="display text-[10px] tracking-ultra"
                    style={{ color: pillar.accent }}
                  >
                    {pillar.name}
                  </span>
                  <h3 className="display text-2xl text-flamingo-soft">
                    {pillar.hero}
                  </h3>
                  <p className="text-sm text-flamingo-titanium">
                    {pillar.scienceCopy}
                  </p>
                  <ul className="mt-2 flex flex-col gap-2 text-xs text-flamingo-titanium">
                    {pillar.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2">
                        <motion.span
                          aria-hidden
                          className="inline-block h-1 w-3 rounded-full"
                          style={{ background: pillar.accent }}
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
