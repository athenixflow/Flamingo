"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { LEGACY_INTRO, LEGACY_TIMELINE, type LegacyEra } from "@/content/about";

export function LegacyTimeline() {
  const ref = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Background gradient interpolation — warm sepia (1980s) to violet/pink (Today)
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [0.18, 0.32]);
  const bgFromColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "rgba(255,165,90,0.20)",
      "rgba(184,184,184,0.15)",
      "rgba(0,207,255,0.18)",
      "rgba(138,46,255,0.22)",
      "rgba(229,9,130,0.28)",
    ],
  );

  return (
    <section
      ref={ref}
      id="legacy"
      aria-labelledby="legacy-heading"
      className="relative w-full bg-flamingo-obsidian"
      style={{ minHeight: isMobile ? "240vh" : "320vh" }}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden">
        {/* Color-shift background */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: bgFromColor as unknown as string,
            opacity: bgOpacity,
          }}
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 grid-noise opacity-25" />

        <Container className="relative z-10 flex h-full flex-col justify-center gap-12 py-24">
          <Intro />
          <TimelineRail progress={scrollYProgress} />
        </Container>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <div className="flex flex-col gap-5">
      <span className="text-eyebrow flex items-center gap-3 text-flamingo-titanium">
        <span aria-hidden className="h-px w-10 bg-flamingo-pink/60" />
        {LEGACY_INTRO.eyebrow}
      </span>
      <h2 id="legacy-heading" className="text-display max-w-4xl text-flamingo-soft">
        {LEGACY_INTRO.title}
        <br />
        <span className="text-gradient-pink">{LEGACY_INTRO.accentTitle}</span>
      </h2>
      <p className="max-w-3xl text-sm text-flamingo-titanium md:text-base">
        {LEGACY_INTRO.body[0]}
      </p>
    </div>
  );
}

function TimelineRail({ progress }: { progress: MotionValue<number> }) {
  const count = LEGACY_TIMELINE.length;

  return (
    <div className="relative flex-1">
      {/* Horizontal rail (desktop) */}
      <div className="absolute inset-x-0 top-1/2 hidden -translate-y-1/2 lg:block">
        <div className="relative h-px w-full bg-flamingo-titanium/15">
          <motion.div
            style={{ scaleX: progress, transformOrigin: "0 50%" }}
            className="absolute inset-0 h-px bg-gradient-to-r from-flamingo-pink via-flamingo-violet to-flamingo-cyan"
          />
        </div>
        <div className="relative mt-6 grid grid-cols-5 gap-6">
          {LEGACY_TIMELINE.map((era, i) => (
            <DesktopNode
              key={era.era}
              era={era}
              index={i}
              count={count}
              progress={progress}
            />
          ))}
        </div>
      </div>

      {/* Vertical layout (mobile / tablet) */}
      <div className="flex flex-col gap-8 lg:hidden">
        {LEGACY_TIMELINE.map((era, i) => (
          <MobileNode
            key={era.era}
            era={era}
            index={i}
            count={count}
            progress={progress}
          />
        ))}
      </div>
    </div>
  );
}

function useNodeReveal(progress: MotionValue<number>, index: number, count: number) {
  const start = index / count;
  const end = start + 1 / count;
  return {
    opacity: useTransform(progress, [start - 0.05, start + 0.05, end + 0.05, end + 0.18], [0.25, 1, 1, 0.4]),
    y: useTransform(progress, [start - 0.05, start + 0.05], [16, 0]),
    scale: useTransform(progress, [start - 0.05, start + 0.05, end - 0.02, end + 0.1], [0.95, 1, 1, 0.97]),
  };
}

function DesktopNode({
  era,
  index,
  count,
  progress,
}: {
  era: LegacyEra;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const { opacity, y, scale } = useNodeReveal(progress, index, count);
  return (
    <motion.div style={{ opacity, y, scale }} className="flex flex-col items-center text-center">
      <span
        aria-hidden
        className="mb-4 inline-flex h-3 w-3 -translate-y-9 rounded-full"
        style={{
          background: era.accent,
          boxShadow: `0 0 14px ${era.accent}aa`,
        }}
      />
      <EraIcon name={era.icon} color={era.accent} />
      <span
        className="text-meta mt-4"
        style={{ color: era.accent }}
      >
        {era.era}
      </span>
      <h3 className="display mt-3 text-xl text-flamingo-soft">{era.title}</h3>
      <p className="mt-3 text-sm text-flamingo-titanium">{era.body}</p>
    </motion.div>
  );
}

function MobileNode({
  era,
  index,
  count,
  progress,
}: {
  era: LegacyEra;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const { opacity, y } = useNodeReveal(progress, index, count);
  return (
    <motion.div
      style={{ opacity, y }}
      className="flex items-start gap-5 rounded-2xl border border-flamingo-titanium/10 bg-flamingo-carbon/40 p-5"
    >
      <div className="flex shrink-0 flex-col items-center gap-3">
        <EraIcon name={era.icon} color={era.accent} small />
        <span
          aria-hidden
          className="h-12 w-px"
          style={{ background: `${era.accent}55` }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-meta" style={{ color: era.accent }}>
          {era.era}
        </span>
        <h3 className="display text-lg text-flamingo-soft">{era.title}</h3>
        <p className="text-sm text-flamingo-titanium">{era.body}</p>
      </div>
    </motion.div>
  );
}

function EraIcon({
  name,
  color,
  small,
}: {
  name: LegacyEra["icon"];
  color: string;
  small?: boolean;
}) {
  const size = small ? 28 : 44;
  const stroke = small ? 1.4 : 1.6;
  const commonProps = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: stroke,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "beaker")
    return (
      <svg {...commonProps}>
        <path d="M8 3h8M10 3v6L5 19a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-10V3" />
        <path d="M7 16h10" />
      </svg>
    );
  if (name === "factory")
    return (
      <svg {...commonProps}>
        <path d="M3 21V10l6 4V10l6 4V7l6 14H3z" />
        <path d="M9 17h2M14 17h2" />
      </svg>
    );
  if (name === "handshake")
    return (
      <svg {...commonProps}>
        <path d="M3 12l3-3 4 1 3-3 4 2 4 4-4 4-3-2-3 2-3-1-3-3z" />
      </svg>
    );
  if (name === "lattice")
    return (
      <svg {...commonProps}>
        <circle cx="6" cy="6" r="2" />
        <circle cx="18" cy="6" r="2" />
        <circle cx="6" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
        <circle cx="12" cy="12" r="2" />
        <path d="M7.5 7.5L10.5 10.5M16.5 7.5L13.5 10.5M7.5 16.5L10.5 13.5M16.5 16.5L13.5 13.5" />
      </svg>
    );
  // globe
  return (
    <svg {...commonProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a13 13 0 0 1 0 18M12 3a13 13 0 0 0 0 18" />
    </svg>
  );
}
