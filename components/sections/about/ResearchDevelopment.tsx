"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { TechViz } from "@/components/tech/TechViz";
import { RD_INTRO, RD_PHASES, type RdPhase } from "@/content/about";

export function ResearchDevelopment() {
  return (
    <section
      aria-labelledby="rd-heading"
      className="relative overflow-hidden bg-flamingo-obsidian py-32 sm:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[120%] -translate-x-1/2 rounded-[50%] bg-flamingo-violet/12 blur-3xl"
      />

      <Container className="relative">
        <ScrollReveal>
          <div className="flex flex-col gap-6">
            <span className="text-eyebrow flex items-center gap-3 text-flamingo-titanium">
              <span aria-hidden className="h-px w-10 bg-flamingo-violet/60" />
              {RD_INTRO.eyebrow}
            </span>
            <h2 id="rd-heading" className="text-display max-w-4xl text-flamingo-soft">
              {RD_INTRO.title}
              <br />
              <span className="text-gradient-pink">{RD_INTRO.accentTitle}</span>
            </h2>
            <div className="grid max-w-3xl gap-3 text-sm text-flamingo-titanium md:text-base">
              {RD_INTRO.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-24 flex flex-col gap-32">
          {RD_PHASES.map((phase, i) => (
            <Phase key={phase.title} phase={phase} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function Phase({ phase, index }: { phase: RdPhase; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.75, 1], [0.4, 1, 1, 0.4]);
  const reverse = index % 2 === 1;

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className={
        reverse
          ? "relative grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16 [&>:first-child]:lg:order-2"
          : "relative grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16"
      }
    >
      {/* Viz */}
      <motion.div
        style={{ y }}
        className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-flamingo-titanium/12 shadow-cinema"
      >
        <TechViz type={phase.vizType} accent={phase.accent} />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
          style={{ background: phase.accent, opacity: 0.55 }}
        />
      </motion.div>

      {/* Copy */}
      <div className="flex flex-col gap-5">
        <span
          className="text-eyebrow flex items-center gap-3"
          style={{ color: phase.accent }}
        >
          <span
            aria-hidden
            className="h-px w-10"
            style={{ background: phase.accent, opacity: 0.7 }}
          />
          {phase.eyebrow}
        </span>
        <h3 className="display text-3xl text-flamingo-soft sm:text-4xl">{phase.title}</h3>
        <p className="text-base text-flamingo-titanium md:text-lg">{phase.body}</p>
      </div>
    </motion.div>
  );
}
