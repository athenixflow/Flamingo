"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useSpring, useMotionValueEvent } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { ABOUT_FLAMINGO, ABOUT_FLAMINGO_STATS, type ManualStat } from "@/content/manual";

export function AboutFlamingo() {
  return (
    <section
      aria-labelledby="manual-about"
      className="relative py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-1/4 h-96 w-96 rounded-full bg-flamingo-pink/8 blur-3xl"
      />
      <Container className="relative">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8 }}
              className="text-eyebrow flex items-center gap-3 text-flamingo-titanium"
            >
              <span aria-hidden className="h-px w-10 bg-flamingo-titanium/60" />
              {ABOUT_FLAMINGO.eyebrow}
            </motion.span>

            <motion.h2
              id="manual-about"
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-display mt-6 max-w-2xl text-flamingo-soft"
            >
              {ABOUT_FLAMINGO.headline}{" "}
              <span className="text-gradient-pink">{ABOUT_FLAMINGO.headlineAccent}</span>
            </motion.h2>

            <div className="mt-8 flex flex-col gap-5 text-base text-flamingo-titanium md:text-lg">
              {ABOUT_FLAMINGO.body.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.8, delay: 0.15 + i * 0.1 }}
                >
                  {para}
                </motion.p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {ABOUT_FLAMINGO_STATS.map((stat, i) => (
              <StatTile key={stat.label} stat={stat} delay={0.1 + i * 0.08} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function StatTile({ stat, delay }: { stat: ManualStat; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 24 });
  const [shown, setShown] = useState("0");

  useEffect(() => {
    if (inView) motionVal.set(stat.value);
  }, [inView, motionVal, stat.value]);

  useMotionValueEvent(spring, "change", (v) => {
    if (stat.formatted.startsWith("ISO")) {
      setShown(v >= stat.value * 0.98 ? stat.formatted : "ISO …");
      return;
    }
    const n = Math.round(v);
    setShown(n.toLocaleString() + (stat.suffix || ""));
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <GlassCard className="flex aspect-square flex-col justify-between p-5 sm:p-6">
        <span className="text-meta text-flamingo-pink">★</span>
        <div>
          <div className="display text-2xl font-bold text-flamingo-soft sm:text-3xl md:text-4xl">
            {inView ? shown : "0"}
          </div>
          <div className="text-meta mt-2 text-flamingo-titanium">{stat.label}</div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
