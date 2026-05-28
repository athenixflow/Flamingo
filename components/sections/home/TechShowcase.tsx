"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { TECH_PILLARS, type TechPillar } from "@/content/technology";
import { TechViz } from "@/components/tech/TechViz";

export function TechShowcase() {
  return (
    <section
      aria-labelledby="tech-heading"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-noise opacity-20" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-flamingo-violet/12 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-1/3 h-96 w-96 rounded-full bg-flamingo-cyan/10 blur-[120px]"
      />

      <Container className="relative">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Engineering"
            title="The science behind"
            accentTitle="the shine."
            description="Every Flamingo formula is built on a measurable failure mode in the field — and an engineered chemistry response."
          />
        </ScrollReveal>
      </Container>

      <div className="mt-20 flex flex-col gap-32 sm:gap-40">
        {TECH_PILLARS.map((pillar, index) => (
          <Pillar key={pillar.id} pillar={pillar} index={index} />
        ))}
      </div>
    </section>
  );
}

function Pillar({ pillar, index }: { pillar: TechPillar; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const reverse = index % 2 === 1;

  return (
    <Container>
      <div
        ref={ref}
        className={
          reverse
            ? "relative grid items-center gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20 [&>:first-child]:lg:order-2"
            : "relative grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-20"
        }
      >
        {/* Viz panel */}
        <div className="relative">
          <span
            aria-hidden
            className="text-mega absolute -left-4 -top-12 select-none text-[12vw] font-bold leading-none opacity-[0.07]"
            style={{ color: pillar.accent }}
          >
            0{index + 1}
          </span>
          <motion.div
            style={{ y }}
            className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-flamingo-titanium/12 shadow-cinema"
          >
            <TechViz type={pillar.vizType} accent={pillar.accent} />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
              style={{ background: pillar.accent, opacity: 0.5 }}
            />
          </motion.div>
        </div>

        {/* Copy panel */}
        <div className="flex flex-col gap-5">
          <span
            className="text-eyebrow flex items-center gap-3"
            style={{ color: pillar.accent }}
          >
            <span
              aria-hidden
              className="h-px w-10"
              style={{ background: pillar.accent, opacity: 0.7 }}
            />
            Pillar 0{index + 1} · {pillar.name}
          </span>
          <h3 className="text-display text-flamingo-soft">{pillar.hero}</h3>
          <p className="text-base text-flamingo-titanium md:text-lg">
            {pillar.scienceCopy}
          </p>
          <ul className="mt-2 flex flex-col gap-3 text-sm text-flamingo-soft">
            {pillar.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-2 inline-block h-1 w-5 shrink-0 rounded-full"
                  style={{ background: pillar.accent }}
                />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
}
