"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

const CLIPS = [
  {
    title: "Foam Cascade",
    caption: "Snow-foam pre-wash. The cling-time decides everything.",
    bg: "linear-gradient(135deg, #050505 0%, #1a1a1a 40%, #2a2a2a 100%)",
    accent: "#FFFFFF",
  },
  {
    title: "Hydrophobic Cascade",
    caption: "Water sheets off a ceramic-coated panel. No towel needed.",
    bg: "linear-gradient(135deg, #050505 0%, #001a26 50%, #003a52 100%)",
    accent: "#00CFFF",
  },
  {
    title: "Polymer Gel",
    caption: "F354 Tire Gel cured to a show-car gloss.",
    bg: "linear-gradient(135deg, #050505 0%, #1a0010 50%, #3a0024 100%)",
    accent: "#E50982",
  },
];

export function DetailingCinematics() {
  return (
    <section
      aria-labelledby="cinematics-heading"
      className="relative py-24 sm:py-32"
    >
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Cinematic Detail"
            title="Slow-motion obsession."
            description="The chemistry, the technique, and the surfaces — captured at 240fps."
          />
        </ScrollReveal>

        <div className="mt-16 flex flex-col gap-6">
          {CLIPS.map((c, i) => (
            <CinematicCard key={c.title} clip={c} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function CinematicCard({
  clip,
  index,
}: {
  clip: (typeof CLIPS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 1, 1, 0.4]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className="relative overflow-hidden rounded-3xl border border-flamingo-titanium/10 shadow-cinema"
    >
      <div className="relative aspect-[21/9] w-full overflow-hidden">
        <motion.div
          aria-hidden
          style={{ y, background: clip.bg }}
          className="absolute inset-[-10%]"
        />
        <ParallaxLayer accent={clip.accent} index={index} />
        <div className="absolute inset-0 bg-gradient-to-t from-flamingo-obsidian via-flamingo-obsidian/30 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12">
          <span
            className="display text-[10px] uppercase tracking-ultra"
            style={{ color: clip.accent }}
          >
            Reel {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="display mt-2 text-3xl text-flamingo-soft sm:text-5xl">
            {clip.title}
          </h3>
          <p className="mt-3 max-w-xl text-sm text-flamingo-titanium sm:text-base">
            {clip.caption}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function ParallaxLayer({
  accent,
  index,
}: {
  accent: string;
  index: number;
}) {
  if (index === 0) {
    // foam cascade — bubbles
    return (
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 50"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.circle
            key={i}
            cx={(i * 13) % 100}
            cy={(i * 19) % 50}
            r={1 + (i % 5) * 0.7}
            fill={accent}
            fillOpacity={0.15 + (i % 4) * 0.08}
            initial={{ y: 30 }}
            animate={{ y: [-10, 30] }}
            transition={{
              duration: 6 + (i % 5),
              repeat: Infinity,
              delay: (i % 8) * 0.4,
            }}
          />
        ))}
      </svg>
    );
  }
  if (index === 1) {
    // hydrophobic — cascading sheets
    return (
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 50"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.path
            key={i}
            d={`M ${i * 8} 0 Q ${i * 8 + 4} 25 ${i * 8 + 1} 50`}
            stroke={accent}
            strokeWidth="0.4"
            strokeOpacity="0.4"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1] }}
            transition={{ duration: 2.4, delay: i * 0.15, repeat: Infinity }}
          />
        ))}
      </svg>
    );
  }
  // gel — slow drift rings
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 50"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.circle
          key={i}
          cx="50"
          cy="25"
          r={5 + i * 6}
          fill="none"
          stroke={accent}
          strokeOpacity={0.35}
          strokeWidth="0.4"
          animate={{ r: [5 + i * 6, 10 + i * 6, 5 + i * 6] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}
